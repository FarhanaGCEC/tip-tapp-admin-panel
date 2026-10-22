/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable object-shorthand */
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
import { PosApi } from '../../api'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import Toast from '../../utils/notification'
import Button from '../../components/common/button'
import LoadingIcon from '../../components/common/loading-icon'
import Lucide from '../../components/common/lucide'
import InputElement from '../../components/common/form-elements/input-element-secondary'
import SelectElement from '../../components/common/form-elements/select-element-secondary'
import {
  TipSettingGet,
  TipSettingUpdate,
} from '../../api/gateway-setting-management/gateway-and-tip-setting-management'
import { UseQueryResult, useQueryClient } from 'react-query'
import {
  FormDataTipSetting,
  TipWithdrawalLimit,
  TippingLimit,
} from '../../types/gatewaytype'
import Separator from '../../components/common/separator/separator'

interface FormData {
  minimumAmounttippingLimit: number
  maximumAmounttippingLimit: number
  currency: string
  tipCommission: number
  minimumAmountWithdrawalLimit: number
  maximumAmountWithdrawalLimit: number
}
interface FormErrors {
  minimumAmounttippingLimit?: number
  maximumAmounttippingLimit?: number
  currency?: string
  tipCommission?: number
  minimumAmountWithdrawalLimit?: number
  maximumAmountWithdrawalLimit?: number
}
const schema = yup.object().shape({
  prefix: yup.string().required('Prefix is required'),
  firstName: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
})

function TipSetting() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: 'onChange',
  //   resolver: yupResolver(schema),
  // })

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

  const [Prefixtype] = useState([
    { id: 0, name: 'Please Select' },
    { id: 1, name: 'EUR' },
    { id: 2, name: 'GBP' },
    { id: 3, name: 'USD' },
    { id: 4, name: 'AED' },
  ])

  const [allLocationsChecked, setAllLocationsChecked] = useState(false)
  const [bunnyOutletChecked, setBunnyOutletChecked] = useState(false)
  const [testChecked, setTestChecked] = useState(false)

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo)
  }

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

  const {
    data,
    isSuccess,
    isError,
    error,
    refetch,
  }: UseQueryResult<FormDataTipSetting> = TipSettingGet()

  const [formData, setFormData] = useState<FormData>({
    minimumAmounttippingLimit: 0,
    maximumAmounttippingLimit: 0,
    currency: '',
    tipCommission: 0,
    minimumAmountWithdrawalLimit: 0,
    maximumAmountWithdrawalLimit: 0,
  })
  const [initialFormData, setInitialFormData] = useState<FormData>({
    minimumAmounttippingLimit: 0,
    maximumAmounttippingLimit: 0,
    currency: '',
    tipCommission: 0,
    minimumAmountWithdrawalLimit: 0,
    maximumAmountWithdrawalLimit: 0,
  })

  const rectivedata = () => {
    if (isSuccess && data) {
      const fetchedData = {
        minimumAmounttippingLimit: data?.tippingLimit.minimumAmount || 0,
        maximumAmounttippingLimit: data?.tippingLimit.maximumAmount || 0,
        tipCommission: data?.tipCommission || 0,
        currency: data?.currency || '',
        minimumAmountWithdrawalLimit:
          data?.tipWithdrawalLimit.minimumAmount || 0,
        maximumAmountWithdrawalLimit:
          data?.tipWithdrawalLimit.maximumAmount || 0,
      }
      setErrors({})
      // Set both the initial and form data
      setFormData(fetchedData)
      setInitialFormData(fetchedData)
    }
  }

  useEffect(() => {
    rectivedata()
  }, [isSuccess, data])

  const handleChangess = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    const numericValue = value.replace(/,/g, '')
    setFormData((prevData) => ({ ...prevData, [name]: numericValue }))
  }

  const validationSchema = yup
    .object({
      minimumAmounttippingLimit: yup
        .number()
        .typeError('Minimum amount for tipping limit is required')
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .required('Minimum amount for tipping limit is required')
        .min(0, 'Minimum amount cannot be less than 0'),

      maximumAmounttippingLimit: yup
        .number()
        .typeError('Maximum amount for tipping limit is required')
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .required('Maximum amount for tipping limit is required')
        .min(
          yup.ref('minimumAmounttippingLimit'),
          'Maximum amount should be greater than or equal to minimum amount'
        ),

      currency: yup.string().required('Currency is required'),

      tipCommission: yup
        .number()
        .typeError('Tip commission is required')
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .required('Tip commission is required')
        .min(0, 'Commission cannot be negative')
        .max(100, 'Commission cannot exceed 100'),

      minimumAmountWithdrawalLimit: yup
        .number()
        .typeError('Minimum amount for withdrawal limit is required')
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .required('Minimum amount for withdrawal limit is required')
        .min(0, 'Minimum amount cannot be less than 0'),

      maximumAmountWithdrawalLimit: yup
        .number()
        .typeError('Maximum amount for withdrawal limit is required')
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .required('Maximum amount for withdrawal limit is required')
        .min(
          yup.ref('minimumAmountWithdrawalLimit'),
          'Maximum amount should be greater than or equal to minimum amount'
        ),
    })
    .required()

  const [errors, setErrors] = useState<FormErrors>({})
  const mutation = TipSettingUpdate()
  const queryClient = useQueryClient()

  const HandleSubmitd = async (e: React.FormEvent) => {
    e.preventDefault()

    let ChnageMassage = ''

    if (formData.tipCommission !== initialFormData.tipCommission) {
      ChnageMassage = `Commission limits  ${initialFormData.tipCommission} to ${formData.tipCommission} changed `
    }
    if (formData.currency !== initialFormData.currency) {
      ChnageMassage = `Currency  ${initialFormData.currency} to ${formData.currency} changed `
    }

    if (
      formData.minimumAmountWithdrawalLimit !==
      initialFormData.minimumAmountWithdrawalLimit
    ) {
      ChnageMassage = `Withdrawal minimum limits  changed ${initialFormData.minimumAmountWithdrawalLimit} to ${formData.minimumAmountWithdrawalLimit} `
    }

    if (
      formData.maximumAmountWithdrawalLimit !==
      initialFormData.maximumAmountWithdrawalLimit
    ) {
      ChnageMassage = `Withdrawal  maximum  limits  changed ${initialFormData.maximumAmountWithdrawalLimit} to ${formData.maximumAmountWithdrawalLimit}`
    }

    if (
      formData.maximumAmountWithdrawalLimit !==
        initialFormData.maximumAmountWithdrawalLimit &&
      formData.minimumAmountWithdrawalLimit !==
        initialFormData.minimumAmountWithdrawalLimit
    ) {
      ChnageMassage = `Withdrawal minimum  limits  changed ${initialFormData.minimumAmountWithdrawalLimit} to ${formData.minimumAmountWithdrawalLimit}  and maximum  limits  changed  ${initialFormData.maximumAmountWithdrawalLimit} to ${formData.maximumAmountWithdrawalLimit}  `
    }
    if (
      formData.minimumAmounttippingLimit !==
      initialFormData.minimumAmounttippingLimit
    ) {
      ChnageMassage = `Tipping minimum limits  changed ${initialFormData.minimumAmounttippingLimit} to ${formData.minimumAmounttippingLimit} `
    }
    if (
      formData.maximumAmounttippingLimit !==
      initialFormData.maximumAmounttippingLimit
    ) {
      ChnageMassage = `Tipping maximum limits  changed ${initialFormData.maximumAmounttippingLimit} to ${formData.maximumAmounttippingLimit} `
    }
    if (
      formData.minimumAmounttippingLimit !==
        initialFormData.minimumAmounttippingLimit &&
      formData.maximumAmounttippingLimit !==
        initialFormData.maximumAmounttippingLimit
    ) {
      ChnageMassage = `Tipping minimum  limits  changed ${initialFormData.minimumAmounttippingLimit} to ${formData.minimumAmounttippingLimit}  and maximum  limits  changed  ${initialFormData.maximumAmounttippingLimit} to ${formData.maximumAmounttippingLimit}  `
    }

    const tipWithdrawalLimit: TipWithdrawalLimit = {
      minimumAmount: Number(formData.minimumAmountWithdrawalLimit),
      maximumAmount: Number(formData.maximumAmountWithdrawalLimit),
    }

    const tippingLimit: TippingLimit = {
      minimumAmount: Number(formData.minimumAmounttippingLimit),
      maximumAmount: Number(formData.maximumAmounttippingLimit),
    }

    const gatewayItemdd: FormDataTipSetting = {
      tipCommission: Number(formData.tipCommission),
      currency: formData.currency,
      tipWithdrawalLimit: tipWithdrawalLimit,
      tippingLimit: tippingLimit,
    }

    setErrors({})

    try {
      await validationSchema.validate(formData, { abortEarly: false })

      mutation.mutate(
        {
          updatedData: gatewayItemdd,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['get_tip_setting']), refetch()
            setNotification({
              title: 'Update Sucessfull',
              message: ChnageMassage,
              icon: Icons.CHECKCIRCLE,
              type: NotificationTypes.SUCCESS,
            })
            Toast()
          },
          onError: (error: any) => {
            console.error('Error updating tip settings:', error)
          },
        }
      )
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

  return (
    <form className="validate-form lg:ml-32 lg:mr-32">
      <div className="mb-4 mt-8 flex  flex-col">
        <h2 className="mb-4 mr-auto text-base font-medium">
          Fleet Settings
        </h2>
      </div>
      <div className="intro-y box ">
        <div className=" flex flex-col  px-5 py-3 ">
          <h2 className=" mr-auto text-base font-medium">{`${t(
            'Platform Commission'
          )}`}</h2>
        </div>

        <Separator />
        <div className="mb-3  grid grid-cols-1 px-5  py-5  max-lg:gap-2 md:grid-cols-2 lg:gap-7">
          <div className=" mb-5">
            <InputElement
              label="Platform Commission"
              name="tipCommission"
              id="tipCommission"
              error={
                typeof errors.tipCommission === 'number'
                  ? String(errors.tipCommission)
                  : errors.tipCommission
              }
              value={formData.tipCommission}
              placeholder="Platform Commission"
              required
              onChange={handleChangess}
            />
          </div>
          <div>
            <SelectElement
              label="Currency"
              options={Prefixtype}
              name="currency"
              id="currency"
              value={formData.currency}
              onChange={handleChangess}
              disabled={true}
            />
          </div>
        </div>
      </div>

      <div className="intro-y box mt-7 ">
        <div className=" flex flex-col  px-5 py-3 ">
          <h2 className=" mr-auto text-base font-medium">
            Driver Payout Limit
          </h2>
        </div>
        {/* <div className="  border-t border-[#C7C7C7]"></div> */}
        <Separator />
        <div className="mb-3  grid grid-cols-1 px-8 py-8 max-lg:gap-2 md:grid-cols-2 lg:gap-7">
          <div className=" mb-5">
            <InputElement
              label="Minimum Amount"
              error={
                typeof errors.minimumAmountWithdrawalLimit === 'number'
                  ? String(errors.minimumAmountWithdrawalLimit)
                  : errors.minimumAmountWithdrawalLimit
              }
              name="minimumAmountWithdrawalLimit"
              id="minimumAmountWithdrawalLimit"
              placeholder="Minimum Amount"
              value={formData.minimumAmountWithdrawalLimit.toLocaleString()}
              onChange={handleChangess}
              required
            />
          </div>
          <div>
            <InputElement
              label="Maximum Amount"
              error={
                typeof errors.maximumAmountWithdrawalLimit === 'number'
                  ? String(errors.maximumAmountWithdrawalLimit)
                  : errors.maximumAmountWithdrawalLimit
              }
              name="maximumAmountWithdrawalLimit"
              id="maximumAmountWithdrawalLimit"
              placeholder="Maximum Amount"
              value={formData.maximumAmountWithdrawalLimit.toLocaleString()}
              onChange={handleChangess}
              required
            />
          </div>
        </div>
      </div>

      <div className="intro-y box mt-7 ">
        <div className=" flex flex-col  px-5 py-3 text-base font-medium dark:border-darkmode-400">
          <h2 className=" mr-auto text-base font-medium">{`${t(
            'Daily Rent Limit'
          )}`}</h2>
        </div>
        {/* <div className="  border-t border-[#C7C7C7]"></div> */}
        <Separator />

        <div className="  grid grid-cols-1 px-8 py-8  max-lg:gap-2 md:grid-cols-2 lg:gap-7">
          <div className=" mb-5">
            <InputElement
              label="Minimum Amount"
              placeholder="Minimum Amount"
              error={
                typeof errors.minimumAmounttippingLimit === 'number'
                  ? String(errors.minimumAmounttippingLimit)
                  : errors.minimumAmounttippingLimit
              }
              name="minimumAmounttippingLimit"
              id="minimumAmounttippingLimit"
              value={formData.minimumAmounttippingLimit.toLocaleString()}
              onChange={handleChangess}
              required
            />
          </div>{' '}
          <div>
            <InputElement
              label="Maximum Amount"
              placeholder="Maximum Amount"
              error={
                typeof errors.maximumAmounttippingLimit === 'number'
                  ? String(errors.maximumAmounttippingLimit)
                  : errors.maximumAmounttippingLimit
              }
              name="maximumAmounttippingLimit"
              id="maximumAmounttippingLimit"
              value={formData.maximumAmounttippingLimit.toLocaleString()}
              onChange={handleChangess}
              required
            />
          </div>
        </div>
      </div>

      <div className=" mt-8 flex justify-end gap-4">
        <Button
          type="submit"
          className="mb-2 mr-1 w-24 bg-[#e0e0e4]"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            rectivedata()
          }}
        >
          Cancel
        </Button>
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
      </div>
    </form>
  )
}

export default TipSetting
