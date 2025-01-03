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
import { PosApi } from '../../../../api'
import Button from '../../../common/button'
import {
  FormInline,
  FormSelect,
  FormInput,
  FormCheck,
  FormInfo,
} from '../../../common/form-elements/components'
import { InputElement } from '../../../common/form-elements'
import Toast from '../../../../utils/notification'
import SharedDataContainer from '../../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../../constants'
import LoadingIcon from '../../../common/loading-icon'
//import { Tab,Menu } from '../../../common/headless'
//import Lucide from '../../../common/lucide'
import PreviewImage from '../../../../assets/images/default-image.png'
import { Tab } from '../../../common/headless'
import { UseQueryResult } from 'react-query'
import {
  useDeactiveUserAndActive,
  useGetUserById,
} from '../../../../api/tp-and-sp-management/tp-sp-management'
import { TipItem } from '../../../../types/tpandsptype'
import Separator from '../../../common/separator/separator'
import permissionChecker from '../../../../hooks/permissonChecker'

interface ViewUserProps {
  userId: string
}
function ViewTpandSp(props: ViewUserProps) {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [useridparam, setuseridparame] = useState('')
  const [userStatus, setuserStatus] = useState('')
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<TipItem> = useGetUserById(props.userId)
  const {
    data: userData,
    isLoading: isFetchingUserData,
    isError: isFetchingUserError,
  } = useDeactiveUserAndActive(useridparam, userStatus)
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessHandlerCreateCustomer = (customer: any, message: string) => {
    setNotification({
      title: '',
      message,
      icon: Icons.CHECKCIRCLE,
      type: NotificationTypes.SUCCESS,
    })
    Toast()
    setIsLoading(false)
    handleSlider()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorHandler = (error: any) => {
    Toast()
    setNotification({
      title: '',
      message: error || 'Something went wrong.',
      icon: Icons.XCIRCLE,
      type: NotificationTypes.ERROR,
    })
    setIsLoading(false)
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createCustomer = async (customer: any) => {
    setIsLoading(true)
    /* TODO: Remove after after set customer type */
    // eslint-disable-next-line no-param-reassign
    customer.type = 'both'
    const res = await posApi.createCustomer(customer)
    if (res) {
      const { data } = res
      // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
      const { message, data: customer } = data
      sucessHandlerCreateCustomer(customer, message)
    } else {
      errorHandler(null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }
  const [select, setSelect] = useState('1')
  const [buttonModalPreview, setButtonModalPreview] = useState(false)

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [editorDataDescription] = useState(
    `<p>${t('viewUserManagementNotes.fields.description.placeolder')}.</p>`
  )

  //const { handleSlider, slideOverPreview } = SharedDataContainer.useContainer()

  const DeactiveAndActivehandle = (userid: string, typesatus: string) => {
    setuseridparame(userid)
    setuserStatus(typesatus)
  }

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const toggleExpanded: () => void = () => {
    setIsExpanded(!isExpanded)
  }

  const bio = isSuccess && data?.Bio ? data.Bio : 'Not Provided Yet'

  const truncatedBio =
    bio !== 'Not Provided Yet' && !isExpanded && bio.length > 20
      ? bio.substring(0, 20) + '...'
      : bio

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <Tab.Group>
        <div className="intro-y rounded-t-lg bg-white p-3 px-5 ">
          {/* Profile Section */}
          <div className="ml-3 mr-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
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
              {permissionChecker(
                <>
                  {data?.Status == 'active' ? (
                    <Button
                      className=" w-40 bg-[#D70000] "
                      onClick={() => {
                        DeactiveAndActivehandle(
                          data?.KeyCloakID || '',
                          data?.Status || ''
                        )
                      }}
                    >
                      <span className=" text-white sm:block">Deactivate</span>
                    </Button>
                  ) : data?.Status == 'new' ? (
                    <Button className=" w-40 bg-[#03C50B] px-6 py-2">
                      <span
                        className=" text-white sm:block"
                        onClick={() => {
                          DeactiveAndActivehandle(
                            data?.KeyCloakID || '',
                            data?.Status || ''
                          )
                        }}
                      >
                        Activate
                      </span>
                    </Button>
                  ) : data?.Status == 'banned' ? (
                    <Button
                      className=" w-40 bg-[#03C50B] px-6  py-2 "
                      onClick={() => {
                        DeactiveAndActivehandle(
                          data?.KeyCloakID || '',
                          data?.Status || ''
                        )
                      }}
                    >
                      <span className=" text-white sm:block">Activate</span>
                    </Button>
                  ) : (
                    <Button
                      className=" w-40 bg-[#D70000] px-5 py-1"
                      onClick={() => {
                        DeactiveAndActivehandle(
                          data?.KeyCloakID || '',
                          data?.Status || ''
                        )
                      }}
                    >
                      <span className=" text-white sm:block">Deactivate</span>
                    </Button>
                  )}
                </>,
                'tp_management.deactivate'
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className=" rounded-b-lg bg-white py-4">
          <Tab.Panel>
            <div className="ml-3 mr-4 grid grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 ">
              {/* Email */}
              <div className="text-left">
                <div className="flex items-center">Address</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.Address ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.Address ? data.Address : 'Not Provided Yet'}
                </div>
              </div>

              {/* Phone */}
              <div className="text-left lg:ps-[50px]">
                <div className="flex items-center">Date of Birth</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.DateOfBirth ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.DateOfBirth ? data.DateOfBirth : 'Not Provided Yet'}
                </div>
              </div>

              {/* Whatsapp */}
              <div className=" text-left lg:ps-20">
                <div className="flex items-center ">Phone</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.Phone ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.Phone ? data.Phone : 'Not Provided Yet'}
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center">WhatsApp</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.Whatsapp ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.Whatsapp ? data.Whatsapp : 'Not Provided Yet'}
                </div>
              </div>
              <div className="text-left lg:ps-[50px]">
                <div className="flex items-center">Country</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.Country ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.Country ? data.Country : 'Not Provided Yet'}
                </div>
              </div>
              <div className="text-left lg:ps-20">
                <div className="flex items-center">City</div>
                <div
                  className={`text-small mt-1 leading-relaxed ${
                    data?.City ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {data?.City ? data.City : 'Not Provided Yet'}
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center">Bio</div>

                <div
                  className="text-small  mt-1 leading-relaxed "
                  style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                >
                  {truncatedBio}
                  {bio !== 'Not Provided Yet' && bio.length > 20 && (
                    <button
                      onClick={toggleExpanded}
                      className="mt-1 text-[#959499] hover:underline"
                    >
                      {isExpanded ? 'See Less' : 'See More'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {data?.Role === 'sp' || data?.Role === 'both' ? (
              <>
                <div className="mb-5 mt-4  xl:mr-2 xl:w-full  ">
                  <div className="flex items-center text-lg font-medium">
                    <div className="mr-4 flex h-px   w-10 bg-gray-300"></div>
                    <span>Card Details</span>
                    <div className="ml-4 h-px   flex-1 bg-gray-300"></div>
                  </div>
                </div>

                <div className="ml-3 mr-4 grid grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3">
                  {/* Email */}
                  <div className="text-left">
                    <div className="flex items-center">BanK Name</div>
                    <div
                      className={`text-small mt-1 leading-relaxed ${
                        data?.bankDetails?.[0]?.bankName
                          ? 'text-black'
                          : 'text-gray-400'
                      }`}
                    >
                      {data?.bankDetails?.[0]?.bankName
                        ? data?.bankDetails?.[0]?.bankName
                        : 'Not Provided Yet'}
                    </div>
                  </div>
                  <div className="text-left lg:ps-[50px]">
                    <div className="flex items-center">Account Number </div>
                    <div
                      className={`text-small mt-1 leading-relaxed ${
                        data?.bankDetails?.[0]?.accountNumber
                          ? 'text-black'
                          : 'text-gray-400'
                      }`}
                    >
                      {data?.bankDetails?.[0]?.accountNumber
                        ? data?.bankDetails?.[0]?.accountNumber
                        : 'Not Provided Yet'}
                    </div>
                  </div>
                  <div className="text-left lg:ps-20">
                    <div className="flex items-center">IBAN Number</div>
                    <div
                      className={`text-small mt-1 leading-relaxed ${
                        data?.bankDetails?.[0]?.ibanNumber
                          ? 'text-black'
                          : 'text-gray-400'
                      }`}
                    >
                      {data?.bankDetails?.[0]?.ibanNumber
                        ? data?.bankDetails?.[0]?.ibanNumber
                        : 'Not Provided Yet'}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
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

export default ViewTpandSp
