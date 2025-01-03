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
  const [tokenModal, setTokenModal] = useState(false)
  const tokenModalRef = useRef(null)

  const [tooltipContent1] = useState(
    'Status which are not marked as completed will be displayed here.'
  )
  const [tooltipContent2] = useState(
    'Status which are marked as completed will be displayed here.'
  )

  const [discountPreview,  setDiscountPreview] = useState(false)  
  const [checked, setChecked] = useState(false)
  const [ locationPreview,  setLocationPreview] = useState(false) 


  const handleChange = () => {
    setChecked(!checked)
  }
  const [editPaymentPreview, setEditPaymentPreview] = useState(false) 
  const [paidPaymentsPreview, setPaidPaymentsPreview] = useState(false)
  const [approveModal, setApproveModal] = useState(false)
  const approveModalRef = useRef(null)
  const [declineModal, setDeclineModal] = useState(false)
  const declineModalRef = useRef(null)

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
    
    <div className="">

          
      <Tab.Group className="">
      <div className="flex justify-center mt-6 intro-y">
          <Tab.List
            variant="pills"
            className="w-auto mx-auto overflow-hidden rounded-full box"
          >
            <Tab>
              <Tab.Button
                className="w-32 py-2 rounded-none lg:w-64 lg:py-3"
                as="button"
              >
              Minimum Sale Prices Approvel Request
              </Tab.Button>
            </Tab>
            <Tab>
              <Tab.Button
                className="w-32 py-2 rounded-none lg:w-64 lg:py-3"
                as="button"
              >
               Selling Price Overide 
               <div>OTP</div>
              </Tab.Button>
            </Tab>
            
          </Tab.List>
        </div>
      {/* <div className="p-2 mt-5 box">
  <Tab.List
    variant="pills"
    className="mx-auto w-auto rounded-md border-slate-300 p-1 dark:border-darkmode-300"
  >
    <Tab>
      <Tab.Button as="button" className="w-full py-1.5 flex justify-center">
      Minimum Sale Prices Approvel Request
      </Tab.Button>
    </Tab>
    <Tab>
      <Tab.Button as="button" className="w-full py-1.5 flex justify-center">
      Selling Price Overide OTP
      </Tab.Button>
    </Tab>
  </Tab.List>
</div> */}

            <Tab.Panels className="pb-5">

              <Tab.Panel className="mt-5">
     
                    <div className="intro-y box mb-5 px-5 py-5">
                    <div className="">
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
                  Requested At
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Invoice No
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Requested By
                  </Table.Th>
                 
                  

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
                 
              <Table.Td className="!px-2"> 
                    <Button variant="primary" size="sm" className="mb-2  mr-2 w-16"  onChange={handleChange}
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setPaidPaymentsPreview(true)
                      }} >
                  <a className="mr-2 flex items-center" href="#">
                    <Lucide icon="Eye" className="h-4 w-4 mr-1" /> View
                  </a>
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
                      'sales.fields.minimumSale.fields.view.title'
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
                          Invoice No : #0028
                          </div>
                          <div className="text-base font-medium ">
                          Status :
                          </div>
                        
                          
                        </div>
                      </div>
                      <div className="flex flex-col border-b px-5 pb-10 pt-10 text-center sm:px-6 sm:pb-10 sm:text-left lg:flex-row">
                        <div>
                        <div  className="font-medium text-base" >
                        <strong>Shipping</strong>  
                          </div>
                          <div className="mt-1" style={{
                              maxWidth: '350px',
                              wordWrap: 'break-word',
                            }}> Nugegoda,Western Province,Sri Lanka, 800000</div>
                         
                        </div>
                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                        <div className="font-medium text-base">
                        <strong>Date  :</strong>07/29/2022
                          </div>
                          
                        
                          
                        </div>
                       
                      </div>
                    </div>
                    <div className="text-lg font-medium ">
                    Products
              </div>
                    <div className=" sm:px-6 sm:py-6 border-b mb-5">
                   
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
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                              Product
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                              Unit Price
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                              Requested Price
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap text-center border-b-2 dark:border-darkmode-400">
                              Status
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
                              <Table.Td className=" border-b dark:border-darkmode-400">
                              1 product -77236
                              </Table.Td>
                              <Table.Td className=" border-b text-right dark:border-darkmode-400">
                                Rs.50.00
                              </Table.Td>
                              <Table.Td className=" border-b text-right font-medium dark:border-darkmode-400">
                              Rs.50.00
                              </Table.Td>
                              <Table.Td className="border-b text-center font-medium dark:border-darkmode-400">
                              <Button variant="success" size="sm" className="text-white mb-2 mr-2"
                              onClick={(event: { preventDefault: () => void }) => {
                                event.preventDefault();
                                setApproveModal(true);
                              }}>
        <Lucide icon="CheckCircle" className="w-4 h-4 mr-2" />{" "}
        Approve
    </Button>
    <Dialog
        open={approveModal}
        onClose={() => {
          setApproveModal(false);
        }}
        initialFocus={approveModalRef}
      >
        <Dialog.Panel>
        <div className="p-5 text-center">
            <Lucide
              icon="CheckCircle"
              className="w-16 h-16 mx-auto mt-3 text-success"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
           
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setApproveModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              type="button"
              className="w-24"
              ref={approveModalRef}
            >
             OK
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>  
    <Button variant="danger" size="sm" className="text-white mb-2 mr-2"
    onClick={(event: { preventDefault: () => void }) => {
      event.preventDefault();
      setDeclineModal(true);
    }}>
        <Lucide icon="XCircle" className="w-4 h-4 mr-2" />{" "}
        Decline
    </Button>
    <Dialog
        open={declineModal}
        onClose={() => {
          setDeclineModal(false);
        }}
        initialFocus={declineModalRef}
      >
        <Dialog.Panel>
        <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
           
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeclineModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={declineModalRef}
            >
             OK
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
                    <div className="text-left px-6 flex">
                        <strong>{'Sell Note : '}</strong>
                        <div style={{
                              maxWidth: '550px',
                              wordWrap: 'break-word',
                            }}> Need approval for finalize this invoice</div>
                          </div>
                    <div className="px-2  text-center">

                      <div className="flex justify-end px-3 pb-4 text-center">
                        
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
                  <Table.Td className="!px-2">09/13/2023 14:17</Table.Td>
                  <Table.Td className="!px-2">3456</Table.Td>
                  <Table.Td className="!px-2">miss Sathsarani</Table.Td>
                  
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
                </div>
              
      </div>
              </Tab.Panel>
              <Tab.Panel className="mt-5">
              <div className="intro-y box mb-5 mt-5 px-5 py-5">
              <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('sales.fields.minimumSale.fields.salePriceRequest.label')}`}
                  </h2>
                  </div>
                 
                          <h1 className="text-6xl text-center mt-5 font-medium leading-none text-primary">
                          376446
    </h1>
</div>


</Tab.Panel>
              </Tab.Panels>
              </Tab.Group>

    
    </div>
  )
}

export default Main
