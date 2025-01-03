/* eslint-disable react/no-array-index-key */
/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  SelectElement,
  TextareaElement,
  InputElement,
  DateElement,
} from '../../common/form-elements'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import { AlignmentTypes } from '../../../constants/common-enums'
import Lucide from '../../common/lucide'

function Payment() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [date, setDate] = useState('')
  const [payment_method, setMethod] = useState([
    { id: 0, name: ' Method' },
    { id: 2, name: 'Cash' },
    { id: 3, name: 'Card' },
  ])
  const cardOptions = [
    { id: 0, name: 'Cash' },
    { id: 1, name: 'Card' },
    { id: 2, name: 'Cheque' },
    { id: 3, name: 'Bank Transfer' },
    { id: 4, name: 'Other Payments' },
    { id: 5, name: 'Custom Payment' },
  ]
  const { t } = useTranslation('pos')
  const schema = yup
    .object({
      amount: yup
        .string()
        .required(`${t('paymentButtonForm.fields.amount.validationMessage')}`),
      payment_method: yup
        .string()
        .required(
          `${t('paymentButtonForm.fields.paymentMethod.validationMessage')}`
        ),
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

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

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (Object.keys(errors).length > 0) {
      // Set validation errors if any
      setNotification({
        title: '',
        message: 'Please fill all required fields.',
        icon: Icons.XCIRCLE,
        type: NotificationTypes.ERROR,
      })
    } else {
    }
  }
  const [inputList, setInputList] = useState([
    { paymentAmount: '', value: '' },
  ])

  const addComponent = () => {
    setInputList([...inputList, { paymentAmount: '', value: '' }])
  }

  const removeComponent = (index: number) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }
  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <div className="intro-y box mb-5 w-2/3 bg-primary px-5 py-8 text-white">
          <div className="mt- intro-y flex flex-col items-center sm:flex-row ">
            <div className="mb-2 mr-auto font-medium">
              <div className=" font-medium">Total Items</div>
              <strong style={{ fontSize: '20px' }}> 1,000,000</strong>
            </div>
            <div className="mx-4 h-16 w-px border border-r border-slate-300 dark:border-darkmode-400 xl:mx-4" />
            <div className="mb-2 mr-auto font-medium">
              <div className="font-medium ">Total Payable</div>
              <strong style={{ fontSize: '20px' }}>Rs: 230,000.00</strong>
            </div>

            <div className="mx-4 h-16 w-px border border-r border-slate-300 dark:border-darkmode-400 xl:mx-4" />
            <div className="mb-2 mr-auto font-medium">
              <div className=" font-medium">Total Paying</div>
              <strong style={{ fontSize: '20px' }}>RS:89,000.00</strong>
            </div>
          </div>
        </div>
        <div className="intro-y box mb-5 ml-5 w-1/3 bg-pending px-5 py-8 text-white">
          <div className="mt- intro-y flex flex-col items-center sm:flex-row">
            <div className="mb-2 mr-auto font-medium">
              <div className=" font-medium">Change Return</div>
              <strong style={{ fontSize: '20px' }}>Rs:100,000</strong>
            </div>
            <div className="mx-4 h-16 w-px border border-r border-slate-300 dark:border-darkmode-400 xl:mx-4" />
            <div className="mb-2 mr-auto font-medium">
              <div className=" font-medium">Balance</div>
              <strong style={{ fontSize: '20px' }}>Rs:2,000.00</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-y box mb-5 px-5 py-3 ">
        <div className="mt- intro-y flex flex-col items-center sm:flex-row">
          <div className="mr-auto  font-medium">
            <div className=" font-medium">
              {`${t('paymentButtonForm.fields.advanceBalance.label')}`} :
              {' Rs : 10.00 '}
            </div>
          </div>

          <div className="flex w-full sm:mt-0 sm:w-auto">
            <div className=" font-medium">
              {`${t('paymentButtonForm.fields.exchangeBalance.label')}`} :
              {' Rs : 10.00 '}
              <Button variant="primary" size="sm" className="ml-2 mr-1 w-20">
                {`${t('common.button.addToBill')}`}
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
        </div>
      </div>

      <div className="intro-y box mb-5 px-5 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputElement
            label={`${t('paymentButtonForm.fields.amount.label')}`}
            required
            register={register}
            name="amount"
            id="amount"
            error={errors.amount}
            iconLeft={Icons.DOLLARSIGN}
          />

          <SelectElement
            label={`${t('paymentButtonForm.fields.paymentMethod.label')}`}
            required
            register={register}
            options={payment_method}
            name="payment_method"
            id="payment_method"
            error={errors.payment_method}
          />
          <InputElement
            label={`${t('paymentButtonForm.fields.paymentAccount.label')}`}
            register={register}
            name="payment_amount"
            id="payment_amount"
            error={errors.payment_amount}
            iconLeft={Icons.DOLLARSIGN}
            placeholder={`${t(
              'paymentButtonForm.fields.paymentAccountTwo.placeolder'
            )}`}
          />

          <div className=" font-medium">
            <TextareaElement
              label={`${t('paymentButtonForm.fields.paymentNotes.label')}`}
              register={register}
              name="paymentNotes"
              id="paymentNotes"
            />
          </div>
        </div>
      </div>

      <div className="intro-y box mb-5 px-5 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <InputElement
            label={`${t('paymentButtonForm.fields.paymentAmount.label')}`}
            placeholder={`${t(
              'paymentButtonForm.fields.paymentAmount.placeolder'
            )}`}
            register={register}
            name="paymentAmount"
            id="paymentAmount"
            required
            error={errors.payment_method}
            iconLeft={Icons.DOLLARSIGN}
          />
          <SelectElement
            label={`${t('paymentButtonForm.fields.paymentMethodTwo.label')}`}
            register={register}
            options={cardOptions}
            name="paymentMethodTwo"
            id="paymentMethodTwo"
            required
            error={errors.payment_method}
          />
          <InputElement
            label={`${t('paymentButtonForm.fields.paymentAccountTwo.label')}`}
            iconLeft={Icons.DOLLARSIGN}
            register={register}
            name="paymentAccountTwo"
            id="paymentAccountTwo"
            placeholder={`${t(
              'paymentButtonForm.fields.paymentAccountTwo.placeolder'
            )}`}
          />
          <InputElement
            label={`${t('paymentButtonForm.fields.cardNumber.label')}`}
            register={register}
            name="cardNumber"
            id="cardNumber"
            type="number"
          />

          <InputElement
            label={`${t('paymentButtonForm.fields.cardHolderName.label')}`}
            register={register}
            name="cardHolderName"
            id="cardHolderName"
          />
          <InputElement
            label={`${t('paymentButtonForm.fields.cardTransactionNo.label')}`}
            register={register}
            name="cardTransactionNo"
            id="cardTransactionNo"
            type="number"
          />
          <SelectElement
            label={`${t('paymentButtonForm.fields.cardType.label')}`}
            register={register}
            name="cardType"
            id="cardType"
          />
          <DateElement
            label={`${t('paymentButtonForm.fields.period.label')}`}
            value={date}
            onChange={setDate}
            options={{
              autoApply: false,
              showWeekNumbers: true,

              dropdowns: {
                minYear: 2020,
                maxYear: 2100,
                months: true,
                years: true,
                date: false,
              },
            }}
            name="period"
            id="period"
          />
          <InputElement
            label={`${t('paymentButtonForm.fields.securityCode.label')}`}
            register={register}
            name="securityCode"
            id="securityCode"
          />
          <SelectElement
            label={`${t('paymentButtonForm.fields.paymentFee.label')}`}
            register={register}
            name="paymentFee"
            id="paymentFee"
          />

          <TextareaElement
            label={`${t('paymentButtonForm.fields.paymentNotes.label')}`}
            register={register}
            name="paymentNotes"
            id="paymentNotes"
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          variant="outline-primary"
          className="md:w-fix mb-5 w-full  border-dashed px-8"
          onClick={addComponent}
        >
          <Lucide icon="Plus" className="mr-2 h-4 w-4" />{' '}
          {t('common.button.addPayment')}
        </Button>
      </div>
      {inputList.map((x, i) => {
         return (
      <div  key={i} className="intro-y box mb-5 py-2 px-5">
        <Lucide icon="X" className="absolute top-0 right-0 mt-3 mr-3 w-6 h-6 text-slate-400" onClick={() => removeComponent(i)}/>
        <div className="py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InputElement
            label={`${t('paymentButtonForm.fields.paymentAmount.label')}`}
            placeholder={`${t(
              'paymentButtonForm.fields.paymentAmount.placeolder'
            )}`}
            register={register}
            name="paymentAmount"
            id="paymentAmount"
            required
            error={errors.payment_method}
            iconLeft={Icons.DOLLARSIGN}
          />
          <SelectElement
            label={`${t('paymentButtonForm.fields.paymentMethodTwo.label')}`}
            register={register}
            options={cardOptions}
            name="paymentMethodTwo"
            id="paymentMethodTwo"
            required
            error={errors.payment_method}
          />
          <TextareaElement
            label={`${t('paymentButtonForm.fields.paymentNotes.label')}`}
            register={register}
            name="paymentNotes"
            id="paymentNotes"
          />
        </div>
        </div>
      </div>
         )
       })}
      <div className="intro-y box p-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className=" font-medium">
            <TextareaElement
              label={`${t('paymentButtonForm.fields.sellNotes.label')}`}
              register={register}
              name="sellNotes"
              id="sellNotes"
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>

          <div className=" font-medium">
            <TextareaElement
              label={`${t('paymentButtonForm.fields.staffNotes.label')}`}
              register={register}
              name="staffNotes"
              id="staffNotes"
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button type="submit" variant="primary" className="mb-2 mr-1 w-36">
          {`${t('common.button.finalizedPayment')}`}
          {isLoading ? (
            <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
          ) : (
            ''
          )}
        </Button>
        <Button type="submit" variant="warning" className="mb-2 mr-1 w-36">
          {`${t('common.button.resetPayment')}`}
          {isLoading ? (
            <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
          ) : (
            ''
          )}
        </Button>
        <Button
          variant="secondary"
          className="mb-2 mr-1 w-24"
          onClick={handleSlider}
        >
          {`${t('common.button.cancel')}`}
        </Button>
      </div>
    </form>
  )
}

export default Payment
