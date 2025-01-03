/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UseQueryResult } from 'react-query'
import { PosApi } from '../..'

// import Toast from '../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'

import Button from '../../../components/common/button'
import {
  GatewaySettingAdd,
  GatewaySettingFindOne,
  GatewaySettingUpdate,
  TestEmail,
} from '../gateway-and-tip-setting-management'
import { GatewayItem, Credential } from '../../../types/gatewaytype'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import InputElement from '../../../components/common/form-elements/input-element-secondary'
// import { SelectElement } from '../../../components/common/form-element/s'
import LoadingIcon from '../../../components/common/loading-icon'
import Lucide from '../../../components/common/lucide'
import SelectElement from '../../../components/common/form-elements/select-element-secondary'
import { Dialog } from '../../../components/common/headless'
import Separator from '../../../components/common/separator/separator'
import { EmailData } from '../../../types/emailTest'

interface FormData {
  gateway_name: string
  gateway_type: string
  maildrive?: string
  host?: string
  port?: string
  username?: string
  password?: string
  encryption?: string
  fromAddress?: string
  fromName?: string
  cliendid?: string
  security?: string
  apikey?: string
  is_active: boolean
}
interface DataProps {
  userId: string
}

function UpdateGatewaySetting(props: DataProps) {
  const fullUrl = window.location.href
  const baseUrl = fullUrl.split('?')[0]
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      firstName: yup
        .string()
        .required(`${t('userManagement.fields.firstName.validationMessage')}`),
      prefix: yup
        .string()
        .required(`${t('customerForm.fields.prefix.tooltip')}`),
    })
    .required()

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [Prefixtype] = useState([
    { id: 0, name: 'Please Select' },
    { id: 1, name: 'Email' },
    { id: 2, name: 'Paypal' },
    { id: 3, name: 'Stripe' },
  ])

  const [selectedValue, setSelectedValue] = useState<string>('') // Initialize state

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedValue(value)
    setFormData((prevData) => ({ ...prevData, gateway_type: value }))
  }

  const {
    data,
    isSuccess,
    isError,
    error,
    refetch,
  }: UseQueryResult<GatewayItem> = GatewaySettingFindOne(props.userId)
  const [formData, setFormData] = useState<FormData>({
    gateway_name: '',
    gateway_type: '',
    maildrive: '',
    host: '',
    port: '',
    username: '',
    password: '',
    encryption: '',
    fromAddress: '',
    fromName: '',
    cliendid: '',
    security: '',
    apikey: '',
    is_active: true,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setFormData({
        gateway_name: data.gateway_name || '',
        gateway_type: data.gateway_type
          ? data.gateway_type.charAt(0).toUpperCase() +
            data.gateway_type.slice(1).toLowerCase()
          : '',
        maildrive: data.credential.maildrive || '',
        host: data.credential.host || '',
        port: data.credential.port || '',
        username: data.credential.username || '',
        password: data.credential.password || '',
        encryption: data.credential.encryption || '',
        fromAddress: data.credential.fromAddress || '',
        fromName: data.credential.fromName || '',
        cliendid: data.credential.cliendid || '',
        security: data.credential.security || '',
        apikey: data.credential.apikey || '',
        is_active: data.is_active || true,
      })
    }
  }, [isSuccess, data])
  const handleChangess = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // const mutation = GatewaySettingAdd()
  const [deleteConfirmationModal, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleError = (message: string) => {
    setErrorMessage(message)
    setErrorDialogOpen(true) // Trigger the dialog box
  }
  const mutation = GatewaySettingUpdate(handleError)

  const HandleSubmitd = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      typeof formData.gateway_name !== 'string' ||
      typeof formData.gateway_type !== 'string'
    ) {
      throw new Error('gateway_name and gateway_type must be strings')
    }
    const credentials: Credential = {
      ...(formData.maildrive && { maildrive: formData.maildrive }),
      ...(formData.host && { host: formData.host }),
      ...(formData.port && { port: formData.port }),
      ...(formData.username && { username: formData.username }),
      ...(formData.password && { password: formData.password }),
      ...(formData.encryption && { encryption: formData.encryption }),
      ...(formData.fromAddress && { fromAddress: formData.fromAddress }),
      ...(formData.cliendid && { cliendid: formData.cliendid }),
      ...(formData.fromName && { fromName: formData.fromName }),
      ...(formData.security && { security: formData.security }),
      ...(formData.apikey && { apikey: formData.apikey }),
    }

    const gatewayItemdd: GatewayItem = {
      id: Number(data?.id), // Replace with actual ID logic if needed
      gateway_name: formData.gateway_name,
      gateway_type: formData.gateway_type.toLowerCase(),
      is_active: formData.is_active,
      credential: credentials,
    }

    mutation.mutate({
      settingid: data?.id ? data?.id.toString() : '0',
      updatedData: gatewayItemdd,
    })
  }

  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo)
  }

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

  const createCustomer = async (customer: any) => {
    setIsLoading(true)

    customer.type = 'both'
    const res = await posApi.createCustomer(customer)
    if (res) {
      const { data } = res
      const { message, data: customer } = data
      sucessHandlerCreateCustomer(customer, message)
    } else {
      errorHandler(null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const [allowSelectedPaymentAccounts, setAllowSelectedPaymentAccounts] =
    useState(false)
  const [allowFundTransferAccounts, setAllowFundTransferAccounts] =
    useState(false)

  const handleAllowSelectedPaymentAccountsChange = (event: {
    target: { checked: any }
  }) => {
    const { checked } = event.target
    setAllowSelectedPaymentAccounts(checked)
  }

  const handleAllowFundTransferAccountsChange = (event: {
    target: { checked: any }
  }) => {
    const { checked } = event.target
    setAllowFundTransferAccounts(checked)
  }
  const [date, setDate] = useState('')

  const [allLocationsChecked, setAllLocationsChecked] = useState(false)
  const [bunnyOutletChecked, setBunnyOutletChecked] = useState(false)
  const [testChecked, setTestChecked] = useState(false)

  const handleAllLocationsChange = () => {
    setAllLocationsChecked(!allLocationsChecked)
    setBunnyOutletChecked(!allLocationsChecked)
    setTestChecked(!allLocationsChecked)
  }

  const handleCheckboxChange = (checkboxName: string) => {
    if (checkboxName === 'bunnyOutlet') {
      setBunnyOutletChecked(!bunnyOutletChecked)
    } else if (checkboxName === 'test') {
      setTestChecked(!testChecked)
    }
  }
  const [email, setemil] = useState('')
  const mutations = TestEmail()
  const TestEmailsend = () => {
    if (
      !formData.host ||
      !formData.port ||
      !formData.username ||
      !formData.password ||
      !email
    ) {
      setNotification({
        title: 'Missing Required Fields',
        icon: Icons.ERRORCIRCLE,
        type: NotificationTypes.ERROR,
      })
      Toast()
      return
    }

    const emailData: EmailData = {
      smtpConfig: {
        host: formData.host,
        port: Number(formData.port),
        secure: false,
        user: formData.username,
        pass: formData.password,
      },
      to: email,
      subject: 'Test Email',
      text: 'This is a test email sent via tip email adding',
    }
    mutations.mutate(emailData, {
      onSuccess: () => {
        setNotification({
          title: 'Email Sent Successfully',
          icon: Icons.CHECKCIRCLE,
          type: NotificationTypes.SUCCESS,
        })
        Toast()
      },
      onError: (error: any) => {
        setNotification({
          title: 'Failed to Send Email',
          icon: Icons.ERRORCIRCLE,
          type: NotificationTypes.ERROR,
        })
        console.error('Error:', error)
        Toast()
      },
    })
  }

  return (
    <form className="validate-form">
      <div className="intro-y box px-5 py-5">
        <div className="mb-3 mt-7 grid grid-cols-1 max-lg:gap-2 md:grid-cols-2  lg:gap-7">
          <InputElement
            label={`${t('Gateway Name')}`}
            name="gateway_name"
            id="gateway_name"
            value={formData.gateway_name} // Bind value here
            onChange={handleChangess}
            required
          />
          <SelectElement
            label={`${t('Gateway Type')}`}
            options={Prefixtype}
            value={formData.gateway_type}
            name="gateway_type"
            id="gateway_type"
            onChange={handleSelectChange}
            required
          />
        </div>
      </div>
      {formData.gateway_type === 'Email' ? (
        <>
          <div className="intro-y box  mt-6 ">
            <div className="  flex  flex-col  border-slate-200/100 px-5 py-4 text-base font-medium dark:border-darkmode-400">
              <h2 className=" mr-auto text-base font-medium">
                {`${t('Email Settings')}`}
              </h2>
            </div>
            <Separator />
            <div className="grid grid-cols-1 px-5  py-7  max-lg:gap-2 md:grid-cols-2  lg:gap-7">
              <InputElement
                label={`${t('Mail Drive')}`}
                name="maildrive"
                type="text"
                id="maildrive"
                placeholder="Mail Drive"
                value={formData.maildrive}
                onChange={handleChangess}
              />
              <InputElement
                label={`${t('Host')}`}
                name="host"
                type="text"
                placeholder="Host"
                id="host"
                value={formData.host}
                onChange={handleChangess}
              />
              <InputElement
                label={`${t('Port')}`}
                name="port"
                type="text"
                placeholder="Port"
                id="port"
                value={formData.port}
                onChange={handleChangess}
              />
              <InputElement
                label={`${t('Username')}`}
                name="username"
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChangess}
              />
              <InputElement
                label={`${t('Password')}`}
                name="password"
                type="password"
                placeholder="Password"
                id="password"
                value={formData.password}
                onChange={handleChangess}
              />
              <InputElement
                label={`${t('Encryption ')}`}
                name="encryption"
                type="text"
                placeholder="Encryption "
                id="encryption"
                value={formData.encryption}
                onChange={handleChangess}
              />
              <InputElement
                label={`${t('From Address')}`}
                name="fromAddress"
                type="text"
                placeholder="From Address"
                id="fromAddress"
                value={formData.fromAddress}
                onChange={handleChangess}
              />
              <InputElement
                label={`${t('From Name')}`}
                name="fromName"
                placeholder="From Name"
                type="text"
                id="fromName"
                value={formData.fromName}
                onChange={handleChangess}
              />
            </div>
          </div>
          <div className="item-center flex justify-center py-3">
            <Button
              variant="secondary"
              className="mx-auto mb-5 w-fit px-10"
              onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault()
                handleMoreInfoClick()
              }}
            >
              <div className="mx-auto flex">
                Send Test Email
                <Lucide
                  className="mx-auto ml-1 mt-0.5 h-4 w-4"
                  icon={showMoreInfo ? Icons.UPARROW : Icons.DOWNARROW}
                />
              </div>
            </Button>
          </div>
          {showMoreInfo && (
            <div className="intro-y box mb-5  ">
              <div className=" flex flex-col  px-5 py-5 text-base font-medium ">
                <h2 className=" mr-auto text-base font-medium">
                  {`${t('Send Test Email')}`}
                </h2>
              </div>
              <Separator />
              <div className="mb-3  grid grid-cols-1 gap-7 px-5 py-5 md:grid-cols-2">
                <InputElement
                  name="send_email"
                  type="email"
                  placeholder="Send Test Email"
                  id="send_email"
                  onChange={(e) => {
                    setemil(e.target.value)
                  }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-2 mr-1 mt-1 w-24"
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault()
                    TestEmailsend()
                  }}
                >
                  {`${t('Emial')}`}
                  {isLoading ? (
                    <LoadingIcon
                      icon="oval"
                      color="white"
                      className="ml-2 h-4 w-4"
                    />
                  ) : (
                    ''
                  )}
                </Button>
              </div>
            </div>
          )}
        </>
      ) : formData.gateway_type === 'Paypal' ? (
        <div className="intro-y box mb-5   mt-6">
          <div className=" flex flex-col border-slate-200/100 px-5  py-4 text-base font-medium dark:border-darkmode-400">
            <h2 className=" mr-auto text-base font-medium">
              {`${t(' Paypal Settings')}`}
            </h2>
          </div>
          <Separator />
          <div className="grid grid-cols-1 px-5  py-7   max-lg:gap-2 md:grid-cols-2  lg:gap-7 ">
            <InputElement
              label={`${t('Cliend ID')}`}
              name="cliendid"
              type="text"
              placeholder="Cliend ID"
              id="cliendid"
              value={formData.cliendid}
              onChange={handleChangess}
            />
            <InputElement
              label={`${t('Security')}`}
              name="security"
              type="text"
              placeholder="Security"
              id="security"
              value={formData.security}
              onChange={handleChangess}
            />
          </div>
        </div>
      ) : formData.gateway_type === 'Stripe' ? (
        <div className="intro-y box mb-5   mt-6 ">
          <div className=" flex flex-col  border-slate-200/100 px-5 py-4 text-base font-medium dark:border-darkmode-400">
            <h2 className=" mr-auto text-base font-medium">
              {`${t('Stripe Settings')}`}
            </h2>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-7 px-5   py-7 md:grid-cols-2 ">
            <InputElement
              label={`${t('Api Key')}`}
              name="apikey"
              placeholder="Api Key"
              type="text"
              id="apikey"
              value={formData.apikey}
              onChange={handleChangess}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className=" mt-5 flex justify-end gap-1">
        <Button
          type="submit"
          variant="primary"
          className="mb-2 mr-1 w-24"
          onClick={HandleSubmitd}
        >
          {`${t('common.button.save')}`}
          {isLoading ? (
            <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
          ) : (
            ''
          )}
        </Button>
        <Button
          variant="secondary"
          className="mb-2 mr-1 w-24 bg-[#EDF2F6] text-black"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            handleSlider()
          }}
        >
          {`${t('common.button.cancel')}`}
        </Button>
      </div>
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setErrorDialogOpen(false)
          setErrorMessage(null)
        }}
      >
        <Dialog.Panel>
          <div className="mt-44 p-5 text-center">
            <Lucide
              icon="XCircle"
              className="mx-auto mt-3 h-16 w-16 text-danger"
            />
            <div className="mt-5 text-3xl">Error</div>
            <div className="mt-2 text-slate-500">
              {errorMessage || 'An unexpected error occurred.'}
            </div>
          </div>
          <div className="px-5 pb-8 text-center"></div>
        </Dialog.Panel>
      </Dialog>
    </form>
  )
}

export default UpdateGatewaySetting
