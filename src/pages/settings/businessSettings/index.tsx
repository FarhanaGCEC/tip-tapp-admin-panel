/* eslint-disable react/jsx-key */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

"use client"

import _ from 'lodash'
import Table from '../../../components/common/table'
import React, { SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/common/button'
import Tippy from '../../../components/common/tippy'
import Lucide from '../../../components/common/lucide'
import {
  Menu,
  Tab,
  Dialog,
  Disclosure,
} from '../../../components/common/headless'
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
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../../constants'
import Alert from '../../../base-components/Alert'
import { AlignmentTypes } from '../../../constants/common-enums'
import LoadingIcon from '../../../components/common/loading-icon'
import clsx from 'clsx'
import ClassicEditor from '../../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { PosApi } from '../../../api'
import TomSelect from '../../../components/common/tom-select'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import useDraggableItems from 'react-drag-elements'


interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}


function Main() {

  const [table, setTable] = useState([
    { id: 1, name: 'Image', sets: '3x10' },
    { id: 2, name: 'Product',  sets: '3x10' },
    { id: 3, name: 'Business Location', sets: '3x10' },
    { id: 4, name: 'Unit Purchase Price', sets: '3x10' },
    { id: 5, name: 'Selling Price', sets: '3x10' },
    { id: 6, name: 'Current Stock',  sets: '3x10' },
    { id: 7, name: 'Product type', sets: '3x10' },
    { id: 8, name: 'Category', sets: '3x10' },
    { id: 1, name: 'Brand', sets: '3x10' },
    { id: 2, name: 'Tax',  sets: '3x10' },
    { id: 3, name: 'SKU', sets: '3x10' },
    { id: 4, name: 'AAA', sets: '3x10' },
    { id: 5, name: 'Custom Field', sets: '3x10' },
    { id: 6, name: 'Modified At',  sets: '3x10' },
    { id: 7, name: 'Weight', sets: '3x10' },
    { id: 8, name: 'Action', sets: '3x10' },
  ]);

  const dragColumn = useRef<number>(0);
  const draggedOverColumn = useRef<number>(0);

  function handleSort() {
    const tableClone = [...table];
    const temp = tableClone[dragColumn.current];
    tableClone[dragColumn.current] = tableClone[draggedOverColumn.current];
    tableClone[draggedOverColumn.current] = temp;
    setTable(tableClone);
  }


  const posApi = PosApi.useAPI()
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sliderSize, setSliderSize] = useState('xl')
  const { t } = useTranslation('pos')
  const schema = yup
    .object({
      status: yup
        .string()
        .required(
          `${t('repair.fields.jobsheet.fields.status.validationMessage')}`
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
  const [tooltipContent1] = useState('Drag & Drop for reorder the columns in products table.')
  const [tooltipContent2] = useState('Registered tax number for your business.')
  const [checked, setChecked] = useState(false)
  const [courierPreview, setCourierPreview] = useState(false)
  const [editCourierPreview, setEditCourierPreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [select, setSelect] = useState('1')
  const [statusPreview, setStatusPreview] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Business')
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const handleChangeHide = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setIsCheckboxChecked(event.target.checked)
  }
  const [isChecked, setIsChecked] = useState(false)
  const handleCheckChange = () => {
    setIsChecked(!isChecked)
  }
  const [isChecked2, setIsChecked2] = useState(false)
  const handleCheckChange2 = () => {
    setIsChecked2(!isChecked2);
  }
  const [editorData1, setEditorData1] = useState("Shift + e")
  const [editorData2, setEditorData2] = useState("Shift + p")
  const [editorData3, setEditorData3] = useState("Shift + d")
  const [editorData4, setEditorData4] = useState("Shift + c")
  const [editorData5, setEditorData5] = useState("f2")
  const [editorData6, setEditorData6] = useState("")
  const [editorData7, setEditorData7] = useState("shift + s")
  const [editorData8, setEditorData8] = useState("Shift + i")
  const [editorData9, setEditorData9] = useState("Shift + t")
  const [editorData10, setEditorData10] = useState("Shift + r")
  const [editorData11, setEditorData11] = useState("Shift + f")
  const [editorData12, setEditorData12] = useState("f4")
  const [editorData13, setEditorData13] = useState("Shift + v")
  const [editorData14, setEditorData14] = useState("PO")
  const [editorData15, setEditorData15] = useState("ST")
  const [editorData16, setEditorData16] = useState("O")
  const [editorData17, setEditorData17] = useState("A")
  const [editorData18, setEditorData18] = useState("B")
  const [editorData19, setEditorData19] = useState("C")
  const [editorData20, setEditorData20] = useState("D")
  const [editorData21, setEditorData21] = useState("E")
  const [editorData22, setEditorData22] = useState("F")
  const [editorData23, setEditorData23] = useState("G")
  const [editorData24, setEditorData24] = useState("H")
  const [editorData25, setEditorData25] = useState("I")



  return (
    <div className="mt-8 grid grid-cols-12 gap-3">
      <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
        <h2 className="ml-1 mr-auto text-lg font-medium">
          Business Settings
          <Button
            variant="twitter"
            className="intro-y ml-2 h-7 w-7 rounded-full"
          >
            ?
          </Button>
        </h2>
        {/* BEGIN: Menu */}
        <div className="intro-y box mt-7 bg-primary p-5">
          <div className="text-white">
            <a
              className={`flex items-center rounded-md px-3 py-2 font-medium ${
                selectedTab === 'Business'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Business')}
            >
              <Lucide icon="ShoppingBag" className="mr-2 h-4 w-4" /> Business
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Tax' ? 'bg-white/10 dark:bg-darkmode-700' : ''
              }`}
              onClick={() => setSelectedTab('Tax')}
            >
              <Lucide icon="DollarSign" className="mr-2 h-4 w-4" /> Tax
              <Tippy content={tooltipContent2}>
                {' '}
                <a>
                  {' '}
                  <Lucide icon="Info" className=" mx-2 mt-0.5 h-4 w-4 " />
                </a>{' '}
              </Tippy>
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Products'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Products')}
            >
              <Lucide icon="Box" className="mr-2 h-4 w-4" /> Products
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Sell' ? 'bg-white/10 dark:bg-darkmode-700' : ''
              }`}
              onClick={() => setSelectedTab('Sell')}
            >
              <Lucide icon="Percent" className="mr-2 h-4 w-4" /> Sell
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'POS' ? 'bg-white/10 dark:bg-darkmode-700' : ''
              }`}
              onClick={() => setSelectedTab('POS')}
            >
              <Lucide icon="Airplay" className="mr-2 h-4 w-4" /> POS
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Purchases'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Purchases')}
            >
              <Lucide icon="ShoppingCart" className="mr-2 h-4 w-4" /> Purchases
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Shipping'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Shipping')}
            >
              <Lucide icon="Truck" className="mr-2 h-4 w-4" /> Shipping
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Dashboard'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Dashboard')}
            >
              <Lucide icon="LayoutDashboard" className="mr-2 h-4 w-4" />{' '}
              Dashboard
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'System'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('System')}
            >
              <Lucide icon="Cpu" className="mr-2 h-4 w-4" /> System
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Prefixes'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Prefixes')}
            >
              <Lucide icon="Settings2" className="mr-2 h-4 w-4" /> Prefixes
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Email'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Email')}
            >
              <Lucide icon="Mail" className="mr-2 h-4 w-4" /> Email Settings
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'SMS' ? 'bg-white/10 dark:bg-darkmode-700' : ''
              }`}
              onClick={() => setSelectedTab('SMS')}
            >
              <Lucide icon="MessageCircle" className="mr-2 h-4 w-4" /> SMS
              Settings
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Rewards'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Rewards')}
            >
              <Lucide icon="Star" className="mr-2 h-4 w-4" /> Rewards Points
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Modules'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Modules')}
            >
              <Lucide icon="Component" className="mr-2 h-4 w-4" /> Modules
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'TableColumns'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('TableColumns')}
            >
              <Lucide icon="Table" className="mr-2 h-4 w-4" /> Table Columns
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'CustomLabels'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('CustomLabels')}
            >
              <Lucide icon="Tag" className="mr-2 h-4 w-4" /> Custom Labels
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Barcode'
                  ? 'bg-white/10 dark:bg-darkmode-700'
                  : ''
              }`}
              onClick={() => setSelectedTab('Barcode')}
            >
              <Lucide icon="AlignJustify" className="mr-2 h-4 w-4" /> Barcode
              Settings
            </a>
          </div>
        </div>
        {/* END: Menu */}
      </div>
      <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
        {/* BEGIN: Search */}
        <div className="!box flex w-96 bg-white">
          <div className="z-30 -mr-1 flex w-10 items-center justify-center rounded-l border bg-white text-slate-600 dark:border-darkmode-800 dark:bg-darkmode-700 dark:text-slate-400">
            <Lucide icon="Search" className="h-5 w-5 " />
          </div>
          <TomSelect value={select} onChange={setSelect} className="w-full">
            <option value="1">Search</option>
            <option value="2">Business Name</option>
            <option value="3">Kandy</option>
          </TomSelect>
        </div>
        {/* END: Search */}
        {/* BEGIN: Business */}
        <div className="intro-y box mt-5">
          {selectedTab === 'Business' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.businessName.label')}`}
                    register={register}
                    name="supplier_business_name"
                    id="supplier_business_name"
                    required
                  />

                  <DateElement
                    label={`${t('settings.fields.startDate.label')}`}
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
                  <SearchSelectElement
                    label={`${t('settings.fields.defaultProfit.label')}`}
                    register={register}
                    name="defaultProfit"
                    id="defaultProfit"
                    info={`${t('settings.fields.defaultProfit.tooltip')}`}
                    onChange={handleChange}
                  />
                  <SearchSelectElement
                    label={`${t('settings.fields.currency.label')}`}
                    register={register}
                    name="currency"
                    id="currency"
                    onChange={handleChange}
                  />
                  <SearchSelectElement
                    label={`${t('settings.fields.currencySymbol.label')}`}
                    register={register}
                    name="currencySymbol"
                    id="currencySymbol"
                    onChange={handleChange}
                  />
                  <SearchSelectElement
                    label={`${t('settings.fields.timeZone.label')}`}
                    register={register}
                    name="timeZone"
                    id="timeZone"
                    onChange={handleChange}
                  />
                  <UploadFilesElement
                    id="uploadLogo"
                    name="uploadLogo"
                    register={register}
                    label={`${t('settings.fields.uploadLogo.label')}`}
                    variant="primary"
                    btnLabel={`${t(
                      'settings.fields.uploadLogo.btnPlaceolder'
                    )}`}
                    info={`${t('settings.fields.uploadLogo.tooltip')}`}
                  />
                  <SearchSelectElement
                    label={`${t('settings.fields.financialYear.label')}`}
                    register={register}
                    name="financialYear"
                    id="financialYear"
                    info={`${t('settings.fields.financialYear.tooltip')}`}
                    onChange={handleChange}
                  />
                  <SearchSelectElement
                    label={`${t('settings.fields.stockAccounting.label')}`}
                    register={register}
                    name="stockAccounting"
                    id="stockAccounting"
                    info={`${t('settings.fields.stockAccounting.tooltip')}`}
                    onChange={handleChange}
                  />
                  <InputElement
                    label={`${t('settings.fields.transactionEdit.label')}`}
                    register={register}
                    name="transactionEdit"
                    id="transactionEdit"
                    type="number"
                    info={`${t('settings.fields.transactionEdit.tooltip')}`}
                  />
                  <SearchSelectElement
                    label={`${t('settings.fields.dateFormat.label')}`}
                    register={register}
                    name="dateFormat"
                    id="dateFormat"
                    onChange={handleChange}
                  />
                  <SearchSelectElement
                    label={`${t('settings.fields.timeFormat.label')}`}
                    register={register}
                    name="timeFormat"
                    id="timeFormat"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'Tax' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-3">
                  <InputElement
                    label={`${t('settings.fields.taxName1.label')}`}
                    placeholder={`${t('settings.fields.taxName1.placeolder')}`}
                    register={register}
                    name="taxName1"
                    id="taxName1"
                  />
                  <InputElement
                    label={`${t('settings.fields.taxNo1.label')}`}
                    register={register}
                    name="taxNo1"
                    id="taxNo1"
                  />

                  <InputElement
                    label={`${t('settings.fields.taxName2.label')}`}
                    placeholder={`${t('settings.fields.taxName2.placeolder')}`}
                    register={register}
                    name="taxName2"
                    id="taxName2"
                  />
                  <InputElement
                    label={`${t('settings.fields.taxNo2.label')}`}
                    register={register}
                    name="taxNo2"
                    id="taxNo2"
                  />
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-4"
                        type="checkbox"
                        value=""
                        onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-3"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableInlineTax.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'Products' && (
            <>
              <div className="flex flex-col-reverse  p-5 sm:flex-row">
                <div className="mb-4 mt-5 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                      checked={isChecked}
                      onChange={handleCheckChange}
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.enableProductExpiry.label'
                      )}`}</div>
                    </FormCheck.Label>
                    <div className="flex">
                      <FormInfo
                        tooltip={`${t(
                          'settings.fields.enableProductExpiry.tooltip'
                        )}`}
                      />
                    </div>
                  </FormCheck>
                  {isChecked && (
                    <>
                      <SelectElement
                        register={register}
                        name="taxNo1"
                        id="taxNo1"
                      />

                      <div className="flex ">
                        <div className="mt-2 font-medium">{`${t(
                          'settings.fields.onProductExpiry.label'
                        )}`}</div>
                        <FormSelect className="ml-2 flex-1 ">
                          <FormInput type="text" />
                        </FormSelect>
                        <InputGroup className="ml-2 flex-1">
                          <FormInput type="text" />
                        </InputGroup>{' '}
                      </div>
                    </>
                  )}
                  <FormCheck className="">
                    <FormCheck.Input
                      id="vertical-form-2"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-2"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.EnableBrand.label'
                      )}`}</div>
                    </FormCheck.Label>
                  </FormCheck>

                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                      checked={isChecked2}
                      onChange={handleCheckChange2}
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-6"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.EnableCategories.label'
                      )}`}</div>
                    </FormCheck.Label>
                  </FormCheck>
                  {isChecked2 && (
                    <FormCheck>
                      <FormCheck.Input
                        id="vertical-form-4"
                        type="checkbox"
                        value=""
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-6"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.EnableSubCategories.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  )}

                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-6"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.EnablePrice.label'
                      )}`}</div>
                    </FormCheck.Label>
                  </FormCheck>

                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-7"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-7"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.enableSubUnits.label'
                      )}`}</div>
                    </FormCheck.Label>
                    <div className="flex">
                      <FormInfo
                        tooltip={`${t(
                          'settings.fields.enableSubUnits.tooltip'
                        )}`}
                      />
                    </div>
                  </FormCheck>
                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-8"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-8"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.enableRacks.label'
                      )}`}</div>
                    </FormCheck.Label>
                    <div className="flex">
                      <FormInfo
                        tooltip={`${t('settings.fields.enableRacks.tooltip')}`}
                      />
                    </div>
                  </FormCheck>
                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-9"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-9"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.enableRow.label'
                      )}`}</div>
                    </FormCheck.Label>
                  </FormCheck>
                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-10"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-10"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.enablePosition.label'
                      )}`}</div>
                    </FormCheck.Label>
                  </FormCheck>
                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-11"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-11"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.enableWarranty.label'
                      )}`}</div>
                    </FormCheck.Label>
                  </FormCheck>
                  <FormCheck className="mt-3">
                    <FormCheck.Input
                      id="vertical-form-11"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-11"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.disablelot.label'
                      )}`}</div>
                    </FormCheck.Label>
                    <div className="flex">
                      <FormInfo
                        tooltip={`${t('settings.fields.disablelot.tooltip')}`}
                      />
                    </div>
                  </FormCheck>
                </div>
              </div>
              <div className="flex flex-col-reverse px-5 sm:flex-row">
                <div className="mb-4  grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.sKU.label')}`}
                    register={register}
                    name="sKU"
                    id="sKU"
                  />
                  <SelectElement
                    label={`${t('settings.fields.defaultUnit.label')}`}
                    register={register}
                    name="defaultUnit"
                    id="defaultUnit"
                  />
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'Sell' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.defaultSaleDiscount.label')}`}
                    type="number"
                    register={register}
                    required
                    name="defaultSaleDiscount"
                    id="defaultSaleDiscount"
                  />
                  <SelectElement
                    label={`${t('settings.fields.defaultSaleTax.label')}`}
                    register={register}
                    name="defaultSaleTax"
                    id="defaultSaleTax"
                  />
                  <SelectElement
                    label={`${t('settings.fields.salesCommissionAgent.label')}`}
                    register={register}
                    name="salesCommissionAgent"
                    id="salesCommissionAgent"
                  />
                  <SelectElement
                    label={`${t('settings.fields.salesItemAddition.label')}`}
                    register={register}
                    name="salesItemAddition"
                    id="salesItemAddition"
                  />
                  <InputElement
                    label={`${t('settings.fields.lowestProfitMargin.label')}`}
                    register={register}
                    required
                    name="lowestProfitMargin"
                    id="lowestProfitMargin"
                  />
                </div>{' '}
              </div>

              <div className="px-5 ">
                <div className="mb-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-4"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-3"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.allowOverselling.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.separatedSuspendSales.label'
                      )}`}</div>
                    </FormCheck.Label>
                    <div className="flex">
                      <FormInfo
                        tooltip={`${t(
                          'settings.fields.separatedSuspendSales.tooltip'
                        )}`}
                      />
                    </div>
                  </FormCheck>
                  <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-9"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-9"
                    >
                      <div className="mr-2 font-medium">{`${t(
                        'settings.fields.creditManagement.label'
                      )}`}</div>
                    </FormCheck.Label>
                    <div className="flex">
                      <FormInfo
                        tooltip={`${t(
                          'settings.fields.creditManagement.tooltip'
                        )}`}
                      />
                    </div>
                  </FormCheck>
                </div>
              </div>
              <div className="mb-4 mt-10 grid grid-cols-1 gap-7 md:grid-cols-1">
                <FormInline className="flex-col items-start px-8 first:mt-0 first:pt-0 xl:flex-row">
                  <FormLabel className="xl:w-60">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">{`${t(
                          'settings.fields.enableMinimumSelling.label'
                        )}`}</div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="ml-2 mt-3 w-full flex-1 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect>
                        {/* <option value="Gram (g)">Gram (g)</option>
                        <option value="Kilogram (kg)">Kilogram (kg)</option> */}
                      </FormSelect>
                      <FormSelect></FormSelect>
                    </div>
                  </div>
                </FormInline>
              </div>
              <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-1  ">
                <FormInline className="flex-col items-start px-8 first:mt-0 first:pt-0  xl:flex-row">
                  <FormLabel className="xl:w-56">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">{`${t(
                          'settings.fields.amountRounding.label'
                        )}`}</div>
                      </div>
                    </div>
                  </FormLabel>
                  <FormInfo
                    tooltip={`${t('settings.fields.amountRounding.tooltip')}`}
                  />
                  <div className="ml-2 mt-3 w-full flex-1 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect></FormSelect>
                      <FormSelect></FormSelect>
                    </div>
                  </div>
                </FormInline>
              </div>
              <div className="mb-7 mt-7 border-b" />
              <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-8 md:grid-cols-2">
                <SelectElement
                  label={`${t('settings.fields.creditManagement.label')}`}
                  info={`${t('settings.fields.creditManagement.tooltip')}`}
                  register={register}
                  name="creditManagement"
                  id="creditManagement"
                />
              </div>

              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'POS' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    Add keyboard Shortcuts
                  </div>
                </div>
                <div className="text-s mt-3 leading-relaxed text-slate-500">
                  <div>
                    Shortcut should be the names of the keys separated by '+';
                    Example: ctrl+shift+b, ctrl+h
                  </div>
                </div>
              </div>
              <div className="px-8 text-left ">
                <div className="flex items-center font-medium">
                  <div className="">Available Key Names are :</div>
                </div>
                <div className="text-s mt-3 leading-relaxed text-slate-500">
                  <div>
                    shift, ctrl, alt, backspace, tab, enter, return, capslock,
                    esc, escape, space, pageup, pagedown, end,
                  </div>
                  <div>home,left, up, right, down, ins, del, and plus</div>
                </div>
                <div className="container flex w-full">
                  <div className="mr-5  mt-7 flex-1 overflow-x-auto">
                    <Table sm>
                      <Table.Thead variant="light">
                        <Table.Tr>
                          <Table.Th className="whitespace-nowrap">
                            Operations
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                            Keyboard Shortcut
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>Express Checkout</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData1}
                              onChange={(e) => setEditorData1(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Pay & Checkout</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData2}
                              onChange={(e) => setEditorData2(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Draft</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData3}
                              onChange={(e) => setEditorData3(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Cancel</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData4}
                              onChange={(e) => setEditorData4(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Go to Product Quantity</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData5}
                              onChange={(e) => setEditorData5(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Weighing Scale</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData6}
                              onChange={(e) => setEditorData6(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Due Sale</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData7}
                              onChange={(e) => setEditorData7(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </div>
                  <div className="mb-5 mt-7 flex-1 overflow-x-auto">
                    <Table sm>
                      <Table.Thead variant="light">
                        <Table.Tr>
                          <Table.Th className="whitespace-nowrap">
                            Operations
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                            Keyboard Shortcut
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>Edit Discount</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData8}
                              onChange={(e) => setEditorData8(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Edit Order Tax</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData9}
                              onChange={(e) => setEditorData9(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Add Payment Row</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData10}
                              onChange={(e) => setEditorData10(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Finalize Payment</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData11}
                              onChange={(e) => setEditorData11(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Add New Product</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData12}
                              onChange={(e) => setEditorData12(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Row Remove from First</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData13}
                              onChange={(e) => setEditorData13(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </div>
                </div>
                <div className="mt-5 flex  items-center text-slate-500 ">
                  <span>
                    <Lucide icon="Lightbulb" className="h-5 w-5 text-warning" />
                  </span>
                  <div className="ml-2">
                    <span className="mr-1">If you need help, Please</span>
                    <a
                      href="/pos"
                      className="font-medium text-primary"
                      target="blank"
                    >
                      Click Here.
                    </a>
                  </div>
                </div>
                <div className="mb-7 mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">POS Settings</div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableMultiplePay.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-13"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-13"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableDraft.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableExpressCheckout.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.dontShowProduct.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-13"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-13"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.dontShowRecentTransactions.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableDiscount.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex ">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableOrderTax.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableOrderTax.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-13"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-13"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.subtotalEditable.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.subtotalEditable.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableSuspendSale.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex ">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-13"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-13"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableTransactionDate.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableServiceStaff.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableServiceStaff.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableCreditSale.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.disableCreditSale.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableWeighingScale.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.showInvoiceScheme.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.showInvoiceLayoutDropdown.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex ">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.printInvoice.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.showCustomerImage.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enablePaymentFee.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enablePaymentFee.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex ">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableSnow.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableExpenses.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableDueSales.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex ">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enablePurchasePrice.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enablePurchasePrice.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.viewSalePrice.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.viewSalePrice.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableLineDiscount.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.disableAutoComplete.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.ShowSellingPriceGroups.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enablePopupView.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.viewStockReport.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.viewStockReport.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableMinus.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableMinus.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>

                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-14"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-14"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.autoSaveLast.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div className="mb-7 mt-7 border-b" />
                <div className="flex items-center">
                  <div className="text-lg font-medium ">Required Section</div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.isServiceStaff.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.lotNumberRequired.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.isTableRequired.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.isServiceTypeRequired.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div className="mb-7 mt-7 border-b" />
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    Weighing Scale Barcode Setting
                  </div>
                </div>
                <div className="text-s mt-3 leading-relaxed text-slate-500">
                  <div>Configure barcode as per your weighing scale</div>
                </div>
                <div className="mb-7 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <SelectElement
                    label={`${t('settings.fields.prefix.label')}`}
                    register={register}
                    name="prefix"
                    id="prefix"
                  />
                  <SelectElement
                    label={`${t('settings.fields.ProductSku.label')}`}
                    register={register}
                    name="ProductSku"
                    id="ProductSku"
                  />
                  <SelectElement
                    label={`${t('settings.fields.quantityInteger.label')}`}
                    register={register}
                    name="quantityInteger"
                    id="quantityInteger"
                  />
                  <SelectElement
                    label={`${t(
                      'settings.fields.quantityFractionalPart.label'
                    )}`}
                    register={register}
                    name="quantityFractionalPart"
                    id="quantityFractionalPart"
                  />
                </div>
              </div>
              <div className=" mt-5 flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'Purchases' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">Purchases Settings</div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableEditing.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableEditing.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enablePurchase.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enablePurchase.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableSupplier.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableSupplier.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                </div>
                <div className="mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">Lot Settings</div>
                </div>
                <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableLot.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t('settings.fields.enableLot.tooltip')}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableLastLot.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableLastLot.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableLotNumberAuto.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableLotNumberAuto.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableLotNumberUnique.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.enableLotNumberUnique.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end px-5 mt-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'Shipping' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="intro-y flex flex-col items-center sm:flex-row">
                  <h2 className=" mr-auto text-lg font-medium">
                    {' All Courier Companies '}
                  </h2>
                  <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
                    <Button
                      variant="primary"
                      className="mr-2 shadow-md sm:w-auto"
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setCourierPreview(true)
                      }}
                    >
                      Add
                    </Button>

                    <Button variant="primary" className=" mr-2 px-2 ">
                      <Dialog
                        size="lg"
                        open={courierPreview}
                        onClose={() => {
                          setCourierPreview(false)
                        }}
                      >
                        <Dialog.Panel className="max-h-screen overflow-y-auto">
                          <Dialog.Title>
                            <h2 className="mr-auto text-base font-medium">{`${t(
                              'settings.fields.addCourier.title'
                            )}`}</h2>
                          </Dialog.Title>
                          <a
                            onClick={() => {
                              setCourierPreview(false)
                            }}
                            className="absolute right-0 top-0 mr-3 mt-3"
                            href="#"
                          >
                            <Lucide
                              icon="X"
                              className="h-8 w-8 text-slate-400"
                            />
                          </a>

                          <Dialog.Description className="grid gap-7 md:grid-cols-1">
                            <InputElement
                              label={`${t(
                                'settings.fields.courierName.label'
                              )}`}
                              register={register}
                              name="courierName"
                              id="courierName"
                              required
                            />

                            <TextareaElement
                              label={`${t(
                                'settings.fields.description.label'
                              )}`}
                              register={register}
                              name="description"
                              id="description"
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
                                setCourierPreview(false)
                              }}
                              className="mb-2 mr-1 w-24"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Dialog.Panel>
                      </Dialog>
                      <span className="flex h-5 w-5 items-center justify-center">
                        <Lucide icon="Plus" className="h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="intro-y ">
                  <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                    <div className="items-center sm:mr-4 sm:flex ">
                      Page Size
                      <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </FormSelect>
                    </div>

                    <div className="mx-auto items-center  md:flex"></div>

                    <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
                      <FormInput
                        type="text"
                        className="box custom-input"
                        placeholder="Search "
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                  </div>
                  <div className=" py-5" style={{ overflowY: 'auto' }}>
                    <Table bordered striped hover>
                      <Table.Thead variant="dark">
                        <Table.Tr>
                          <Table.Th className="whitespace-nowrap">
                            Courier Company
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                            Description
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap text-center">
                            Action
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>FedEx Express</Table.Td>
                          <Table.Td>236</Table.Td>
                          <Table.Td className="text-center">
                            <Button
                              variant="primary"
                              className="mb-2 mr-1"
                              size="sm"
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                setEditCourierPreview(true)
                              }}
                            >
                              <Lucide icon="Edit" className="h-4 w-4" />
                            </Button>
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </div>
                  <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap">
                    <div className="mr-auto  font-medium">
                      Showing 1 to 10 of 150 entries
                    </div>
                    <div className="font-medium">
                      <Pagination className="w-full sm:mr-auto sm:w-auto">
                        <Pagination.Link>
                          <Lucide icon="ChevronsLeft" className="h-4 w-4" />
                        </Pagination.Link>
                        <Pagination.Link>
                          <Lucide icon="ChevronLeft" className="h-4 w-4" />
                        </Pagination.Link>

                        <Pagination.Link>1</Pagination.Link>
                        <Pagination.Link active>2</Pagination.Link>
                        <Pagination.Link>3</Pagination.Link>

                        <Pagination.Link>
                          <Lucide icon="ChevronRight" className="h-4 w-4" />
                        </Pagination.Link>
                        <Pagination.Link>
                          <Lucide icon="ChevronsRight" className="h-4 w-4" />
                        </Pagination.Link>
                      </Pagination>
                    </div>
                  </div>
                  <Dialog
                    size="lg"
                    open={editCourierPreview}
                    onClose={() => {
                      setEditCourierPreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                      <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">{`${t(
                          'settings.fields.editCourier.title'
                        )}`}</h2>
                      </Dialog.Title>
                      <a
                        onClick={() => {
                          setEditCourierPreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>

                      <Dialog.Description className="grid gap-7 md:grid-cols-1">
                        <InputElement
                          label={`${t('settings.fields.courierName.label')}`}
                          register={register}
                          name="courierName"
                          id="courierName"
                          required
                        />

                        <TextareaElement
                          label={`${t('settings.fields.description.label')}`}
                          register={register}
                          name="description"
                          id="description"
                        />
                      </Dialog.Description>
                      <div className="mb-3 mt-3 flex justify-end px-4 pb-4 text-center ">
                        <Button
                          type="submit"
                          variant="primary"
                          className="mb-2 mr-1 w-24"
                        >
                          {`${t('common.button.update')}`}
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
                            setEditCourierPreview(false)
                          }}
                          className="mb-2 mr-1 w-24"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Dialog.Panel>
                  </Dialog>
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'Dashboard' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-1">
                  <div className="flex">
                    <div className="mr-4 mt-4 font-medium">{`${t(
                      'settings.fields.viewStockExpiry.label'
                    )}`}</div>

                    <InputGroup className="mt-2">
                      <InputGroup.Text>
                        {' '}
                        <Lucide icon="Calendar" className="h-5 w-4" />
                      </InputGroup.Text>
                      <FormInput type="number" placeholder="" />
                      <InputGroup.Text>Days</InputGroup.Text>
                    </InputGroup>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'System' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-1">
                  <SelectElement
                    label={`${t('settings.fields.themeColor.label')}`}
                    register={register}
                    name="themeColor"
                    id="themeColor"
                  />
                  <SelectElement
                    label={`${t('settings.fields.defaultDataTable.label')}`}
                    register={register}
                    name="defaultDataTable"
                    id="defaultDataTable"
                  />
                  <SelectElement
                    label={`${t('settings.fields.typeContact.label')}`}
                    register={register}
                    name="typeContact"
                    id="typeContact"
                    required
                  />
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-4"
                        type="checkbox"
                        value=""
                        onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-3"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.showHelp.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-4"
                        type="checkbox"
                        value=""
                        onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-3"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.removeMinus.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.removeMinus.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'Prefixes' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.purchaseOrder.label')}`}
                    register={register}
                    name="purchaseOrder"
                    id="purchaseOrder"
                  />
                  <InputElement
                    label={`${t('settings.fields.purchaseReturn.label')}`}
                    register={register}
                    name="purchaseReturn"
                    id="purchaseReturn"
                  />

                  <InputElement
                    label={`${t('settings.fields.stockTransfer.label')}`}
                    register={register}
                    name="stockTransfer"
                    id="stockTransfer"
                  />
                  <InputElement
                    label={`${t('settings.fields.stockAdjustment.label')}`}
                    register={register}
                    name="stockAdjustment"
                    id="stockAdjustment"
                  />
                  <InputElement
                    label={`${t('settings.fields.sellReturn.label')}`}
                    register={register}
                    name="sellReturn"
                    id="sellReturn"
                  />
                  <InputElement
                    label={`${t('settings.fields.expenses.label')}`}
                    register={register}
                    name="expenses"
                    id="expenses"
                  />

                  <InputElement
                    label={`${t('settings.fields.contacts.label')}`}
                    register={register}
                    name="contacts"
                    id="contacts"
                  />
                  <InputElement
                    label={`${t('settings.fields.purchasePayment.label')}`}
                    register={register}
                    name="purchasePayment"
                    id="purchasePayment"
                  />
                  <InputElement
                    label={`${t('settings.fields.sellPayment.label')}`}
                    register={register}
                    name="sellPayment"
                    id="sellPayment"
                  />
                  <InputElement
                    label={`${t('settings.fields.expensePayment.label')}`}
                    register={register}
                    name="expensePayment"
                    id="expensePayment"
                  />

                  <InputElement
                    label={`${t('settings.fields.businessLocation.label')}`}
                    register={register}
                    name="businessLocation"
                    id="businessLocation"
                  />
                  <InputElement
                    label={`${t('settings.fields.username.label')}`}
                    register={register}
                    name="username"
                    id="username"
                  />
                  <InputElement
                    label={`${t('settings.fields.subscriptionNo.label')}`}
                    register={register}
                    name="subscriptionNo"
                    id="subscriptionNo"
                  />
                  <InputElement
                    label={`${t('settings.fields.draft.label')}`}
                    register={register}
                    name="draft"
                    id="draft"
                  />
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'Email' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <SelectElement
                    label={`${t('settings.fields.mailDriver.label')}`}
                    register={register}
                    name="mailDriver"
                    id="mailDriver"
                  />
                  <InputElement
                    label={`${t('settings.fields.host.label')}`}
                    register={register}
                    name="host"
                    id="host"
                  />

                  <InputElement
                    label={`${t('settings.fields.port.label')}`}
                    register={register}
                    name="port"
                    id="port"
                  />
                  <InputElement
                    label={`${t('settings.fields.username.label')}`}
                    register={register}
                    name="username"
                    id="username"
                  />
                  <InputElement
                    label={`${t('settings.fields.password.label')}`}
                    register={register}
                    name="password"
                    type="password"
                    id="password"
                  />
                  <InputElement
                    label={`${t('settings.fields.encryption.label')}`}
                    placeholder={`${t(
                      'settings.fields.encryption.placeolder'
                    )}`}
                    register={register}
                    name="encryption"
                    id="encryption"
                  />
                  <InputElement
                    label={`${t('settings.fields.fromAddress.label')}`}
                    register={register}
                    name="fromAddress"
                    id="fromAddress"
                  />
                  <InputElement
                    label={`${t('settings.fields.fromName.label')}`}
                    register={register}
                    name="fromName"
                    id="fromName"
                  />
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'SMS' && (
            <>
              <div className=" p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <SelectElement
                    label={`${t('settings.fields.SmsService.label')}`}
                    register={register}
                    name="SmsService"
                    id="SmsService"
                  />
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.nexmoKey.label')}`}
                    register={register}
                    name="nexmoKey"
                    id="nexmoKey"
                  />
                  <InputElement
                    label={`${t('settings.fields.nexmoSecret.label')}`}
                    register={register}
                    name="nexmoSecret"
                    id="nexmoSecret"
                  />
                  <InputElement
                    label={`${t('settings.fields.from.label')}`}
                    register={register}
                    name="from"
                    id="from"
                  />
                </div>
                <div className="mt-5 flex  items-center text-slate-500 ">
                  <span>
                    <Lucide icon="Lightbulb" className="h-5 w-5 text-warning" />
                  </span>
                  <div className="ml-2">
                    <span className="mr-1">If you need help, Please</span>
                    <a
                      href="/pos"
                      className="font-medium text-primary"
                      target="blank"
                    >
                      Click Here.
                    </a>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'Rewards' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="mb-4 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableRewardPoint.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <InputElement
                    label={`${t(
                      'settings.fields.rewardPointDisplayName.label'
                    )}`}
                    register={register}
                    name="rewardPointDisplayName"
                    id="rewardPointDisplayName"
                  />
                </div>

                <div className="mb-5 mt-5 border-b" />
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    Earning Points Settings
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t('settings.fields.amountSpend.label')}`}
                    info={`${t('settings.fields.amountSpend.tooltip')}`}
                    register={register}
                    name="amountSpend"
                    id="amountSpend"
                  />
                  <InputElement
                    label={`${t('settings.fields.minimumOrder.label')}`}
                    info={`${t('settings.fields.minimumOrder.tooltip')}`}
                    register={register}
                    name="minimumOrder"
                    id="minimumOrder"
                  />
                  <InputElement
                    label={`${t('settings.fields.maximumPoints.label')}`}
                    info={`${t('settings.fields.maximumPoints.tooltip')}`}
                    register={register}
                    name="maximumPoints"
                    id="maximumPoints"
                  />
                </div>
                <div className="mt-5  border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    Redeem Points Settings
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t('settings.fields.redeemAmount.label')}`}
                    info={`${t('settings.fields.redeemAmount.tooltip')}`}
                    register={register}
                    name="redeemAmount"
                    id="redeemAmount"
                  />
                  <InputElement
                    label={`${t('settings.fields.minimumOrderTotal.label')}`}
                    info={`${t('settings.fields.minimumOrderTotal.tooltip')}`}
                    register={register}
                    name="minimumOrderTotal"
                    id="minimumOrderTotal"
                  />
                  <InputElement
                    label={`${t('settings.fields.minimumRedeemPoint.label')}`}
                    info={`${t('settings.fields.minimumRedeemPoint.tooltip')}`}
                    register={register}
                    name="minimumRedeemPoint"
                    id="minimumRedeemPoint"
                  />
                  <InputElement
                    label={`${t('settings.fields.maximumedeemPoint.label')}`}
                    info={`${t('settings.fields.maximumedeemPoint.tooltip')}`}
                    register={register}
                    name="maximumedeemPoint"
                    id="maximumedeemPoint"
                  />
                  <FormInline className="">
                    <FormLabel className="xl:w-auto">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{`${t(
                            'settings.fields.rewardPointExpiry.label'
                          )}`}</div>
                          <div className="ml-2 flex">
                            <FormInfo
                              tooltip={`${t(
                                'settings.fields.rewardPointExpiry.tooltip'
                              )}`}
                            />
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="product-weight"
                      className="ml-6 sm:mt-0"
                      placeholder="Reward Point expiry period"
                    />
                    <FormSelect className="ml-2 ">
                      <option value="Year">Year</option>
                      <option value="Month">Month</option>
                    </FormSelect>
                  </FormInline>
                  <div className="mt-5 flex  items-center text-slate-500 ">
                    <span>
                      <Lucide
                        icon="Lightbulb"
                        className="h-5 w-5 text-warning"
                      />
                    </span>
                    <div className="ml-2">
                      <span className="mr-1">If you need help, Please</span>
                      <a
                        href="/pos"
                        className="font-medium text-primary"
                        target="blank"
                      >
                        Click Here.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'Modules' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    Enable/Disable Modules
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.purchases.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.addSale.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.pos.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.smPos.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.smPosDefault.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.smPosDefault.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.importProducts.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.importPurchase.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.salesCommissionAgents.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.fixedCommissionTypes.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.saleType.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t('settings.fields.saleType.tooltip')}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.multiSaleType.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.stockTransfers.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.stockAdjustment.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.expenses.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.account.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.tables.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t('settings.fields.tables.tooltip')}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.modifiers.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t('settings.fields.modifiers.tooltip')}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.serviceStaff.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.serviceStaff.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableBookings.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.kitchen.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableSubscription.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableReminder.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.typesService.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <div className="flex">
                        <FormInfo
                          tooltip={`${t(
                            'settings.fields.serviceStaff.tooltip'
                          )}`}
                        />
                      </div>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.prescription.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableGRN.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
              </div>

              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'TableColumns' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">Customer</div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.action.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.contactId.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.businessName.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.name.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.email.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.taxNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.creditLimit.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.payTerm.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.openningBalance.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.balance.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.createdAt.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customerGroup.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.address.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.mobileNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.returnDue.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customField.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customField.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customField.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div className="mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">Suppliers</div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.action.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.contactId.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.businessName.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.name.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.email.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.taxNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.payTerm.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.openningBalance.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.balance.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.createdAt.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.address.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.mobileNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.totalPurchaseDue.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.returnDue.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customField.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customField.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customField.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div className="mt-7 border-b" />
              </div>

              <div className="px-8 text-left">
                <div className="mt-7 flex items-center">
                  <div className="text-lg font-medium ">All Sale Table</div>
                </div>
                <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.action.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.date.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.invoiceNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customerName.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.contactNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.businessName.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.address.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.location.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.paymentStatus.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.paymentMethod.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>

                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.totalAmount.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.totalPaid.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sellDue.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sellReturnDue.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.shippingStatus.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.totalItems.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.addedBy.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sellNote.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.staffNote.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.shippingDetails.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.modifiedAt.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>

                <div className="mt-7 border-b" />
              </div>

              <div className="px-8 text-left">
                <div className="mt-7 flex items-center">
                  <div className="text-lg font-medium ">List Pos</div>
                </div>
                <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.action.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.date.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.invoiceNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.customerName.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.contactNo.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>

                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.location.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.paymentStatus.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.paymentMethod.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>

                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.totalAmount.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.totalPaid.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sellDue.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sellReturnDue.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.shippingStatus.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.totalItems.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.addedBy.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sellNote.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.staffNote.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.shippingDetails.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.salesCommissionAgent.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>

                <div className="mt-7 border-b" />
              </div>

              <div className="px-8 text-left">
                <div className="mt-7 flex items-center">
                  <div className="text-lg font-medium ">Products Table</div>
                </div>
                <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.action.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.productName.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.businessLocation.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.unitPurchase.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sellingPrice.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.currentStock.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.productType.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.category.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.productBrands.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.productTaxRate.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.sKU1.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.productCustomField1.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.createdAt.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.modifiedAt.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.weight.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div className="mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="mt-7 flex items-center">
                  <div className="text-lg font-medium ">Account Book</div>
                </div>
                <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.createdAt.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.modifiedAt.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>

                <div className="mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="mt-7 flex items-center">
                  <div className="text-lg font-medium ">Stock Report</div>
                </div>
                <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.showStockSubunits.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>{' '}
                <div className="mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="mt-7 flex items-center">
                  <div className="flex text-lg font-medium">
                    Products Table Column Order
                    <Tippy content={tooltipContent1}>
                      {' '}
                      <a>
                        {' '}
                        <Lucide icon="Info" className="mx-2 mt-1.5 h-4 w-4" />
                      </a>{' '}
                    </Tippy>
                  </div>
                </div>

                <div className="scrollable-content">
                  <main className="items-left mb-5 mt-5 flex min-h-screen flex-col space-y-4">
                    {table.map((column, index) => (
                      <div
                        className="relative flex space-x-3 rounded border bg-gray-100 p-2"
                        draggable
                        onDragStart={() => (dragColumn.current = index)}
                        onDragEnter={() => (draggedOverColumn.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <Lucide icon="GripVertical" className="ml-2 h-4 w-4" />
                        <p>{column.name}</p>
                      </div>
                    ))}
                  </main>
                </div>
              </div>

              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'CustomLabels' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    Labels for Custom Payments
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customPayment.label')}`}
                    register={register}
                    name="customPayment"
                    id="customPayment"
                  />
                  <InputElement
                    label={`${t('settings.fields.customPayment.label')}`}
                    register={register}
                    name="customPayment"
                    id="customPayment"
                  />
                  <InputElement
                    label={`${t('settings.fields.customPayment.label')}`}
                    register={register}
                    name="customPayment"
                    id="customPayment"
                  />
                  <InputElement
                    label={`${t('settings.fields.customPayment.label')}`}
                    register={register}
                    name="customPayment"
                    id="customPayment"
                  />
                  <InputElement
                    label={`${t('settings.fields.customPayment.label')}`}
                    register={register}
                    name="customPayment"
                    id="customPayment"
                  />
                </div>
                <div className="mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    Labels for Contact Custom Fields
                  </div>
                </div>
                <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                </div>
                <div className="mt-7 mb-4 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                  Labels for Product Custom Fields
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
              
                </div>
                <div className="mt-7 mb-4 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                  Labels for Location Custom Fields
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
              
                </div>
                <div className="mt-7 mb-4 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                  Labels for User Custom Fields
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
              
                </div>
                <div className="mt-7 mb-4 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                  Labels for Purchase Custom Fields
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
              
                </div>
                <div className="mt-7 mb-4 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                  Labels for Sell Custom Fields
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
              
                </div>
                <div className="mt-7 mb-4 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                  Labels for Types of Service Custom Fields
                  </div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField.label')}`}
                    register={register}
                    name="customField"
                    id="customField"
                  />
                  <InputElement
                    label={`${t('settings.fields.customField2.label')}`}
                    register={register}
                    name="customField2"
                    id="customField2"
                  />
              
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'Barcode' && (
            <>
              <div className="p-5 px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                  Creating Secret Keys
                  </div>
                </div>
                <div className="text-s mt-3 leading-relaxed text-slate-500">
                  <div>
                  Numbers from 0 to 9 you can use English letters or any other symbol.
                  </div>
                </div>
              </div>
              <div className="px-8 text-left ">
                <div className="flex items-center font-medium">
                  <div className="">Available Key Names are :</div>
                </div>
                <div className="text-s mt-3 leading-relaxed text-slate-500">
                  <div>
                  A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W ,X, Y, Z
                  </div>
                  <div>0 , 1, 3, 4, 5, 6, 7, 8, 9</div>
                </div>
                <div className="container flex w-full">
                  <div className="mr-5  mt-7 flex-1 overflow-x-auto">
                    <Table sm>
                      <Table.Thead variant="light">
                        <Table.Tr>
                          <Table.Th className="whitespace-nowrap">
                          Number
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                          Secret Keys
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>0</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData16}
                              onChange={(e) => setEditorData16(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>1</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData17}
                              onChange={(e) => setEditorData17(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>2</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData18}
                              onChange={(e) => setEditorData18(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>3</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData19}
                              onChange={(e) => setEditorData19(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>4</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData20}
                              onChange={(e) => setEditorData20(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>5</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData21}
                              onChange={(e) => setEditorData21(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </div>
                  <div className="mb-5 mt-7 flex-1 overflow-x-auto">
                    <Table sm>
                      <Table.Thead variant="light">
                        <Table.Tr>
                          <Table.Th className="whitespace-nowrap">
                          Number
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                          Secret Keys
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>6</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData22}
                              onChange={(e) => setEditorData22(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>7</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData23}
                              onChange={(e) => setEditorData23(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>8</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData24}
                              onChange={(e) => setEditorData24(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>9</Table.Td>
                          <Table.Td className="!px-2">
                            <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData25}
                              onChange={(e) => setEditorData25(e.target.value)}
                            />
                          </Table.Td>
                        </Table.Tr>
                        
                      </Table.Tbody>
                    </Table>
                  </div>
                </div>
                
                <div className="mb-7 mt-7 border-b" />
              </div>
              <div className="px-8 text-left">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">Barcode Setting</div>
                </div>
                <div className="mb-4 mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-12"
                        type="checkbox"
                        value=""
                        // onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-12"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'settings.fields.enableBarcodeSecret.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  </div>
              </div>
              <div className=" mt-5 flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main
