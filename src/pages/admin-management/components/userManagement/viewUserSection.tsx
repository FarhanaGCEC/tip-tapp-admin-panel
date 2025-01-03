/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { UseQueryResult } from 'react-query'
import { Tab } from '@headlessui/react'
import { PosApi } from '../../../../api'
import {
  useGetUserById,
  useActivateUser,
  useDeactivateUser,
} from '../../../../api/admin-user-management'
import Button from '../../../../components/common/button'
import { TipItem } from '../../../../types/tpandsptype'
import PreviewImage from '../../../../assets/images/default-image.png'
import SharedDataContainer from '../../../../containers/sharedData'
import Separator from '../../../../components/common/separator/separator'

interface ViewUserProps {
  userId: string
}
function ViewUserSection(props: ViewUserProps) {
  const posApi = PosApi.useAPI()
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<TipItem> = useGetUserById(props.userId)

  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      prefix: yup.string().when('_', {
        is: () => 'tooltip',
        then: yup
          .string()
          .required(`${t('customerForm.fields.prefix.tooltip')}`),
        otherwise: yup.string().notRequired(),
      }),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const { mutate: ActivateUser } = useActivateUser()
  const { mutate: DeactivateUser } = useDeactivateUser()

  const onSubmit: SubmitHandler<FieldValues> = () => {}

  const handleDeactivate = () => {
    if (data?.id) DeactivateUser(data?.KeyCloakID.toString())
  }

  const handleActivate = () => {
    if (data?.id) ActivateUser(data?.KeyCloakID.toString())
  }

  const { handleSlider } = SharedDataContainer.useContainer()

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <Tab.Group>
        <div className="intro-y rounded-t-lg bg-white p-3 px-5">
          {/* Profile Section */}
          <div className="ml-3 mr-2 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 ">
            {/* User Info */}
            <div className="flex items-center">
              <img
                alt="profile page"
                className="h-16 w-16 rounded-full  max-lg:mr-4 sm:h-20 sm:w-20 md:h-[65px] md:w-[65px] lg:h-[85px] lg:w-[85px]"
                src={
                  data?.ProfilePictureURL
                    ? data.ProfilePictureURL
                    : PreviewImage
                }
              />
              <div className="max-lg:mr-4 lg:ml-3">
                <div className="gap-2 overflow-hidden font-medium max-lg:overflow-y-auto md:text-xl lg:flex lg:flex-row lg:text-lg">
                  <div className="truncate whitespace-nowrap md:block">
                    {data?.FirstName ? data.FirstName : 'Name'}
                  </div>
                  <div className="whitespace-nowrap">
                    {data?.LastName ? data.LastName : 'provide'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center md:justify-end ">
              {data?.Status === 'active' ? (
                <Button
                  className="w-40 bg-red-500 px-6 py-2"
                  onClick={handleDeactivate}
                >
                  <span className="text-white">Deactivate</span>
                </Button>
              ) : (
                <Button
                  className="w-40 bg-green-500 px-6 py-2"
                  onClick={handleActivate}
                >
                  <span className="text-white">Activate</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="rounded-b-lg bg-white py-4">
          <Tab.Panel>
            <div className="ml-3 mr-4 grid grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-36">
              {/* Email */}
              <div className="text-left">
                <div className="flex items-center">Email</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.Email ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.Email ? data.Email : 'Not Provided Yet'}
                </div>
              </div>

              {/* Phone */}
              <div className="text-left">
                <div className="flex items-center">Phone</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.Phone ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.Phone ? data.Phone : 'Not Provided Yet'}
                </div>
              </div>

              {/* Whatsapp */}
              <div className="text-left ">
                <div className="flex items-center">Whatsapp</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.Whatsapp ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.Whatsapp ? data.Whatsapp : 'Not Provided Yet'}
                </div>
              </div>
            </div>
            {/* Role Section */}

            <div className="ml-3 mr-4 flex flex-col space-y-4 px-5 py-3 lg:space-y-0">
              <div className="lg:w-full">
                <div className="text-left">
                  <div className="flex items-center">Role</div>

                  <div className="text-small mt-3 leading-relaxed text-gray-500">
                    {data?.role ? data.role.name : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </div>
      </Tab.Group>

      {/* Cancel Button */}
      <div className="mt-3 flex justify-end ">
        <Button
          className="min-w-[120px] bg-[#EDF2F6] px-6  py-2"
          onClick={() => handleSlider()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default ViewUserSection
