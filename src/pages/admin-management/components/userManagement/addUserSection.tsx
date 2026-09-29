/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../../../../components/common/button'
import InputElement from '../../../../components/common/form-elements/input-element'
import Profile from '../../../../components/common/profile/profile'
import {
  AlignmentTypes,
  NotificationTypes,
} from '../../../../constants/common-enums'
import { useAddUserDetails } from '../../../../api/admin-user-management'
import { AddUserPayload } from '../../../../types/adminUserTypes'
import { Icons } from '../../../../constants'
import Toast from '../../../../utils/notification'
import SharedDataContainer from '../../../../containers/sharedData'
import CustomDropdown from '../../../../components/common/form-elements/custom-dropdown'
import { useUploadImage } from '../../../../api/auth-management'
import Separator from '../../../../components/common/separator/separator'

const schema = yup
  .object({
    FirstName: yup.string().required('First Name is required'),
    LastName: yup.string().required('Last Name is required'),
    Email: yup.string().email('Invalid email').required('Email is required'),
    Password: yup.string().required('Password is required'),
    Phone: yup.string().required('Phone Number is required'),
    Whatsapp: yup.string().optional(),
    roleId: yup.number().required('Role is required'),
  })
  .required()

function AddUserSection(props: { roles: [] }) {
  const [loading, setLoading] = useState(false)
  const { roles } = props
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading, isSuccess, isError, error } = useAddUserDetails()

  const {
    mutate: uploadFile,
    isSuccess: fileUploadSuccess,
    data: uploadData,
    isError: isUploadError,
    error: uploadError,
  } = useUploadImage()

  const onSubmit = (data: any) => {
    setLoading(true)
    const payload: AddUserPayload = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      Password: data.Password,
      Phone: data.Phone,
      Whatsapp: data.Whatsapp || '',
      ProfilePictureURL: uploadedImage || '',
      roleId: data.roleId,
    }
    mutate(payload)
  }

  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  useEffect(() => {
    if (isSuccess) {
      setNotification({
        message: 'User added successfully',
        icon: Icons.CHECKCIRCLE,
        type: NotificationTypes.SUCCESS,
      })
      Toast()
      handleSlider()
      setLoading(false)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      setNotification({
        message: `${(error as any)?.response?.data.message}`,
        icon: Icons.CLOSE,
        type: NotificationTypes.ERROR,
      })
      Toast()
      setLoading(false)
    }
  }, [isError])

  useEffect(() => {
    if (fileUploadSuccess && uploadData) {
      setUploadedImage(uploadData.fileUrl)
    }
  }, [fileUploadSuccess, uploadData])

  const formatedRoles = Array.isArray(roles)
    ? roles.map((role: { id: number; name: string }) => ({
        id: role.id,
        value: role.name,
        name: role.name === 'SUPER_ADMIN' ? 'Administrator' : role.name,
      }))
    : []

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
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-lg bg-white  shadow-md"
    >
      <div className="mb-6 flex justify-start pl-6 pt-6 ">
        {uploadedImage ? (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded profile"
              className="h-[100px] w-[100px] rounded-full object-cover"
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
            <Profile />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className=" absolute inset-0  cursor-pointer bg-black opacity-0"
            />
          </button>
        )}
      </div>

      <div className="mb-5">
        <Separator />
      </div>

      <div className="gap-4 max-lg:p-3 lg:p-6">
        <div className="flex-cols mb-6 w-full gap-24 lg:flex">
          <div className="lg:w-1/2">
            <InputElement
              id="firstName"
              label="First Name"
              name="FirstName"
              type="text"
              placeholder="First Name"
              register={register}
              required={true}
              error={errors.FirstName}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
          <div className="lg:w-1/2">
            <InputElement
              id="lastName"
              label="Last Name"
              name="LastName"
              type="text"
              placeholder="Last Name"
              register={register}
              required={true}
              error={errors.LastName}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
        </div>
        <div className="flex-cols mb-6 w-full gap-24 lg:flex">
          <div className="lg:w-1/2">
            <InputElement
              id="email"
              label="Email"
              name="Email"
              type="email"
              placeholder="Email"
              register={register}
              required={true}
              error={errors.Email}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
          <div className="lg:w-1/2">
            <InputElement
              id="password"
              label="Password"
              name="Password"
              type="password"
              placeholder="Password"
              register={register}
              required={true}
              error={errors.Password}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
        </div>
        <div className="flex-cols mb-6 w-full lg:flex lg:gap-24">
          <div className="lg:w-1/2">
            <InputElement
              id="phoneNumber"
              label="Phone Number"
              name="Phone"
              type="number"
              placeholder="Phone Number"
              register={register}
              required={true}
              error={errors.Phone}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
          <div className="lg:w-1/2">
            <InputElement
              id="whatsapp"
              label="Whatsapp"
              name="Whatsapp"
              type="number"
              placeholder="Whatsapp"
              register={register}
              required={false}
              error={errors.Whatsapp}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
        </div>
        <div className="lg:max-w-[325px]">
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
                  formatedRoles.find((role) => role.id === field.value)
                    ?.value || ''
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
      </div>

      <div className="absolute bottom-[-60px] right-0 mt-6 flex justify-end space-x-4">
        <Button
          onClick={() => {
            handleSlider()
          }}
          type="button"
          className=" bg-[#EDF2F6] py-2 max-lg:min-w-[55px] max-lg:px-4 lg:min-w-[120px] lg:px-10 "
        >
          Cancel
        </Button>
        {loading ? (
          <Button
            type="submit"
            className=" bg-slate-100 py-2 text-gray-500 max-lg:min-w-[55px] max-lg:px-4 lg:min-w-[120px] lg:px-10"
            disabled
          >
            Adding...
          </Button>
        ) : (
          <Button
            onClick={() => {}}
            type="submit"
            className=" bg-black py-2 text-white max-lg:min-w-[55px] max-lg:px-6 lg:min-w-[120px] lg:px-10"
          >
            Add
          </Button>
        )}
      </div>
    </form>
  )
}

export default AddUserSection
