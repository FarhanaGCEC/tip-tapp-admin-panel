/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../../components/common/button'

import {
  ImageUploadElement,
  InputElement,
  SearchSelectElement,
  SelectElement,
} from '../../../components/common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../../components/common/loading-icon'
import ClassicEditorElement from '../../../components/common/form-elements/classic-editor-element'
import Lucide from '../../../components/common/lucide'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import VariationTableElement from './variationTable-element'
import FormSwitchElement from '../../../components/common/form-elements/formswitch-element'
import {
  FormCheck,
  FormLabel,
  FormInfo,
} from '../../../components/common/form-elements/components'

function AddProducts() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      product_id: yup
        .string()
        .required(`${t('productManagement.fields.productName.validationMessage')}`),
      barcode_type: yup
        .string()
        .required(`${t('productManagement.fields.barcodeType.validationMessage')}`),
      unit_id: yup
        .string()
        .required(`${t('productManagement.fields.unit.validationMessage')}`),
      enable_product_description_id: yup
        .string()
        .required(
          `${t(
            'productManagement.fields.enableProductDescription.validationMessage'
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessHandlerCreateProduct = (product: any, message: string) => {
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
      sucessHandlerCreateProduct(customer, message)
    } else {
      errorHandler(null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }

  // eslint-disable-next-line prettier/prettier
  const handleChange = () => {}

  const [editorData] = useState(
    `<p>${t('productForm.fields.productDescription.placeolder')}.</p>`
  )

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }
  const [isChecked, setIsChecked] = useState(false)
  const handleCheckChange = () => {
    setIsChecked(!isChecked)
  }

  return (
<div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
                {`${t('productManagement.fields.addNewProduct.title')}`}
                <Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button>
              </h2>
            </h2>
            
          </div>
         <div className="intro-y box mb-5 mt-5 px-5 py-8 ">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputElement
            label={`${t('productManagement.fields.productName.label')}`}
            register={register}
            name="product_id"
            placeholder={`${t('productManagement.fields.productName.placeolder')}`}
            id="product_id"
            error={errors.product_id}
            required
          />
          <InputElement
            label={`${t('productManagement.fields.barcodeType.label')}`}
            register={register}
            name="barcode_type"
            placeholder={`${t('productManagement.fields.barcodeType.placeolder')}`}
            id="barcode_type"
            error={errors.barcode_type}
            required
            
          />
          <InputElement
            label={`${t('productManagement.fields.skuBarcodeNo.label')}`}
            register={register}
            name="sku_barcode_no"
            placeholder={`${t('productManagement.fields.skuBarcodeNo.placeolder')}`}
            id="sku_barcode_no"
            error={errors.sku_barcode_no}
            info={`${t('productManagement.fields.skuBarcodeNo.tooltip')}`}
          />
          <SearchSelectElement
            label={`${t('productManagement.fields.unit.label')}`}
            register={register}
            name="unit_id"
            id="unit_id"
            error={errors.unit_id}
            iconRight={Icons.PLUSCIRCLE}
            required
            onChange={handleChange}
            // eslint-disable-next-line prettier/prettier
            onClickRight={() => {}}
          />
          <InputElement
            label={`${t('productManagement.fields.relatedSubUnit.label')}`}
            register={register}
            name="relatedSubUnit"
            placeholder={`${t('productManagement.fields.relatedSubUnit.placeolder')}`}
            id="relatedSubUnit"
            info={`${t('productManagement.fields.relatedSubUnit.tooltip')}`}
          />
          <SearchSelectElement
            label={`${t('productManagement.fields.brand.label')}`}
            register={register}
            name="brand_id"
            id="brand_id"
            error={errors.brand_id}
            iconRight={Icons.PLUSCIRCLE}
            onChange={handleChange}
            // eslint-disable-next-line prettier/prettier
            onClickRight={() => {}}
          />
          <SearchSelectElement
            label={`${t('productManagement.fields.category.label')}`}
            register={register}
            name="category_id"
            id="category_id"
            error={errors.category_id}
            iconRight={Icons.PLUSCIRCLE}
            onChange={handleChange}
            // eslint-disable-next-line prettier/prettier
            onClickRight={() => {}}
          />
          <SelectElement
            label={`${t('productManagement.fields.subCategory.label')}`}
            register={register}
            name="sub_category_id"
            id="sub_category_id"
          />
          <SelectElement
            label={`${t('productManagement.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
            info={`${t('productManagement.fields.businessLocation.tooltip')}`}
          />

          <FormCheck className="">
            <div className="mr-10 font-medium">
              {`${t(
                'productManagement.fields.manageStock.label'
              )}`}
            </div>

           

            <div className="mx-1 mr-5 flex">
              <FormInfo
                tooltip={`${t(
                  'productManagement.fields.manageStock.tooltip'
                )}`}
              />
            </div>
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              checked={isChecked}
              onChange={handleCheckChange}
            />
            <FormCheck.Label className="" htmlFor="vertical-form-3">
              <div className="ml-1 font-medium">
                {`${t(
                  'productManagement.fields.manageStock.placeolder'
                )}`}
              </div>
            </FormCheck.Label>
          </FormCheck>
          {isChecked && (
            <InputElement
              label={`${t(
                'productManagement.fields.alertQuantity.label'
              )}`}
              register={register}
              name="alertQuantity"
              placeholder={`${t(
                'productManagement.fields.alertQuantity.placeolder'
              )}`}
              id="alertQuantity"
              error={errors.alertQuantity}
            />
          )}
          <SelectElement
            label={`${t('productManagement.fields.warranty.label')}`}
            register={register}
            name="warranty"
            id="warranty"
            error={errors.warranty}
          />
          <SelectElement
            label={`${t('productManagement.fields.deviceModel.label')}`}
            register={register}
            name="deviceModel"
            id="deviceModel"
            error={errors.deviceModel}
          />
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-2 md:pr-10">
            <ClassicEditorElement
              label={`${t('productManagement.fields.productDescription.label')}`}
              register={register}
              required
              value={editorData}
              // onChange={setEditorData}
            />
          </div>
          <div className="col-span-1 md:pl-10">
            <div className="intro-x flex items-center">
              <FormLabel>{`${t(
                'productManagement.fields.productImage.label'
              )}`}</FormLabel>
              <div className="mb-2 ml-3 flex text-slate-600 dark:text-slate-500">
                <Lucide icon="Image" className="mr-1 h-4 w-4" />
                {`${t('productManagement.fields.productImage.placeolder')}`}
              </div>
            </div>
            <div className="justify-start">
              <ImageUploadElement
                image={productPlaceholder}
                alt={`${t('productManagement.fields.productImage.imageAlt')}`}
                removeImageContent="Remove this photo?"
                buttonLabel="Change Photo"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="intro-y box mb-5 p-5 py-8 mt-5">
        <div className=" grid grid-cols-1 gap-6 md:grid-cols-2">
          <SelectElement
            label={`${t('productManagement.fields.applicableTax.label')}`}
            register={register}
            name="applicable_tax_id"
            id="applicable_tax_id"
            error={errors.applicable_tax_id}
          />
          <SelectElement
            label={`${t('productManagement.fields.sellingPriceTaxType.label')}`}
            register={register}
            name="sellingPriceTaxType"
            id="sellingPriceTaxType"
            error={errors.sellingPriceTaxType}
            required
          />
          <SelectElement
            label={`${t('productManagement.fields.productType.label')}`}
            register={register}
            name="productType"
            id="productType"
            error={errors.productType}
            required
            info={`${t('productManagement.fields.productType.tooltip')}`}
          />
         
  
          <div/>
         
        </div>
        <VariationTableElement
    register={register}/>
      </div>
      <div className="item-center flex justify-center py-3">
                            <Button
                              variant="primary"
                              className="mx-auto mb-5 w-fit px-28"
                              onClick={handleMoreInfoClick}
                            >
                              <div className="mx-auto">
                                {`${t('common.button.moreInfo')}`}
                                <Lucide
                                  className="mx-auto -mt-1 h-4 w-4"
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
                           <div className="intro-y box mb-5 py-8 p-5">
                           <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                             <FormSwitchElement
                               label={`${t('productManagement.fields.enableProductDescription.label')}`}
                               register={register}
                               name="enable_product_description_id"
                               id="enable_product_description_id"
                               info={`${t('productManagement.fields.enableProductDescription.tooltip')}`}
                             />
                             <FormSwitchElement
                               label={`${t('productManagement.fields.notForSelling.label')}`}
                               register={register}
                               name="not_for_selling_id"
                               id="not_for_selling_id"
                               info={`${t('productManagement.fields.notForSelling.tooltip')}`}
                             />
                              <FormSwitchElement
                               label={`${t('productManagement.fields.enableImei.label')}`}
                               register={register}
                               name="enable_imei_id"
                               id="enable_imei_id"
                               info={`${t('productManagement.fields.enableImei.tooltip')}`}
                             />
                             <FormSwitchElement
                               label={`${t('productManagement.fields.enableB2B.label')}`}
                               register={register}
                               name="enable_b2b_product_share_id"
                               id="enable_b2b_product_share_id"
                             />
                             <FormSwitchElement
                               label={`${t('productManagement.fields.desableWoocommerceSync.label')}`}
                               register={register}
                               name="woocommerce_sync_id"
                               id="woocommerce_sync_id"
                               info={`${t('productManagement.fields.desableWoocommerceSync.tooltip')}`}
                             />
                            
                             <div />
                           </div>
                           <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                             <InputElement
                               label={`${t('productManagement.fields.weight.label')}`}
                               register={register}
                               name="weight_id"
                               id="weight_id"
                               placeholder={`${t('productManagement.fields.weight.label')}`}
                             />
                             <InputElement
                               label={`${t('productManagement.fields.maximumSalesQuantity.label')}`}
                               register={register}
                               name="maximum_sales_quantity_id"
                               id="maximum_sales_quantity_id"
                               info={`${t('productManagement.fields.maximumSalesQuantity.tooltip')}`}
                               placeholder={`${t('productManagement.fields.maximumSalesQuantity.label')}`}
                             />
                           </div>
                           <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                             <InputElement
                               label={`${t('productManagement.fields.customerField.label')}`}
                               register={register}
                               name="customer_field_id"
                               id="customer_field_id"
                               placeholder={`${t('productManagement.fields.customerField.label')}`}
                             />
                             <InputElement
                               label={`${t('productManagement.fields.customerField.label')}`}
                               register={register}
                               name="customer_field_id"
                               id="customer_field_id"
                               placeholder={`${t('productManagement.fields.customerField.label')}`}
  
                             />
                             <InputElement
                               label={`${t('productManagement.fields.customerField.label')}`}
                               register={register}
                               name="customer_field_id"
                               id="customer_field_id"
                               placeholder={`${t('productManagement.fields.customerField.label')}`}
  
                             />
                             <InputElement
                               label={`${t('productManagement.fields.customerField.label')}`}
                               register={register}
                               name="customer_field_id"
                               id="customer_field_id"
                               placeholder={`${t('productManagement.fields.customerField.label')}`}
                             />
                           </div>
                           
                           
                         </div>
                            )}
      
      <div className=" flex justify-end">
                            
                             <Button
                               variant="secondary"
                               className="mb-2 mr-1 w-24"
                              
                             >
                               {`${t('common.button.cancel')}`}
                             </Button>
                             <Button
                               variant="soft-danger"
                               className="mb-2 mr-1 w-48"
                             >
                               {`${t('common.button.savenAddSelling')}`}
                             </Button>
                             <Button
                               variant="soft-pending"
                               className="mb-2 mr-1 w-48"
                             >
                               {`${t('common.button.savenAddOpeningStock')}`}
                             </Button>
                             <Button
                               variant="soft-primary"
                               className="mb-2 mr-1  w-48"
                             >
                               {`${t('common.button.savenAddAnother')}`}
                             </Button>
                             <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
                               {`${t('common.button.save')}`}
                               {isLoading ? (
                                 <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
                               ) : (
                                 ''
                               )}
                             </Button>
                           </div>
                           </div>
  )
}

export default AddProducts
