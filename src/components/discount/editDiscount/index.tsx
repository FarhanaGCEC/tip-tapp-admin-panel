/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import { SetStateAction, useState,useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  SearchSelectElement,
  SelectElement,
  InputElement,
  DateElement,
} from '../../common/form-elements'
import { FormInfo, FormCheck } from '../../common/form-elements/components'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import UploadFilesElement from '../../common/form-elements/upload-files-element'
import Table from '../../common/table'
import Lucide from '../../common/lucide'
import { Menu, Dialog } from '../../common/headless'

function EditDiscount() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      supplier: yup
        .string()
        .required(
          `${t(
            'purchases.fields.supplier.validationMessage'
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
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
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
  const handleChange = () => { }
  const [daterange, setDaterange] = useState('')
  const [date, setDate] = useState('')

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y mb-5 box p-5">

        <div className="grid gap-7 mb-5 md:grid-cols-2">
        <InputElement
         label={`${t('sales.fields.discounts.fields.name.label')}`}
                  register={register}
                  name="name"
                  id="name"
                  required
                  error={errors.name}
                />
                 <InputElement
         label={`${t('sales.fields.discounts.fields.products.label')}`}
                  register={register}
                  name="products"
                  id="products"
                />
        <SearchSelectElement
         label={`${t('sales.fields.discounts.fields.brand.label')}`}
                  register={register}
                  name="brand"
                  id="brand"
                  onChange={handleChange}
                  iconLeft={Icons.USER}
                 
                />
                <SearchSelectElement
         label={`${t('sales.fields.discounts.fields.category.label')}`}
                  register={register}
                  onChange={handleChange}
                  name="category"
                  id="category"
                />
               
               <SearchSelectElement
         label={`${t('sales.fields.discounts.fields.location.label')}`}
                  register={register}
                  onChange={handleChange}
                  name="location"
                  id="location"
                  required
                  error={errors.location}
                />
 <InputElement
         label={`${t('sales.fields.discounts.fields.priority.label')}`}
                  register={register}
                  name="name"
                  id="name"
                  info="sales.fields.discounts.fields.priority.tooltip"
                />
        <SearchSelectElement
         label={`${t('sales.fields.discounts.fields.discountType.label')}`}
                  register={register}
                  onChange={handleChange}
                  name="discountType"
                  id="discountType"
                  required
                  error={errors.discountType}
                />
 <InputElement
         label={`${t('sales.fields.discounts.fields.discountAmount.label')}`}
                  register={register}
                  name="discountAmount"
                  id="discountAmount"
                  required
                  error={errors.discountType}
                />
        <DateElement
            label={`${t('sales.fields.discounts.fields.startsAt.label')}`}
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
            name="startsAt"
            id="startsAt"
          />
          <DateElement
            label={`${t('sales.fields.discounts.fields.endsAt.label')}`}
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
            name="endsAt"
            id="endsAt"
          />
                   
          <FormCheck className="mt-3">
          <div className="mr-2 font-medium">{`${t(
              'sales.fields.discounts.fields.applySellingPrice.label'
            )}`}</div>
           

            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
            
            </FormCheck.Label>
          </FormCheck>
          <FormCheck className="">
          <div className="mr-2 font-medium">{`${t(
              'sales.fields.discounts.fields.applyCustomer.label'
            )}`}</div>
           

            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
            
            </FormCheck.Label>
          </FormCheck>
          <FormCheck className="mt-3">
          <div className="mr-2 font-medium">{`${t(
              'sales.fields.discounts.fields.applyPromoCode.label'
            )}`}</div>
           

            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
            
            </FormCheck.Label>
          </FormCheck>
          <FormCheck className="">
          <div className="mr-2 font-medium">{`${t(
              'sales.fields.discounts.fields.isActive.label'
            )}`}</div>
           

            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
            
            </FormCheck.Label>
          </FormCheck>
        </div>
        <div className="flex justify-end mt-7 text-center">
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

export default EditDiscount
