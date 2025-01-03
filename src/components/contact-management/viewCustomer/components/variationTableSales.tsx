/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash'
import Table from '../../../common/table'
import { SetStateAction, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../../common/button'
import SharedDataContainer from '../../../../containers/sharedData'
import Lucide from '../../../common/lucide'
import { Menu, Dialog } from '../../../common/headless'
import LoadingIcon from '../../../common/loading-icon'
import {
  InputElement,
  TextareaElement,
  SelectElement,
  DateElement,
  SearchSelectElement,
  FormCheckElement,
} from '../../../../components/common/form-elements'
import {
  FormInput,
  FormCheck,
  InputGroup,
  Litepicker,
  FormSelect,
  FormLabel,
  FormInfo,
} from '../../../../components/common/form-elements/components'
import { Tab } from '../../../common/headless'
import Tippy from '../../../common/tippy'
import clsx from 'clsx'
import ClassicEditorElement from '../../../common/form-elements/classic-editor-element'
import UploadFilesElement from '../../../common/form-elements/upload-files-element'
import { Icons, NotificationTypes } from '../../../../constants'

function VariationTableSales() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')
  const [paidPaymentsPreview, setPaidPaymentsPreview] = useState(false)
  const [editorDataExpensesNote, setEditorDataExpensesNote] = useState(
    `<p>${t(
      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.placeolder'
    )}.</p>`
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sendNotificationsPreview, setSendNotificationsPreview] =
  useState(false) 
  const [sendReminderPreview, setSendReminderPreview] =
  useState(false) 
  const [paidViewPreview, setPaidViewPreview] = useState(false) 
  const [paymentPreview, setPaymentPreview] = useState(false)   
  const [duePaymentsPreview, setDuePaymentsPreview] = useState(false) 
  const [exchangePreview, setExchangePreview] = useState(false)
  const [sellReturnPreview, setSellReturnPreview] = useState(false) 
  const [editPaymentPreview, setEditPaymentPreview] = useState(false) 
  const [addPaymentPreview, setAddPaymentPreview] = useState(false)
  const handleChange = () => {
  }
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [date, setDate] = useState('')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)
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

  return (
    <div className="overflow-y-auto overflow-x-scroll ">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Action
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Date
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Invoice No
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Customer Name
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Contact No
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Location
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Payment Status
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Payment Method
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Total Amount
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Total Paid/Set off
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Sell Due
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Sell Return Due
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Shipping Status
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Total Items
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Types of Service
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Custom Field 1
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Added By
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Sale Types
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Multi Sale Types
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Sell Notes
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Staff Notes
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Shipping Details
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Table
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Sales Commisson Agent
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Service Staff
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          
          <Table.Tr>
          <Table.Td className="!px-4">
          <Menu>
                <Menu.Button
                  className="h-8 w-16 "
                  as={Button}
                  size="sm"
                  variant="primary"
                >
                  Actions <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                </Menu.Button>
                <Menu.Items
                  className="h-40 w-48 overflow-y-auto"
                  placement="right-start"
                >
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

                          <div className="py-2">
                          
                            <Table bordered className="">
                              <Table.Thead
                                variant="default"
                                className="bg-dark text-white"
                              >
                                <Table.Tr>
                                  <Table.Th className="whitespace-nowrap border-b-2 dark:border-darkmode-400">
                                    #
                                  </Table.Th>
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
                                    Payment Mode
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Payment Note
                                  </Table.Th>
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                                <Table.Tr>
                                  <Table.Td
                                    style={{
                                      maxWidth: '80px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    123
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    2023.09.17
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    770068
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    1.00 Pc(s)
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    Rs.50.00
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    Notes here
                                  </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                  <Table.Td
                                    style={{
                                      maxWidth: '80px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    123
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    2023.09.17
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    770068
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    1.00 Pc(s)
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    Rs.50.00
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    Notes here
                                  </Table.Td>
                                </Table.Tr>
                              </Table.Tbody>
                            </Table>
                          </div>

                          <div className="mb-5  pt-6 ">
                            <div className="mb-3 ml-1 text-xl font-medium text-primary">
                            Credit Note / Sell Return Details :
                            </div>
                            <div className=" lg:mt-0 lg:text-right">
                              <Table>
                                <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap ">
                                      Net Total Amount
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
                                      Return Discount
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
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total Return Tax
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Return Total
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </div>
                          </div>

                          <div className="py-2">
                          <div className="mb-3 ml-1 text-xl font-medium text-primary">
                          Sell Return (Invoice No.: CN2023/0130) :
                            </div>
                            <Table bordered className="">
                              <Table.Thead
                                variant="default"
                                className="bg-pending text-white"
                              >
                                <Table.Tr>
                                  <Table.Th className="whitespace-nowrap border-b-2 dark:border-darkmode-400">
                                    #
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 dark:border-darkmode-400">
                                  Product Name
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Unit Price
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Return Quantity
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                  Return Subtotal
                                  </Table.Th>
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                                <Table.Tr>
                                  <Table.Td
                                    style={{
                                      maxWidth: '80px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    123
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    Test Item
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                     Rs.50.00
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className="border-b text-right dark:border-darkmode-400"
                                  >
                                    1.00 Pc(s)
                                  </Table.Td>
                                  <Table.Td
                                    style={{
                                      maxWidth: '100px',
                                      wordWrap: 'break-word',
                                    }}
                                    className=" border-b text-right  dark:border-darkmode-400"
                                  >
                                    Rs.50.00
                                  </Table.Td>
                                </Table.Tr>
  
                              </Table.Tbody>
                            </Table>
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
                            <>
                              <div className="grid grid-cols-1 gap-7 border-b py-4 md:grid-cols-2">
                                <TextareaElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.purchase.fields.purchaseDetails.fields.shippingDetails.label'
                                  )}`}
                                  register={register}
                                  name="shippingDetails"
                                  id="shippingDetails"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.purchase.fields.purchaseDetails.fields.shippingDetails.placeolder'
                                  )}`}
                                />
                                <TextareaElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.purchase.fields.purchaseDetails.fields.additionalNotes.label'
                                  )}`}
                                  register={register}
                                  name="additionalNotes"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.purchase.fields.purchaseDetails.fields.additionalNotes.placeolder'
                                  )}`}
                                  id="additionalNotes"
                                />{' '}
                              </div>
                              <div className="flex justify-between  py-7">
                                <div className="intro-y  w-1/3  py-5">
                                  <div className=" intro-y flex flex-col items-center sm:flex-row">
                                    <div className=" mr-auto font-medium">
                                      <div className=" font-medium">
                                        Prepared by{' '}
                                        <strong>
                                          .................................
                                        </strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="intro-y ml-4 w-1/3 px-5 py-5">
                                  <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                    <div className=" mr-auto font-medium">
                                      <div className=" font-medium">
                                        Checked by{' '}
                                        <strong>
                                          .................................
                                        </strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="intro-y ml-4 w-1/3  px-5 py-5">
                                  <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                                    <div className=" mr-auto font-medium">
                                      <div className=" font-medium">
                                        Authorized By
                                        <strong>
                                          .................................
                                        </strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
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
                  <Menu.Item>
                    <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                    Edit
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="XCircle" className="mr-2 h-4 w-4" />
                    Cancel
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Printer" className="mr-2 h-4 w-4" />
                    Print
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FilePlus" className="mr-2 h-4 w-4" />
                    Packin Slip
                  </Menu.Item>
                  <Menu.Item>
                  <Lucide icon="File" className="mr-2 h-4 w-4" />
                    Waybill Summary
                  </Menu.Item>
                  <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                    Waybill Detailed
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'left' }}>
                  <Lucide icon="ThumbsUp" className="mr-2 h-4 w-4" />
                    Delivery Condition
                  </Menu.Item>
                  <Menu.Item>
                  <Lucide icon="Truck" className="mr-2 h-4 w-4" />
                    Edit Shipping
                  </Menu.Item>
                  <Menu.Devider />
                  <Menu.Item>
                  <Lucide icon="DollarSign" className="mr-2 h-4 w-4" />
                   Add Payment
                  </Menu.Item>
                  <Menu.Item>
                  <Lucide icon="Disc" className="mr-2 h-4 w-4" />
                    View Payments
                  </Menu.Item>
                  <Menu.Item>
                  <Lucide icon="Layers" className="mr-2 h-4 w-4" />
                    Duplicate Sell
                  </Menu.Item>
                  <Menu.Item onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setSellReturnPreview(true)
                    }}>
                  <Lucide icon="CornerUpLeft" className="mr-2 h-4 w-4" />
                    Sell Return
                  </Menu.Item>
                  <Dialog
                    size="2xl"
                    open={sellReturnPreview}
                    onClose={() => {
                      setSellReturnPreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                      <a
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setSellReturnPreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>
                      <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">{`${t(
                          'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.title'
                        )}`}<Button
                        variant="twitter"
                        className="intro-y mx-1 h-8 w-8 rounded-full"
                      >
                        ?
                      </Button></h2>
                         
                      </Dialog.Title>
                      <Dialog.Description >
                      <h2 className=" text-base font-bold mb-5 ">
        {`${t('contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.parentSale.title')}`}
    </h2>
    
                    <div className="intro-y box bg-primary text-white px-5 py-5 mb-5">
                    
    <div className="intro-y mt-4 flex flex-col items-center sm:flex-row mb-5">
    <div className="mr-auto ml-2">
                                <div className=" font-medium ">
                                Invoice No : <strong> 0029</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                   <div className=" font-medium ">
                                Date : <strong> 2023.08.18</strong>
                                  </div>
                                
                                </div>
                                <div className="flex flex-col">
                                <div className=" font-medium ">
                                    Customer Name : <strong>Walking Customer</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium " style={{
                                      maxWidth: '330px',
                                      wordWrap: 'break-word',
                                    }}>
                                  Address : <strong >Galle,southern province,Sri lanka</strong>
                                  </div>
                                  
                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                  Mobile : <strong>0112928937</strong>
                                  </div>
                                </div>
    </div>

     
</div>
<div className="intro-y box px-5 py-5">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row mb-7">
            <div className="mr-auto ml-2">
              {' '}
              <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.invoiceNo.label'
                                      )}`}
                                      register={register}
                                      name="invoiceNo"
                                      id="invoiceNo"
                                    />  
            </div>
            <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
            <DateElement
                    label="Date"
                    name="dob"
                    placeholder="Your DOB"
                    id="dob"
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
                    error={errors.dob}
                    required
                    value={date}
                    onChange={setDate}
                  />
            </div>
          </div>
<div className="grid grid-cols-1 gap-7 md:grid-cols-1 mb-7 ">
                       
                        <div className="overflow-y-auto overflow-x-scroll ">
                          <Table bordered>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                #
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                SKU
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Product Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Unit Price
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Sell Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Return Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Return Subtotal
                                </Table.Th>
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  Test111 (77006)
                                </Table.Td>
                                <Table.Td className="!px-4">
                                Rs, 1000.00
                                </Table.Td>
                                <Table.Td className="!px-4">
                                Rs, 1000.00
                                </Table.Td>
                                <Table.Td className="!px-2">
                               100Pc(s)
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" placeholder='0.00'/>
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-2">
                               Rs, 1000.00
                                </Table.Td>
         
                              </Table.Tr>
           
                            </Table.Tbody>
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
 <div className="grid grid-cols-1 gap-7 md:grid-cols-3 mb-5">

           <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.discountType.label'
                                      )}`}
                                      register={register}
                                      name="discountType"
                                      id="discountType"
                                    />   
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.discountAmount.label'
                                      )}`}
                                      register={register}
                                      name="discountAmount"
                                      id="discountAmount"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.discountAmount.placeolder'
                                      )}`}
                                    />              
                       <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.shippingCharges.label'
                                      )}`}
                                      register={register}
                                      name="shippingCharges"
                                      id="shippingCharges"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.shippingCharges.placeolder'
                                      )}`}
                                    />    
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.paymentFee.label'
                                      )}`}
                                      register={register}
                                      name="paymentFee"
                                      id="paymentFee"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.paymentFee.placeolder'
                                      )}`}
                                    />    
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.roundOffAmount.label'
                                      )}`}
                                      register={register}
                                      name="roundOffAmount"
                                      id="roundOffAmount"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.sellReturn.fields.roundOffAmount.placeolder'
                                      )}`}
                                     
                                    />    
                                    
 </div>     

 <div className="intro-y mt-5 flex flex-col items-center sm:flex-row mb-7"> 
 <Table>
                                <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap ">
                                      Total Return Discount
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (-)
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total Return Tax
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total Return Payment Fee
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Return Total
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table></div>

 <div className="flex justify-end pb-4 text-center mb-2">
                      <Button
                        type="submit"
                        variant="twitter"
                        className="mb-2 mr-1 w-32"
                        
                      >
                        {`${t('common.button.addPaymentTwo')}`}
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
                            setSellReturnPreview(false)
                          }}
                          className="mb-2 mr-1 w-24"
                        >
                          Cancel
                        </Button>
                    </div>

</div> 


                    </Dialog.Description>
                    </Dialog.Panel>
                  </Dialog>
                  <Menu.Item  onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setExchangePreview(true)
                    }}>
                  <Lucide icon="Repeat" className="mr-2 h-4 w-4" />
                   Exchange
                  </Menu.Item>
                  <Dialog
                    size="2xl"
                    open={exchangePreview}
                    onClose={() => {
                      setExchangePreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                      <a
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setExchangePreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>
                      <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">{`${t(
                          'contactManagement.fields.customers.fields.viewContact.fields.exchange.title'
                        )}`}<Button
                        variant="twitter"
                        className="intro-y mx-1 h-8 w-8 rounded-full"
                      >
                        ?
                      </Button></h2>
                         
                      </Dialog.Title>
                      <Dialog.Description >
                      <h2 className=" text-base font-bold mb-5 ">
        {`${t('contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.parentSale.title')}`}
    </h2>
    
                    <div className="intro-y box bg-primary text-white px-5 py-5 mb-5">
                    
    <div className="intro-y mt-4 flex flex-col items-center sm:flex-row mb-5">
    <div className="mr-auto ml-2">
                                <div className=" font-medium ">
                                Invoice No : <strong> 0029</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                   <div className=" font-medium ">
                                Date : <strong> 2023.08.18</strong>
                                  </div>
                                
                                </div>
                                <div className="flex flex-col">
                                <div className=" font-medium ">
                                    Customer Name : <strong>Walking Customer</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium " style={{
                                      maxWidth: '330px',
                                      wordWrap: 'break-word',
                                    }}>
                                  Address : <strong >Galle,southern province,Sri lanka</strong>
                                  </div>
                                  
                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                  Mobile : <strong>0112928937</strong>
                                  </div>
                                </div>
    </div>

     
</div>
<div className="intro-y box px-5 py-5">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row mb-7">
            <div className="mr-auto ml-2">
              {' '}
              <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.invoiceNo.label'
                                      )}`}
                                      register={register}
                                      name="invoiceNo"
                                      id="invoiceNo"
                                    />  
            </div>
            <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
            <DateElement
                    label="Date"
                    name="dob"
                    placeholder="Your DOB"
                    id="dob"
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
                    error={errors.dob}
                    required
                    value={date}
                    onChange={setDate}
                  />
            </div>
          </div>
<div className="grid grid-cols-1 gap-7 md:grid-cols-1 mb-7 ">
                       
                        <div className="overflow-y-auto overflow-x-scroll ">
                        <Table bordered>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                #
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                SKU
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Product Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Unit Price
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Sell Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Return Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Return Subtotal
                                </Table.Th>
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  Test111 (77006)
                                </Table.Td>
                                <Table.Td className="!px-4">
                                Rs, 1000.00
                                </Table.Td>
                                <Table.Td className="!px-4">
                                Rs, 1000.00
                                </Table.Td>
                                <Table.Td className="!px-2">
                               100Pc(s)
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" placeholder='0.00'/>
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-2">
                               Rs, 1000.00
                                </Table.Td>
         
                              </Table.Tr>
           
                            </Table.Tbody>
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
 <div className="grid grid-cols-1 gap-7 md:grid-cols-3 mb-5">

           <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.discountType.label'
                                      )}`}
                                      register={register}
                                      name="discountType"
                                      id="discountType"
                                    />   
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.discountAmount.label'
                                      )}`}
                                      register={register}
                                      name="discountAmount"
                                      id="discountAmount"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.discountAmount.placeolder'
                                      )}`}
                                    />              
                       <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.shippingCharges.label'
                                      )}`}
                                      register={register}
                                      name="shippingCharges"
                                      id="shippingCharges"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.shippingCharges.placeolder'
                                      )}`}
                                    />    
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.paymentFee.label'
                                      )}`}
                                      register={register}
                                      name="paymentFee"
                                      id="paymentFee"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.paymentFee.placeolder'
                                      )}`}
                                    />    
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.roundOffAmount.label'
                                      )}`}
                                      register={register}
                                      name="roundOffAmount"
                                      id="roundOffAmount"
                                      placeholder={`${t(
                                        'contactManagement.fields.customers.fields.viewContact.fields.exchange.fields.roundOffAmount.placeolder'
                                      )}`}
                                     
                                    />    
                                    
 </div>     

 <div className="intro-y mt-5 flex flex-col items-center sm:flex-row mb-7"> 
 <Table>
                                <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap ">
                                      Total Return Discount
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (-)
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total Return Tax
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Total Return Payment Fee
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    (+)
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                      Return Total
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                    
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table></div>

 <div className="flex justify-end pb-4 text-center mb-2">
                      <Button
                        type="submit"
                        variant="warning"
                        className="mb-2 mr-1 w-38 text-white"
                        
                      >
                        {`${t('common.button.exchangeBack')}`}
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
                            setExchangePreview(false)
                          }}
                          className="mb-2 mr-1 w-24"
                        >
                          Cancel
                        </Button>
                    </div>

</div> 


                    </Dialog.Description>
                    </Dialog.Panel>
                  </Dialog>
                  <Menu.Item>
                  <Lucide icon="Globe" className="mr-2 h-4 w-4" />
                   Invoice URL
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'left' }}>
                  <Lucide icon="Mail" className="mr-2 h-4 w-4" />
                   New Sale Notification
                  </Menu.Item>
                  </Menu.Items></Menu>
          </Table.Td>
          <Table.Td className="!px-2">06/30/2023 11:51 AM</Table.Td>
            <Table.Td className="!px-4">23467</Table.Td>
            <Table.Td className="!px-4">Mr. ramamurthi</Table.Td>
            <Table.Td className="!px-2">0814567809</Table.Td>
            <Table.Td className="!px-2">Kandy</Table.Td>
            <Table.Td className="!px-2"> <Button
                variant="success"
                size="sm"
                className="mb-1 w-24 text-white"
                as="a"
                href="#"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setPaidPaymentsPreview(true)
                }}
              >
                {' '}
                Paid
              </Button></Table.Td>
              <Dialog
                size="xl"
                open={paidPaymentsPreview}
                onClose={() => {
                  setPaidPaymentsPreview(false)
                }}
              >
                <Dialog.Panel className="max-h-screen overflow-y-auto">
                  <a
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setPaidPaymentsPreview(false)
                    }}
                    className="absolute right-0 top-0 mr-3 mt-3"
                    href="#"
                  >
                    <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                  </a>
                  <Dialog.Title>
                    <h2 className="mr-auto text-base font-medium">{`${t(
                      'contactManagement.fields.customers.fields.viewContact.fields.viewPayments.title'
                    )}`}</h2>
                  </Dialog.Title>
                  <div className="mb-7 text-center">
                    <div className="mb-5">
                      <div className="flex flex-col border-b px-5 pt-10 text-center sm:px-6 sm:pt-10 sm:text-left lg:flex-row lg:pb-6">
                        <div>
                          <div className="text-lg font-medium text-primary">
                            Customer :
                          </div>
                          <div className="mt-1 font-medium">Walking Customer</div>
                          <div className="mt-1" style={{
                              maxWidth: '350px',
                              wordWrap: 'break-word',
                            }}><strong>Address :</strong> Nugegoda,Western Province,Sri Lanka, 800000</div>
                          <div className="mt-1"><strong>Mobile :</strong> 0715678907</div>
                          <div className="mt-1"><strong>Email :</strong> operationsmanager@parallax.lk</div>
                        </div>
                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                          <div className="text-lg font-medium text-primary">
                            Business :
                          </div>
                          <div className="text-base font-medium text-slate-500">
                            Bunny store Bunny outlet
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
                      </div>
                      <div className="flex flex-col border-b px-5 pb-10 pt-10 text-center sm:px-6 sm:pb-10 sm:text-left lg:flex-row">
                        <div>
                          <div className="text-xl font-medium text-primary">
                            Invoice No : #0028
                          </div>

                          <div className="mt-1">Date: 06/30/2023</div>
                          <div className="mt-1">Payment Status: Due</div>
                        </div>
                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                          {/* BEGIN: Overlapping Modal Toggle */}
                          <Button
                            as="a"
                            href="#"
                            variant="primary"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault()
                              setSendNotificationsPreview(true)
                            }}
                          >
                            Send Payment Received Notification
                          </Button>
                          {/* END: Overlapping Modal Toggle */}
                        </div>
                        {/* BEGIN: Overlapping Modal Content of Payment Paid */}
                        <Dialog
                          open={sendNotificationsPreview}
                          size="xl"
                          onClose={() => {
                            setSendNotificationsPreview(false)
                          }}
                        >
                          <Dialog.Panel className="max-h-screen overflow-y-auto">
                            <a
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                setSendNotificationsPreview(false)
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
                              <h2 className="mr-auto text-base font-medium">{`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.title'
                              )}`}</h2>
                            </Dialog.Title>
                            <Dialog.Description>
                              <Tab.Group className=" box mb-7 overflow-y-auto">
                                <Tab.List className="flex-col border-transparent bg-slate-200 dark:border-transparent dark:bg-darkmode-800 sm:flex-row">
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-controls="content"
                                          aria-selected="true"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.sendEmailOnly.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-selected="false"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.sendSmsOnly.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-selected="false"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.sendBoth.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.placeolder'
                                          )}`}
                                          register={register}
                                          name="bcc"
                                          id="bcc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <ClassicEditorElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <TextareaElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.placeolder'
                                          )}`}
                                          register={register}
                                          name="bcc"
                                          id="bcc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <ClassicEditorElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <TextareaElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <div className="flex justify-end px-3 pb-4 text-center">
                                    <Button
                                      type="submit"
                                      variant="primary"
                                      className="mb-2 mr-1 w-24"
                                    >
                                      {`${t('common.button.send')}`}
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
                                        setSendNotificationsPreview(false)
                                      }}
                                      className="mb-2 mr-1 w-24"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </Tab.Panels>
                              </Tab.Group>
                            </Dialog.Description>
                          </Dialog.Panel>
                        </Dialog>
                        {/* END: Overlapping Modal Content of Payment Paid */}
                      </div>
                    </div>

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
                                Payment Method
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                Payment Note
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
                                  03 Jan 2023
                                </div>
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                                2
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                                Rs.50
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                Cash
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                Paid
                              </Table.Td>
                              <Table.Td className="items-right flex justify-end border-t border-slate-200/60 dark:border-darkmode-400">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="mb-2 mr-2 w-16"
                                  onClick={(event: React.MouseEvent) => {
                                    event.preventDefault()
                                    setEditPaymentPreview(true)
                                  }}
                                >
                                  <a
                                    className="mr-2 flex items-center"
                                    href="#"
                                  >
                                    <Lucide
                                      icon="Edit"
                                      className="mr-1 h-4 w-4"
                                    />{' '}
                                    Edit
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
                                  className="mb-2 mr-2 w-16"
                                  onClick={(event: React.MouseEvent) => {
                                    event.preventDefault()
                                    setPaidViewPreview(true)
                                  }}
                                >
                                  <a
                                    className="mr-2 flex items-center"
                                    href="#"
                                  >
                                    <Lucide
                                      icon="Eye"
                                      className="mr-1 h-4 w-4"
                                    />{' '}
                                    View
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
                                  className="w-18 mb-2 flex items-center"
                                  onChange={handleChange}
                                  onClick={() => {
                                    setDeleteConfirmationModal(true)
                                  }}
                                >
                                  <Lucide
                                    icon="Trash2"
                                    className="mr-1 h-4 w-4"
                                  />{' '}
                                  Delete
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
                            setPaidPaymentsPreview(false)
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


            <Table.Td className="!px-2"></Table.Td>
          
            <Table.Td className="!px-2">Rs. 20,000,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 20,000,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
          </Table.Tr>
   
          <Table.Tr>
          <Table.Td className="!px-4">
          <Menu>
                <Menu.Button
                  className="h-8 w-16 "
                  as={Button}
                  size="sm"
                  variant="primary"
                >
                  Actions <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                </Menu.Button>
                <Menu.Items
                  className="h-40 w-40 overflow-y-auto"
                  placement="right-start"
                >
                  <Menu.Item
                    
                  >
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" />
                    View
                  </Menu.Item>
                  </Menu.Items></Menu>
          </Table.Td>
          <Table.Td className="!px-2">06/30/2023 11:51 AM</Table.Td>
            <Table.Td className="!px-4">23467</Table.Td>
            <Table.Td className="!px-4">Mr.ramamurthi</Table.Td>
            <Table.Td className="!px-2">0814567809</Table.Td>
            <Table.Td className="!px-2">Colombo</Table.Td>
            <Table.Td className="!px-2"> <Button
                variant="pending"
                size="sm"
                className="mb-1 w-24 text-white"
                as="a"
                href="#"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setDuePaymentsPreview(true)
                }}
              >
                {' '}
                Due
              </Button></Table.Td>
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
                      'contactManagement.fields.customers.fields.viewContact.fields.viewPayments.title'
                    )}`}</h2>
                  </Dialog.Title>
                  <div className="mb-7 text-center">
                    <div className="mb-5">
                      <div className="flex flex-col border-b px-5 pt-10 text-center sm:px-6 sm:pt-10 sm:text-left lg:flex-row lg:pb-6">
                        <div>
                          <div className="text-lg font-medium text-primary">
                            Customer :
                          </div>
                          <div className="mt-1 font-medium">Walking Customer</div>
                          <div className="mt-1" style={{
                              maxWidth: '350px',
                              wordWrap: 'break-word',
                            }}><strong>Address :</strong> Nugegoda,Western Province,Sri Lanka, 800000</div>
                          <div className="mt-1"><strong>Mobile :</strong> 0715678907</div>
                          <div className="mt-1"><strong>Email :</strong> operationsmanager@parallax.lk</div>
                        </div>
                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                          <div className="text-lg font-medium text-primary">
                            Business :
                          </div>
                          <div className="text-base font-medium text-slate-500">
                            Bunny store Bunny outlet
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
                      </div>
                      <div className="flex flex-col border-b px-5 pb-10 pt-10 text-center sm:px-6 sm:pb-10 sm:text-left lg:flex-row">
                        <div>
                          <div className="text-xl font-medium text-primary">
                            Invoice No : #0028
                          </div>

                          <div className="mt-1">Date: 06/30/2023</div>
                          <div className="mt-1"style={{
                              maxWidth: '200px',
                              wordWrap: 'break-word',
                            }}>Payment Status: Due</div>
                        </div>
                        <div className="mt-20 mr-2 lg:ml-48 lg:mt-0 lg:text-right">
                          {/* BEGIN: Payment Received */}
                          <Button
                            as="a"
                            href="#"
                            variant="primary"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault()
                              setSendNotificationsPreview(true)
                            }}
                          >
                            Send Payment Received Notification
                          </Button>
                          {/* END: Payment Received */}
                        </div>
                            {/* BEGIN: Payment Received Dialog Box */}
                            <Dialog
                          open={sendNotificationsPreview}
                          size="xl"
                          onClose={() => {
                            setSendNotificationsPreview(false)
                          }}
                        >
                          <Dialog.Panel className="max-h-screen overflow-y-auto">
                            <a
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                setSendNotificationsPreview(false)
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
                              <h2 className="mr-auto text-base font-medium">{`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.title'
                              )}`}</h2>
                            </Dialog.Title>
                            <Dialog.Description>
                              <Tab.Group className=" box mb-7 overflow-y-auto">
                                <Tab.List className="flex-col border-transparent bg-slate-200 dark:border-transparent dark:bg-darkmode-800 sm:flex-row">
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-controls="content"
                                          aria-selected="true"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.sendEmailOnly.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-selected="false"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.sendSmsOnly.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-selected="false"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.sendBoth.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.placeolder'
                                          )}`}
                                          register={register}
                                          name="bcc"
                                          id="bcc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <ClassicEditorElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <TextareaElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.bcc.placeolder'
                                          )}`}
                                          register={register}
                                          name="bcc"
                                          id="bcc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <ClassicEditorElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.mobileNumber.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <TextareaElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotifications.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <div className="flex justify-end px-3 pb-4 text-center">
                                    <Button
                                      type="submit"
                                      variant="primary"
                                      className="mb-2 mr-1 w-24"
                                    >
                                      {`${t('common.button.send')}`}
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
                                        setSendNotificationsPreview(false)
                                      }}
                                      className="mb-2 mr-1 w-24"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </Tab.Panels>
                              </Tab.Group>
                            </Dialog.Description>
                          </Dialog.Panel>
                        </Dialog>
                        {/* END: Payment Received Dialog Box */}

                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">    <Button
                            as="a"
                            href="#"
                            variant="pending"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault()
                              setSendReminderPreview(true)
                            }}
                          >
                            Send Payment Reminder
                          </Button> </div>
                        {/* BEGIN: Payment Reminder Dialog Box */}
                        <Dialog
                          open={sendReminderPreview}
                          size="xl"
                          onClose={() => {
                            setSendReminderPreview(false)
                          }}
                        >
                          <Dialog.Panel className="max-h-screen overflow-y-auto">
                            <a
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                setSendReminderPreview(false)
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
                              <h2 className="mr-auto text-base font-medium">{`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.title'
                              )}`}</h2>
                            </Dialog.Title>
                            <Dialog.Description>
                              <Tab.Group className=" box mb-7 overflow-y-auto">
                                <Tab.List className="flex-col border-transparent bg-slate-200 dark:border-transparent dark:bg-darkmode-800 sm:flex-row">
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-controls="content"
                                          aria-selected="true"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.sendEmailOnly.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-selected="false"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.sendSmsOnly.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                  <Tab fullWidth={false}>
                                    {({ selected }) => (
                                      <Tab.Button
                                        className={clsx([
                                          'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                                          !selected &&
                                            'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                                          selected &&
                                            'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                                        ])}
                                        as="button"
                                      >
                                        <Tippy
                                          content=""
                                          className="flex w-full items-center justify-center py-4"
                                          aria-selected="false"
                                        >
                                          <div className="">
                                            {`${t(
                                              'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.sendBoth.label'
                                            )}`}
                                          </div>
                                        </Tippy>
                                      </Tab.Button>
                                    )}
                                  </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.bcc.placeolder'
                                          )}`}
                                          register={register}
                                          name="bcc"
                                          id="bcc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <ClassicEditorElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.mobileNumber.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <TextareaElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
                                    <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                                      <div className="intro-y flex flex-col items-center sm:flex-row" />
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.bcc.placeolder'
                                          )}`}
                                          register={register}
                                          name="bcc"
                                          id="bcc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <ClassicEditorElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.mobileNumber.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <TextareaElement
                                          id="emailBody"
                                          name="emailBody"
                                          label={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.customers.fields.viewContact.fields.sendNotificationsReminder.fields.availabletags.placeolder'
                                        )}`}
                                      </div>
                                      <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
                                    </div>
                                  </Tab.Panel>
                                  <div className="flex justify-end px-3 pb-4 text-center">
                                    <Button
                                      type="submit"
                                      variant="primary"
                                      className="mb-2 mr-1 w-24"
                                    >
                                      {`${t('common.button.send')}`}
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
                                        setSendReminderPreview(false)
                                      }}
                                      className="mb-2 mr-1 w-24"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </Tab.Panels>
                              </Tab.Group>
                            </Dialog.Description>
                          </Dialog.Panel>
                        </Dialog>
                        {/* END: Payment Reminder Dialog Box */}
                        
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
                          setAddPaymentPreview(true)
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
                          setAddPaymentPreview(true)
                        }}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          <Lucide icon="Plus" className="h-4 w-4" />
                        </span>
                      </Button>
                    </div>

                    {/* BEGIN: Overlapping Modal Content of Add Payment */}
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
                            setEditPaymentPreview(false)
                          }}
                          className="absolute right-0 top-0 mr-3 mt-3 "
                          href="#"
                        >
                          <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                        </a>
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">{`${t(
                            'contactManagement.fields.customers.fields.viewContact.fields.addPayments.title'
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
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.amount.label'
                              )}`}
                              register={register}
                              name="amount"
                              id="amount"
                              required
                              error={errors.amount}
                            />

                            <DateElement
                              label={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.paidOn.label'
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
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.paymentMethod.label'
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
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.attachDocument.label'
                              )}`}
                              variant="primary"
                              btnLabel={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.attachDocument.placeolder'
                              )}`}
                              error={errors.attach_document}
                              info={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.attachDocument.tooltip'
                              )}`}
                            />
                            {selectedOption === 'Card' && (
                              <>
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardNumber.label'
                                  )}`}
                                  register={register}
                                  name="cardNumber"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardNumber.placeolder'
                                  )}`}
                                  id="cardNumber"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardHolderName.label'
                                  )}`}
                                  register={register}
                                  name="cardHolderName"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardHolderName.placeolder'
                                  )}`}
                                  id="cardHolderName"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardTransactionNo.label'
                                  )}`}
                                  register={register}
                                  name="cardTransactionNo"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardTransactionNo.placeolder'
                                  )}`}
                                  id="cardTransactionNo"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardType.label'
                                  )}`}
                                  register={register}
                                  name="cardType"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.cardType.placeolder'
                                  )}`}
                                  id="cardType"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.month.label'
                                  )}`}
                                  register={register}
                                  name="month"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.month.placeolder'
                                  )}`}
                                  id="month"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.year.label'
                                  )}`}
                                  register={register}
                                  name="year"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.year.placeolder'
                                  )}`}
                                  id="year"
                                />
                                <InputElement
                                  label={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.securityCode.label'
                                  )}`}
                                  register={register}
                                  name="securityCode"
                                  placeholder={`${t(
                                    'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.securityCode.placeolder'
                                  )}`}
                                  id="securityCode"
                                />
                              </>
                            )}
                            {selectedOption === 'Bank Transfer' && (
                              <InputElement
                                label={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.bankTransfer.label'
                                )}`}
                                register={register}
                                name="bankTransfer"
                                placeholder={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.bankTransfer.placeolder'
                                )}`}
                                id="bankTransfer"
                              />
                            )}
                            {selectedOption === 'Other Payments' && (
                              <InputElement
                                label={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.transactionNo.label'
                                )}`}
                                register={register}
                                name="transactionNo"
                                placeholder={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.transactionNo.placeolder'
                                )}`}
                                id="transactionNo"
                              />
                            )}
                            {selectedOption === 'Cheque' && (
                              <InputElement
                                label={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.chequeNo.label'
                                )}`}
                                register={register}
                                name="chequeNo"
                                placeholder={`${t(
                                  'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.chequeNo.placeolder'
                                )}`}
                                id="chequeNo"
                              />
                            )}
                            <TextareaElement
                              label={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.paymentNotes.label'
                              )}`}
                              register={register}
                              name="paymentNotes"
                              id="paymentNotes"
                              placeholder={`${t(
                                'contactManagement.fields.customers.fields.viewContact.fields.addPayments.fields.addPayment.fields.paymentNotes.placeolder'
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
                                Payment Method
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                Payment Note
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
                                  03 Jan 2023
                                </div>
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                                2
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                                Rs.50
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                Cash
                              </Table.Td>
                              <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                                Paid
                              </Table.Td>
                              <Table.Td className="items-right flex justify-end border-t border-slate-200/60 dark:border-darkmode-400">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="mb-2 mr-2 w-16"
                                  onClick={(event: React.MouseEvent) => {
                                    event.preventDefault()
                                    setEditPaymentPreview(true)
                                  }}
                                >
                                  <a
                                    className="mr-2 flex items-center"
                                    href="#"
                                  >
                                    <Lucide
                                      icon="Edit"
                                      className="mr-1 h-4 w-4"
                                    />{' '}
                                    Edit
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
                                  className="mb-2 mr-2 w-16"
                                  onClick={(event: React.MouseEvent) => {
                                    event.preventDefault()
                                    setPaidViewPreview(true)
                                  }}
                                >
                                  <a
                                    className="mr-2 flex items-center"
                                    href="#"
                                  >
                                    <Lucide
                                      icon="Eye"
                                      className="mr-1 h-4 w-4"
                                    />{' '}
                                    View
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
                                                      setDuePaymentsPreview(false)
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
                                  className="w-18 mb-2 flex items-center"
                                  onChange={handleChange}
                                  onClick={() => {
                                    setDeleteConfirmationModal(true)
                                  }}
                                >
                                  <Lucide
                                    icon="Trash2"
                                    className="mr-1 h-4 w-4"
                                  />{' '}
                                  Delete
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
            <Table.Td className="!px-2">Rs. 20,000,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 20,000,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 20,000,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
            <Table.Td className="!px-2">Rs. 200,000.00</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTableSales