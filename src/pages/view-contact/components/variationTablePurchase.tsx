/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SetStateAction, useRef, useState } from 'react'
import { PosApi } from '../../../api'
import { Menu, Dialog } from '../../../components/common/headless'
import Table from '../../../components/common/table'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/common/button'
import LoadingIcon from '../../../components/common/loading-icon'
import Lucide from '../../../components/common/lucide'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import VariationTableElementBartender from '../variationTableBartender-Elements' 
import VariationTableElementParentPurchase from '../variationTableParentPurchase-Elements'
import Pagination from '../../../components/common/pagination'
import {
  InputElement,
  TextareaElement,
  SelectElement,
  DateElement,
  SearchSelectElement,
  FormCheckElement,
} from '../../../components/common/form-elements'
import FormSwitchElement from '../../../components/common/form-elements/formswitch-element'
import {
  FormInput,
  FormCheck,
  InputGroup,
  FormSelect,
  FormLabel,
  FormInfo,
} from '../../../components/common/form-elements/components'
import ClassicEditorElement from '../../../components/common/form-elements/classic-editor-element'
import { Tab } from '../../../components/common/headless'
import Tippy from '../../../components/common/tippy'
import clsx from 'clsx'

function VariationTablePurchase() {
  const posApi = PosApi.useAPI()
  const { t } = useTranslation('pos')

  const schema = yup
  .object({
    productName: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.productName.validationMessage'
        )}`
      ),
      unit: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.unit.validationMessage'
        )}`
      ),
      sellingPriceTaxType: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.sellingPriceTaxType.validationMessage'
        )}`
      ),
      barcodeType: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.barcodeType.validationMessage'
        )}`
      ),
  })
  .required()
  

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })  
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [duePaymentsPreview, setDuePaymentsPreview] = useState(false)
  const [paidPaymentsPreview, setPaidPaymentsPreview] = useState(false)
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)
  const [paidViewPreview, setPaidViewPreview] = useState(false)
  const [editInvoicePreview, setEditInvoicePreview] = useState(false)
  const [editInvoiceAddProductPreview, setEditInvoiceAddProductPreview] = useState(false)
  const [labelsPreview, setLabelsPreview] = useState(false)
  const [wholeSalePreview,setWholeSalePreview] = useState(false)
  const [sendNotificationsPreview, setSendNotificationsPreview] =
    useState(false) 
  const [paymentPreview, setPaymentPreview] = useState(false)  
  const [purchaseReturnPreview, setPurchaseReturnPreview] = useState(false)  
  const [addPaymentPreview, setAddPaymentPreview] = useState(false)  
  const [bartenderPreview, setBartenderPreview] = useState(false) 
  const [viewDocPreview, setViewDocPreview] = useState(false)  
  const [receivedNotificationsPreview, setReceivedNotificationsPreview] = useState(false) 
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
  const [editorDataExpensesNote, setEditorDataExpensesNote] = useState(
    `<p>${t(
      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.placeolder'
    )}.</p>`
  )
  const [selectedOption, setSelectedOption] = useState('')
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
  const [date, setDate] = useState('')
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };
  
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }
  const handleViewInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  };
  
  const handleChange = () => {
  }
  const [group] = useState([{ id: 0, name: ' Group' }, { id: 2, name: 'Group2' }, { id: 3, name: 'Group' }])
  const [checked, setChecked] = useState(false)



  return (
    <div className="overflow-y-auto overflow-x-scroll ">
      <Table>
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
              Location
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Supplier
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Purchase Status
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Payment Status
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Grand Total
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Payment Due
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Refund Required
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Added By
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Created At
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {/* 1st Row */}
          <Table.Tr>
            <Table.Td className="!px-1">
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
                  <Menu.Item
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setPurchaseDetailsPreview(true)
                    }}
                  >
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" />
                    View
                  </Menu.Item>
                  {/* Start of View Page */}
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
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.purchaseDetails.title'
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
                            <div className="intro-y box mb-5 flex justify-between px-5 py-5">
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <div className="font-medium">Supplier</div>
                                  <strong
                                    style={{
                                      maxWidth: '230px',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    Miss Prabashi
                                  </strong>
                                  <div className="mb-2"></div>
                                  <div className="font-medium">Mobile</div>
                                  <strong>071 567 8907</strong>
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
                                  <div className=" font-medium">Business</div>
                                  <strong
                                    style={{
                                      maxWidth: '230px',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    Bunny store Bunny
                                  </strong>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium">Location</div>
                                  <strong
                                    style={{
                                      maxWidth: '230px',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    Galle,southern province,Sri lanka
                                  </strong>
                                  <div className=" mr-auto font-medium"></div>
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
                                    Reference No :{' '}
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
                                    Date : <strong>06/30/2023</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                    Purchase Status : <strong>Received</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                    Payment Status : <strong>Due</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between sm:w-auto sm:px-6">
                        <div className="flex">
                          <Button
                            variant="linkedin"
                            className="mr-2 shadow-md sm:w-auto"
                          >
                            Download Document
                          </Button>

                          <Button variant="linkedin" className="mr-2 px-2">
                            <span className="flex h-5 w-5 items-center justify-center">
                              <Lucide icon="Download" className="h-4 w-4" />
                            </span>
                          </Button>
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
                                    Purchase Quantity
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Unit Cost (Before Discount)
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Discount Percent
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Unit Cost (Before Tax)
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Unit Tax
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Unit Cost Price (After Tax)
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Unit Selling Price
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Lot Number
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    MFG Date
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    EXP Date
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Subtotal (Before Tax)
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                                    Total Tax
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
                                    Test111 - 77006
                                  </Table.Td>
                                  <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
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
                                        Net Total Amount
                                      </div>
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
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400">
                                      <div className=" whitespace-nowrap">
                                        Purchase Tax
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="w-32 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400">
                                      <div className=" whitespace-nowrap">
                                        Additional Shipping Charges
                                      </div>
                                    </Table.Td>
                                    <Table.Td className="ml-1 w-48 border-b text-right dark:border-darkmode-400 sm:px-1">
                                      Rs. 100,000.00
                                    </Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap">
                                        Purchase Total
                                      </div>
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
                          <div className="item-center flex justify-center py-3">
                            <Button
                              variant="primary"
                              className="mx-auto mb-5 w-fit px-28"
                              onClick={handleChange}
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
                                    'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.purchaseDetails.fields.shippingDetails.label'
                                  )}`}
                                  register={register}
                                  name="shippingDetails"
                                  id="shippingDetails"
                                  placeholder={`${t(
                                    'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.purchaseDetails.fields.shippingDetails.placeolder'
                                  )}`}
                                />
                                <TextareaElement
                                  label={`${t(
                                    'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.purchaseDetails.fields.additionalNotes.label'
                                  )}`}
                                  register={register}
                                  name="additionalNotes"
                                  placeholder={`${t(
                                    'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.purchaseDetails.fields.additionalNotes.placeolder'
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
                  {/* End of View Page */}

                  <Menu.Item>
                    <Lucide icon="Printer" className="mr-2 h-4 w-4" />
                    Print
                  </Menu.Item>
                  <Menu.Item
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setEditInvoicePreview(true)
                    }}
                  >
                    <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                    Edit
                  </Menu.Item>

                  {/* Start of Edit Invoice Page */}
                  <Dialog
                    size="2xl"
                    open={editInvoicePreview}
                    onClose={() => {
                      setEditInvoicePreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                      <a
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setEditInvoicePreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>
                      <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">{`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.title'
                        )}`}</h2>
                      </Dialog.Title>
                      <div className="intro-y box mb-5 flex justify-between ">
                        <div className="mb-5 grid grid-cols-1 gap-7 px-5 pt-7 sm:grid-cols-3">
                          <SearchSelectElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.supplier.label'
                            )}`}
                            register={register}
                            name="supplier"
                            id="supplier"
                            onChange={handleChange}
                            required
                            error={errors.supplier}
                            iconLeft={Icons.USER}
                            iconRight={Icons.PLUSCIRCLE}
                            // onClickRight={() => handleClick()}
                          />

                          <InputElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.referenceNo.label'
                            )}`}
                            register={register}
                            name="referenceNo"
                            placeholder={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.referenceNo.placeolder'
                            )}`}
                            id="referenceNo"
                            required
                            error={errors.referenceNo}
                          />
                          <DateElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.purchaseDate.label'
                            )}`}
                            required
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
                            error={errors.date}
                          />
                          <SelectElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.purchaseStatus.label'
                            )}`}
                            register={register}
                            options={group}
                            name="purchaseStatus"
                            id="purchaseStatus"
                            required
                            error={errors.purchaseStatus}
                            info={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.purchaseStatus.tooltip'
                            )}`}
                          />
                          <SelectElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.businessLocation.label'
                            )}`}
                            register={register}
                            options={group}
                            name="businessLocation"
                            id="businessLocation"
                            required
                            error={errors.businessLocation}
                            info={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.businessLocation.tooltip'
                            )}`}
                          />
                          <SelectElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.payTerm.label'
                            )}`}
                            register={register}
                            options={group}
                            name="payTerm"
                            id="payTerm"
                            required
                            error={errors.payTerm}
                            info={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.payTerm.tooltip'
                            )}`}
                          />
                          <UploadFilesElement
                            id="attachDocument"
                            name="attachDocument"
                            register={register}
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.attachDocument.label'
                            )}`}
                            variant="primary"
                            btnLabel={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.attachDocument.btnPlaceolder'
                            )}`}
                            error={errors.attachDocument}
                            info={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.editInvoice.fields.attachDocument.tooltip'
                            )}`}
                          />
                        </div>
                      </div>
                      <div className="intro-y box mb-5 px-6 py-10">
                        <div className="relative mb-5 flex sm:mt-0 sm:w-auto">
                          <FormInput
                            type="text"
                            className="box custom-input"
                            placeholder="Enter Product name/SKU/Scan Bar Code"
                          />
                          <Lucide
                            icon="Search"
                            className="absolute inset-y-0 right-0 my-auto mr-36 h-5 w-8"
                          />

                        <Button
                            variant="primary"
                            className=" ml-2 shadow-md sm:w-auto "
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault()
                              setEditInvoiceAddProductPreview(true)
                            }}
                          >
                            Add New Product
                          </Button>
                          {/* Add New product Begins */}
                          <Dialog
                            size="xl"
                            open={editInvoiceAddProductPreview}
                            onClose={() => {
                              setEditInvoiceAddProductPreview(false)
                            }}
                          >
                            <Dialog.Panel className="max-h-screen overflow-y-auto">
                              <Dialog.Title>
                                <h2 className="mr-auto text-base font-medium">{`${t(
                                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.title'
                                )}`}</h2>
                              </Dialog.Title>
                              <a
                                onClick={(event: React.MouseEvent) => {
                                  event.preventDefault()
                                  setEditInvoiceAddProductPreview(false)
                                }}
                                className="absolute right-0 top-0 mr-3 mt-3"
                                href="#"
                              >
                                <Lucide
                                  icon="X"
                                  className="h-8 w-8 text-slate-400"
                                />
                              </a>

                              <Dialog.Description className=" mb-5 overflow-y-auto">
                                <div className="intro-y ">
                                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.productName.label'
                                      )}`}
                                      register={register}
                                      name="productName"
                                      placeholder={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.productName.placeolder'
                                      )}`}
                                      id="productName"
                                      error={errors.productName}
                                      required
                                    />
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.skuBarcodeNo.label'
                                      )}`}
                                      register={register}
                                      name="sku_barcode_no"
                                      placeholder={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.skuBarcodeNo.placeolder'
                                      )}`}
                                      id="sku_barcode_no"
                                      info={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.skuBarcodeNo.tooltip'
                                      )}`}
                                    />

                                    <SearchSelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.unit.label'
                                      )}`}
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
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.relatedSubUnits.label'
                                      )}`}
                                      register={register}
                                      name="relatedSubUnits:"
                                      placeholder={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.relatedSubUnits.placeolder'
                                      )}`}
                                      id="relatedSubUnits"
                                      info={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.relatedSubUnits.tooltip'
                                      )}`}
                                    />
                                    <SearchSelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.brand.label'
                                      )}`}
                                      register={register}
                                      name="brand"
                                      id="brand"
                                      error={errors.brand}
                                      iconRight={Icons.PLUSCIRCLE}
                                      onChange={handleChange}
                                      // eslint-disable-next-line prettier/prettier
                                      onClickRight={() => {}}
                                    />
                                    <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.category.label'
                                      )}`}
                                      register={register}
                                      name="category"
                                      id="category"
                                      error={errors.category}
                                    />
                                    <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.subCategory.label'
                                      )}`}
                                      register={register}
                                      name="subCategory"
                                      id="subCategory"
                                      error={errors.subCategory}
                                    />
                                    <FormCheck className="">
                                      <div className="mr-2 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.manageStock.label'
                                        )}`}
                                      </div>

                                      <FormCheck.Input
                                        id="vertical-form-3"
                                        type="checkbox"
                                        value=""
                                        checked={isChecked}
                                        onChange={handleCheckChange}
                                      />

                                      <div className="mx-1 ml-5 flex">
                                        <FormInfo
                                          tooltip={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.manageStock.tooltip'
                                          )}`}
                                        />
                                      </div>
                                      <FormCheck.Label
                                        className="mr-2"
                                        htmlFor="vertical-form-3"
                                      >
                                        <div className="ml-4 font-medium">
                                          {`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.manageStock.placeolder'
                                          )}`}
                                        </div>
                                      </FormCheck.Label>
                                    </FormCheck>
                                    {isChecked && (
                                      <InputElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.alertQuantity.label'
                                        )}`}
                                        register={register}
                                        name="alertQuantity"
                                        placeholder={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.alertQuantity.placeolder'
                                        )}`}
                                        id="alertQuantity"
                                        error={errors.alertQuantity}
                                      />
                                    )}
                                    <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.warranty.label'
                                      )}`}
                                      register={register}
                                      name="warranty"
                                      id="warranty"
                                      error={errors.warranty}
                                    />
                                    <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.businessLocation.label'
                                      )}`}
                                      register={register}
                                      name="businessLocation"
                                      id="businessLocation"
                                      info={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.businessLocation.tooltip'
                                      )}`}
                                    />
                                    <InputElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.weight.label'
                                      )}`}
                                      register={register}
                                      name="weight"
                                      placeholder={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.weight.placeolder'
                                      )}`}
                                      id="weight"
                                    />
                                  </div>

                                  <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="col-span-3 mr-8 ">
                                      <ClassicEditorElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.productDescription.label'
                                        )}`}
                                        register={register}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="item-center mt-7 flex justify-center">
                                  <Button
                                    variant="primary"
                                    className="mx-auto w-fit px-28"
                                    onClick={handleViewInfoClick}
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
                                  <div className="intro-y ">
                                    <div className="grid grid-cols-1 gap-6 py-7 md:grid-cols-2 border-b py-5">
                                      <SelectElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.applicableTax.label'
                                        )}`}
                                        register={register}
                                        name="applicable_tax_id"
                                        id="applicable_tax_id"
                                        error={errors.applicable_tax_id}
                                      />
                                      <SelectElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.sellingPriceTaxType.label'
                                        )}`}
                                        register={register}
                                        name="sellingPriceTaxType"
                                        id="sellingPriceTaxType"
                                        error={errors.sellingPriceTaxType}
                                      />
                                        <InputElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.barcodeType.label'
                                        )}`}
                                        register={register}
                                        name="barcodeType"
                                        placeholder={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.barcodeType.placeolder'
                                        )}`}
                                        id="barcodeType"
                                        error={errors.barcodeType}
                                        required
                                      />
                                      <div />
                                  
                                      
                                    </div>
                                    <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 border-b py-5">
                                      <InputElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.customerField.label'
                                        )}`}
                                        register={register}
                                        name="customer_field_id"
                                        id="customer_field_id"
                                        error={errors.customer_field_id}
                                      />
                                      <InputElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.customerField.label'
                                        )}`}
                                        register={register}
                                        name="customer_field_id"
                                        id="customer_field_id"
                                        error={errors.customer_field_id}
                                      />
                                      <InputElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.customerField.label'
                                        )}`}
                                        register={register}
                                        name="customer_field_id"
                                        id="customer_field_id"
                                        error={errors.customer_field_id}
                                      />
                                      <InputElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.customerField.label'
                                        )}`}
                                        register={register}
                                        name="customer_field_id"
                                        id="customer_field_id"
                                        error={errors.customer_field_id}
                                      />
                                    </div>
                                    <div className=" grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
                                    <FormSwitchElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.enableProductDescription.label'
                                        )}`}
                                        register={register}
                                        name="enable_product_description_id"
                                        id="enable_product_description_id"
                                        error={
                                          errors.enable_product_description_id
                                        }
                                        info={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.enableProductDescription.tooltip'
                                        )}`}
                                      />
                                      <FormSwitchElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.notForSelling.label'
                                        )}`}
                                        register={register}
                                        name="not_for_selling_id"
                                        id="not_for_selling_id"
                                        error={errors.not_for_selling_id}
                                        info={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.notForSelling.tooltip'
                                        )}`}
                                      />
                                      <FormSwitchElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.enableImei.label'
                                        )}`}
                                        register={register}
                                        name="enable_imei_id"
                                        id="enable_imei_id"
                                        error={errors.enable_imei_id}
                                        info={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.enableImei.tooltip'
                                        )}`}
                                      />
                                      <FormSwitchElement
                                        label={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.disableWoocommerceSync.label'
                                        )}`}
                                        register={register}
                                        name="disableWoocommerceSync"
                                        id="disableWoocommerceSync"
                                        info={`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.productForm.fields.disableWoocommerceSync.tooltip'
                                        )}`}
                                      />
                              </div>
                                    <div className="overflow-x-auto py-7">
                                      <Table bordered>
                                        <Table.Thead
                                          variant="default"
                                          className="bg-primary text-white"
                                        >
                                          <Table.Tr>
                                            <Table.Th className="whitespace-nowrap">
                                              <div className="flex items-center justify-end">
                                                Default Purchase Price{' '}
                                                <Lucide
                                                  icon="Info"
                                                  className="ml-2 h-4 w-4"
                                                />
                                              </div>
                                            </Table.Th>
                                            <Table.Th className="whitespace-nowrap">
                                              <div className="flex items-center justify-end">
                                                x Margin(%){' '}
                                                <Lucide
                                                  icon="Info"
                                                  className="ml-2 h-4 w-4"
                                                />
                                              </div>
                                            </Table.Th>
                                            <Table.Th className="whitespace-nowrap">
                                              Default Selling Price
                                            </Table.Th>
                                          </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                          <Table.Tr>
                                            <Table.Td className="flex">
                                              {' '}
                                              <InputGroup className="ml-2 mr-2 flex-1">
                                                <FormInput type="text" />
                                                <InputGroup.Text>
                                                  Exc. tax
                                                </InputGroup.Text>
                                              </InputGroup>
                                              <InputGroup className="flex-1">
                                                <FormInput type="text" />
                                                <InputGroup.Text>
                                                  Inc. tax
                                                </InputGroup.Text>
                                              </InputGroup>
                                            </Table.Td>
                                            <Table.Td>
                                              <InputGroup className="flex">
                                                <FormInput type="text" />
                                              </InputGroup>
                                            </Table.Td>
                                            <Table.Td>
                                              {' '}
                                              <InputGroup className="flex">
                                                <FormInput type="text" />
                                                <InputGroup.Text>
                                                  Exc. tax
                                                </InputGroup.Text>
                                              </InputGroup>
                                            </Table.Td>
                                          </Table.Tr>
                                          <Table.Tr>
                                            <Table.Td className="flex">
                                              {' '}
                                              <InputGroup className="ml-2 mr-2 flex-1">
                                                <FormInput type="text" />
                                                <InputGroup.Text>
                                                  Exc. tax
                                                </InputGroup.Text>
                                              </InputGroup>
                                              <InputGroup className="flex-1">
                                                <FormInput type="text" />
                                                <InputGroup.Text>
                                                  Inc. tax
                                                </InputGroup.Text>
                                              </InputGroup>
                                            </Table.Td>
                                            <Table.Td>
                                              <InputGroup className="flex">
                                                <FormInput type="text" />
                                              </InputGroup>
                                            </Table.Td>
                                            <Table.Td>
                                              {' '}
                                              <InputGroup className="flex">
                                                <FormInput type="text" />
                                                <InputGroup.Text>
                                                  Exc. tax
                                                </InputGroup.Text>
                                              </InputGroup>
                                            </Table.Td>
                                          </Table.Tr>
                                        </Table.Tbody>
                                      </Table>
                                    </div>
                                  </div>
                                )}
                                <div className="flex justify-end  pb-7 text-center">
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
                                      setEditInvoiceAddProductPreview(false)
                                    }}
                                    className="mb-2 mr-1 w-24"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </Dialog.Description>
                            </Dialog.Panel>
                          </Dialog>

                          {/* Add New product END */}
                        </div>
                        <div className="overflow-y-auto overflow-x-scroll ">
                          <Table bordered>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  #
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  Product Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  Purchase Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  Unit Cost (Before Discount)
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  Discount Percent
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  Unit Cost (Before Tax)
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  Subtotal (Before Tax)
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-16 text-slate-500 dark:bg-darkmode-800">
                                  Product Tax
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-6 text-slate-500 dark:bg-darkmode-800">
                                  Net Cost
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  <div className="flex items-center">
                                    Profit Margin %{' '}
                                    <FormCheck className="ml-2">
                                      <FormCheck.Input
                                        id="vertical-form-3"
                                        type="checkbox"
                                        value=""
                                        onChange={handleChange}
                                      />
                                    </FormCheck>
                                    <Lucide
                                      icon="Lock"
                                      className="-mt-0.5 ml-2 h-4 w-4"
                                    />
                                  </div>
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  Unit Selling Price (Inc. tax)
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-12 text-slate-500 dark:bg-darkmode-800">
                                  Lot Number
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-12 text-slate-500 dark:bg-darkmode-800">
                                  MFG Date
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-12 text-slate-500 dark:bg-darkmode-800">
                                  EXP Date
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  <a>
                                    {' '}
                                    <Lucide
                                      icon="Trash2"
                                      className="ml-2 h-4 w-4"
                                    />{' '}
                                  </a>
                                </Table.Th>
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  Test111 (77006)
                                </Table.Td>
                                <Table.Td className="!px-2">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                    <InputGroup.Text>Pc(s)</InputGroup.Text>
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                    <InputGroup.Text>%</InputGroup.Text>
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">Rs, 75.00</Table.Td>
                                <Table.Td className="flex !px-4">
                                  <FormSelect className="flex-1">
                                    <FormInput type="text" />
                                  </FormSelect>
                                  <InputGroup className="ml-2 flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">Rs. 75.00</Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="flex !px-4">
                                  <InputGroup className="mr-3 flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                  {/* Plus Icon */}
                                  <a
                                    href=""
                                    onClick={(event: React.MouseEvent) => {
                                      event.preventDefault()
                                      setWholeSalePreview(true)
                                    }}
                                  >
                                    <Lucide
                                      icon="PlusCircle"
                                      className="mt-3 h-4 w-4"
                                    />
                                  </a>
                                  <Dialog
                                    size="xl"
                                    open={wholeSalePreview}
                                    onClose={() => {
                                      setWholeSalePreview(false)
                                    }}
                                  >
                                    <Dialog.Panel className="overflow-y-auto">
                                      <Dialog.Title>
                                        <h2 className="mr-auto text-base font-medium">{`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.plusIcon.title'
                                        )}`}</h2>
                                      </Dialog.Title>
                                      <a
                                        onClick={(event: React.MouseEvent) => {
                                          event.preventDefault()
                                          setWholeSalePreview(false)
                                        }}
                                        className="absolute right-0 top-0 mr-3 mt-3"
                                        href="#"
                                      >
                                        <Lucide
                                          icon="X"
                                          className="h-8 w-8 text-slate-400"
                                        />
                                      </a>

                                      <Dialog.Description>
                                        <div className="overflow-x-auto">
                                          <Table bordered>
                                            <Table.Thead variant="dark">
                                              <Table.Tr>
                                                <Table.Th className="whitespace-nowrap">
                                                  Whole Sale
                                                </Table.Th>
                                                <Table.Th className="whitespace-nowrap">
                                                  Discounted Sale
                                                </Table.Th>
                                              </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                              <Table.Tr>
                                                <Table.Td>
                                                  <InputGroup className="flex-1">
                                                    <FormInput
                                                      type="text"
                                                      placeholder="0.00"
                                                    />
                                                  </InputGroup>
                                                </Table.Td>
                                                <Table.Td>
                                                  <InputGroup className="flex justify-end">
                                                    <FormInput
                                                      type="text"
                                                      placeholder="0.00"
                                                    />
                                                  </InputGroup>
                                                </Table.Td>
                                              </Table.Tr>
                                            </Table.Tbody>
                                          </Table>
                                        </div>
                                      </Dialog.Description>

                                      <div className="flex justify-end px-3 pb-4 text-center">
                                        <Button
                                          type="submit"
                                          variant="primary"
                                          className="mb-2 mr-1 w-24"
                                        >
                                          {`${t('common.button.save')}`}
                                        </Button>
                                        {/* <Button type="button" variant="outline-secondary" onClick={()=> {
                 setWholeSalePreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button> */}
                                      </div>
                                    </Dialog.Panel>
                                  </Dialog>
                                  <a href="">
                                    <Lucide
                                      icon="AlertCircle"
                                      className="ml-2 mt-3 h-4 w-4"
                                    />
                                  </a>{' '}
                                </Table.Td>

                                <Table.Td className="">
                                  <DateElement
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
                                    error={errors.date}
                                  />
                                </Table.Td>
                                <Table.Td className="">
                                  <DateElement
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
                                    error={errors.date}
                                  />
                                </Table.Td>
                                <Table.Td className="!pl-4 text-slate-500">
                                  <a
                                    href=""
                                    onChange={handleChange}
                                    onClick={(event: {
                                      preventDefault: () => void
                                    }) => {
                                      event.preventDefault()
                                      setDeleteConfirmationModal(true)
                                    }}
                                  >
                                    <Lucide icon="Trash2" className="h-4 w-4" />
                                  </a>
                                </Table.Td>
                              </Table.Tr>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  Test111 (77006)
                                </Table.Td>
                                <Table.Td className="!px-2">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                    <InputGroup.Text>Pc(s)</InputGroup.Text>
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                    <InputGroup.Text>%</InputGroup.Text>
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">Rs, 75.00</Table.Td>
                                <Table.Td className="flex !px-4">
                                  <FormSelect className="flex-1">
                                    <FormInput type="text" />
                                  </FormSelect>
                                  <InputGroup className="ml-2 flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4">Rs. 75.00</Table.Td>
                                <Table.Td className="!px-4">
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="flex !px-4">
                                  <InputGroup className="mr-3 flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                  <a href="">
                                    <Lucide
                                      icon="PlusCircle"
                                      className="mt-3 h-4 w-4"
                                    />
                                  </a>
                                  <a href="">
                                    <Lucide
                                      icon="AlertCircle"
                                      className="ml-2 mt-3 h-4 w-4"
                                    />
                                  </a>{' '}
                                </Table.Td>

                                <Table.Td className="">
                                  <DateElement
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
                                    error={errors.date}
                                  />
                                </Table.Td>
                                <Table.Td className="">
                                  <DateElement
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
                                    error={errors.date}
                                  />
                                </Table.Td>
                                <Table.Td className="!pl-4 text-slate-500">
                                  <a
                                    href=""
                                    onChange={handleChange}
                                    onClick={(event: {
                                      preventDefault: () => void
                                    }) => {
                                      event.preventDefault()
                                      setDeleteConfirmationModal(true)
                                    }}
                                  >
                                    <Lucide icon="Trash2" className="h-4 w-4" />
                                  </a>
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

                        <div className="intro-y mt-2 flex flex-col items-center pt-5">
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.totals.fields.totalItems.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1">
                              {
                                ' Rs.100,000.000000000000 '
                              }{' '}
                            </div>
                          </div>

                          <div className="mr-auto flex py-2">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.totals.fields.netTotalAmount.label'
                              )}`}{' '}
                              :
                            </div>{' '}
                            <div className=" ml-1">{' Rs.100,000.00 '}</div>
                          </div>
                        </div>
                      </div>

                      <div className="intro-y box mb-8 py-10">
                        <div className=" grid grid-cols-1 gap-7 px-5 sm:grid-cols-3 ">
                          <SelectElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.discountType.label'
                            )}`}
                            register={register}
                            options={group}
                            name="discountType"
                            id="discountType"
                          />
                          <InputElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.discountAmount.label'
                            )}`}
                            register={register}
                            name="discountAmount"
                            placeholder={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.discountAmount.placeolder'
                            )}`}
                            id="discountAmount"
                          />
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.discount.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1"  style={{ maxWidth: '300px', wordWrap: 'break-word' }}>{' Rs.120,000.00 '} </div>
                          </div>

                          <SelectElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.purchaseTax.label'
                            )}`}
                            register={register}
                            options={group}
                            name="purchaseTax"
                            id="purchaseTax"
                          />
                          <div className="mr-auto flex">

                          </div>
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.purchaseTaxTotal.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1"  style={{ maxWidth: '250px', wordWrap: 'break-word' }}>
                              {' Rs.900,000.000000'}{' '}
                            </div>
                          </div>
                          <InputElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.shippingDetails.label'
                            )}`}
                            register={register}
                            name="shippingDetails"
                            placeholder={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.shippingDetails.placeolder'
                            )}`}
                            id="shippingDetails"
                          />
                          <div className="mr-auto flex ">
                          
                            
                          </div>
                          <InputElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.AdditionalShipping.label'
                            )}`}
                            register={register}
                            name="AdditionalShipping"
                            placeholder={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.AdditionalShipping.placeolder'
                            )}`}
                            id="AdditionalShipping"
                          />
                        </div>
                        <div className=" grid grid-cols-1 gap-7 border-b px-5  py-7 sm:grid-cols-3">
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.purchaseTotal.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1" style={{ maxWidth: '250px', wordWrap: 'break-word' }}>
                              {' Rs.200,000.00 '}{' '}
                            </div>
                          </div>
                        </div>{' '}
                        <div className=" gap-7 px-5 py-7 sm:grid-cols-1">
                        <TextareaElement
            label={`${t('contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.additionalNotes.label')}`}
            register={register}
            name="discountTypes"
            id="discountTypes"
            placeholder={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.discountTypes.fields.additionalNotes.placeolder'
            )}`}

          />
                        </div>
                        <div className=" flex justify-end mr-3">
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
                        </div>
                        
                      </div>
                      

                    </Dialog.Panel>
                  </Dialog>
                  {/* End of Edit Invoice Page */}

                {/* Start of Labels Page */}
                  <Menu.Item onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setLabelsPreview(true)
                    }}>
                    <Lucide icon="Grid" className="mr-2 h-4 w-4" />
                    Labels
                  </Menu.Item>

                  <Dialog
                  size="xl"
                  open={labelsPreview}
                  onClose={() => {
                    setLabelsPreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setLabelsPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description >
                    <div className="intro-y box px-5 py-7 mb-5">
                    <h2 className=" text-base font-bold mb-7 ">
        {`${t('contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.addProductsGenerateLabels.label')}`}
    </h2>

 <div className="grid grid-cols-1 gap-7 md:grid-cols-1 ">
                        <div className="relative flex sm:mt-0 sm:w-auto">
                          <FormInput
                            type="text"
                            className="box custom-input"
                            placeholder="Enter Product name to Print Labels"
                          />
                          <Lucide
                            icon="Search"
                            className="absolute inset-y-0 right-0 my-auto mr-18 h-5 w-8"
                          />

                        </div>
                        <div className="overflow-y-auto overflow-x-scroll ">
                          <Table bordered>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Products
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Lot Number
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Selling Price
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                No. of labels
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  <a>
                                    {' '}
                                    <Lucide
                                      icon="Trash2"
                                      className="ml-2 h-4 w-4"
                                    />{' '}
                                  </a>
                                </Table.Th>
                               
                               
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  Test111 (77006)
                                </Table.Td>
                                <Table.Td className="!px-2">
                               Rs, 1000.00
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!pl-4 text-slate-500">
                                  <a
                                    href=""
                                    onChange={handleChange}
                                    onClick={(event: {
                                      preventDefault: () => void
                                    }) => {
                                      event.preventDefault()
                                      setDeleteConfirmationModal(true)
                                    }}
                                  >
                                    <Lucide icon="Trash2" className="h-4 w-4" />
                                  </a>
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
</div>
<div className="intro-y box px-5 py-5">
                    <h2 className="mr-auto text-base font-bold py-5">{`${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.infoShowLabels.label'
        )}`}</h2>
 <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mb-7 ">
 <FormCheck className="mb-2">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3">{`${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.productName.label'
        )}`}</FormCheck.Label>
          </FormCheck>
          <FormCheck className="mb-2">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3">{`${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.productVariation.label'
        )}`}</FormCheck.Label>
          </FormCheck>
          <FormCheck className="mb-2">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3">{`${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.productPrice.label'
        )}`}</FormCheck.Label>
          </FormCheck>
          <FormCheck className="mb-2">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3">{`${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.businessName.label'
        )}`}</FormCheck.Label>
          </FormCheck>
           
           
           <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.showPrice.label'
                                      )}`}
                                      register={register}
                                      name="category"
                                      id="category"
                                      error={errors.category}
                                    />              
                       
 </div>   
 <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mb-5">

           <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.barcodeSettings.label'
                                      )}`}
                                      register={register}
                                      name="category"
                                      id="category"
                                      error={errors.category}
                                    />   
                                    <SelectElement
                                      label={`${t(
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.printLabels.fields.printThrough.label'
                                      )}`}
                                      register={register}
                                      name="category"
                                      id="category"
                                      error={errors.category}
                                    />              
                       
 </div>     
 <div className="flex justify-end pb-4 text-center mb-2">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                        
                      >
                        {`${t('common.button.preview')}`}
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
                 {/* <Button type="button" variant="outline-secondary" onClick={()=> {
               setLabelsPreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button> */}
                    </div>
 {/* <div className="flex justify-end py-9 text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className=" mr-1 w-24"
                        
                      >
                        {`${t('common.button.preview')}`}
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
                 
                    </div>  */}
</div> 


                    </Dialog.Description>

                    
                  </Dialog.Panel>
                </Dialog>
                {/* End of Labels Page */}

                {/* Startof Bartender Page */}
                  <Menu.Devider />
                  <Menu.Item onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setBartenderPreview(true)
                }}>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                    Bartender Report
                  </Menu.Item>
                  <Dialog
                  size="xl"
                  open={bartenderPreview}
                  onClose={() => {
                    setBartenderPreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.bartender.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setBartenderPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description >
                   
                  
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

                <div className="mx-auto items-center md:flex">
                  <Button
                    variant="linkedin"
                    className="mr-2 flex items-center"
                    size="sm"
                  >
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column
                    Visibility
                  </Button>

                  <Menu>
                    <Menu.Button
                      as={Button}
                      variant="facebook"
                      className="flex items-center"
                      size="sm"
                    >
                      Export As{' '}
                      <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        CSV
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        Excel
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

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-auto">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search here"
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                  />
                </div>
                
              </div>
              <div className=" mb-3 py-3">
                <VariationTableElementBartender register={register} />
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
              




                    </Dialog.Description>

                    
                  </Dialog.Panel>
                </Dialog>
                  
                  <Menu.Item>
                    <Lucide icon="Download" className="mr-2 h-4 w-4" />
                    Download Doc
                  </Menu.Item>
                  <Menu.Item onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setViewDocPreview(true)
                }}>
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" />
                    View Doc
                  </Menu.Item>

                  <Dialog
                  size="xl"
                  open={viewDocPreview}
                  onClose={() => {
                    setViewDocPreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewDoc.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setViewDocPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description >

<div className="intro-y box px-5 py-7 ">
  
 <div className="flex justify-end  ">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                        
                      >
                        {`${t('common.button.download')}`}
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
                 <Button type="button" variant="outline-secondary" onClick={()=> {
               setViewDocPreview(false);
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
                          setAddPaymentPreview(true)
                        }}>
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

                  <Menu.Item onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setDuePaymentsPreview(true)
                }}>
                    <Lucide icon="Disc" className="mr-2 h-4 w-4" />
                    View Payment
                  </Menu.Item>
                  <Menu.Item onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setPurchaseReturnPreview(true)
                }}>
                    <Lucide icon="CornerUpLeft" className="mr-2 h-4 w-4" />
                    Purchase Return
                  </Menu.Item>
                  <Dialog
                  size="xl"
                  open={purchaseReturnPreview}
                  onClose={() => {
                    setPurchaseReturnPreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setPurchaseReturnPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description >
                    <div className="intro-y box px-5 py-7 mb-5">
                    <h2 className=" text-base font-bold mb-7">
        {`${t('contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.parentPurchase.label')}`}
    </h2>

    <div className=" grid grid-cols-1 gap-7 sm:grid-cols-2 ">
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.referenceNo.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1"  style={{ maxWidth: '300px', wordWrap: 'break-word' }}>{' 120000.00 '} </div>
                          </div>
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.supplier.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1"  style={{ maxWidth: '300px', wordWrap: 'break-word' }}>{' Mr. Ramanayake'} </div>
                          </div>
                        
                       
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.date.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1"  style={{ maxWidth: '250px', wordWrap: 'break-word' }}>
                              {' 2023.09.17'}{' '}
                            </div>
                          </div>
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.businessLocation.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1"  style={{ maxWidth: '300px', wordWrap: 'break-word' }}>{' Kandy '} </div>
                          </div>
                         
                        </div>      
</div>
<div className="intro-y box px-5 py-7 ">
<div className=" grid grid-cols-1 gap-7 sm:grid-cols-2 ">
<InputElement
                            label={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.referenceNo.label'
                            )}`}
                            register={register}
                            name="referenceNo"
                            placeholder={`${t(
                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.referenceNo.placeolder'
                            )}`}
                            id="referenceNo"
                          />
                          </div>
                          <div className=" mb-3 py-7">
                <VariationTableElementParentPurchase register={register} />
              </div>
              <div className="intro-y mt-2 flex flex-col items-center ">
                          <div className="mr-auto flex">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.totalReturnTax.label'
                              )}`}{' '}
                              {':'}
                            </div>{' '}
                            <div className=" ml-1">
                              {
                                ' Rs.100,000.000000000000 '
                              }{' '}
                            </div>
                          </div>

                          <div className="mr-auto flex py-2">
                            <div className=" font-medium">
                              {`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchaseReturn.fields.returnTotal.label'
                              )}`}{' '}
                              :
                            </div>{' '}
                            <div className=" ml-1">{' Rs.100,000.00 '}</div>
                          </div>
                        </div>
 <div className="flex justify-end mb-5 ">
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
                 {/* <Button type="button" variant="outline-secondary" onClick={()=> {
               setLabelsPreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button> */}
                    </div>
 {/* <div className="flex justify-end py-9 text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className=" mr-1 w-24"
                        
                      >
                        {`${t('common.button.preview')}`}
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
                 
                    </div>  */}
</div> 


                    </Dialog.Description>

                    
                  </Dialog.Panel>
                </Dialog>
                  <Menu.Item>
                    <Lucide icon="Edit2" className="mr-2 h-4 w-4" />
                    Update Status
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'left' }} onClick={(event: React.MouseEvent) => {
                              event.preventDefault()
                              setReceivedNotificationsPreview(true)
                            }}>
                <Lucide icon="Mail" className="mr-2 h-4 w-4" />
                  Item Received Notification
                </Menu.Item>
                <Dialog
                          open={receivedNotificationsPreview}
                          size="xl"
                          onClose={() => {
                            setReceivedNotificationsPreview(false)
                          }}
                        >
                          <Dialog.Panel className="max-h-screen overflow-y-auto">
                            <a
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                setReceivedNotificationsPreview(false)
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
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.receivedNotification.title'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendEmailOnly.label'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendSmsOnly.label'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendBoth.label'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                        setReceivedNotificationsPreview(false)
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
                </Menu.Items>
              </Menu>
            </Table.Td>
            <Table.Td className="!px-2">06/30/2023 11:51 AM</Table.Td>
            <Table.Td className="!px-2">PO2023/0241</Table.Td>
            <Table.Td className="!px-2">Liza</Table.Td>
            <Table.Td className="!px-2">nanda</Table.Td>
            <Table.Td className="!px-2">
              <Button
                variant="success"
                size="sm"
                className="mb-1 w-24 text-white"
                as="a"
                href="#"
              >
                {' '}
                Received
              </Button>
            </Table.Td>
            <Table.Td className="!px-2">
              <Button
                variant="pending"
                size="sm"
                className="mb-1 w-24 text-white"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setDuePaymentsPreview(true)
                }}
              >
                Due
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
                            Supplier :
                          </div>
                          <div className="mt-1">Mrs.Prabashi</div>
                          <div className="mt-1">Mobile : 071567 8907</div>
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
                            Reference No : #PO2023/0241
                          </div>

                          <div className="mt-1">Date: 06/30/2023</div>
                          <div className="mt-1">Purchase Status: Received</div>
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
                            Payment Paid Notification
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
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.title'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendEmailOnly.label'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendSmsOnly.label'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendBoth.label'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                        </Table>
                      </div>
                    </div>
                    <div className="px-5 pb-8 text-center">
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
            </Table.Td>
            <Table.Td className="!px-2"></Table.Td>
            <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
            <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
            <Table.Td className="!px-2">2023/09/23</Table.Td>
            <Table.Td className="!px-2">2023/09/23</Table.Td>
          </Table.Tr>

          {/* 2nd Row */}
          <Table.Tr>
            <Table.Td className="!px-1">
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
                  <Menu.Item>
                    <Lucide icon="Repeat" className="mr-2 h-4 w-4" />
                    Pay
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" />
                    View
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                    Edit
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                    Delete
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Power" className="mr-2 h-4 w-4" />
                    Deactivate
                  </Menu.Item>
                  <Menu.Devider />
                  <Menu.Item>
                    <Lucide icon="File" className="mr-2 h-4 w-4" />
                    Ledger
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="ArrowDown" className="mr-2 h-4 w-4" />
                    Purchases
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                    Stock Report
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Link" className="mr-2 h-4 w-4" />
                    Documents
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </Table.Td>
            <Table.Td className="!px-2">06/30/2023 11:51 AM</Table.Td>
            <Table.Td className="!px-2">PO2023/0241</Table.Td>
            <Table.Td className="!px-2">Liza</Table.Td>
            <Table.Td className="!px-2">nanda</Table.Td>
            <Table.Td className="!px-2">
              <Button
                variant="success"
                size="sm"
                className="mb-1 w-24 text-white"
                as="a"
                href="#"
              >
                {' '}
                Received
              </Button>
            </Table.Td>
            <Table.Td className="!px-2">
              <Button
                variant="success"
                size="sm"
                className="mb-1 w-24 text-white"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setPaidPaymentsPreview(true)
                }}
              >
                Paid
              </Button>
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
                      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.due.title'
                    )}`}</h2>
                  </Dialog.Title>
                  <div className="mb-7 text-center">
                    <div className="mb-5">
                      <div className="flex flex-col border-b px-5 pt-10 text-center sm:px-6 sm:pt-10 sm:text-left lg:flex-row lg:pb-6">
                        <div>
                          <div className="text-lg font-medium text-primary">
                            Supplier :
                          </div>
                          <div className="mt-1">Mrs.Prabashi</div>
                          <div className="mt-1">Mobile : 071567 8907</div>
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
                            Reference No : #PO2023/0241
                          </div>

                          <div className="mt-1">Date: 06/30/2023</div>
                          <div className="mt-1">Purchase Status: Received</div>
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
                            Payment Paid Notification
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
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.title'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendEmailOnly.label'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendSmsOnly.label'
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
                                              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.sendBoth.label'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.to.placeolder'
                                          )}`}
                                          register={register}
                                          name="to"
                                          id="to"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.subject.placeolder'
                                          )}`}
                                          register={register}
                                          name="subject"
                                          id="subject"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.cc.placeolder'
                                          )}`}
                                          register={register}
                                          name="cc"
                                          id="cc"
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.bcc.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.label'
                                          )}`}
                                          register={register}
                                          value={editorDataExpensesNote}
                                          // onChange={setEditorDataExpensesNote}
                                        />
                                      </div>
                                      <div className="my-7">
                                        <InputElement
                                          label={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.mobileNumber.placeolder'
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
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.label'
                                          )}`}
                                          placeholder={`${t(
                                            'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.smsBody.placeolder'
                                          )}`}
                                          register={register}
                                        />
                                      </div>
                                      <div className="mr-2 mt-7 font-medium">
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.label'
                                        )}`}
                                        :{' '}
                                      </div>{' '}
                                      <div className=" mt-2 ">
                                        {' '}
                                        {`${t(
                                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.availabletags.placeolder'
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
                                Rs.50
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
                                    setSendNotificationsPreview(true)
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
                                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.paymentReceipt.title'
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
                                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.paymentReceipt.fields.paymentDetails.label'
                                              )}`}
                                              {' : '}
                                            </div>
                                            <div className="ml-1 flex items-center text-xl font-medium">
                                              {`${t(
                                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.paymentReceipt.fields.paymentDetails.placeolder'
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
            </Table.Td>
            <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
            <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
            <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
            <Table.Td className="!px-2">2023/09/23</Table.Td>
            <Table.Td className="!px-2">2023/09/23</Table.Td>
          </Table.Tr>
        </Table.Tbody>
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800"></Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800"></Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800"></Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Total
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Received - 2
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Due - 1 Paid - 1
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Rs. 150.00
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Purchase Due - Rs. 75.00
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Purchase Return - Rs. 75.00
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800"></Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800"></Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800"></Table.Th>
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
  )
}

export default VariationTablePurchase
