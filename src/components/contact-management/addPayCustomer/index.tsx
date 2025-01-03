/* eslint-disable react/self-closing-comp */
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

function AddPayCustomer() {
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
        <div className="flex justify-between ">
          <div className="intro-y box mb-5 w-1/2 bg-secondary px-5 py-5">
            <div className="mt- intro-y flex flex-col items-center sm:flex-row">
              <div className=" mr-auto font-medium">
                <div className="font-medium">
                  Customer name:
                  <strong
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}
                  >
                    Miss Prabashi
                  </strong>
                </div>

                <div className="mb-3"></div>
              </div>
            </div>
          </div>

          <div className="intro-y box mb-5 ml-4 w-1/2 bg-secondary px-5 py-5">
            <div className="mt- intro-y flex flex-col items-center sm:flex-row">
              <div className=" mr-auto font-medium">
                <div className="flex font-medium">
                  Total Sale:
                  <strong
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}
                  >
                    Rs.75,000,000,000,000,00
                  </strong>
                </div>

                <div className="mb-3"></div>
                <div className=" flex font-medium">
                  Total Paid :{' '}
                  <strong
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}
                  >
                    Rs. 75,000.00
                  </strong>
                </div>

                <div className="mb-3"></div>
                <div className=" flex font-medium">
                  Total Sale Due :{' '}
                  <strong
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}
                  >
                    Rs. 75,000.00
                  </strong>
                </div>

                <div className="mb-3"></div>
                <div className=" flex font-medium">
                  Total Paid :{' '}
                  <strong
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}
                  >
                    Rs. 75,000.00
                  </strong>
                </div>

                <div className="mb-3"></div>
                <div className=" flex font-medium">
                  Opening Balance :{' '}
                  <strong
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}
                  >
                    Rs. 75,000.00
                  </strong>
                </div>

                <div className="mb-3"></div>
                <div className=" flex font-medium">
                  Opening Balance Due :{' '}
                  <strong
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}
                  >
                    Rs. 75,000.00
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          <SelectElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.amount.label'
            )}`}
            register={register}
            name="amount"
            id="amount"
            required
            error={errors.amount}
          />

          <DateElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.paidOn.label'
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
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.paymentMethod.label'
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
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.attachDocument.label'
            )}`}
            variant="primary"
            btnLabel={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.attachDocument.placeolder'
            )}`}
            error={errors.attach_document}
            info={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.attachDocument.tooltip'
            )}`}
          />
          {selectedOption === 'Card' && (
            <>
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.addPay.fields.cardNumber.label'
                )}`}
                register={register}
                name="cardNumber"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.addPay.fields.cardNumber.placeolder'
                )}`}
                id="cardNumber"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.cardHolderName.label'
                )}`}
                register={register}
                name="cardHolderName"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.cardHolderName.placeolder'
                )}`}
                id="cardHolderName"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.cardTransactionNo.label'
                )}`}
                register={register}
                name="cardTransactionNo"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.cardTransactionNo.placeolder'
                )}`}
                id="cardTransactionNo"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.cardType.label'
                )}`}
                register={register}
                name="cardType"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.cardType.placeolder'
                )}`}
                id="cardType"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.month.label'
                )}`}
                register={register}
                name="month"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.month.placeolder'
                )}`}
                id="month"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.year.label'
                )}`}
                register={register}
                name="year"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.year.placeolder'
                )}`}
                id="year"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.securityCode.label'
                )}`}
                register={register}
                name="securityCode"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.securityCode.placeolder'
                )}`}
                id="securityCode"
              />
            </>
          )}
          {selectedOption === 'Bank Transfer' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.bankTransfer.label'
              )}`}
              register={register}
              name="bankTransfer"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.bankTransfer.placeolder'
              )}`}
              id="bankTransfer"
            />
          )}
          {selectedOption === 'Other Payments' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.transactionNo.label'
              )}`}
              register={register}
              name="transactionNo"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.transactionNo.placeolder'
              )}`}
              id="transactionNo"
            />
          )}
          {selectedOption === 'Cheque' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.chequeNo.label'
              )}`}
              register={register}
              name="chequeNo"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.chequeNo.placeolder'
              )}`}
              id="chequeNo"
            />
          )}

          <TextareaElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.paymentNotes.label'
            )}`}
            register={register}
            name="paymentNotes"
            id="paymentNotes"
            placeholder={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.fields.paymentNotes.placeolder'
            )}`}
          />
        </div>
        <div className="flex justify-end px-3 pb-7 text-center">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.save')}`}
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

export default AddPayCustomer
