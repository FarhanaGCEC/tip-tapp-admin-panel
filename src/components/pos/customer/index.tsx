/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import { InputElement, SelectElement } from '../../common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import Lucide from '../../common/lucide'
import { TextareaElement, DateElement } from '../../common/form-elements'

function Customer() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [type] = useState([
    { id: 0, name: ' Type' },
    { id: 2, name: 'Type2' },
    { id: 3, name: 'Type3' },
  ])
  const [group] = useState([
    { id: 0, name: ' Group' },
    { id: 2, name: 'Group2' },
    { id: 3, name: 'Group' },
  ])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [date, setDate] = useState('')

  const schema = yup
    .object({
      first_name: yup
        .string()
        .required(`${t('customerForm.fields.firstName.validationMessage')}`),
      mobile: yup
        .string()
        .required(`${t('customerForm.fields.contactNo.validationMessage')}`),
      prefix: yup.string().when('_', {
        is: () => 'tooltip',
        then: yup
          .string()
          .required(`${t('customerForm.fields.prefix.tooltip')}`),
        otherwise: yup.string().notRequired(),
      }),
      contactNo: yup.string().when('_', {
        is: 'tooltip',
        then: yup
          .string()
          .required(`${t('customerForm.fields.contactNo.tooltip')}`),
        otherwise: yup
          .string()
          .required(`${t('customerForm.fields.contactNo.validationMessage')}`),
      }),
    })
    .required()
  const [Prefixtype] = useState([
    { id: 0, name: 'Please Select' },
    { id: 1, name: ' Mr.' },
    { id: 2, name: 'Mrs.' },
    { id: 3, name: 'Miss' },
  ])
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
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleChange = () => {
    setShowMoreInfo(!showMoreInfo)
  }
  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5 py-5">
        <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
          <h2 className="mb-4 mr-auto text-base font-medium">
            {`${t('customerForm.fields.title')}`}
          </h2>
        </div>
        {/* Customer Information */}
        <div className="mb-5 grid grid-cols-1 gap-7 md:grid-cols-2">
          <SelectElement
            label={`${t('userManagement.fields.prefix.label')}`}
            register={register}
            options={Prefixtype}
            name="prefix"
            id="prefix"
          />
          <InputElement
            label={`${t('customerForm.fields.firstName.label')}`}
            register={register}
            name="first_name"
            id="first_name"
            error={errors.first_name}
            required
          />
          <InputElement
            label={`${t('customerForm.fields.middleName.label')}`}
            register={register}
            name="middle_name"
            id="middle_name"
            error={errors.middle_name}
          />
          <InputElement
            label={`${t('customerForm.fields.lastName.label')}`}
            register={register}
            name="last_name"
            id="last_name"
            error={errors.last_name}
          />
          <InputElement
            label={`${t('customerForm.fields.contactNo.label')}`}
            register={register}
            name="contactNo"
            id="contactNo"
            error={errors.contactNo}
            required
          />
          <InputElement
            label={`${t('customerForm.fields.email.label')}`}
            register={register}
            name="email"
            id="email"
            error={errors.email}
            type="email"
          />
        </div>
      </div>
      {/* Show More */}
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
        <>
          {/* Contact Type */}
          <div className="intro-y box mb-5 px-5 py-7">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <SelectElement
                label={`${t('customerForm.fields.contactType.label')}`}
                register={register}
                options={type}
                name="type"
                id="type"
                error={errors.type}
                required
              />
              <InputElement
                label={`${t('customerForm.fields.contactId.label')}`}
                register={register}
                name="contact_id"
                id="contact_id"
                error={errors.contact_id}
                type="number"
              />
              <SelectElement
                label={`${t('customerForm.fields.customerGroup.label')}`}
                register={register}
                options={group}
                name="customer_group_id"
                id="customer_group_id"
                error={errors.customer_group_id}
              />
              <InputElement
                label={`${t('customerForm.fields.businessName.label')}`}
                register={register}
                name="supplier_business_name"
                id="supplier_business_name"
                error={errors.supplier_business_name}
              />
              <InputElement
                label={`${t('customerForm.fields.landLine.label')}`}
                register={register}
                name="landline"
                id="landline"
                error={errors.landline}
              />

              <InputElement
                label={`${t('customerForm.fields.alternativeNo.label')}`}
                register={register}
                name="alternate_number"
                id="alternate_number"
                error={errors.alternate_number}
              />
            </div>
          </div>
          {/* Finance Details */}
          <div className="intro-y box mb-5 px-5 py-5">
            <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
              <h2 className="mb-4 mr-auto text-base font-medium">
                {`${t('customerForm.fields.financeForm.title')}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputElement
                label={`${t(
                  'customerForm.fields.financeForm.fields.openingBalance.label'
                )}`}
                register={register}
                name="openingBalance"
                id="openingBalance"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.financeForm.fields.payTerm.label'
                )}`}
                register={register}
                name="payTerm"
                id="payTerm"
                info={`${t(
                  'customerForm.fields.financeForm.fields.payTerm.tooltip'
                )}`}
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.financeForm.fields.creditLimit.label'
                )}`}
                register={register}
                name="creditLimit"
                id="creditLimit"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.financeForm.fields.taxNumber.label'
                )}`}
                register={register}
                name="taxNumber"
                id="taxNumber"
              />
            </div>
          </div>
          {/* Postal Details */}
          <div className="intro-y box mb-5 px-5 py-5">
            <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
              <h2 className="mb-4 mr-auto text-base font-medium">
                {`${t('customerForm.fields.postalForm.title')}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputElement
                label={`${t(
                  'customerForm.fields.postalForm.fields.addressLine1.label'
                )}`}
                register={register}
                name="addressLine1"
                id="addressLine1"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.postalForm.fields.addressLine2.label'
                )}`}
                register={register}
                name="addressLine2"
                id="addressLine2"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.postalForm.fields.city.label'
                )}`}
                register={register}
                name="city"
                id="city"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.postalForm.fields.state.label'
                )}`}
                register={register}
                name="state"
                id="state"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.postalForm.fields.country.label'
                )}`}
                register={register}
                name="country"
                id="country"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.postalForm.fields.zipCode.label'
                )}`}
                register={register}
                name="zipCode"
                id="zipCode"
              />
              <TextareaElement
                label={`${t(
                  'customerForm.fields.postalForm.fields.deliveryAddress.label'
                )}`}
                register={register}
                name="deliveryAddress"
                id="deliveryAddress"
              />
            </div>
          </div>
          {/* Other Details */}
          <div className="intro-y box mb-5 px-5 py-5">
            <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
              <h2 className="mb-4 mr-auto text-base font-medium">
                {`${t('customerForm.fields.otherForm.title')}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <DateElement
                label={`${t('customerForm.fields.otherForm.fields.dob.label')}`}
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
              />
            </div>
            <br></br>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField1.label'
                )}`}
                register={register}
                name="customerField1"
                id="customerField1"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField2.label'
                )}`}
                register={register}
                name="customerField2"
                id="customerField2"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField3.label'
                )}`}
                register={register}
                name="customerField3"
                id="customerField3"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField4.label'
                )}`}
                register={register}
                name="customerField4"
                id="customerField4"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField5.label'
                )}`}
                register={register}
                name="customerField5"
                id="customerField5"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField6.label'
                )}`}
                register={register}
                name="customerField6"
                id="customerField6"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField7.label'
                )}`}
                register={register}
                name="customerField7"
                id="customerField7"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField8.label'
                )}`}
                register={register}
                name="customerField8"
                id="customerField8"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField9.label'
                )}`}
                register={register}
                name="customerField9"
                id="customerField9"
              />
              <InputElement
                label={`${t(
                  'customerForm.fields.otherForm.fields.customerField10.label'
                )}`}
                register={register}
                name="customerField10"
                id="customerField10"
              />
            </div>
          </div>
        </>
      )}
      <div className=" flex justify-end">
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
    </form>
  )
}

export default Customer
