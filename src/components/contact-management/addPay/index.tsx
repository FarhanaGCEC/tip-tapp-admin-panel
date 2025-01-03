/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import { SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  SelectElement,
  TextareaElement,
  DateElement,
  InputElement,
} from '../../common/form-elements'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import UploadFilesElement from '../../common/form-elements/upload-files-element'

function AddPay() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      amount: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.suppliers.fields.addPay.fields.amount.validationMessage'
          )}`
        ),
      date_of_birth: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.suppliers.fields.addPay.fields.paidOn.validationMessage'
          )}`
        ),
      paymentMethod: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.suppliers.fields.addPay.fields.paymentMethod.validationMessage'
          )}`
        ),
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

  const successHandlerCreateTax = (tax: any, message: string) => {
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

  const createTax = async (tax: any) => {
    setIsLoading(true)
    const res = await posApi.createShipping(tax)
    if (res) {
      const { data } = res
      const { message, data: tax } = data
      successHandlerCreateTax(tax, message)
    } else {
      errorHandler(null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createTax(data)
  }
  //   const { t } = useTranslation('pos')
  const [selectedOption, setSelectedOption] = useState('')
  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedOption(event.target.value)
  }
  const [date, setDate] = useState('')
  const options = [
    { id: 0, name: 'Cash' },
    { id: 1, name: 'Card' },
    { id: 2, name: 'Cheque' },
    { id: 3, name: 'Bank Transfer' },
    { id: 4, name: 'Other Payments' },
    { id: 5, name: 'Customer Payment' },
  ]
  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box p-5">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <SelectElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.amount.label'
            )}`}
            register={register}
            name="amount"
            id="amount"
            required
            error={errors.amount}
          />
          <DateElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.paidOn.label'
            )}`}
            value={date}
            onChange={setDate}
            options={{
              autoApply: false,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }}
            name="date_of_birth"
            id="date_of_birth"
            error={errors.date_of_birth}
            required
          />
          <SelectElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.paymentMethod.label'
            )}`}
            register={register}
            options={options}
            name="paymentMethod"
            id="paymentMethod"
            required
            error={errors.paymentMethod}
          />
          <UploadFilesElement
            id="attach_document"
            name="attach_document"
            register={register}
            label={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.attachDocument.label'
            )}`}
            variant="primary"
            btnLabel={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.attachDocument.placeolder'
            )}`}
            error={errors.attach_document}
            info={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.attachDocument.tooltip'
            )}`}
          />
          {selectedOption === 'Card' && (
            <>
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardNumber.label'
                )}`}
                register={register}
                name="cardNumber"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardNumber.placeolder'
                )}`}
                id="cardNumber"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardHolderName.label'
                )}`}
                register={register}
                name="cardHolderName"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardHolderName.placeolder'
                )}`}
                id="cardHolderName"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardTransactionNo.label'
                )}`}
                register={register}
                name="cardTransactionNo"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardTransactionNo.placeolder'
                )}`}
                id="cardTransactionNo"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardType.label'
                )}`}
                register={register}
                name="cardType"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.cardType.placeolder'
                )}`}
                id="cardType"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.month.label'
                )}`}
                register={register}
                name="month"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.month.placeolder'
                )}`}
                id="month"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.year.label'
                )}`}
                register={register}
                name="year"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.year.placeolder'
                )}`}
                id="year"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.securityCode.label'
                )}`}
                register={register}
                name="securityCode"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.addPay.fields.securityCode.placeolder'
                )}`}
                id="securityCode"
              />
            </>
          )}
          {selectedOption === 'Bank Transfer' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.addPay.fields.bankTransfer.label'
              )}`}
              register={register}
              name="bankTransfer"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.addPay.fields.bankTransfer.placeolder'
              )}`}
              id="bankTransfer"
            />
          )}
           {selectedOption === 'Other Payments' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.addPay.fields.transactionNo.label'
              )}`}
              register={register}
              name="transactionNo"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.addPay.fields.transactionNo.placeolder'
              )}`}
              id="transactionNo"
            />
          )}
          {selectedOption === 'Cheque' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.addPay.fields.chequeNo.label'
              )}`}
              register={register}
              name="chequeNo"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.addPay.fields.chequeNo.placeolder'
              )}`}
              id="chequeNo"
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-7 py-7 md:grid-cols-2">
          <TextareaElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.paymentNotes.label'
            )}`}
            register={register}
            name="paymentNotes"
            id="paymentNotes"
            placeholder={`${t(
              'contactManagement.fields.suppliers.fields.addPay.fields.paymentNotes.placeolder'
            )}`}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.update')}`}
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
      </div>
    </form>
  )
}

export default AddPay
