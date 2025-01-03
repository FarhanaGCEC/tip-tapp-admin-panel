/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Dialog, Menu } from '../../common/headless'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  ImageUploadElement,
  InputElement,
  SearchSelectElement,
  SelectElement,
  TextareaElement,
} from '../../common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import VariationTableElement from './variationTable-elements'
import VariationTableOpeningStockElement from './variationTableOpeningStock-elements'
import LoadingIcon from '../../common/loading-icon'
import Lucide from '../../common/lucide'
import {
  FormCheck,
  FormInfo,
  FormInput,
  FormLabel,
} from '../../common/form-elements/components'
import ClassicEditorElement from '../../common/form-elements/classic-editor-element'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import FormSwitchElement from '../../common/form-elements/formswitch-element'

function nonReceipt() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [type, setType] = useState([
    { id: 0, name: ' Type' },
    { id: 2, name: 'Type2' },
    { id: 3, name: 'Type3' },
  ])
  const [group, setGroup] = useState([
    { id: 0, name: ' Group' },
    { id: 2, name: 'Group2' },
    { id: 3, name: 'Group' },
  ])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [date, setDate] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
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
    setChecked(!checked)
  }
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo)
  }
  const [productPreview, setProductPreview] = useState(false)

  const [editorData] = useState(
    `<p>${t('productForm.fields.productDescription.placeolder')}.</p>`
  )

  const [isChecked, setIsChecked] = useState(false)
  const handleCheckChange = () => {
    setIsChecked(!isChecked)
  }
  const [unitPreview, setUnitPreview] = useState(false)
  const [brandPreview, setBrandPreview] = useState(false)
  const [Decimaltype] = useState([
    { id: 0, name: 'Please Select' },
    { id: 1, name: ' Yes' },
    { id: 2, name: 'No' },
  ])
  const [categoryPreview, setCategoryPreview] = useState(false)
  const [checked, setChecked] = useState(false)
  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5 py-10">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <InputElement
            label={`${t('nonreceiptForm.fields.contact.label')}`}
            register={register}
            name="contact"
            placeholder={`${t('nonreceiptForm.fields.contact.placeolder')}`}
            id="contact"
            required
            iconLeft={Icons.USER}
          />
          <InputElement
            label={`${t('nonreceiptForm.fields.referenceNo.label')}`}
            register={register}
            name="referenceNo"
            id="referenceNo"
          />
          <InputElement
            label={`${t('nonreceiptForm.fields.purchaseDate.label')}`}
            register={register}
            name="purchaseDate"
            id="purchaseDate"
            required
            error={errors.purchaseDate}
            iconLeft={Icons.CALENDAR}
          />
          <InputElement
            label={`${t('nonreceiptForm.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
            required
            error={errors.businessLocation}
            info={`${t('nonreceiptForm.fields.businessLocation.tooltip')}`}
          />
        </div>
      </div>
      <div className="intro-y box mb-5 px-5 py-10">
        <div className="intro-y flex flex-col items-center sm:flex-row">
          <div className="mr-auto">
            <div className="w-full  sm:ml-auto sm:mt-0 sm:w-auto md:ml-0">
              <div className="relative">
                <FormInput
                  type="text"
                  className="box custom-input pr-100 w-96"
                  placeholder="Enter Product name/ SKU/Scan Bar Code"
                />
                <Lucide
                  icon="Search"
                  className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full sm:mt-0 sm:w-auto">
            <Button
              variant="primary"
              className="mr-2 shadow-md"
              onClick={(event: React.MouseEvent) => {
                event.preventDefault()
                setProductPreview(true)
              }}
            >
              Add New Product
            </Button>
            <Button
              variant="primary"
              className=" mr-2 px-2 "
              onChange={handleChange}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                <Lucide icon="Plus" className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
        <VariationTableElement register={register} />
      </div>
      <Dialog
        size="2xl"
        open={productPreview}
        onClose={() => {
          setProductPreview(false)
        }}
      >
        <Dialog.Panel className="max-h-screen overflow-y-auto">
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">Add New Product</h2>
          </Dialog.Title>
          <a
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setProductPreview(false)
            }}
            className="absolute right-0 top-0 mr-3 mt-3"
            href="#"
          >
            <Lucide icon="X" className="h-8 w-8 text-slate-400" />
          </a>

          <Dialog.Description>
            <div>
              <div className="px-5 py-8 ">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <InputElement
                    label={`${t('productForm.fields.productName.label')}`}
                    register={register}
                    name="product_id"
                    id="product_id"
                    error={errors.product_id}
                    required
                  />
                  <InputElement
                    label={`${t('productForm.fields.barcodeType.label')}`}
                    register={register}
                    name="barcode_type"
                    id="barcode_type"
                    error={errors.barcode_type}
                    required
                  />
                  <InputElement
                    label={`${t('productForm.fields.skuBarcodeNo.label')}`}
                    register={register}
                    name="sku_barcode_no"
                    placeholder={`${t(
                      'productForm.fields.skuBarcodeNo.placeolder'
                    )}`}
                    id="sku_barcode_no"
                    error={errors.sku_barcode_no}
                    info={`${t('productForm.fields.skuBarcodeNo.tooltip')}`}
                  />
                  <SearchSelectElement
                    label={`${t('productForm.fields.unit.label')}`}
                    register={register}
                    name="unit_id"
                    id="unit_id"
                    error={errors.unit_id}
                    iconRight={Icons.PLUSCIRCLE}
                    required
                    onChange={handleChange}
                    onClickRight={() => {
                      setUnitPreview(true)
                    }}
                  />
                  <Dialog
                    size="lg"
                    open={unitPreview}
                    onClose={() => {
                      setUnitPreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                      <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">{`${t(
                          'productManagement.fields.addUnit.title'
                        )}`}</h2>
                      </Dialog.Title>
                      <a
                        onClick={() => {
                          setUnitPreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>

                      <Dialog.Description className="grid gap-7 md:grid-cols-1">
                        <InputElement
                          label={`${t(
                            'productManagement.fields.unitName.label'
                          )}`}
                          register={register}
                          required
                          error={errors.unitName}
                          name="unitName"
                          id="unitName"
                        />
                        <InputElement
                          label={`${t(
                            'productManagement.fields.unitShortName.label'
                          )}`}
                          register={register}
                          required
                          error={errors.unitShortName}
                          name="unitShortName"
                          id="unitShortName"
                        />
                        <SelectElement
                          label={`${t(
                            'productManagement.fields.allowDecimal.label'
                          )}`}
                          register={register}
                          required
                          options={Decimaltype}
                          error={errors.categoryCode}
                          name="allowDecimal"
                          id="allowDecimal"
                        />
                      </Dialog.Description>

                      <div className="mb-3 mt-3 flex justify-end px-4 pb-4 text-center ">
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
                            setUnitPreview(false)
                          }}
                          className="mb-2 mr-1 w-24"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Dialog.Panel>
                  </Dialog>
                  <InputElement
                    label={`${t(
                      'productManagement.fields.relatedSubUnit.label'
                    )}`}
                    register={register}
                    name="relatedSubUnit"
                    id="relatedSubUnit"
                    info={`${t(
                      'productManagement.fields.relatedSubUnit.tooltip'
                    )}`}
                  />
                  <SearchSelectElement
                    label={`${t('productForm.fields.brand.label')}`}
                    register={register}
                    name="brand_id"
                    id="brand_id"
                    error={errors.brand_id}
                    iconRight={Icons.PLUSCIRCLE}
                    onChange={handleChange}
                    // eslint-disable-next-line prettier/prettier
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

                      <div className="mb-3 mt-3 flex justify-end px-4 pb-4 text-center ">
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
                    label={`${t('productForm.fields.category.label')}`}
                    register={register}
                    name="category_id"
                    id="category_id"
                    error={errors.category_id}
                    iconRight={Icons.PLUSCIRCLE}
                    onChange={handleChange}
                    onClickRight={() => {
                      setCategoryPreview(true)
                    }}
                  />
                  <Dialog
                    size="lg"
                    open={categoryPreview}
                    onClose={() => {
                      setCategoryPreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                      <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">{`${t(
                          'productManagement.fields.addCategory.title'
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
                        <InputElement
                          label={`${t(
                            'productManagement.fields.categoryName.label'
                          )}`}
                          register={register}
                          required
                          error={errors.categoryName}
                          name="categoryName"
                          id="categoryName"
                        />

                        <InputElement
                          label={`${t(
                            'productManagement.fields.categoryCode.label'
                          )}`}
                          register={register}
                          required
                          error={errors.categoryCode}
                          name="categoryCode"
                          id="categoryCode"
                          info={`${t(
                            'productManagement.fields.categoryCode.tooltip'
                          )}`}
                        />
                        <TextareaElement
                          label={`${t(
                            'productManagement.fields.description.label'
                          )}`}
                          register={register}
                          name="description"
                          id="description"
                          placeholder={`${t(
                            'productManagement.fields.description.placeolder'
                          )}`}
                        />

                        <FormCheck className="mb-2">
                          <div className="mr-2 font-medium">
                            Add as Sub Taxonomy
                          </div>
                          <FormCheck.Input
                            id="vertical-form-3"
                            type="checkbox"
                            value=""
                            onChange={handleChange}
                          />
                          <FormCheck.Label
                            className="mr-2"
                            htmlFor="vertical-form-3"
                          />
                        </FormCheck>
                        {checked && (
                          <div className="grid grid-cols-1 gap-7 md:grid-cols-1">
                            <SelectElement
                              label={`${t(
                                'productManagement.fields.selectParentCategory.label'
                              )}`}
                              register={register}
                              name="selectParentCategory"
                              id="selectParentCategory"
                            />
                          </div>
                        )}
                      </Dialog.Description>

                      <div className="mb-3 mt-3 flex justify-end px-4 pb-4 text-center ">
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
                  <SelectElement
                    label={`${t('productForm.fields.subCategory.label')}`}
                    register={register}
                    name="sub_category_id"
                    id="sub_category_id"
                    error={errors.sub_category_id}
                  />
                  <SelectElement
                    label={`${t(
                      'productManagement.fields.businessLocation.label'
                    )}`}
                    register={register}
                    name="businessLocation"
                    id="businessLocation"
                    info={`${t(
                      'productManagement.fields.businessLocation.tooltip'
                    )}`}
                  />

                  <FormCheck className="">
                    <div className="mr-10 font-medium">
                      {`${t('productManagement.fields.manageStock.label')}`}
                    </div>
                    <div className="mx-1 mr-10 flex">
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
                      label={`${t(
                        'productManagement.fields.productDescription.label'
                      )}`}
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
                        {`${t(
                          'productManagement.fields.productImage.placeolder'
                        )}`}
                      </div>
                    </div>
                    <div className="justify-start">
                      <ImageUploadElement
                        image={productPlaceholder}
                        alt={`${t(
                          'productManagement.fields.productImage.imageAlt'
                        )}`}
                        removeImageContent="Remove this photo?"
                        buttonLabel="Change Photo"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="intro-y box mb-5 mt-5 p-5 py-8">
                <div className=" grid grid-cols-1 gap-6 md:grid-cols-2">
                  <SelectElement
                    label={`${t(
                      'productManagement.fields.applicableTax.label'
                    )}`}
                    register={register}
                    name="applicable_tax_id"
                    id="applicable_tax_id"
                    error={errors.applicable_tax_id}
                  />
                  <SelectElement
                    label={`${t(
                      'productManagement.fields.sellingPriceTaxType.label'
                    )}`}
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
                    info={`${t(
                      'productManagement.fields.productType.tooltip'
                    )}`}
                  />

                  <div />
                </div>
                <VariationTableElement register={register} />
              </div>
              <div className="intro-y box mb-5 px-5 py-5">
                <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
                  <h2 className="mb-4 mr-auto text-base font-medium">
                    Add Opening Stock
                  </h2>
                </div>
                <VariationTableOpeningStockElement register={register} />
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
                <div className="intro-y box mb-5 p-5 py-8">
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormSwitchElement
                      label={`${t(
                        'productManagement.fields.enableProductDescription.label'
                      )}`}
                      register={register}
                      name="enable_product_description_id"
                      id="enable_product_description_id"
                      info={`${t(
                        'productManagement.fields.enableProductDescription.tooltip'
                      )}`}
                    />
                    <FormSwitchElement
                      label={`${t(
                        'productManagement.fields.notForSelling.label'
                      )}`}
                      register={register}
                      name="not_for_selling_id"
                      id="not_for_selling_id"
                      info={`${t(
                        'productManagement.fields.notForSelling.tooltip'
                      )}`}
                    />
                    <FormSwitchElement
                      label={`${t(
                        'productManagement.fields.enableImei.label'
                      )}`}
                      register={register}
                      name="enable_imei_id"
                      id="enable_imei_id"
                      info={`${t(
                        'productManagement.fields.enableImei.tooltip'
                      )}`}
                    />
                    <FormSwitchElement
                      label={`${t('productManagement.fields.enableB2B.label')}`}
                      register={register}
                      name="enable_b2b_product_share_id"
                      id="enable_b2b_product_share_id"
                    />
                    <FormSwitchElement
                      label={`${t(
                        'productManagement.fields.desableWoocommerceSync.label'
                      )}`}
                      register={register}
                      name="woocommerce_sync_id"
                      id="woocommerce_sync_id"
                      info={`${t(
                        'productManagement.fields.desableWoocommerceSync.tooltip'
                      )}`}
                    />

                    <div />
                  </div>
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputElement
                      label={`${t('productManagement.fields.weight.label')}`}
                      register={register}
                      name="weight_id"
                      id="weight_id"
                    />
                    <InputElement
                      label={`${t(
                        'productManagement.fields.maximumSalesQuantity.label'
                      )}`}
                      register={register}
                      name="maximum_sales_quantity_id"
                      id="maximum_sales_quantity_id"
                      info={`${t(
                        'productManagement.fields.maximumSalesQuantity.tooltip'
                      )}`}
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputElement
                      label={`${t(
                        'productManagement.fields.customerField.label'
                      )}`}
                      register={register}
                      name="customer_field_id"
                      id="customer_field_id"
                    />
                    <InputElement
                      label={`${t(
                        'productManagement.fields.customerField.label'
                      )}`}
                      register={register}
                      name="customer_field_id"
                      id="customer_field_id"
                    />
                    <InputElement
                      label={`${t(
                        'productManagement.fields.customerField.label'
                      )}`}
                      register={register}
                      name="customer_field_id"
                      id="customer_field_id"
                    />
                    <InputElement
                      label={`${t(
                        'productManagement.fields.customerField.label'
                      )}`}
                      register={register}
                      name="customer_field_id"
                      id="customer_field_id"
                    />
                  </div>
                </div>
              )}
            </div>
          </Dialog.Description>
          <div className=" flex justify-end">
            <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
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
              variant="secondary"
              className="mb-2 mr-1 w-24"
              onClick={() => {
                setProductPreview(false)
              }}
            >
              {`${t('common.button.cancel')}`}
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      <div className=" flex justify-end">
        <Button type="submit" variant="warning" className="mb-2 mr-1 w-24">
          {`${t('common.button.exchange')}`}
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

export default nonReceipt
