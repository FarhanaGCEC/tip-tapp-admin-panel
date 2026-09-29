/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
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

import {
  FormInline,
  FormSelect,
  FormInput,
  FormCheck,
  FormInfo,
} from '../common/form-elements/components'
import { InputElement } from '../common/form-elements'
import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import LoadingIcon from '../common/loading-icon'
import PreviewImage from '../../assets/images/icons/svg/profile-icon.svg'
import { Tab } from '../common/headless'
import { UseQueryResult } from 'react-query'
import {
  useDeactiveUserAndActive,
  useGetUserById,
} from '../../api/tp-and-sp-management/tp-sp-management'
import { TipItem } from '../../types/tpandsptype'
import { PosApi } from '../../api'
import Button from '../common/button'
import { GatewayItem } from '../../types/gatewaytype'
import { GatewaySettingFindOne } from '../../api/gateway-setting-management/gateway-and-tip-setting-management'
import Separator from '../common/separator/separator'

interface ViewUserProps {
  userId: string
}
function GatewaySettingView(props: ViewUserProps) {
  const userIdAsNumber = Number(props.userId)

  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<GatewayItem> = GatewaySettingFindOne(props.userId)
  const { mutate: deactivateActivateUser } = useDeactiveUserAndActive()
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const DeactiveAndActivehandle = (userid: string, typesatus: string) => {
    deactivateActivateUser({ userid, satustype: typesatus })
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <Tab.Group className=" intro-y box overflow-hidden  ">
        <div className="flex items-center  px-5 py-5 pt-5 dark:border-darkmode-400 sm:py-3">
          <FormInline className="flex-col items-start xl:flex-row">
            <div className=" xl:!mr-2 xl:w-64 ">
              <div className="text-left ">
                <div className="flex items-center ">
                  <div className="">Gateway Name</div>
                </div>
                <div
                  className="text-small  leading-relaxed text-slate-500"
                  style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                >
                  {data?.gateway_name ? data.gateway_name : 'Not Provided Yet'}
                </div>
              </div>
            </div>
            <div className="xl:!mr-3 xl:w-64">
              <div className="text-left">
                <div className="flex items-center">
                  <div className="">Gateway Type</div>
                </div>
                <div
                  className="text-small  leading-relaxed text-slate-500"
                  style={{ maxWidth: '250px', wordWrap: 'break-word' }}
                >
                  {data?.gateway_name ? data.gateway_type : 'Not Provided Yet'}
                </div>
              </div>
            </div>
          </FormInline>
        </div>
      </Tab.Group>
      {data?.gateway_type === 'email' ? (
        <>
          <Tab.Group className=" intro-y box mt-11 overflow-hidden ">
            <div className="flex w-full items-center px-5 py-5 pt-5 ">
              <FormInline className="w-full flex-col items-start xl:flex-row ">
                <div className="w-full xl:mr-2 ">
                  <div className="flex items-center text-lg font-medium">
                    <span>Email Settings</span>
                  </div>
                  <Separator />
                </div>
              </FormInline>
            </div>
            <Tab.Panels className="">
              <Tab.Panel>
                <div className="grid grid-cols-12 gap-6"></div>
                <div className="flex items-center  px-5 py-5 pt-5 dark:border-darkmode-400 sm:py-3">
                  <FormInline className="flex-col items-start xl:flex-row">
                    <div className=" mb-2  xl:!mr-2 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Mail Drive</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.maildrive
                            ? data?.credential.maildrive
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 xl:!mr-3 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Host</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '250px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.host
                            ? data?.credential.host
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 xl:!mr-3 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Port</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '250px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.port
                            ? data?.credential.port
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                  </FormInline>
                </div>
                <div className="flex items-center px-5 py-5 pt-5 dark:border-darkmode-400 sm:py-3">
                  <FormInline className="flex-col items-start xl:flex-row">
                    <div className="mb-2 xl:!mr-2 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Username</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.username
                            ? data?.credential.username
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 xl:!mr-3 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Password</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '250px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.password
                            ? data.credential.password
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 xl:!mr-3 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Encryption</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '250px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.encryption
                            ? data.credential.encryption
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                  </FormInline>
                </div>
                <div className=" items-center px-5 py-5 pt-5 dark:border-darkmode-400 sm:py-3">
                  <FormInline className="  flex-col items-start xl:flex-row">
                    <div className="mb-2 xl:!mr-2 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">From Address</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.fromAddress
                            ? data?.credential.fromAddress
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 xl:!mr-2 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Form Name</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.fromName
                            ? data?.credential.fromName
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                  </FormInline>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      ) : data?.gateway_type === 'paypal' ? (
        // JSX for when gateway_type is 'paple'
        <>
          <Tab.Group className=" intro-y box mt-11 overflow-hidden ">
            <div className="flex w-full items-center px-5 py-5 pt-5 ">
              <FormInline className="w-full flex-col items-start xl:flex-row ">
                <div className="w-full xl:mr-2 ">
                  <div className="flex items-center text-lg font-medium">
                    <span>Paypal Settings</span>
                  </div>
                  <Separator />
                </div>
              </FormInline>
            </div>
            <Tab.Panels className="">
              <Tab.Panel>
                <div className="grid grid-cols-12 gap-6"></div>
                <div className="flex items-center  px-5 py-5 pt-5 dark:border-darkmode-400 sm:py-3">
                  <FormInline className="flex-col items-start xl:flex-row">
                    <div className="mb-2 xl:!mr-2 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Clien ID</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.cliendid
                            ? data?.credential.cliendid
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2 xl:!mr-3 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Security</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '250px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.security
                            ? data?.credential.security
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                  </FormInline>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      ) : data?.gateway_type === 'stripe' ? (
        <>
          <Tab.Group className=" intro-y box mt-11 overflow-hidden ">
            <div className="flex w-full items-center px-5 py-5 pt-5 ">
              <FormInline className="w-full flex-col items-start xl:flex-row ">
                <div className="w-full xl:mr-2 ">
                  <div className="flex items-center text-lg font-medium">
                    <span>Stripe Settings</span>
                  </div>
                  <Separator />
                </div>
              </FormInline>
            </div>
            <Tab.Panels className="">
              <Tab.Panel>
                <div className="grid grid-cols-12 gap-6"></div>
                <div className="flex items-center  px-5 py-5 pt-5 dark:border-darkmode-400 sm:py-3">
                  <FormInline className="flex-col items-start xl:flex-row">
                    <div className="mb-2 xl:!mr-2 xl:w-64">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="">Api Key</div>
                        </div>
                        <div
                          className="text-small  leading-relaxed text-slate-500"
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                        >
                          {data?.credential.apikey
                            ? data?.credential.apikey
                            : 'Not Provided Yet'}
                        </div>
                      </div>
                    </div>
                  </FormInline>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      ) : (
        <></>
      )}

      <div className=" mt-3 flex justify-end">
        <Button className=" bg-[#EDF2F6] px-10 py-3 " onClick={handleSlider}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default GatewaySettingView
