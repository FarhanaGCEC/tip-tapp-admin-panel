/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
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
// import { Tab,Menu } from '../../../common/headless'
import Lucide from '../../../common/lucide'
import UserAvatar from '../../../common/user-avatar'
import { Tab } from '../../../common/headless'
import { UseQueryResult } from 'react-query'
import {
  useDeactiveUserAndActive,
  useGetUserById,
} from '../../../../api/tp-and-sp-management/tp-sp-management'
import { TipItem, OnboardingStatus } from '../../../../types/tpandsptype'
import Separator from '../../../common/separator/separator'
import permissionChecker from '../../../../hooks/permissonChecker'
import { useCurrencyStore } from '../../../../stores/currencyStore'
import { formatMoney, getAmountValue } from '../../../../utils/formatMoney'
import { maskAccountNumber } from '../../../../utils/escapeHtml'
import dayjs from 'dayjs'

interface ViewUserProps {
  userId: string
}

const ONBOARDING_STATUS_BADGE: Record<
  OnboardingStatus,
  { pillClass: string; text: string; icon: string }
> = {
  completed: {
    pillClass: 'bg-emerald-100 text-emerald-800',
    text: 'Completed',
    icon: '✅',
  },
  incomplete: {
    pillClass: 'bg-amber-100 text-amber-800',
    text: 'Incomplete',
    icon: '⏳',
  },
  not_started: {
    pillClass: 'bg-red-100 text-red-800',
    text: 'Not started',
    icon: '❌',
  },
}

function ViewTpandSp(props: ViewUserProps) {
  const posApi = PosApi.useAPI()
  const currency = useCurrencyStore((state) => state.currency)
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<TipItem> = useGetUserById(props.userId)
  const { mutate: deactivateActivateUser, isLoading: isUpdatingStatus } =
    useDeactiveUserAndActive()
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

  // const { handleSlider, slideOverPreview } = SharedDataContainer.useContainer()

  const DeactiveAndActivehandle = (userid: string, typesatus: string) => {
    deactivateActivateUser(
      { userid, satustype: typesatus },
      {
        onSuccess: (data) => {
          const action = typesatus === 'active' ? 'deactivated' : 'activated'
          setNotification({
            title: 'Success',
            message: `User ${action} successfully`,
            icon: Icons.CHECKCIRCLE,
            type: NotificationTypes.SUCCESS,
          })
          Toast()
          refetch() // Refresh user data
        },
        onError: (error: any) => {
          setNotification({
            title: 'Error',
            message:
              error?.response?.data?.message || 'Failed to update user status',
            icon: Icons.XCIRCLE,
            type: NotificationTypes.ERROR,
          })
          Toast()
        },
      }
    )
  }

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const toggleExpanded: () => void = () => {
    setIsExpanded(!isExpanded)
  }

  const bio = isSuccess && data?.Bio ? data.Bio : 'Not Provided Yet'

  const truncatedBio =
    bio !== 'Not Provided Yet' && !isExpanded && bio.length > 20
      ? `${bio.substring(0, 20)  }...`
      : bio

  const walletBalance =
    data?.financials?.balance ?? {
      amount: data?.BalanceOriginal ?? data?.balance,
      amountAED: data?.balanceAED,
    }

  const tipsReceived =
    data?.financials?.totalTips ?? {
      amount: data?.TotalTipsOriginal ?? data?.TotalTips,
      amountAED: data?.TotalTipsAED,
    }

  const transferredAmount =
    data?.financials?.totalWithdrawal ?? {
      amount: data?.TotalWithdrawalOriginal ?? data?.TotalWithdrawal,
      amountAED: data?.TotalWithdrawalAED,
    }

  const tipsSentTotal =
    data?.financials?.totalTipsGiven ?? {
      amount: data?.TotalTipsGivenOriginal ?? data?.TotalTipsGiven,
      amountAED: data?.TotalTipsGivenAED,
    }

  const tipsSentFromWallet =
    data?.financials?.tipsGivenFromWallet ?? { amount: 0, amountAED: 0 }

  const tipsSentFromCard =
    data?.financials?.tipsGivenFromCard ?? { amount: 0, amountAED: 0 }

  const pendingStripeFees =
    data?.financials?.pendingStripeFees ?? {
      amount: Number(data?.PendingStripeFees) || 0,
      amountAED: 0,
    }

  const isServiceProvider = data?.Role === 'sp' || data?.Role === 'both'
  const showWalletDetails =
    data?.Role === 'tp' || data?.Role === 'sp' || data?.Role === 'both'

  const cardDetails = data?.cardDetails || {}
  const onboardingStatus: OnboardingStatus =
    cardDetails.onboardingStatus || 'not_started'
  const statusBadge =
    ONBOARDING_STATUS_BADGE[onboardingStatus] || {
      pillClass: 'bg-slate-100 text-slate-600',
      text: 'Unknown',
      icon: '?',
    }
  const payoutNotStarted = onboardingStatus === 'not_started'
  const payoutFieldValue = (value?: string | null) =>
    payoutNotStarted ? 'Not Provided Yet' : value || '—'
  const payoutsEnabled = !payoutNotStarted && Boolean(cardDetails.payoutsEnabled)

  if (isLoading) {
    return (
      <div className="flex min-h-[360px] w-full items-center justify-center rounded-lg bg-white">
        <LoadingIcon icon="oval" className="h-8 w-8" color="#1A2744" />
      </div>
    )
  }

  if (isError || !data) {
    const apiError = error as {
      userMessage?: string
      response?: { status?: number }
    }
    return (
      <div className="rounded-lg bg-white p-8 text-center text-slate-600">
        {apiError.userMessage ||
          (apiError.response?.status === 403
            ? 'You do not have permission to view this user. Check your role permissions and validation token.'
            : 'Unable to load user details. Please try again.')}
      </div>
    )
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <Tab.Group>
        <div className="intro-y rounded-t-lg bg-white p-3 px-5 ">
          {/* Profile Section */}
          <div className="ml-3 mr-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
            {/* User Info */}
            <div className="flex items-center">
              <UserAvatar
                src={data?.ProfilePictureURL}
                alt={`${data?.FirstName || ''} ${data?.LastName || ''}`.trim() || 'User'}
                className="mr-0 h-16 w-16 max-lg:mr-4 sm:h-20 sm:w-20 md:h-[65px] md:w-[65px] lg:h-[85px] lg:w-[85px]"
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
                      disabled={isUpdatingStatus}
                      onClick={() => {
                        DeactiveAndActivehandle(
                          data?.KeyCloakID || '',
                          data?.Status || ''
                        )
                      }}
                    >
                      <span className=" text-white sm:block">
                        {isUpdatingStatus ? 'Deactivating...' : 'Deactivate'}
                      </span>
                    </Button>
                  ) : data?.Status == 'new' ? (
                    <Button
                      className=" w-40 bg-[#2F9E44] px-6 py-2"
                      disabled={isUpdatingStatus}
                      onClick={() => {
                        DeactiveAndActivehandle(
                          data?.KeyCloakID || '',
                          data?.Status || ''
                        )
                      }}
                    >
                      <span className=" text-white sm:block">
                        {isUpdatingStatus ? 'Activating...' : 'Activate'}
                      </span>
                    </Button>
                  ) : data?.Status == 'banned' ? (
                    <Button
                      className=" w-40 bg-[#2F9E44] px-6  py-2 "
                      disabled={isUpdatingStatus}
                      onClick={() => {
                        DeactiveAndActivehandle(
                          data?.KeyCloakID || '',
                          data?.Status || ''
                        )
                      }}
                    >
                      <span className=" text-white sm:block">
                        {isUpdatingStatus ? 'Activating...' : 'Activate'}
                      </span>
                    </Button>
                  ) : (
                    <Button
                      className=" w-40 bg-[#D70000] px-5 py-1"
                      disabled={isUpdatingStatus}
                      onClick={() => {
                        DeactiveAndActivehandle(
                          data?.KeyCloakID || '',
                          data?.Status || ''
                        )
                      }}
                    >
                      <span className=" text-white sm:block">
                        {isUpdatingStatus ? 'Deactivating...' : 'Deactivate'}
                      </span>
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
              <div className="text-left lg:ps-[50px]">
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
                  {data?.DateOfBirth
                    ? dayjs(data.DateOfBirth).format('DD MMM YYYY')
                    : 'Not Provided Yet'}
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

            {isServiceProvider ? (
              <>
                <div className="mb-4 mt-6 px-5">
                  <div className="flex items-center text-lg font-medium">
                    <div className="mr-4 flex h-px w-10 bg-gray-300" />
                    <span>Stripe Payout Setup</span>
                    <div className="ml-4 h-px flex-1 bg-gray-300" />
                  </div>
                </div>

                <div className="mx-5 rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm">
                  <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                        <Lucide
                          icon="CreditCard"
                          className="h-5 w-5 text-slate-600"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Onboarding Status
                        </p>
                        <span
                          className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusBadge.pillClass}`}
                        >
                          {statusBadge.icon} {statusBadge.text}
                        </span>
                      </div>
                    </div>
                    {cardDetails.onboardingStatusLabel ? (
                      <p className="text-sm leading-relaxed text-slate-500 sm:max-w-xs sm:text-right">
                        {cardDetails.onboardingStatusLabel}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-slate-100 bg-white px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Bank Name
                      </p>
                      <p
                        className={`mt-1.5 text-sm font-semibold ${
                          cardDetails.bankName && !payoutNotStarted
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }`}
                      >
                        {payoutFieldValue(cardDetails.bankName)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-white px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Account
                      </p>
                      <p
                        className={`mt-1.5 font-mono text-sm font-semibold tracking-wider ${
                          cardDetails.accountNumber && !payoutNotStarted
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }`}
                      >
                        {payoutNotStarted
                          ? 'Not Provided Yet'
                          : maskAccountNumber(cardDetails.accountNumber)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-white px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Payouts
                      </p>
                      <span
                        className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          payoutNotStarted
                            ? 'bg-slate-100 text-slate-400'
                            : payoutsEnabled
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {payoutNotStarted
                          ? 'Not Provided Yet'
                          : payoutsEnabled
                            ? 'Enabled'
                            : 'Not enabled'}
                      </span>
                    </div>
                    {cardDetails.accountHolderName ? (
                      <div className="rounded-lg border border-slate-100 bg-white px-4 py-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Account Holder
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-900">
                          {cardDetails.accountHolderName}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {showWalletDetails ? (
              <>
                <div className="mb-4 mt-6 px-5">
                  <div className="flex items-center text-lg font-medium">
                    <div className="mr-4 flex h-px w-10 bg-gray-300" />
                    <span>Wallet Details</span>
                    <div className="ml-4 h-px flex-1 bg-gray-300" />
                  </div>
                </div>

                <div className="mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <Lucide
                          icon="Wallet"
                          className="h-4 w-4 text-slate-600"
                        />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Wallet Balance
                      </p>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-slate-900">
                      {formatMoney(walletBalance, currency)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                        <Lucide
                          icon="ArrowDownLeft"
                          className="h-4 w-4 text-emerald-600"
                        />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Tips Received
                      </p>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-slate-900">
                      {formatMoney(tipsReceived, currency)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <Lucide
                          icon="Banknote"
                          className="h-4 w-4 text-slate-600"
                        />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Withdrawn
                      </p>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-slate-900">
                      {formatMoney(transferredAmount, currency)}
                    </p>
                  </div>
                </div>

                <div className="mx-5 mt-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-700">
                    Tips Given
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-slate-100 bg-white px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Lucide icon="Send" className="h-4 w-4 text-slate-500" />
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Total Given
                        </p>
                      </div>
                      <p className="mt-2 text-xl font-bold text-slate-900">
                        {formatMoney(tipsSentTotal, currency)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-white px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Lucide icon="Wallet" className="h-4 w-4 text-slate-500" />
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Via Wallet
                        </p>
                      </div>
                      <p className="mt-2 text-xl font-bold text-slate-900">
                        {formatMoney(tipsSentFromWallet, currency)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-white px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Lucide
                          icon="CreditCard"
                          className="h-4 w-4 text-slate-500"
                        />
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Via Card
                        </p>
                      </div>
                      <p className="mt-2 text-xl font-bold text-slate-900">
                        {formatMoney(tipsSentFromCard, currency)}
                      </p>
                    </div>
                  </div>
                </div>

                {(getAmountValue(pendingStripeFees, currency) ?? 0) > 0 ? (
                  <div className="mx-5 mt-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                          <Lucide
                            icon="AlertCircle"
                            className="h-4 w-4 text-amber-600"
                          />
                        </div>
                        <p className="text-sm font-medium text-slate-700">
                          Pending Stripe Fees
                        </p>
                      </div>
                      <p className="text-lg font-bold text-amber-800">
                        {formatMoney(pendingStripeFees, currency)}
                      </p>
                    </div>
                  </div>
                ) : null}
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
