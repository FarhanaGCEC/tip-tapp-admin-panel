/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../api'
import Button from '../common/button'

import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import LoadingIcon from '../common/loading-icon'
import { TextareaElement, DateElement } from '../common/form-elements'
import { FormInfo, FormCheck } from '../common/form-elements/components'
import Lucide from '../common/lucide'
import {
  GatewaySettingAdd,
  TestEmail,
} from '../../api/gateway-setting-management/gateway-and-tip-setting-management'
import { GatewayItem, Credential } from '../../types/gatewaytype'
import InputElement from '../common/form-elements/input-element-secondary'
import SelectElement from '../common/form-elements/select-element-secondary'
import { EmailData } from '../../types/emailTest'
import Separator from '../../components/common/separator/separator'
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
}
interface FormErrors {
  gateway_name?: string
  gateway_type?: string
  maildrive?: string
  host?: string
  port?: string
  username?: string
  password?: string
  encryption?: string
  fromAddress?: string
  cliendid?: string
  fromName?: string
  security?: string
  apikey?: string
}

function AddGatewaySetting() {
  const fullUrl = window.location.href
  const baseUrl = fullUrl.split('?')[0]
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

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
  })
  const HandleChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const validationSchema = yup
    .object({
      gateway_name: yup.string().required('Gateway name is required'),
      maildrive: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Email',
        then: yup
          .string()
          .required('Mail drive is required for Email gateways'),
        otherwise: yup.string(),
      }),
      host: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Email',
        then: yup.string().required('Host is required for Email gateways'),
        otherwise: yup.string(),
      }),

      port: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Email',
        then: yup.string().required('Username is required for Email gateways'),
        otherwise: yup.string(),
      }),
      username: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Email',
        then: yup.string().required('Username is required for Email gateways'),
        otherwise: yup.string(),
      }),
      password: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Email',
        then: yup.string().required('Password is required for Email gateways'),
        otherwise: yup.string(),
      }),

      encryption: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Email',
        then: yup
          .string()
          .required('Encryption is required for Email gateways'),
        otherwise: yup.string(),
      }),
      fromName: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Email',
        then: yup.string().required('From name is required for Email gateways'),
        otherwise: yup.string(),
      }),
      fromAddress: yup.string().when('gateway_type', {
        is: (val: string) => val.toLowerCase() === 'email',
        then: yup
          .string()
          .email('Invalid email address')
          .required('From address is required for email gateways'),
        otherwise: yup.string().email('Invalid email address'),
      }),
      apikey: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Stripe',
        then: yup.string().required('Api Key is required for Stripe gateways'),
        otherwise: yup.string(),
      }),

      cliendid: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Paypal',
        then: yup
          .string()
          .required('Cliend Id is required for Paypal gateways'),
        otherwise: yup.string(),
      }),
      security: yup.string().when('gateway_type', {
        is: (val: string) => val === 'Paypal',
        then: yup.string().required('Security is required for Paypal gateways'),
        otherwise: yup.string(),
      }),
    })
    .required()

  const [errors, setErrors] = useState<FormErrors>({})
  const mutation = GatewaySettingAdd()
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

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
      email,
    }

    const gatewayItem: GatewayItem = {
      id: 0,
      gateway_name: formData.gateway_name,
      gateway_type: formData.gateway_type.toLowerCase(),
      is_active: true,
      credential: credentials,
    }

    setErrors({}) // Clear existing errors before validation

    try {
      await validationSchema.validate(formData, { abortEarly: false })

      mutation.mutate({ updatedData: gatewayItem })

      setNotification({
        title: 'Add Successful',
        icon: Icons.CHECKCIRCLE,
        type: NotificationTypes.SUCCESS,
      })
      Toast()

      setTimeout(() => {
        handleSlider()
      }, 200)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: any = {}

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message
          }
        })

        setErrors(validationErrors)
        console.error('Validation Errors:', validationErrors)
      }
    }
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

  return (
    <form className="validate-form">
      <div className="intro-y box px-5 py-5">
        <div className="mb-3  grid grid-cols-1 max-lg:gap-2 md:grid-cols-2  lg:gap-7">
          <InputElement
            label={`${t('Gateway Name')}`}
            name="gateway_name"
            id="gateway_name"
            onChange={HandleChanges}
            error={errors.gateway_name}
            placeholder="Gateway Name"
            required
          />
          <SelectElement
            label={`${t('Gateway Type')}`}
            options={Prefixtype}
            name="gateway_type"
            id="gateway_type"
            error={errors.gateway_type as FieldError | undefined}
            onChange={handleSelectChange}
            required
          />
        </div>
      </div>
      {selectedValue === 'Email' ? (
        <>
          <div className="intro-y box mb-5 mt-6  px-5 py-5">
            <div className=" flex flex-col  border-slate-200/100 text-base font-medium dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">
                {`${t('Email Settings')}`}
              </h2>
              <div className="mr-4 mt-3 flex h-px   w-full bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 py-7 max-lg:gap-2  md:grid-cols-2 lg:gap-7">
              <InputElement
                label={`${t('Mail Drive')}`}
                name="maildrive"
                type="text"
                placeholder="Mail Drive"
                id="maildrive"
                error={errors.maildrive}
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('Host')}`}
                name="host"
                type="text"
                id="host"
                placeholder="Host"
                error={errors.host}
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('Port')}`}
                name="port"
                type="text"
                placeholder="Port"
                id="port"
                error={errors.port}
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('Username')}`}
                name="username"
                type="text"
                id="username"
                placeholder="Username"
                error={errors.username}
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('Password')}`}
                name="password"
                type="password"
                id="password"
                error={errors.password}
                placeholder="Password"
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('Encryption ')}`}
                name="encryption"
                type="text"
                id="encryption"
                error={errors.encryption}
                placeholder="Encryption "
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('From Address')}`}
                name="fromAddress"
                type="email"
                id="fromAddress"
                error={errors.fromAddress}
                placeholder="From Address"
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('From Name')}`}
                name="fromName"
                type="text"
                id="fromName"
                error={errors.fromName}
                placeholder="From Name"
                onChange={HandleChanges}
              />
            </div>
          </div>
          <div className="item-center flex justify-center py-3">
            <Button
              variant="secondary"
              className="mx-auto mb-5 w-fit bg-[#EDF2F6] px-10"
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
            <>
              <div className="intro-y box mb-5">
                <div className=" flex flex-col px-5 py-5 text-base  font-medium ">
                  <h2 className=" mr-auto text-base font-medium">
                    {`${t('Send Test Email')}`}
                  </h2>
                </div>
                <Separator />
                <div className="  grid grid-cols-1  gap-7 px-5 py-5 md:grid-cols-2">
                  <InputElement
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Send Test Email"
                    onChange={(e) => {
                      setemil(e.target.value)
                    }}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className=" mb-3 mr-1 mt-1 w-24 "
                    onClick={(e: { preventDefault: () => void }) => {
                      e.preventDefault()
                      TestEmailsend()
                    }}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      ) : selectedValue === 'Paypal' ? (
        <>
          <div className="intro-y box mb-5   mt-6 px-5 py-5">
            <div className="flex flex-col  border-slate-200/100 text-base font-medium dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">
                {`${t(' Paypal Settings')}`}
              </h2>
              <div className="mr-4 mt-3 flex h-px   w-full bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 py-7  max-lg:gap-2  md:grid-cols-2 lg:gap-7 ">
              <InputElement
                label={`${t('Cliend ID')}`}
                name="cliendid"
                type="text"
                id="cliendid"
                error={errors.cliendid}
                placeholder="Cliend ID"
                onChange={HandleChanges}
              />
              <InputElement
                label={`${t('Security')}`}
                name="security"
                type="text"
                id="security"
                error={errors.security}
                placeholder="Security"
                onChange={HandleChanges}
              />
            </div>
          </div>
        </>
      ) : selectedValue === 'Stripe' ? (
        <>
          <div className="intro-y box mb-5 mt-6   px-5 py-5">
            <div className=" flex flex-col  border-slate-200/100 text-base font-medium dark:border-darkmode-400">
              <h2 className=" mr-auto text-base font-medium">
                {`${t('Stripe Settings')}`}
              </h2>
              <div className="mr-4 mt-3 flex h-px   w-full bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 gap-7  py-7 md:grid-cols-2 ">
              <InputElement
                label={`${t('Api Key')}`}
                name="apikey"
                type="text"
                id="apikey"
                placeholder="Api Key"
                error={errors.apikey}
                onChange={HandleChanges}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className=" mt-5 flex justify-end gap-1">
        <Button
          // variant="secondary"
          className="mb-2 mr-1 w-24 bg-[#EDF2F6]"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            handleSlider()
          }}
        >
          {`${t('common.button.cancel')}`}
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="mb-2 mr-1 w-24"
          onClick={HandleSubmit}
        >
          {`${t('Add')}`}
          {isLoading ? (
            <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
          ) : (
            ''
          )}
        </Button>
      </div>
    </form>
  )
}

export default AddGatewaySetting
