/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useState, useRef } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../../components/common/button'
import { InputElement, SelectElement } from '../../../components/common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../../components/common/loading-icon'
import {
  TextareaElement,
  DateElement,
  SearchSelectElement,
  ImageUploadElement,
} from '../../../components/common/form-elements'
import Lucide from '../../../components/common/lucide'
import { AlignmentTypes } from '../../../constants/common-enums'
import { Menu, Dialog } from '../../../components/common/headless'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import TomSelect from '../../../components/common/tom-select'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import {
  FormInput,
  FormCheck,
  InputGroup,
  FormSelect,
  FormLabel,
  FormInfo,
  FormRequiredLabel,
  FormRequiredIcon,
} from '../../../components/common/form-elements/components'
import Table from '../../../components/common/table'

function AddJobSheet() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

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
      isRecuring: yup
      .string()
      .required(
        `${t('expensesForm.paymentForm.fields.isRecuring.validationMessage')}`
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


  const [date, setDate] = useState('')


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
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleChangeHide = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsCheckboxChecked(event.target.checked);
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              Edit Expense
              
              </h2>
            </h2>
            
          </div>
          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      {/* <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.details1.label')}`}
                  </h2>
      </div> */}
<div className="grid grid-cols-1 gap-7 mt-3 md:grid-cols-2 mb-3">
<SearchSelectElement
            label={`${t('expensesForm.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
            onChange={handleChange}
            error={errors.businessLocation}
            required

          />
            <SearchSelectElement
             label={`${t('expensesForm.fields.expensesCategory.label')}`}
            register={register}
            name="expensesCategory"
            id="expensesCategory"
            onChange={handleChange}

          />
           <SearchSelectElement
           label={`${t('expensesForm.fields.expensesSubCategory.label')}`}
            register={register}
            name="expensesSubCategory"
            id="expensesSubCategory"
            onChange={handleChange}
          />
          
             <InputElement
           label={`${t('expensesForm.fields.referenceNo.label')}`}
            register={register}
            name="referenceNo"
            id="referenceNo"
          />
                
<DateElement
              label={`${t('expensesForm.fields.date.label')}`}
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
            error={errors.date}
            required
            name="date"
            id="date"
          />
          
          <SearchSelectElement
           label={`${t('expensesForm.fields.expensesFor.label')}`}
            register={register}
            name="expensesFor"
            id="expensesFor"
            onChange={handleChange}
            info={`${t('expensesForm.fields.expensesFor.tooltip')}`}
          />
          <SearchSelectElement
          label={`${t('expensesForm.fields.expensesForContact.label')}`}
            register={register}
            name="expensesForContact"
            id="expensesForContact"
            onChange={handleChange}
          
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
<InputElement
            label={`${t('expensesForm.fields.totalAmount.label')}`}
            required
            register={register}
            name="total_amount"
            placeholder={`${t('expensesForm.fields.totalAmount.placeolder')}`}
            id="total_amount"
            error={errors.total_amount}
            type="text"
          />
          <TextareaElement
            label={`${t('expensesForm.fields.expensesNote.label')}`}
            register={register}
            name="total_amount"
          />

          
        </div>

      </div>
     
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
          <div className="mb-3 mt-2 flex justify ">
          <FormCheck >

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-1 flex" htmlFor="vertical-form-3">
 <div className="mr-1 font-medium">{`${t('expensesForm.fields.isRecuring.label')}`}</div>
 <FormInfo
                  tooltip={`${t('expensesForm.fields.isRecuring.tooltip')}`}
                />
</FormCheck.Label>
</FormCheck>

          <div className="font-medium flex mr-4 ml-8">
          <div className="flex mt-2.5 mr-6">   {`${t('expensesForm.fields.recuringInterval.label')}`}
          <div className="ml-2">  <FormInfo 
                  tooltip={`${t('expensesForm.fields.isRecuring.tooltip')}`}
                /> </div> <div className="mx-1 hidden sm:flex">
                <FormRequiredLabel />
              </div>
              <div className=" sm:hidden">
                <FormRequiredIcon />
              </div></div> <InputGroup className=" flex-1">
                <FormInput type="text" />
              </InputGroup> <FormSelect className="ml-2 mr-2 flex-1 ">
                <FormInput type="text" />
              </FormSelect>
          
          
          </div>
          <InputElement
           label={`${t('expensesForm.fields.noOfRepetitions.label')}`}
            register={register}
            name="total_amount"
            placeholder={`${t('expensesForm.fields.noOfRepetitions.placeolder')}`}
            info={`${t('expensesForm.fields.noOfRepetitions.tooltip')}`}
            id="total_amount"
            type="text"
          />                  
          </div> </div>
   
       <div className=" flex justify-end">
       <Button
                          type="button"
                          variant="outline-secondary"
                          as="a"
                          href="/expenses/listExpenses"
                          className="mb-2 mr-1 w-24"
                        >
                          Cancel
                        </Button>

          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.update')}`}
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

export default AddJobSheet
