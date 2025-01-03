/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../../components/common/table'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import {SetStateAction, useRef, useState } from 'react'
import Button from '../../../components/common/button'
import Tippy from '../../../components/common/tippy'
import Lucide from '../../../components/common/lucide'
import { Menu, Tab, Dialog, Disclosure } from '../../../components/common/headless'
import Pagination from '../../../components/common/pagination'
import {
  FormInput,
  FormSelect,
  FormInfo,
  FormCheck,
  FormLabel,
  FormInline,
  InputGroup,
    Litepicker,
} from '../../../components/common/form-elements/components'
import {
  SearchSelectElement,
  DateElement,
  SelectElement,
  TextareaElement,
  InputElement,
  ImageUploadElement,
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import ShortcutKey from '../../../components/common/shortcut-key'
import { Icons, NotificationTypes } from '../../../constants'
import Alert from "../../../base-components/Alert"
import { AlignmentTypes } from '../../../constants/common-enums'
import LoadingIcon from '../../../components/common/loading-icon'
import clsx from 'clsx'
import ClassicEditorElement from '../../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { PosApi } from '../../../api'
import TomSelect from '../../../components/common/tom-select'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {
  const posApi = PosApi.useAPI()
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sliderSize, setSliderSize] = useState('xl')
  const { t } = useTranslation('pos')
  const schema = yup
  .object({
    customer: yup
      .string()
      .required(
        `${t('sales.fields.addQuotation.fields.customer.validationMessage')}`
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
const { setNotification } = SharedDataContainer.useContainer()

  const [sliderContent, setSliderContent] = useState({
    header: '',
    children: <div />,
    footer: <div />,
  })
  const handleClick = ({ title, component }: FormContent) => {
    handleSlider()
    setSliderContent({
      header: title,
      children: component,
      footer: <div />,
    })
    setSliderSize('xl')
  }

  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addProducts)
    }
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
  const [date, setDate] = useState('')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [tooltipContent1] = useState(
    'Status which are not marked as completed will be displayed here.'
  )
  const [tooltipContent2] = useState(
    'Status which are marked as completed will be displayed here.'
  )
  const [productPricePreview, setproductPricePreview] = useState(false) 
  const [paidPaymentsPreview, setPaidPaymentsPreview] = useState(false)
  const [paidViewPreview,  setPaidViewPreview] = useState(false)  
  const [sendNotificationsPreview,  setSendNotificationsPreview] = useState(false) 
  const [checked, setChecked] = useState(false)
  const [editPaymentPreview, setEditPaymentPreview] = useState(false) 
  const [exchangePreview, setExchangePreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [editorDataExpensesNote, setEditorDataExpensesNote] = useState(
    `<p>${t(
      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.placeolder'
    )}.</p>`
  )
  const [daterange, setDaterange] = useState('')
  const [selectMultiple, setSelectMultiple] = useState(['1', '5'])
  const [selectMultipleOne, setSelectMultipleOne] = useState(['1', '6'])
  const [selectedOption, setSelectedOption] = useState('')
  const [sellReturnPreview, setSellReturnPreview] = useState(false) 
  const [categoryPreview, setCategoryPreview] = useState(false) 
  const [salePreview, setSalePreview] = useState(false) 

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedOption(event.target.value)
  }
  const options = [
    { id: 0, name: 'Cash' },
    { id: 1, name: 'Card' },
    { id: 2, name: 'Cheque' },
    { id: 3, name: 'Bank Transfer' },
    { id: 4, name: 'Other Payments' },
    { id: 5, name: 'Customer Payment' },
  ]
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)
  const [showMoreInfo2, setShowMoreInfo2] = useState(false)
  const handleMoreInfoClick2 = () => {
    setShowMoreInfo2(!showMoreInfo2)
  }
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

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              Add Quotation 
                
              </h2>
            </h2>
            
          </div>

          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
          <div className="mb-3 mt-2 grid grid-cols-1  sm:grid-cols-2">

          <SearchSelectElement
          label={`${t('sales.fields.filters.fields.businessLocation.label')}`}
            register={register}
            name="location"
            id="location"
            onChange={handleChange}
            iconLeft={Icons.LOCATION}
            // iconRight={Icons.INFO}
            info={`${t('sales.fields.addQuotation.fields.location.info')}`}
          />
          </div> </div>
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <Disclosure.Group>
                      <Disclosure>
                      <Disclosure.Button className="px-5 flex items-center">
                      Filters  <Lucide icon="Filter" className="w-4 h-4 ml-2" />
          
            {/* <Button className="px-2" variant="primary"  >
             
                <Lucide icon="Filter" className="w-5 h-5 " />
             
            </Button> */}
            
</Disclosure.Button>

                        <Disclosure.Panel className="leading-relaxed ">
                        <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-4">
                        <SearchSelectElement
           label={`${t('sales.fields.addQuotation.fields.defaultSellingPrice.label')}`}
            register={register}
            name="defaultSellingPrice"
            id="defaultSellingPrice"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            info={`${t('sales.fields.addQuotation.fields.defaultSellingPrice.tooltip')}`}
            // iconLeft={Icons.DOLLARSIGN}
          />
           <SearchSelectElement
           label={`${t('sales.fields.addQuotation.fields.typesServices.label')}`}
            register={register}
            name="typesServices"
            id="typesServices"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            info={`${t('sales.fields.addQuotation.fields.typesServices.tooltip')}`}
            
          />
      
                   <FormCheck className="mt-7">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2 flex" htmlFor="vertical-form-3">
 <div className="mr-2 font-medium">{`${t('sales.fields.addQuotation.fields.subscribe.label')}`}</div>
 <FormInfo
                  tooltip={`${t('sales.fields.addQuotation.fields.subscribe.tooltip')}`}
                />
</FormCheck.Label>
</FormCheck>
                  <SearchSelectElement
           label={`${t('sales.fields.addQuotation.fields.customer.label')}`}
            register={register}
            name="customer"
            id="customer"
            required
            error={errors.customer}
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            iconRight={Icons.PLUSCIRCLE}
            onClickRight={() => { 
              setCategoryPreview(true)
            }}
            // iconLeft={Icons.GIFT}
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
                <form className="validate-form" onSubmit={handleSubmit(onSubmit)} >
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
          <div className="font-medium">
          <div className="flex">   {`${t('sales.fields.addQuotation.fields.payTerm.label')}`} <div className="ml-2">  <FormInfo 
                  tooltip={`${t('sales.fields.addQuotation.fields.payTerm.tooltip')}`}
                /> </div> </div>
          <div className="flex mt-2">
           
                                  <InputGroup className=" flex-1">
                                    <FormInput type="text" />
                                  </InputGroup> <FormSelect className="ml-2 flex-1 ">
                                    <FormInput type="text" />
                                  </FormSelect></div>
          
          </div>
         
           <SearchSelectElement
           label={`${t('sales.fields.addQuotation.fields.commissionAgent.label')}`}
            register={register}
            name="commissionAgent"
            id="commissionAgent"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
           <DateElement
           labelAlignment={AlignmentTypes.BLOCK}
            label={`${t('sales.fields.addQuotation.fields.saleDate.label')}`}
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
            required
            error={errors.date}
          />
           <SearchSelectElement
           label={`${t('sales.fields.addQuotation.fields.invoiceScheme.label')}`}
            register={register}
            name="invoiceScheme"
            id="invoiceScheme"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          
 <SearchSelectElement
           label={`${t('sales.fields.addQuotation.fields.saleType.label')}`}
            register={register}
            name="saleType"
            id="saleType"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            iconRight={Icons.PLUSCIRCLE}
            onClickRight={() => { 
              setSalePreview(true)
            }}
            />

            <Dialog
              size="lg"
              open={salePreview}
              onClose={() => {
                setSalePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'sales.fields.addQuotation.fields.addNewSale.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setSalePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'sales.fields.addQuotation.fields.addNewSale.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
                  
                  <InputElement
                    label={`${t(
                      'sales.fields.addQuotation.fields.addNewSale.fields.description.label'
                    )}`}
                    register={register}
                    name="description"
                    id="description"
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
                      setSalePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
            
           <SearchSelectElement
           label={`${t('sales.fields.addQuotation.fields.serviceStaff.label')}`}
            register={register}
            name="serviceStaff"
            id="serviceStaff"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
   
      </div>
      <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        
        <div>     
        <div className="grid grid-cols-1 gap-7 mt-5 md:grid-cols-1 Flex">
        <div className="flex flex-col sm:flex-row">
  <div className="relative flex-grow sm:w-auto mr-2">
    <FormInput
      type="text"
      className="box custom-input"
      placeholder="Enter Product Name/SKU/Scan Bar Code"
    />
    <Lucide
      icon="Search"
      className="absolute inset-y-0 right-0 my-auto h-5 w-8"
    />
  </div>
  <Button
    variant="primary"
    className="shadow-md ml-2 sm:ml-0 w-full sm:w-auto"
    onChange={handleChange}
     onClick={() => handleClick(SlideoverRegistry.addProducts)}
  >
    Add Product
  </Button>
</div>

                        <div className="overflow-y-auto overflow-x-scroll ">
                          <Table bordered>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Products
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Price inc. tax
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Subtotal
                                </Table.Th>
                               
                               
                               
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  100 Pc(s)
                                </Table.Td>
                                
                                <Table.Td className="!px-4">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
         
                              </Table.Tr>
           
                            </Table.Tbody>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Items : 100
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                               
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                             20,000,000.00
                                </Table.Th>
                               
                               
                               
                              </Table.Tr>
                            </Table.Thead>
                          </Table>

                          <Dialog
                            open={deleteConfirmationModal}
                            onClose={() => {
                              setDeleteConfirmationModal(false)
                            }}
                            initialFocus={deleteButtonRef}
                          >
                            <Dialog.Panel>
                              <div className="p-5 text-center">
                                <Lucide
                                  icon="XCircle"
                                  className="mx-auto mt-3 h-16 w-16 text-danger"
                                />
                                <div className="mt-5 text-3xl">
                                  Are you sure?
                                </div>
                                <div className="mt-2 text-slate-500">
                                  Do you really want to delete these records?{' '}
                                  <br />
                                  This process cannot be undone.
                                </div>
                              </div>
                              <div className="px-5 pb-8 text-center">
                                <Button
                                  variant="outline-secondary"
                                  type="button"
                                  onClick={() => {
                                    setDeleteConfirmationModal(false)
                                  }}
                                  className="mr-1 w-24"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="danger"
                                  type="button"
                                  className="w-24"
                                  ref={deleteButtonRef}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Dialog.Panel>
                          </Dialog>
                        </div>
 </div> 
          </div> 

        </div>
        <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        <div className="flex flex-col border-b  font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('sales.fields.addQuotation.fields.discount.title')}`}
                  </h2>
                  </div>
        <div className="grid grid-cols-1 gap-7 mt-5 md:grid-cols-2">
        <SelectElement
            label={`${t('sales.fields.addQuotation.fields.discountType.label')}`}
            register={register}
            name="discountType"
            id="discountType"
            error={errors.discountType}
            required
          />
          <InputElement
            label={`${t('sales.fields.addQuotation.fields.discountAmount.label')}`}
            register={register}
            type="number"
            name="discountAmount"
            id="discountAmount"
            error={errors.discountAmount}
            required
          />
          <div className="mt-2 mb-2 font-medium">
          {`${t('sales.fields.addQuotation.fields.discountAmount.label')}`} : { ' (-) Rs.100.00 ' }
          </div>
         </div>  
         </div>
        <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        <div className="flex flex-col border-b  font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('sales.fields.addQuotation.fields.starPoints.title')}`}
                  </h2>
                  </div>
        <div className="grid grid-cols-1 gap-7 mt-5 md:grid-cols-2">
        <InputElement
            label={`${t('sales.fields.addQuotation.fields.redeemed.label')}`}
            register={register}
            name="redeemed"
            id="redeemed"
          />
         <div className="mt-2 font-medium">
          {`${t('sales.fields.addQuotation.fields.available.label')}`} : { ' Rs.100.00 ' }
          </div>
          <div className="mt-2 mb-2 font-medium">
          {`${t('sales.fields.addQuotation.fields.redeemedAmount.label')}`} : { ' (-) Rs.100.00 ' }
          </div>
         </div> </div>
         <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
     
        <div className="grid grid-cols-1 gap-7 mt-5 md:grid-cols-2">
        <SelectElement
            label={`${t('sales.fields.addQuotation.fields.orderTax.label')}`}
            register={register}
            name="orderTax"
            id="orderTax"
            error={errors.orderTax}
            required
          />
         
          <div className="mt-2 mb-2 font-medium">
          {`${t('sales.fields.addQuotation.fields.orderTax.label')}`} : { ' (+) Rs.100.00 ' }
          </div>
          <InputElement
            label={`${t('sales.fields.addQuotation.fields.shippingDetails.label')}`}
            register={register}
            name="shippingDetails"
            id="shippingDetails"
          />
          <InputElement
            label={`${t('sales.fields.addQuotation.fields.deliveryAddress.label')}`}
            register={register}
            name="deliveryAddress"
            id="deliveryAddress"
          />
          <InputElement
            label={`${t('sales.fields.addQuotation.fields.deliveryCharges.label')}`}
            register={register}
            name="deliveryCharges"
            id="deliveryCharges"
            type="number"
          />
          <SelectElement
            label={`${t('sales.fields.addQuotation.fields.shippingStatus.label')}`}
            register={register}
            name="shippingStatus"
            id="shippingStatus"
          />
          <InputElement
            label={`${t('sales.fields.addQuotation.fields.deliveredTo.label')}`}
            register={register}
            name="deliveredTo"
            id="deliveredTo"
          />
                    <div>
            <FormLabel className="font-medium" id="commission">
              {`Total Payable `} : {'0.00 ' }
            </FormLabel>
            <p className="text-slate-1000 -mt-2 text-xs">{`(Round Off: 0) `}</p>
           
          </div>
          <TextareaElement
  label={`${t('sales.fields.addQuotation.fields.sellNote.label')}`}
  register={register}
  name="sellNote"
  id="sellNote"
 
/>

         </div> 
         <div className="mt-5 flex justify-end">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.save')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>
          <Button type="submit" variant="soft-primary" className="mb-2 mr-1 w-32">
            Save & print
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>
        </div> 
         </div>
        <ShortcutKey onKeyUp={handleKeyUp} />
      <SlideoverPanel
        close
        size={sliderSize}
        heading={sliderContent.header}
        footer={sliderContent.footer}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default Main
