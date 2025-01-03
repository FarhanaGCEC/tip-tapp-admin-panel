/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { SetStateAction, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  DateElement,
  InputElement,
  SelectElement,
} from '../../common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import {
  FormCheck,
  FormInfo,
  FormLabel,
  FormRequiredIcon,
  FormRequiredLabel,
} from '../../common/form-elements/components'
import Lucide from '../../common/lucide'
import ClassicEditorElement from '../../common/form-elements/classic-editor-element'
import UploadFilesElement from '../../common/form-elements/upload-files-element'
import Alert from '../../../base-components/Alert'

function Expenses() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [date, setDate] = useState('')
  const [editorDataPaymentNotes, setEditorDataPaymentNotes] = useState(
    `<p>${t('expensesForm.paymentForm.fields.paymentNotes.placeolder')}.</p>`
  )
  const [editorDataExpensesNote, setEditorDataExpensesNote] = useState(
    `<p>${t('expensesForm.fields.expensesNote.placeolder')}.</p>`
  )

  const schema = yup
    .object({
      business_location: yup
        .string()
        .required(
          `${t('expensesForm.fields.businessLocation.validationMessage')}`
        ),
      date: yup
        .string()
        .required(`${t('expensesForm.fields.date.validationMessage')}`),
      total_amount: yup
        .string()
        .required(`${t('expensesForm.fields.totalAmount.validationMessage')}`),
      payment_method: yup
        .string()
        .required(
          `${t(
            'expensesForm.paymentForm.fields.paymentMethod.validationMessage'
          )}`
        ),
      paidOn: yup
        .string()
        .required(
          `${t('expensesForm.paymentForm.fields.paidOn.validationMessage')}`
        ),
      amount: yup
        .string()
        .required(
          `${t('expensesForm.paymentForm.fields.amount.validationMessage')}`
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessHandlerCreateExpenses = (expenses: any, message: string) => {
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
  const createExpenses = async (expenses: any) => {
    setIsLoading(true)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createExpenses(data)
  }

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleChange = () => {
    setShowMoreInfo(!showMoreInfo)
  }
  const options = [
    { id: 0, name: 'Cash' },
    { id: 1, name: 'Card' },
    { id: 2, name: 'Cheque' },
    { id: 3, name: 'Bank Transfer' },
    { id: 4, name: 'Other Payments' },
    { id: 5, name: 'Customer Payment' },
  ]
  const [selectedOption, setSelectedOption] = useState('')
  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedOption(event.target.value)
  }
  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SelectElement
            label={`${t('expensesForm.fields.businessLocation.label')}`}
            required
            register={register}
            name="business_location"
            id="business_location"
            error={errors.business_location}
            info={`${t('expensesForm.fields.date.tooltip')}`}
          />
          <DateElement
            label={`${t('expensesForm.fields.date.label')}`}
            required
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
            name="date"
            id="date"
            error={errors.date}
            info={`${t('expensesForm.fields.date.tooltip')}`}
          />
          <SelectElement
            label={`${t('expensesForm.fields.expensesCategory.label')}`}
            register={register}
            name="expenses_category"
            id="expenses_category"
            error={errors.expenses_category}
          />
          <SelectElement
            label={`${t('expensesForm.fields.expensesSubCategory.label')}`}
            register={register}
            name="expenses_sub_category"
            id="expenses_sub_category"
            error={errors.expenses_sub_category}
          />
          <InputElement
            label={`${t('expensesForm.fields.referenceNo.label')}`}
            register={register}
            name="reference_no"
            id="reference_no"
            error={errors.reference_no}
            type="number"
          />
          <InputElement
            label={`${t('expensesForm.fields.totalAmount.label')}`}
            required
            register={register}
            name="total_amount"
            id="total_amount"
            error={errors.total_amount}
            type="text"
          />
        </div>
      </div>
      <div className="item-center flex justify-center py-3">
        <Button
          variant="secondary"
          className="mx-auto mb-5 w-fit px-10"
          onClick={handleChange}
        >
          <div className="mx-auto flex">
            More
            <Lucide
              className="mx-auto ml-1 mt-0.5 h-4 w-4"
              icon={showMoreInfo ? Icons.UPARROW : Icons.DOWNARROW}
            />
          </div>
        </Button>
      </div>
      {showMoreInfo && (
        <div className="intro-y box mb-5 px-5 py-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SelectElement
              label={`${t('expensesForm.fields.expensesFor.label')}`}
              register={register}
              name="expenses_for"
              id="expenses_for"
              error={errors.expenses_for}
              info={`${t('expensesForm.fields.expensesFor.tooltip')}`}
            />
            <SelectElement
              label={`${t('expensesForm.fields.expensesForContact.label')}`}
              register={register}
              name="expenses_for_contact"
              id="expenses_for_contact"
              error={errors.expenses_for_contact}
            />
            <InputElement
              label={`${t('expensesForm.fields.applicableTax.label')}`}
              register={register}
              name="applicable_tax"
              id="applicable_tax"
              iconLeft={Icons.INFO}
              error={errors.applicable_tax}
              type="number"
            />
            <UploadFilesElement
              id="attach_document"
              name="attach_document"
              register={register}
              label={`${t('expensesForm.fields.attachDocument.placeolder')}`}
              variant="primary"
              btnLabel={`${t(
                'expensesForm.fields.attachDocument.btnPlaceolder'
              )}`}
              error={errors.attach_document}
              info={`${t('expensesForm.fields.attachDocument.tooltip')}`}
            />
            <div className="md:col-span-2">
              <ClassicEditorElement
                id="expenses_notes"
                name="expenses_notes"
                error={errors.expenses_notes}
                label={`${t('expensesForm.fields.expensesNote.label')}`}
                register={register}
                required
                value={editorDataExpensesNote}
                // onChange={setEditorDataExpensesNote}
              />
            </div>
            <div className="flex">
              <div>
                <FormLabel className="font-medium" id="is_refund">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="-mr-1 font-medium">{`${t(
                        'expensesForm.fields.isRefund.label'
                      )}`}</div>
                      <div className="mx-2 hidden sm:flex">
                        <FormRequiredLabel />
                      </div>
                      <div className="mx-2 sm:hidden">
                        <FormRequiredIcon />
                      </div>
                      <div className="mx-1 -ml-1 flex">
                        <FormInfo
                          tooltip={`${t(
                            'expensesForm.fields.isRefund.tooltip'
                          )}`}
                        />
                      </div>
                    </div>
                  </div>
                </FormLabel>
              </div>
              <div>
                <FormCheck className="mr-2 mt-0.5">
                  <FormCheck.Input
                    id="is_refund"
                    name="is_refund"
                    type="radio"
                    value=""
                  />
                  <FormCheck.Label htmlFor="is_refund" />
                </FormCheck>
              </div>
            </div>
            <div className="flex">
              <div>
                <FormLabel className="font-medium" id="is_refund">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="-mr-1 font-medium">{`${t(
                        'expensesForm.fields.isRecuring.label'
                      )}`}</div>
                      <div className="mx-2 hidden sm:flex">
                        <FormRequiredLabel />
                      </div>
                      <div className="mx-2 sm:hidden">
                        <FormRequiredIcon />
                      </div>
                      <div className="mx-1 -ml-1 flex">
                        <FormInfo
                          tooltip={`${t(
                            'expensesForm.fields.isRecuring.tooltip'
                          )}`}
                        />
                      </div>
                    </div>
                  </div>
                </FormLabel>
              </div>
              <div>
                <FormCheck className="mr-2 mt-0.5">
                  <FormCheck.Input
                    id="is_refund"
                    name="is_refund"
                    type="radio"
                    value=""
                  />
                  <FormCheck.Label htmlFor="is_refund" />
                </FormCheck>
              </div>
            </div>
            <SelectElement
              label={`${t('expensesForm.fields.recuringInterval.label')}`}
              register={register}
              name="expenses_for"
              id="expenses_for"
              error={errors.expenses_for}
            />
            <SelectElement
              label={`${t('expensesForm.fields.noOfRepetitions.label')}`}
              register={register}
              name="expenses_for"
              id="expenses_for"
              error={errors.expenses_for}
            />
          </div>
        </div>
      )}
      <div className="intro-y box px-5 py-5">
        <div className="mb-4 flex flex-col border-b border-slate-200/60 text-base font-medium dark:border-darkmode-400">
          <h2 className="mb-4 mr-auto text-base font-medium">
            {`${t('expensesForm.paymentForm.title')}`}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputElement
            label={`${t('expensesForm.paymentForm.fields.amount.label')}`}
            required
            register={register}
            name="amount"
            id="amount"
            error={errors.amount}
            type="number"
            iconLeft={Icons.DOLLARSIGN}
          />
          <DateElement
            label={`${t('expensesForm.paymentForm.fields.paidOn.label')}`}
            required
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
            name="paidOn"
            id="paidOn"
            error={errors.paidOn}
          />
          <SelectElement
            label={`${t(
              'expensesForm.paymentForm.fields.paymentMethod.label'
            )}`}
            required
            register={register}
            options={options}
            name="payment_method"
            id="payment_method"
            error={errors.payment_method}
            iconLeft={Icons.DOLLARSIGN}
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
          <SelectElement
            label={`${t(
              'expensesForm.paymentForm.fields.paymentAmount.label'
            )}`}
            register={register}
            name="payment_amount"
            id="payment_amount"
            error={errors.payment_amount}
            iconLeft={Icons.DOLLARSIGN}
          />
          <div className="pt-3 md:col-span-2">
            <ClassicEditorElement
              id="payment_notes"
              name="payment_notes"
              error={errors.payment_notes}
              label={`${t(
                'expensesForm.paymentForm.fields.paymentNotes.label'
              )}`}
              register={register}
              required
              value={editorDataPaymentNotes}
              // onChange={setEditorDataPaymentNotes}
            />
          </div>
          <Alert variant="soft-pending" className="mb-2">
            <div className="mr-2">
              {`${t('expensesForm.paymentForm.fields.paymentDue.label')}`}:{' '}
              <strong>{`${t(
                'expensesForm.paymentForm.fields.paymentDue.placeolder'
              )}`}</strong>
            </div>
          </Alert>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button type="submit" variant="primary" className="mb-2 mr-1 ">
          Add Expense
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

export default Expenses
