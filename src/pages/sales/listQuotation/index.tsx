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
  const [ locationPreview,  setLocationPreview] = useState(false) 
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
  
  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              List Quotations
                
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
           label={`${t('sales.fields.filters.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
           <SearchSelectElement
           label={`${t('sales.fields.filters.fields.customer.label')}`}
            register={register}
            name="customer"
            id="customer"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          
                            <div className="">
                   
          
                    <div className="font-medium">
                    {`${t(
                        'purchases.fields.dateRange.label'
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
                        className="!box mt-2.5  sm:w-54"
                      />
                   
                  </div>
                  <SearchSelectElement
           label={`${t('sales.fields.filters.fields.user.label')}`}
            register={register}
            name="user"
            id="user"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
              
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
   
      </div>
      <div className="intro-y box col-span-12">
        
        <div className="items-center justify-center border-slate-200/60 px-5 py-5 dark:border-darkmode-400 sm:py-3">
       
        <div className="intro-y mb-5">
      
                  <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                    <div className="mt-2 items-center sm:mr-4 sm:flex ">
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
                      className="shadow-md  sm:w-auto"
                      onChange={handleChange}
                     
                    >
                     <a
                                    href="/pos"
                                    onChange={handleChange}
                                  >
                                   Add
                                  </a>
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
                  Customer Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Location
                  </Table.Th>
                  
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              {/* <Table.Tr>
                 
                  <Table.Td className="!px-1 flex" >
                  <Button size="sm" className="mr-2 flex items-center bg-secondary"  onClick={() => { 
     setLocationPreview(true)
  }}>
                        <Lucide icon="MapPin" className="mr-2 h-4 w-4" /> Location Change
                      </Button>
                      <Dialog
              size="lg"
              open={locationPreview}
              onClose={() => {
                setLocationPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'sales.fields.addQuotation.fields.locationChange.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setLocationPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">

                   <div className="mt-2 mb-2 font-medium">
          {`${t('sales.fields.addQuotation.fields.currentLocation.label')}`} : { ' Bunny outlet ' }
          </div>
                  <SelectElement
                    label={`${t(
                      'sales.fields.addQuotation.fields.locationTo.label'
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
                      setLocationPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-42 h-auto overflow-y-auto"  placement="right-start" >
                      <Menu.Item  onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setPurchaseDetailsPreview(true)
                    }}>
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" />
                    View
                  </Menu.Item>
                  <Dialog
                    size="2xl"
                    open={purchaseDetailsPreview}
                    onClose={() => {
                      setPurchaseDetailsPreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                      <a
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setPurchaseDetailsPreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>
                      <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">{`${t(
                          'contactManagement.fields.customers.fields.viewContact.fields.purchase.title'
                        )}`}</h2>
                      </Dialog.Title>
                      <div className="mb-6 mt-5 flex grid grid-cols-1 justify-between gap-6 sm:grid-cols-2 sm:px-6 md:grid-cols-3">
                        <div className="intro-y col-span-1 sm:col-span-1 md:col-span-1">
                          <div
                            className={clsx([
                              'zoom-in relative',
                              "before:absolute before:inset-x-0 before:mx-auto before:mt-3 before:h-full before:w-[90%] before:rounded-md before:bg-slate-50 before:shadow-[0px_3px_20px_#0000000b] before:content-[''] before:dark:bg-darkmode-400/70",
                            ])}
                          >
                             <div className="intro-y box mb-5 px-5 py-5">
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <div className=" font-medium ">
                                  Invoice No :{' '}
                                    <strong
                                      style={{
                                        maxWidth: '20px',
                                        wordWrap: 'break-word',
                                      }}
                                    >
                                      #PO2023
                                    </strong>
                                  </div>

                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                    Status : <strong>Final</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                    Payment Status : <strong>Received</strong>
                                  </div>
                             
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="intro-y col-span-1 sm:col-span-1 md:col-span-1">
                          <div
                            className={clsx([
                              'zoom-in relative',
                              "before:absolute before:inset-x-0 before:mx-auto before:mt-3 before:h-full before:w-[90%] before:rounded-md before:bg-slate-50 before:shadow-[0px_3px_20px_#0000000b] before:content-[''] before:dark:bg-darkmode-400/70",
                            ])}
                          >
                            <div className="intro-y box mb-5 px-5 py-5 ">
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                <div className=" font-medium ">
                                    Customer Name : <strong>Walking Customer</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium">Address</div>
                                  <strong
                                    style={{
                                      maxWidth: '230px',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    Galle,southern province,Sri lanka
                                  </strong>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                  Mobile : <strong>0112928937</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="intro-y col-span-1 sm:col-span-1 md:col-span-1">
                          <div
                            className={clsx([
                              'zoom-in relative',
                              "before:absolute before:inset-x-0 before:mx-auto before:mt-3 before:h-full before:w-[90%] before:rounded-md before:bg-slate-50 before:shadow-[0px_3px_20px_#0000000b] before:content-[''] before:dark:bg-darkmode-400/70",
                            ])}
                          >
                            <div className="intro-y box mb-5 px-5 py-5">
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <div className=" font-medium ">
                                    Service Staff :{' '}
                                    <strong
                                      style={{
                                        maxWidth: '20px',
                                        wordWrap: 'break-word',
                                      }}
                                    >
                                      #PO2023/024
                                    </strong>
                                  </div>

                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                    Shipping : <strong>06/30/2023</strong>
                                  </div>
                          
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between sm:w-auto sm:px-6">
                      <div className=" ml-1 text-xl font-medium text-primary">
                          Products :
                            </div>
                        <h2 className=" font-medium">
                          {' '}
                          Date : <strong>2023 July 14</strong>
                        </h2>
                      </div>

                      <div className="mb-5 ">
                        <div className=" sm:px-6 sm:py-5 ">
                          <div className="overflow-x-auto ">
                            <Table bordered>
                              <Table.Thead
                                variant="default"
                                className="bg-primary text-white"
                              >
                                <Table.Tr>
                                  <Table.Th className="whitespace-nowrap border-b-2 dark:border-darkmode-400">
                                    #
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Product Name & SKU
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Lot & Expiry
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Quantity
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Unit Price
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Discount
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Tax
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Price inc. tax
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Subtotal
                                  </Table.Th>
                                 
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                                <Table.Tr>
                                  <Table.Td className="border-b dark:border-darkmode-400">
                                    <div className="whitespace-nowrap font-medium">
                                      1
                                    </div>
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                                    Test111 - 77006 <Button
                                    variant="facebook"
                                    size="sm"
                                    className="mt-1 text-white"
                        
                    
                                  >
                                    {' '}
                                    Received
                                  </Button>
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                                    2023.09.10
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                  1.00 Pc(s)
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                    Rs.50.00
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                    Rs.50.00
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                    Rs.50.00
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                    Rs.50.00
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                    Rs.50.00
                                  </Table.Td>
                 
                                </Table.Tr>
                              </Table.Tbody>
                            </Table>
                          </div>

                          <div className="mb-5  pt-6 ">
                            <div className="mb-3 ml-1 text-xl font-medium text-primary">
                              Payment Info :
                            </div>
                            <div className=" lg:mt-0 lg:text-right">
                              <Table>
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap ">
                                      Total
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                  
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                        Discount
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (-)
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400">
                                      <div className=" whitespace-nowrap">
                                      Packing Charge
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400">
                                      <div className=" whitespace-nowrap">
                                      Order Tax
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="ml-1 w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Shipping
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Payment Fee
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Round Off
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total Payable
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total Paid
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total remaining
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </div>
                           
                          </div>
                          <div className="grid grid-cols-1 gap-7 py-4 md:grid-cols-2">
                                <TextareaElement
                                  label={`${t(
                                    'sales.fields.view.fields.sellNote.label'
                                  )}`}
                                  register={register}
                                  name="sellNote"
                                  id="sellNote"
                                 
                                />
                                <TextareaElement
                                  label={`${t(
                                    'sales.fields.view.fields.staffNote.label'
                                  )}`}
                                  register={register}
                                  name="staffNote"
                                 
                                  id="staffNote"
                                />{' '}
                              </div>
                          </div>

                        <div className="px-2 pb-8 text-center">
                          <div className="flex justify-end px-3 pb-4 text-center">
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
                                setPurchaseDetailsPreview(false)
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

                       
                        <Menu.Item  
              
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Printer" className="mr-2 h-4 w-4" />
                    Print
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Copy" className="mr-2 h-4 w-4" />
                    Duplicate Draft
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                    Delete
                  </Menu.Item>
                      </Menu.Items>
                    </Menu>
                    
                  </Table.Td>
                  <Table.Td className="!px-2">09/13/2023 14:17</Table.Td>
                  <Table.Td className="!px-2">3456</Table.Td>
                  <Table.Td className="!px-2">miss Sathsarani</Table.Td>
                  <Table.Td className="!px-2">Kandy</Table.Td>
                </Table.Tr> */}

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
                </div>
                       
        </div>
      </div>
      
    </div>
  )
}

export default Main
