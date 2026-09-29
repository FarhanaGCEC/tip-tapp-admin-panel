/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../../../../components/common/button'
import InputElement from '../../../../components/common/form-elements/input-element'
import {
  AlignmentTypes,
  NotificationTypes,
} from '../../../../constants/common-enums'
import { Icons } from '../../../../constants'
import Toast from '../../../../utils/notification'
import SharedDataContainer from '../../../../containers/sharedData'
import {
  useGetUserById,
  useUpdateUserDetails,
} from '../../../../api/admin-user-management'
import { UpdateUserPayload } from '../../../../types/adminUserTypes'
import CustomDropdown from '../../../../components/common/form-elements/custom-dropdown'
import { useUploadImage } from '../../../../api/auth-management'
import Separator from '../../../../components/common/separator/separator'
import { getProfilePictureUrl } from '../../../../utils/profilePicture'

const schema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone Number is required'),
    whatsapp: yup.string().optional(),
    roleId: yup.number().required('Role is required'),
  })
  .required()

function EditUserSection({ userId, roles }: { userId: string; roles: [] }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const {
    mutate: uploadFile,
    isSuccess: fileUploadSuccess,
    data: uploadData,
    isError: isUploadError,
    error: uploadError,
  } = useUploadImage()

  const {
    mutate: updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useUpdateUserDetails()

  const { data } = useGetUserById(userId)

  const onSubmit = (data: any) => {
    const payload: Partial<UpdateUserPayload> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp || '',
      ProfilePictureURL: uploadedImage ? uploadedImage : data.ProfilePictureURL,
      roleId: data.roleId,
    }
    updateUser({
      userId,
      ...payload,
    })
  }

  const { setNotification, handleSlider } = SharedDataContainer.useContainer()

  useEffect(() => {
    if (isSuccess) {
      setNotification({
        message: 'User updated successfully',
        icon: Icons.CHECKCIRCLE,
        type: NotificationTypes.SUCCESS,
      })
      Toast()
      handleSlider()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      setNotification({
        message: 'User update failed',
        icon: Icons.CLOSE,
        type: NotificationTypes.ERROR,
      })
      Toast()
    }
  }, [isError])

  useEffect(() => {
    async function fetchUserData() {
      const userData = data
      setValue('firstName', userData.FirstName)
      setValue('lastName', userData.LastName)
      setValue('email', userData.Email)
      setValue('phone', userData.Phone)
      setValue('roleId', userData.role.id)
      setValue('whatsapp', userData.Whatsapp)
    }

    fetchUserData()
  }, [userId, setValue, data])

  const formatedRoles = Array.isArray(roles)
    ? roles.map((role: { id: number; name: string }) => ({
        id: role.id,
        value: role.name,
        name: role.name === 'SUPER_ADMIN' ? 'Administrator' : role.name,
      }))
    : []

  useEffect(() => {
    if (fileUploadSuccess && uploadData) {
      setUploadedImage(uploadData.fileUrl)
    }
  }, [fileUploadSuccess, uploadData])

  // Add missing upload error handling
  useEffect(() => {
    if (isUploadError && uploadError) {
      setNotification({
        message: `Upload failed: ${
          uploadError.response?.data?.message ||
          uploadError.message ||
          'Unknown error'
        }`,
        icon: Icons.CLOSE,
        type: NotificationTypes.ERROR,
      })
      Toast()
    }
  }, [isUploadError, uploadError, setNotification])

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = async () => {
        try {
          const formData = new FormData()
          formData.append('file', file)
          await uploadFile(formData)
        } catch (error) {
          console.error('Image upload error:', error)
        }
      }
      img.onerror = (error) => {
        console.error('Invalid image file:', error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-lg bg-white shadow-md"
    >
      <div className="mb-6 flex justify-start pl-6 pt-6 ">
        {uploadedImage ? (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded profile"
              className="h-[100px] w-[100px] object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className=" absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
        ) : (
          <button
            type="button"
            className="relative flex flex-col items-center justify-center gap-[10px]"
          >
            <img
              src={getProfilePictureUrl(data?.ProfilePictureURL)}
              alt={`${data?.FirstName || ''} ${data?.LastName || ''}`.trim() || 'User'}
              className="h-[100px] w-[100px] rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/default-avatar.png'
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className=" absolute inset-0  cursor-pointer bg-black opacity-0"
            />
          </button>
        )}
      </div>
      <Separator />
      <div className="grid-cols-2 gap-4 max-lg:p-3 lg:grid lg:p-6">
        <InputElement
          id="firstName"
          label="First Name"
          name="firstName"
          type="text"
          placeholder="First Name"
          register={register}
          required={true}
          error={errors.firstName}
          labelAlignment={AlignmentTypes.BLOCK}
        />
        <InputElement
          id="lastName"
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Last Name"
          register={register}
          required={true}
          error={errors.lastName}
          labelAlignment={AlignmentTypes.BLOCK}
        />
        <InputElement
          id="email"
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          required={true}
          error={errors.email}
          labelAlignment={AlignmentTypes.BLOCK}
        />
        <InputElement
          id="whatsapp"
          label="Whatsapp"
          name="whatsapp"
          type="text"
          placeholder="Whatsapp"
          register={register}
          required={false}
          error={errors.whatsapp}
          labelAlignment={AlignmentTypes.BLOCK}
        />
        <InputElement
          id="phoneNumber"
          label="Phone Number"
          name="phone"
          type="text"
          placeholder="Phone Number"
          register={register}
          required={true}
          error={errors.phone}
          labelAlignment={AlignmentTypes.BLOCK}
        />
        <Controller
          name="roleId"
          control={control}
          render={({ field, fieldState }) => (
            <CustomDropdown
              id="role"
              label="Role"
              placeholder="Select a role"
              options={formatedRoles}
              value={
                formatedRoles.find((role) => role.id === field.value)?.value ||
                ''
              }
              onChange={(roleId) => {
                field.onChange(roleId)
              }}
              required={true}
              error={fieldState.error?.message}
              labelAlignment="block"
            />
          )}
        />
      </div>

      <div className="absolute bottom-[-60px] right-0 mt-6 flex   justify-end space-x-4 ">
        <Button
          onClick={handleSlider}
          type="button"
          className=" bg-[#EDF2F6] py-2 max-lg:min-w-[55px] max-lg:px-4 lg:min-w-[120px] lg:px-10 "
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className=" bg-black py-2 text-white max-lg:min-w-[55px] max-lg:px-4 lg:min-w-[120px] lg:px-10"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  )
}

export default EditUserSection
