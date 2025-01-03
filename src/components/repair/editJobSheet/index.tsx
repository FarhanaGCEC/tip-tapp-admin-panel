/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
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
import {
  TextareaElement,
  DateElement,
  SearchSelectElement,
  ImageUploadElement,
} from '../../common/form-elements'
import { FormInfo, FormCheck } from '../../common/form-elements/components'
import Lucide from '../../common/lucide'
import { AlignmentTypes } from '../../../constants/common-enums'
import { Menu, Dialog } from '../../common/headless'
import { FormLabel } from '../../common/form-elements/components'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import TomSelect from '../../common/tom-select'
import UploadFilesElement from '../../common/form-elements/upload-files-element'

function EditJobSheet() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
        businessLocation: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.businessLocation.validationMessage')}`),
        customer: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.customer.validationMessage')}`),
        serviceType: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.serviceType.validationMessage')}`),
        serialNo: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.serialNo.validationMessage')}`),
        status: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.status.validationMessage')}`),
        addDevice: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.validationMessage')}`),
        addDeviceModel: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.validationMessage')}`),
        role: yup
  .string()
  .required(`${t('userManagement.fields.rolesnPermission.fields.role.validationMessage')}`),
  otherwise: yup.string().notRequired(),

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


  const [allowSelectedPaymentAccounts, setAllowSelectedPaymentAccounts] =
    useState(false)
  const [allowFundTransferAccounts, setAllowFundTransferAccounts] =
    useState(false)

  const handleAllowSelectedPaymentAccountsChange = (event: { target: { checked: any } }) => {
    const { checked } = event.target
    setAllowSelectedPaymentAccounts(checked)
  }

  const handleAllowFundTransferAccountsChange = (event: { target: { checked: any } }) => {
    const { checked } = event.target
    setAllowFundTransferAccounts(checked)
  }
  const [date, setDate] = useState('')
  const [Prefixtype] = useState([ { id: 0, name: 'Please Select' }, { id: 1, name: ' Mr.' }, { id: 2, name: 'Mrs.' }, { id: 3, name: 'Miss' }])
  const [Roletype] = useState([
    { id: 0, name: 'Please Select' },
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Cashier 1' },
    { id: 3, name: 'Cashier 2' },
    { id: 4, name: 'Other' }
  ])
  
  const [Gendertype] = useState([{ id: 0, name: 'Please Select' }, { id: 1, name: ' Male' }, { id: 2, name: 'Female' }, { id: 3, name: 'Other' }])
  const [Maritaltype] = useState([{ id: 0, name: 'Please Select' }, { id: 1, name: ' Married' }, { id: 2, name: 'Unmarried' }, { id: 3, name: 'Divorced' }])

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [checkedPickUp, setCheckedPickUp] = useState(false);
  const [checkedOnSite, setCheckedOnSite] = useState(false);
  const [categoryPreview, setCategoryPreview] = useState(false) 
  const [type] = useState([
    { id: 0, name: ' Supplier' },
    { id: 2, name: 'Customer' },
    { id: 3, name: 'Other' },
  ])
  const [group] = useState([
    { id: 0, name: ' Please Select' },
    { id: 2, name: 'Months' },
    { id: 3, name: 'Dates' },
  ])
  const handlePickUpChange = () => {
    setCheckedPickUp(!checkedPickUp);
    if (!checkedPickUp) {
      // If Pick Up is checked, uncheck On Site
      setCheckedOnSite(false);
    }
  };

  const handleOnSiteChange = () => {
    setCheckedOnSite(!checkedOnSite);
    if (!checkedOnSite) {
      // If On Site is checked, uncheck Pick Up
      setCheckedPickUp(false);
    }
  }
  const [showMoreInfo2, setShowMoreInfo2] = useState(false)
  const handleMoreInfoClick2 = () => {
    setShowMoreInfo2(!showMoreInfo2)
  }
  const [select, setSelect] = useState('1')
  const [brandPreview, setBrandPreview] = useState(false) 
  const [devicePreview, setDevicePreview] = useState(false)
  const [deviceModelPreview, setDeviceModelPreview] = useState(false) 

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
           <div className="intro-y box mb-5 px-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.editJobSheetTopic.title')}`}
                  </h2>
      </div>
<div className="grid grid-cols-1 gap-7 mt-7 md:grid-cols-2 mb-3">
         <SearchSelectElement
  label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.customer.label')}`}
  register={register}
  name="customer"
  id="customer"
  error={errors.customer}
  iconRight={Icons.PLUSCIRCLE}
  required
  onChange={handleChange}
  onClickRight={() => { // Change this line
    setCategoryPreview(true)
  }}
/>

            <Dialog
              size="xl"
              open={categoryPreview}
              onClose={() => {
                setCategoryPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'contactManagement.fields.customers.fields.addContact.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setCategoryPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('contactManagement.fields.customers.fields.title')}`}
                  </h2>
                  </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.prefix.label')}`}
            register={register}
            name="prefix"
            placeholder={`${t('contactManagement.fields.customers.fields.prefix.placeolder')}`}
            id="prefix"
            // info={`${t('customerForm.fields.prefix.tooltip')}`}
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.firstName.label')}`}
            register={register}
            name="first_name"
            placeholder={`${t('contactManagement.fields.customers.fields.firstName.placeolder')}`}
            id="first_name"
            error={errors.first_name}
            required
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.middleName.label')}`}
            register={register}
            name="middle_name"
            placeholder={`${t('contactManagement.fields.customers.fields.middleName.placeolder')}`}
            id="middle_name"
            error={errors.middle_name}
         
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.lastName.label')}`}
            register={register}
            name="last_name"
            placeholder={`${t('contactManagement.fields.customers.fields.lastName.placeolder')}`}
            id="last_name"
            error={errors.last_name}
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.contactNo.label')}`}
            register={register}
            name="contactNo"
            placeholder={`${t('contactManagement.fields.customers.fields.contactNo.placeolder')}`}
            id="contactNo"
            info={`${t('contactManagement.fields.customers.fields.contactNo.tooltip')}`}
            error={errors.contactNo}
            required
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.email.label')}`}
            register={register}
            name="email"
            placeholder={`${t('contactManagement.fields.customers.fields.email.placeolder')}`}
            id="email"
            error={errors.email}
            type="email"
          />     
        </div>
      </div>
      <div className="item-center flex justify-center py-3">
                            <Button
                              variant="outline-secondary"
                              className="mx-auto mb-5 w-fit px-10"
                              onClick={handleMoreInfoClick2}
                            >
                              <div className="mx-auto flex">
                                More
                                <Lucide
                                  className="mx-auto ml-1 mt-0.5 h-4 w-4"
                                  icon={
                                    showMoreInfo2
                                      ? Icons.UPARROW
                                      : Icons.DOWNARROW
                                  }
                                />
                              </div>
                            </Button>
                          </div>
      
      {showMoreInfo2 && (
        <>
        <div className="intro-y box mb-5 px-5 py-10">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <SelectElement
              label={`${t('contactManagement.fields.customers.fields.contactType.label')}`}
              register={register}
              options={type}
              name="type"
              id="type"
              error={errors.type}
              required
            />
            <InputElement
              label={`${t('contactManagement.fields.customers.fields.contactId.label')}`}
              register={register}
              name="contact_id"
              placeholder={`${t('contactManagement.fields.customers.fields.contactId.placeolder')}`}
              id="contact_id"
              error={errors.contact_id}
              type="number"

            />
            <SelectElement
              label={`${t('contactManagement.fields.customers.fields.customerGroup.label')}`}
              register={register}
              options={group}
              name="customer_group_id"
              id="customer_group_id"
              error={errors.customer_group_id}
            />
            <InputElement
              label={`${t('contactManagement.fields.customers.fields.businessName.label')}`}
              register={register}
              name="supplier_business_name"
              placeholder={`${t('contactManagement.fields.customers.fields.businessName.placeolder')}`}
              id="supplier_business_name"
              error={errors.supplier_business_name}
            />
            <InputElement
              label={`${t('contactManagement.fields.customers.fields.landLine.label')}`}
              register={register}
              name="landline"
              placeholder={`${t('contactManagement.fields.customers.fields.landLine.placeolder')}`}
              id="landline"
              error={errors.landline}
            />

            <InputElement
              label={`${t('contactManagement.fields.customers.fields.alternativeNo.label')}`}
              register={register}
              name="alternate_number"
              placeholder={`${t('contactManagement.fields.customers.fields.alternativeNo.placeolder')}`}
              id="alternate_number"
              error={errors.alternate_number}
            />
          
          </div>
        </div>
     
        <div className="intro-y box mb-5 px-5 py-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-1 md:pl-10">
            <div className="intro-x flex items-center">
              <FormLabel>{`${t(
                'contactManagement.fields.customers.fields.customerImage.label'
              )}`}</FormLabel>
              <div className="ml-3 mb-2 flex text-slate-600 dark:text-slate-500">
                <Lucide icon="Image" className="mr-1 h-4 w-4" />
                {`${t('contactManagement.fields.customers.fields.customerImage.placeolder')}`}
              </div>
            </div>
            <div className="justify-start">
              <ImageUploadElement
                image={productPlaceholder}
                alt={`${t('contactManagement.fields.customers.fields.CustomerImage.imageAlt')}`}
                removeImageContent="Remove this profile photo?"
                buttonLabel="Upload a Photo"
              />
            </div>
          </div>
              </div>
            </div>
            
            <div className="intro-y box mb-5 px-5 py-5">
            <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('contactManagement.fields.customers.fields.financeForm.title')}`}
                  </h2>
                  </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.financeForm.fields.openingBalance.label')}`}
            register={register}
            name="openingBalance"
            placeholder={`${t('contactManagement.fields.customers.fields.financeForm.fields.openingBalance.label')}`}
            id="openingBalance"
           
        
          />
              <InputElement
            label={`${t('contactManagement.fields.customers.fields.financeForm.fields.payTerm.label')}`}
            register={register}
            name="payTerm"
            placeholder={`${t('contactManagement.fields.customers.fields.financeForm.fields.payTerm.placeolder')}`}
            id="payTerm"
            info={`${t('contactManagement.fields.customers.fields.financeForm.fields.payTerm.tooltip')}`}
            
           
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.financeForm.fields.creditLimit.label')}`}
            register={register}
            name="creditLimit"
            placeholder={`${t('contactManagement.fields.customers.fields.financeForm.fields.creditLimit.placeolder')}`}
            id="creditLimit"
           
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.financeForm.fields.taxNumber.label')}`}
            register={register}
            name="taxNumber"
            placeholder={`${t('contactManagement.fields.customers.fields.financeForm.fields.taxNumber.placeolder')}`}
            id="taxNumber"

          />
              </div>
            </div>
            
            <div className="intro-y box mb-5 px-5 py-5">
            <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('contactManagement.fields.customers.fields.postalForm.title')}`}
                  </h2>
                  </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.postalForm.fields.addressLine1.label')}`}
            register={register}
            name="addressLine1"
            placeholder={`${t('contactManagement.fields.customers.fields.postalForm.fields.addressLine1.placeolder')}`}
            id="addressLine1"
         
        
          />
              <InputElement
            label={`${t('contactManagement.fields.customers.fields.postalForm.fields.addressLine2.label')}`}
            register={register}
            name="addressLine2"
            placeholder={`${t('contactManagement.fields.customers.fields.postalForm.fields.addressLine2.placeolder')}`}
            id="addressLine2"
         
           
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.postalForm.fields.city.label')}`}
            register={register}
            name="city"
            placeholder={`${t('contactManagement.fields.customers.fields.postalForm.fields.city.placeolder')}`}
            id="city"
           
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.postalForm.fields.state.label')}`}
            register={register}
            name="state"
            placeholder={`${t('contactManagement.fields.customers.fields.postalForm.fields.state.placeolder')}`}
            id="state"
          />
             <InputElement
            label={`${t('contactManagement.fields.customers.fields.postalForm.fields.country.label')}`}
            register={register}
            name="country"
            placeholder={`${t('contactManagement.fields.customers.fields.postalForm.fields.country.placeolder')}`}
            id="country"
          />
             <InputElement
            label={`${t('contactManagement.fields.customers.fields.postalForm.fields.zipCode.label')}`}
            register={register}
            name="zipCode"
            placeholder={`${t('contactManagement.fields.customers.fields.postalForm.fields.zipCode.placeolder')}`}
            id="zipCode"
          />
               <InputElement
            label={`${t('contactManagement.fields.customers.fields.postalForm.fields.deliveryAddress.label')}`}
            register={register}
            name="deliveryAddress"
            placeholder={`${t('contactManagement.fields.customers.fields.postalForm.fields.deliveryAddress.placeolder')}`}
            id="deliveryAddress"
          />
              </div>
            </div>

            <div className="intro-y box px-5 py-5">
            <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('contactManagement.fields.customers.fields.otherForm.title')}`}
                  </h2>
                  </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
           <DateElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.dob.label')}`}
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
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField1.label')}`}
            register={register}
            name="customerField1"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField1.placeolder')}`}
            id="customerField1"
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField2.label')}`}
            register={register}
            name="customerField2"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField2.placeolder')}`}
            id="customerField2"
           
          />
          <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField3.label')}`}
            register={register}
            name="customerField3"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField3.placeolder')}`}
            id="customerField3"
          />
             <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField4.label')}`}
            register={register}
            name="customerField4"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField4.placeolder')}`}
            id="customerField4"
          />
             <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField5.label')}`}
            register={register}
            name="customerField5"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField5.placeolder')}`}
            id="customerField5"
          />
               <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField6.label')}`}
            register={register}
            name="customerField6"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField6.placeolder')}`}
            id="customerField6"
          />
                <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField7.label')}`}
            register={register}
            name="customerField7"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField7.placeolder')}`}
            id="customerField7"
          />
               <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField8.label')}`}
            register={register}
            name="customerField8"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField8.placeolder')}`}
            id="customerField8"
          />
                <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField9.label')}`}
            register={register}
            name="customerField9"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField9.placeolder')}`}
            id="customerField9"
          />
             <InputElement
            label={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField10.label')}`}
            register={register}
            name="customerField10"
            placeholder={`${t('contactManagement.fields.customers.fields.otherForm.fields.customerField10.placeolder')}`}
            id="customerField10"
          />
 </div>
              </div>
              </>
      )}
              
    </form>
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 mb-5 text-center  ">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.save')}`}
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
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                      setCategoryPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
        </div>
        <div className="grid grid-cols-1 gap-7 mt-9 mb-5 md:grid-cols-1">
          <FormCheck>
  <div className="font-medium">
    {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.serviceType.label')}`}
  </div>
  <FormCheck.Label className="mr-5">
  </FormCheck.Label>


            
            <div className="mr-1 ml-12 font-medium flex"> Carry In</div>
      <FormCheck.Input
        className="mr-1 ml-1"
        type="checkbox"
        value=""
      />
     
  
      <div className="mr-2 ml-4 font-medium">Pick Up</div>
      <FormCheck.Input
        id="vertical-form-4"
        type="checkbox"
        value=""
        onChange={handlePickUpChange}
        checked={checkedPickUp}
      />
      <div className="mr-2 ml-4 font-medium">On Site</div>
      <FormCheck.Input
        id="vertical-form-3"
        type="checkbox"
        value=""
        onChange={handleOnSiteChange}
        checked={checkedOnSite}
      />
</FormCheck>
      {checkedPickUp || checkedOnSite ? (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-1">
                    <TextareaElement
  label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.PickSiteaddress.label')}`}
  register={register}
  name="description"
  id="description"
 
/>
        </div>
      ) : null} 
        </div>
      </div>
     
<div className="intro-y box mb-5 px-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.details2.title')}`}
                  </h2>
                  </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mt-6">
         
          <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.serialNo.label'
            )}`}
            register={register}
            name="serialNo"
            id="serialNo"
            error={errors.serialNo}
            required
          />
           <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.password.label'
            )}`}
            register={register}
            name="password"
            type="password"
            id="password"
            iconRight={Icons.KEYBOARD}
          />
        </div>
        <div className="grid grid-cols-1 gap-7 py-7 border-b md:grid-cols-2">
        <SearchSelectElement
  label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.productName.label')}`}
  register={register}
  name="productName"
  id="productName"
  onChange={handleChange}
/>
<SearchSelectElement
  label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.brand.label')}`}
  register={register}
  name="brand"
  id="brand"
  iconRight={Icons.PLUSCIRCLE}
  onChange={handleChange}
  onClickRight={() => { 
    setBrandPreview(true)
  }}
/>
<Dialog
              size="lg"
              open={brandPreview}
              onClose={() => {
                setBrandPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.addBrand.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setBrandPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'productManagement.fields.brandName.label'
                    )}`}
                    register={register}
                    required
                    error={errors.brandName}
                    name="brandName"
                    id="brandName"
                  />
                  
                  <InputElement
                    label={`${t(
                      'productManagement.fields.shortDescription.label'
                    )}`}
                    register={register}
                    name="shortDescription"
                    id="shortDescription"
                  />
        
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.save')}`}
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
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                      setBrandPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
<SearchSelectElement
  label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.device.label')}`}
  register={register}
  name="device"
  id="device"
  iconRight={Icons.PLUSCIRCLE}
  onChange={handleChange}
  onClickRight={() => { 
    setDevicePreview(true)
  }}
/>
<Dialog
              size="lg"
              open={devicePreview}
              onClose={() => {
                setDevicePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setDevicePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.label'
                    )}`}
                    register={register}
                    required
                    error={errors.addDevice}
                    name="addDevice"
                    id="addDevice"
                  />
                  
                  <TextareaElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.description.label'
                    )}`}
                    register={register}
                    name="shortDescription"
                    id="shortDescription"
                  />
        
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.save')}`}
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
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                        setDevicePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
<SearchSelectElement
  label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.deviceModel.label')}`}
  register={register}
  name="deviceModel"
  id="deviceModel"
  iconRight={Icons.PLUSCIRCLE}
  onChange={handleChange}
  onClickRight={() => { 
    setDeviceModelPreview(true)
  }}
/>
<Dialog
              size="lg"
              open={deviceModelPreview}
              onClose={() => {
                setDeviceModelPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setDeviceModelPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.label'
                    )}`}
                    register={register}
                    required
                    error={errors.addDeviceModel}
                    name="addDeviceModel"
                    id="addDeviceModel"
                  />
                  <SelectElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.brandModel.label'
                    )}`}
                    register={register}
                    name="brandModel"
                    id="brandModel"
                  />
                  <SelectElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.device.label'
                    )}`}
                    register={register}
                    name="device"
                    id="device"
                  />
                  <TextareaElement
                   info={`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.repairChecklist.tooltip'
                  )}`}
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.repairChecklist.label'
                    )}`}
                    register={register}
                    name="repairChecklist"
                    id="repairChecklist"
                  />
        
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.save')}`}
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
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                        setDeviceModelPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>

        </div>

        <div className="grid grid-cols-1 gap-7 mt-7 mb-3 md:grid-cols-1">
          <FormCheck className="">
            <div className=" font-medium text-lg">
              {`${t(
                'repair.fields.jobsheet.fields.addJobSheet.fields.preChecked.label'
              )}`}
            </div>
            <FormCheck.Label className="mr-5">
              <div className="flex ">
                <FormInfo
                  tooltip={`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.preChecked.tooltip'
                  )}`}
                />
               <div className=" ml-2 ">{' N/A = Not Applicable' }</div> 
              </div> 
            </FormCheck.Label>
            
           
      
      
    
          </FormCheck>
        
          
        </div>
        
          
      </div>

      <div className="intro-y box mb-5 px-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.details3.title')}`}
                  </h2>
                  </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1 mt-6">
        <div className=" flex  ">
        <div className=" mr-48 mt-2 font-medium "> {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.assignOperator.label')}`}</div>
  <TomSelect
    id="update-profile-form-3"
    value={select}
    onChange={setSelect}
    className="w-full"
  >
    <option value="1">Kasun Bandara</option>
    <option value="2">Gayan Perera</option>
    <option value="3">Jayan Bandara</option>
    <option value="4">N.r.j Kasun</option>
  </TomSelect>
</div>
        </div> 
        <div className="grid grid-cols-1 mb-3 border-b py-7 md:grid-cols-1 ">
        <TextareaElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.comment.label'
            )}`}
            register={register}
            name="comment"
            id="comment"
          /></div>
           <div className="grid grid-cols-1 gap-6 mb-5 md:grid-cols-2 mt-6">
           <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.estimatedCost.label'
            )}`}
            register={register}
            name="estimatedCost"
            id="estimatedCost"
          />
          <SearchSelectElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.status.label'
            )}`}
            register={register}
            name="status"
            id="status"
            error={errors.status}
            required
            onChange={handleChange}
          />
            <DateElement
            label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.expectedDeliveryDate.label')}`}
            value={date}
            info={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.expectedDeliveryDate.tooltip')}`}
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
          <UploadFilesElement
            id="attach_document"
            name="attach_document"
            register={register}
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.label'
            )}`}
            variant="primary"
            btnLabel={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.placeolder'
            )}`}
            error={errors.attach_document}
            info={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.tooltip'
            )}`}
          />

   <FormCheck className="mt-3">
  <div className="font-medium">
    {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.sendNotification.label')}`}
  </div>

  <FormCheck.Label className="mr-5">
  </FormCheck.Label>  
            <div className="mr-1 ml-4 font-medium flex"> SMS</div>
      <FormCheck.Input
        className="mr-1 ml-1"
        type="checkbox"
        value=""
      />
     
  
      <div className="mr-2 ml-4 font-medium">Email</div>
      <FormCheck.Input
        className="mr-1 ml-1"
        type="checkbox"
        value=""
      />
      
</FormCheck>

</div></div>
<div className="item-center flex justify-center py-3">
                            <Button
                              variant="secondary"
                              className="mx-auto mb-5 w-fit px-10"
                              onClick={handleMoreInfoClick}
                            >
                              <div className="mx-auto flex">
                                More
                                <Lucide
                                  className="mx-auto ml-1 mt-0.5 h-4 w-4"
                                  icon={
                                    showMoreInfo
                                      ? Icons.UPARROW
                                      : Icons.DOWNARROW
                                  }
                                />
                              </div>
                            </Button>
                          </div>
                          {showMoreInfo && (
                            <>

     <div className="intro-y box mb-5 px-5 py-5">
     
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mb-3 mt-6">
          <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.productConfiguration.label'
            )}`}
            register={register}
            name="productConfiguration"
            id="productConfiguration"
           
          />
           <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.problemReported.label'
            )}`}
            register={register}
            name="problemReported"
            id="problemReported"
           
          />

<InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.condition.label'
            )}`}
            register={register}
            name="condition"
            id="condition"
           
          />
        </div>
      </div>

       <div className="intro-y box mb-5 px-5 py-5">
      {/* <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.title')}`}
                  </h2>
                  </div> */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mb-3 mt-6">
        <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.returnDate.label'
            )}`}
            register={register}
            name="returnDate"
            id="returnDate"
          />
          <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.warentyStatus.label'
            )}`}
            register={register}
            name="warentyStatus"
            id="warentyStatus"
          />
          <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.customerField1.label'
            )}`}
            register={register}
            name="customerField2"
            id="customerField2"
          />
          <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.customerField2.label'
            )}`}
            register={register}
            name="customerField3"
            id="customerField3"
          />
          <InputElement
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.customerField3.label'
            )}`}
            register={register}
            name="customerField4"
            id="customerField4"
          />
        </div>    
      </div>
      
      </>
                          )}
       <div className=" flex justify-end">
       <Button
            variant="secondary"
            className="mb-2 mr-1 w-fit"
            onClick={handleSlider}
          >
           Cancel
          </Button>
       <Button
            variant="success"
            className="mb-2 mr-1 w-fit"
          
          >
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
           Save and Add Parts
          </Button>
          <Button
            variant="twitter"
            className="mb-2 mr-1 w-fit"
          >
             {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
           Save and Upload Docs
          </Button>
          {/* <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.save')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button> */}
        </div>
    </form>
  )
}

export default EditJobSheet
