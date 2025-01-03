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
import {SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
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
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
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

  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addJobSheet)
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
  const [paymentPreview, setPaymentPreview] = useState(false)  

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
  const [duePaymentsPreview, setDuePaymentsPreview] = useState(false)
  const [addPaymentPreview, setAddPaymentPreview] = useState(false)  

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
    const [tooltipContent3] = useState(
    '-ve value = Amount to receive <br> +ve value = Amount to pay'
  )

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
            <h2 className="mr-auto text-lg font-medium ml-2">
            Expenses
                
              </h2>
            </h2>
            
          </div>
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
           label={`${t('expenses.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
           <SearchSelectElement
           label={`${t('expenses.fields.expensesFor.label')}`}
            register={register}
            name="expensesFor"
            id="expensesFor"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />

                  <SearchSelectElement
           label={`${t('expenses.fields.contact.label')}`}
            register={register}
            name="contact"
            id="contact"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
                  <SearchSelectElement
           label={`${t('expenses.fields.expensesCategory.label')}`}
            register={register}
            name="expensesCategory"
            id="expensesCategory"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
           <SearchSelectElement
           label={`${t('expenses.fields.expensesSubCategory.label')}`}
            register={register}
            name="expensesSubCategory"
            id="expensesSubCategory"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
                     
                     <div >
                   
          
                   <div className="font-medium">
                   {`${t(
                       'expenses.fields.dateRange.label'
                     )}`}{' '}
</div>
                     {/* <Lucide
                       icon="Calendar"
                       className="absolute inset-y-0 left-0 z-10 my-auto ml-4 h-4 w-4"
                     /> */}
                     <Litepicker
                       value={daterange}
                       onChange={setDaterange}
                       options={{
                         autoApply: false,
                         singleMode: false,
                         numberOfColumns: 2,
                         numberOfMonths: 2,
                         showWeekNumbers: true,
                         dropdowns: {
                           minYear: 1990,
                           maxYear: null,
                           months: true,
                           years: true,
                         },
                       }}
                       className="mt-2.5  sm:w-54"
                     />
                  
                 </div>

    <div className="relative font-medium sm:mt-0">
     <div className="mb-2">{`${t(
          'expenses.fields.paymentStatus.label'
        )}`}{' '}
        </div> 
                  <TomSelect
                    value={selectMultiple}
                    onChange={setSelectMultiple}
                    options={{
                      placeholder: 'Select Payment Status',
                    }}
                    className="sm:w-auto"
                    multiple
                  >
                    <option value="1">All</option>
                    <option value="2">Paid</option>
                    <option value="3">Due</option>
                    <option value="4">Partial</option>
                    <option value="5">Overdue</option>
                  </TomSelect>
             

      
    </div>
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
   
      </div>
      <div className="intro-y box col-span-12">
        <div className="items-center justify-center border-slate-200/60 px-5 py-5 dark:border-darkmode-400 sm:py-3">
        <div className="intro-y mb-5">
                  <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                    <div className=" items-center sm:mr-4 sm:flex ">
                      Page Size
                      <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </FormSelect>
                    </div>

                    <div className="mx-auto items-center  md:flex">
                      <Button className="mr-2 flex items-center">
                        <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column
                        Visibility
                      </Button>

                      <Menu>
                        <Menu.Button
                          as={Button}
                          variant="facebook"
                          className="flex items-center "
                        >
                          Export As{' '}
                          <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                        </Menu.Button>
                        <Menu.Items className="w-40">
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            As CSV
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            As Excel
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            Print
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            Export to PDF
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>

                    <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
                      <FormInput
                        type="text"
                        className="box custom-input"
                        placeholder="Search.."
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                    <Button
                      variant="primary"
                      className="shadow-md sm:w-auto"
                      onChange={handleChange}
                     as="a" href="/expenses/addExpenses"
                    >
                      Add Expense
                    </Button>
                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table
            //   bordered
            //   striped
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              <Table.Thead variant="dark">
                <Table.Tr>
               
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Action
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Date
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Reference No
                    
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               Recurring Details
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Expenses Category
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Expenses Sub Category
                  </Table.Th>

                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 Location
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Payment Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Tax
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Total Amount
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Payment Due
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 Expenses for
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 Contact
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Expenses Note
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Added By
                  </Table.Th>

                 
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
              <Table.Tr>
                 
                  <Table.Td className="!px-1" >
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-38 h-48 overflow-y-auto"  placement="right-start" >
                      
                        <Menu.Item 
                >
                   <Button
                       as="a" href="/expenses/editExpenses"
                    >
                    <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                    Edit
                    </Button>
                   
                  </Menu.Item>
                        <Menu.Item 
                        onChange={handleChange}
                        onClick={() => {
                          setDeleteConfirmationModal(true)
                        }}
                      >
                          <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                          Delete
                        </Menu.Item>
                       
                    
                        
                        
                        <Menu.Devider />
                        <Menu.Item  onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setAddPaymentPreview(true)
                        }}
                >
                         <Lucide icon="DollarSign" className="mr-2 h-4 w-4" />
                      Add Payment
                        </Menu.Item>
                        <Dialog
                      open={addPaymentPreview}
                      size="xl"
                      onClose={() => {
                        setAddPaymentPreview(false)
                      }}
                    >
                      <Dialog.Panel className="max-h-screen overflow-y-auto ">
                        <a
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault()
                            setAddPaymentPreview(false)
                          }}
                          className="absolute right-0 top-0 mr-3 mt-3 "
                          href="#"
                        >
                          <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                        </a>
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">{`${t(
                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.title'
                          )}`}</h2>
                        </Dialog.Title>
                        <Dialog.Description>
                          <div className="flex justify-between ">
                            <div className="intro-y box mb-5 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium">Suppplier</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Miss Prabashi
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium">Business</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Lizas Closet
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="intro-y box mb-5 ml-4 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium">
                                    Reference No
                                  </div>
                                  <strong style={{ fontSize: '15px' }}>
                                    PO2023/0239
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium">Location</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Bunny outlet, Nikawaretiya
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="intro-y box mb-5 ml-4 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium ">
                                    Total amount
                                  </div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Rs. 75,000.00
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium ">
                                    Payment Note
                                  </div>
                                  <strong>
                                    Notes here, Notes here Notes here Notes here
                                  </strong>
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
                        </Dialog.Description>
                        <div className="mb-9 flex justify-end px-3 pb-7 text-center">
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
                              setAddPaymentPreview(false)
                            }}
                            className="mb-2 mr-1 w-24"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>
                        <Menu.Item onChange={handleChange}
                        onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setDuePaymentsPreview(true)
                }}
                >
                          <Lucide icon="Disc" className="mr-2 h-4 w-4" />
                      View Payment
                        </Menu.Item>
                        
                        <Menu.Item   onChange={handleChange}
                  
                >
               <Button
                       as="a"
                      href="/expenses/expenseVoucher"
                    >
                     <Lucide icon="Mail" className="mr-2 h-4 w-4" />
                     Expense Voucher
                    </Button>
                            
                     
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">09456</Table.Td>
                  <Table.Td className="!px-2">Kandy</Table.Td>
                  <Table.Td className="!px-2">Miss Sathsarani</Table.Td>
                  <Table.Td className="!px-2">Miss Sathsarani</Table.Td>
                  <Table.Td className="!px-2">Kandy</Table.Td>

            <Table.Td className="!px-2">
              <Button
                variant="twitter"
                size="sm"
                className="mb-1 w-24 text-white"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setDuePaymentsPreview(true)
                }}
              >
               Partial
              </Button>
              <Dialog
                size="xl"
                open={duePaymentsPreview}
                onClose={() => {
                  setDuePaymentsPreview(false)
                }}
              >
                <Dialog.Panel className="max-h-screen overflow-y-auto">
                  <a
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setDuePaymentsPreview(false)
                    }}
                    className="absolute right-0 top-0 mr-3 mt-3"
                    href="#"
                  >
                    <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                  </a>
                  <Dialog.Title>
                    <h2 className="mr-auto text-base font-medium">{`${t(
                      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.due.title'
                    )}`}</h2>
                  </Dialog.Title>
                  <div className="mb-7 text-center">
                    <div className="mb-5">
                      <div className="flex flex-col border-b px-5 pt-10 text-center sm:px-6 sm:pt-10 sm:text-left lg:flex-row lg:pb-6">
                        <div>
                          <div className="text-lg font-medium text-primary">
                          Business :
                          </div>
                          <div
                            className="sm:whitespace-normal"
                            style={{
                              maxWidth: '200px',
                              wordWrap: 'break-word',
                            }}
                          >
                            Galle,Southern Province,Sri Lanka,
                          </div>
                          <div className="mt-1">Mobile : 071567 8907</div>
                        </div>
                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                        <div className="mt-1">Date: 06/30/2023</div>
                          <div className="mt-1">Purchase Status: Received</div>
                          <div className="mt-1">Payment Status: Due</div>
                        </div>
                      </div>

                    </div>

                    <div className="mt-4 flex w-full justify-end sm:px-5  ">
                      <Button
                        as="a"
                        href="#"
                        className="mr-2 shadow-md sm:w-auto"
                        variant="linkedin"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setPaymentPreview(true)
                        }}
                      >
                        Add Payment
                      </Button>
                      <Button
                        as="a"
                        href="#"
                        variant="linkedin"
                        className="mr-2 px-2"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setPaymentPreview(true)
                        }}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          <Lucide icon="Plus" className="h-4 w-4" />
                        </span>
                      </Button>
                    </div>

                    {/* BEGIN: Overlapping Modal Content of Add Payment */}
                    <Dialog
                      open={paymentPreview}
                      size="xl"
                      onClose={() => {
                        setPaymentPreview(false)
                      }}
                    >
                      <Dialog.Panel className="max-h-screen overflow-y-auto ">
                        <a
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault()
                            setPaymentPreview(false)
                          }}
                          className="absolute right-0 top-0 mr-3 mt-3 "
                          href="#"
                        >
                          <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                        </a>
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">{`${t(
                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.addPayment.title'
                          )}`}</h2>
                        </Dialog.Title>
                        <Dialog.Description>
                          <div className="flex justify-between ">
                            <div className="intro-y box mb-5 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium">Suppplier</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Miss Prabashi
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium">Business</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Lizas Closet
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="intro-y box mb-5 ml-4 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium">
                                    Reference No
                                  </div>
                                  <strong style={{ fontSize: '15px' }}>
                                    PO2023/0239
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium">Location</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Bunny outlet, Nikawaretiya
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="intro-y box mb-5 ml-4 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium ">
                                    Total amount
                                  </div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Rs. 75,000.00
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium ">
                                    Payment Note
                                  </div>
                                  <strong>
                                    Notes here, Notes here Notes here Notes here
                                  </strong>
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
                        </Dialog.Description>
                        <div className="mb-9 flex justify-end px-3 pb-7 text-center">
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
                              setPaymentPreview(false)
                            }}
                            className="mb-2 mr-1 w-24"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>
                    {/* END: Overlapping Modal Content of Add Payment */}
                    <div className=" sm:px-6 sm:py-6">
                      <div className="overflow-x-auto">
                        <Table bordered>
                          <Table.Thead
                            variant="default"
                            className="bg-primary text-white"
                          >
                            <Table.Tr>
                              <Table.Th className="whitespace-nowrap border-b-2 dark:border-darkmode-400">
                                Date
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                Reference No
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                Amount
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                              Contacts
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                              Expense Note
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                              Total Paid
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                              Payment Due
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                Actions
                              </Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td className="border-b dark:border-darkmode-400">
                                <div className="whitespace-nowrap font-medium">
                                09/20/2023 11:35 AM
                                </div>
                              </Table.Td>
                              <Table.Td className="w-32 border-b dark:border-darkmode-400">
                              SP2023/1574
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                                Rs.50.00
                              </Table.Td>
                              <Table.Td className="w-32 border-b font-medium dark:border-darkmode-400">
                                07123456788
                              </Table.Td>
                              <Table.Td className="w-32 border-b  font-medium dark:border-darkmode-400">
                                Paid
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right  font-medium dark:border-darkmode-400">
                              Rs.50.00
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right  font-medium dark:border-darkmode-400">
                              Rs.50.00
                              </Table.Td>
                              <Table.Td className="items-right flex justify-end border-t border-slate-200/60 dark:border-darkmode-400">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="mb-2 mr-2 "
                                  onClick={(event: React.MouseEvent) => {
                                    event.preventDefault()
                                    setEditPaymentPreview(true)
                                  }}
                                >
                                  <a
                                    className=" flex items-center"
                                    href="#"
                                  >
                                    <Lucide
                                      icon="Edit"
                                      className=" h-4 w-4"
                                    />{' '}
                                   
                                  </a>
                                </Button>
                                <Dialog
                      open={editPaymentPreview}
                      size="xl"
                      onClose={() => {
                        setEditPaymentPreview(false)
                      }}
                    >
                      <Dialog.Panel className="max-h-screen overflow-y-auto ">
                        <a
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault()
                            setEditPaymentPreview(false)
                          }}
                          className="absolute right-0 top-0 mr-3 mt-3 "
                          href="#"
                        >
                          <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                        </a>
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">{`${t(
                            'contactManagement.fields.customers.fields.viewContact.fields.editPayments.title'
                          )}`}</h2>
                        </Dialog.Title>
                        <Dialog.Description>
                          <div className="flex justify-between ">
                            <div className="intro-y box mb-5 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium">Suppplier</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Miss Prabashi
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium">Business</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Lizas Closet
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="intro-y box mb-5 ml-4 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium">
                                    Reference No
                                  </div>
                                  <strong style={{ fontSize: '15px' }}>
                                    PO2023/0239
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium">Location</div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Bunny outlet, Nikawaretiya
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="intro-y box mb-5 ml-4 w-1/3 bg-secondary px-5 py-5">
                              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                <div className=" mr-auto font-medium">
                                  <div className=" font-medium ">
                                    Total amount
                                  </div>
                                  <strong style={{ fontSize: '15px' }}>
                                    Rs. 75,000.00
                                  </strong>
                                  <div className="mb-3"></div>
                                  <div className=" font-medium ">
                                    Payment Note
                                  </div>
                                  <strong>
                                    Notes here, Notes here Notes here Notes here
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid gap-7 md:grid-cols-2">
                            <SelectElement
                              label={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.amount.label'
                              )}`}
                              register={register}
                              name="amount"
                              id="amount"
                              required
                              error={errors.amount}
                            />

                            <DateElement
                              label={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.paidOn.label'
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
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.paymentMethod.label'
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
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.attachDocument.label'
                              )}`}
                              variant="primary"
                              btnLabel={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.attachDocument.placeolder'
                              )}`}
                              error={errors.attach_document}
                              info={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.attachDocument.tooltip'
                              )}`}
                            />
                            {selectedOption === 'Card' && (
                              <>
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardNumber.label'
                                  )}`}
                                  register={register}
                                  name="cardNumber"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardNumber.placeolder'
                                  )}`}
                                  id="cardNumber"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardHolderName.label'
                                  )}`}
                                  register={register}
                                  name="cardHolderName"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardHolderName.placeolder'
                                  )}`}
                                  id="cardHolderName"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardTransactionNo.label'
                                  )}`}
                                  register={register}
                                  name="cardTransactionNo"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardTransactionNo.placeolder'
                                  )}`}
                                  id="cardTransactionNo"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardType.label'
                                  )}`}
                                  register={register}
                                  name="cardType"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.cardType.placeolder'
                                  )}`}
                                  id="cardType"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.month.label'
                                  )}`}
                                  register={register}
                                  name="month"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.month.placeolder'
                                  )}`}
                                  id="month"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.year.label'
                                  )}`}
                                  register={register}
                                  name="year"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.year.placeolder'
                                  )}`}
                                  id="year"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.securityCode.label'
                                  )}`}
                                  register={register}
                                  name="securityCode"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.securityCode.placeolder'
                                  )}`}
                                  id="securityCode"
                                />
                              </>
                            )}
                            {selectedOption === 'Bank Transfer' && (
                              <InputElement
                                label={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.bankTransfer.label'
                                )}`}
                                register={register}
                                name="bankTransfer"
                                placeholder={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.bankTransfer.placeolder'
                                )}`}
                                id="bankTransfer"
                              />
                            )}
                            {selectedOption === 'Other Payments' && (
                              <InputElement
                                label={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.transactionNo.label'
                                )}`}
                                register={register}
                                name="transactionNo"
                                placeholder={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.transactionNo.placeolder'
                                )}`}
                                id="transactionNo"
                              />
                            )}
                            {selectedOption === 'Cheque' && (
                              <InputElement
                                label={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.chequeNo.label'
                                )}`}
                                register={register}
                                name="chequeNo"
                                placeholder={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.chequeNo.placeolder'
                                )}`}
                                id="chequeNo"
                              />
                            )}
                            <TextareaElement
                              label={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.paymentNotes.label'
                              )}`}
                              register={register}
                              name="paymentNotes"
                              id="paymentNotes"
                              placeholder={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.editPayments.fields.addPayment.fields.paymentNotes.placeolder'
                              )}`}
                            />
                          </div>
                        </Dialog.Description>
                        <div className="mb-9 flex justify-end px-3 pb-7 text-center">
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
                              setEditPaymentPreview(false)
                            }}
                            className="mb-2 mr-1 w-24"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>
                                <Button
                                  variant="linkedin"
                                  size="sm"
                                  className="mb-2 mr-2 "
                                  onClick={(event: React.MouseEvent) => {
                                    event.preventDefault()
                                    setPaidViewPreview(true)
                                  }}
                                >
                                  <a
                                    className="flex items-center"
                                    href="#"
                                  >
                                    <Lucide
                                      icon="Eye"
                                      className=" h-4 w-4"
                                    />{' '}
                               
                                  </a>
                                </Button>

                                {/* Payment Receipt Dialog Box */}
                                <Dialog
                                  size="lg"
                                  open={paidViewPreview}
                                  onClose={() => {
                                    setPaidViewPreview(false)
                                  }}
                                >
                                  <Dialog.Panel className="max-h-screen overflow-y-auto ">
                                    <a
                                      onClick={(event: React.MouseEvent) => {
                                        event.preventDefault()
                                        setPaidViewPreview(false)
                                      }}
                                      className="absolute right-0 top-0 mr-3 mt-3"
                                      href="#"
                                    >
                                      <Lucide
                                        icon="X"
                                        className="h-8 w-8 text-slate-400"
                                      />
                                    </a>
                                    <Dialog.Title>
                                      <h2 className="mr-auto text-base font-medium ">{`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.paymentReceipt.title'
                                      )}`}</h2>
                                    </Dialog.Title>
                                    <Dialog.Description>
                                      <div className="mb-10 text-center ">
                                        <div className="mb-5">
                                          <div className="flex flex-col border-b  text-center sm:px-1 sm:pt-3 sm:text-left lg:flex-row lg:pb-4">
                                            <div>
                                              <div className="text-lg font-medium text-primary">
                                                Supplier :
                                              </div>
                                              <div className="mt-1">
                                                Mrs.Prabashi
                                              </div>
                                              <div className="mt-1">
                                                Mobile : 071567 8907
                                              </div>
                                            </div>
                                            <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                                              <div className="text-lg font-medium text-primary">
                                                Business :
                                              </div>
                                              <div className="text-base font-medium ">
                                                Bunny store Bunny outlet
                                              </div>
                                              <div
                                                className="sm:whitespace-normal"
                                                style={{
                                                  maxWidth: '200px',
                                                  wordWrap: 'break-word',
                                                }}
                                              >
                                                Galle,Southern Province,Sri
                                                Lanka,
                                              </div>
                                              <div className="mt-1">
                                                Mobile : 071567 8907
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex flex-col border-b px-5  pt-5 text-center sm:px-1 sm:pb-5 sm:text-left lg:flex-row">
                                            <div className="flex items-center text-xl ">
                                              {`${t(
                                                'contactManagement.fields.customers.fields.viewContact.fields.paymentReceipt.fields.paymentDetails.label'
                                              )}`}
                                              {' : '}
                                            </div>
                                            <div className="ml-1 flex items-center text-xl font-medium">
                                              {`${t(
                                                'contactManagement.fields.customers.fields.viewContact.fields.paymentReceipt.fields.paymentDetails.placeolder'
                                              )}`}
                                            </div>
                                          </div>
                                          <div className="mb-5 flex flex-col  px-5 pt-5 text-center sm:px-1 sm:pb-5 ">
                                            <div>
                                              <div className="text-lg font-medium text-primary">
                                                Payment Amount
                                              </div>
                                              <div className="">
                                                <Table>
                                                  <Table.Tbody>
                                                    <Table.Tr>
                                                      <Table.Td className="border-b dark:border-darkmode-400 sm:px-1">
                                                        <div className=" whitespace-nowrap">
                                                          Reference No
                                                        </div>
                                                      </Table.Td>
                                                      <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                                        PP2023/0098
                                                      </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                      <Table.Td className="border-b dark:border-darkmode-400 sm:px-1">
                                                        <div className=" whitespace-nowrap">
                                                          Invoice No
                                                        </div>
                                                      </Table.Td>
                                                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                                        403400
                                                      </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                      <Table.Td className="border-b dark:border-darkmode-400 sm:px-1">
                                                        <div className=" whitespace-nowrap">
                                                          Paid on
                                                        </div>
                                                      </Table.Td>
                                                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                                        08/03/2023 12:31 PM
                                                      </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                      <Table.Td className="border-b dark:border-darkmode-400 sm:px-1">
                                                        <div className=" whitespace-nowrap">
                                                          Payment Method
                                                        </div>
                                                      </Table.Td>
                                                      <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                                        Cash
                                                      </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                      <Table.Td className="border-b dark:border-darkmode-400 sm:px-1">
                                                        <div className=" whitespace-nowrap">
                                                          Outstanding
                                                        </div>
                                                      </Table.Td>
                                                      <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                                        Rs. 100,000.00
                                                      </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                      <Table.Td className="border-b dark:border-darkmode-400 sm:px-1">
                                                        <div className="whitespace-nowrap font-medium">
                                                          Payment Note
                                                        </div>
                                                      </Table.Td>
                                                      <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                                        Rs. 9,100,000.00
                                                      </Table.Td>
                                                    </Table.Tr>
                                                  </Table.Tbody>
                                                </Table>
                                              </div>
                                              <div className="flex flex-col px-5  pt-8 text-center sm:px-1 sm:pb-5 sm:text-left lg:flex-row">
                                                <div className="flex items-center text-lg ">
                                                  Customer Signature :
                                                  ................................
                                                </div>
                                              </div>
                                              <div className="text-center">
                                                <div className="flex justify-end text-center">
                                                  <Button
                                                    type="submit"
                                                    variant="primary"
                                                    className="mb-2 mr-1 w-24"
                                                  >
                                                    {`${t(
                                                      'common.button.print'
                                                    )}`}
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
                                                      setPaidViewPreview(false)
                                                    }}
                                                    className="mb-2 mr-1 w-24"
                                                  >
                                                    Cancel
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Dialog.Description>
                                  </Dialog.Panel>
                                </Dialog>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  className="mb-2 flex items-center"
                                  onChange={handleChange}
                                  onClick={() => {
                                    setDeleteConfirmationModal(true)
                                  }}
                                >
                                  <Lucide
                                    icon="Trash2"
                                    className=" h-4 w-4"
                                  />{' '}
                          
                                </Button>
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
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
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
                              </Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="px-5  text-center">
                      <div className="flex justify-end px-3  text-center">
                        <Button
                          type="submit"
                          variant="primary"
                          className="mb-2 mr-1 w-24"
                        >
                          {`${t('common.button.print')}`}
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
                            setDuePaymentsPreview(false)
                          }}
                          className="mb-2 mr-1 w-24"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Dialog>
            </Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                  <Table.Td className="!px-2">Yes</Table.Td>
                  <Table.Td className="!px-2">Yes</Table.Td>
                  <Table.Td className="!px-2">Yes</Table.Td>
                  <Table.Td className="!px-2">Yes</Table.Td>

                 
                  
                </Table.Tr>
          
              </Table.Tbody>

             
              <Table.Thead variant="dark">
              <Table.Tr>
               
               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
               </Table.Th>
               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
               </Table.Th>
               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           
                 
               </Table.Th>
               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
               </Table.Th>
               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             
               </Table.Th>
               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
               </Table.Th>

               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               Total
               </Table.Th>
               <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             	
              Partial - 1
               </Table.Th>
               <Table.Th className="whitespace-nowrap  bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               
               </Table.Th>
               <Table.Th className="whitespace-nowrap text-right flex bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               ₨ 10.00
               </Table.Th>
               <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               ₨ 10.00
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
            </Table.Th>
             </Table.Tr>
              </Table.Thead>
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
                </div>
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
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
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
