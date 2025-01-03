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
import _ from 'lodash'
import Table from '../../../components/common/table'
import { SetStateAction, useRef, useState } from 'react'
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
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../../constants'
import Alert from '../../../base-components/Alert'
import { AlignmentTypes } from '../../../constants/common-enums'
import LoadingIcon from '../../../components/common/loading-icon'
import clsx from 'clsx'
import ClassicEditorElement from '../../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { PosApi } from '../../../api'
import TomSelect from '../../../components/common/tom-select'

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
  const [select, setSelect] = useState('1')
  const [date, setDate] = useState('')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)
  const [tooltipContent2] = useState(
    '-ve value = Amount to pay +ve Value = Amount to receive'
  )
  const [tooltipContent1] = useState('Total Unpaid Amount for Purchases.')
  const [tooltipContent3] = useState('Total Amount to be Received from Sales')

  const [checked, setChecked] = useState(false)
  const [paidViewPreview, setPaidViewPreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const [productPricePreview, setproductPricePreview] = useState(false)
  const [daterange, setDaterange] = useState('')
  const tabListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  }

  const tabButtonStyle = {
    display: 'inline-block',
    width: '120px', // Adjust the width as needed
  }
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

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 text-lg font-medium">Stock Adjustment Report</h2>
      </div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="mr-auto">
          <div className=" flex w-full sm:mt-0 sm:w-auto">
            <div className="relative  text-slate-500">
              <TomSelect
                id="update-profile-form-2"
                value={select}
                onChange={setSelect}
                className="w-80 bg-secondary"
              >
                <option value="1">All Locations</option>
                <option value="2">Bunny Stores</option>
                <option value="3">Kandy</option>
              </TomSelect>
            </div>
          </div>
        </h2>
        <div className=" flex w-full sm:mt-0 sm:w-auto">
          <div className="relative  text-slate-500">
            <Lucide
              icon="Calendar"
              className="absolute inset-y-0 left-0 z-10 my-auto ml-3 h-4 w-4 justify-end"
            />
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
              className="!box pl-10 sm:w-56"
            />
          </div>
        </div>
      </div>

      <div className="mb-5 mt-5 grid grid-cols-12 gap-6  ">
        {/* BEGIN: Top Categories */}
        <div className="intro-y box col-span-12 lg:col-span-6">
          <div className="p-5">
            <Table striped>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Total Normal</Table.Td>
                  <Table.Td className="text-right"> ₨ 0.00</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Total Abnormal</Table.Td>
                  <Table.Td className="text-right"> ₨ 10.00</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Total Stock Adjustment</Table.Td>
                  <Table.Td className="text-right"> ₨ 20.00</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </div>
        <div className="intro-y box col-span-12 lg:col-span-6">
          <div className="p-5">
            <Table striped>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Total Amount Recovered</Table.Td>
                  <Table.Td className="text-right"> ₨ 0.00</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div className="items-center justify-center border-slate-200/60 dark:border-darkmode-400 ">
       
        <div className="intro-y ">
      
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
               
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
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
                  <Table.Th className="whitespace-nowrap  bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 Adjustment type
                  </Table.Th>
                  <Table.Th className=" text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               Total Amount
                  </Table.Th>
                  <Table.Th className="text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Total Amount Recovered
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Reason
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               Added By
                  </Table.Th>
                 
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
              <Table.Td className="">
              <div className=" items-left flex  lg:justify-start">
              <Button variant="primary" className="mb-2 mr-1"  size="sm" onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setPurchaseDetailsPreview(true)
                    }}  >
              <Lucide icon="Eye" className="h-4 w-4 " />
                </Button>
               
                
              </div>
            </Table.Td>
                  <Table.Td className="!px-2">05/09/2023 03:00 PM</Table.Td>
                  <Table.Td className="!px-2">ST2023/0040</Table.Td>
                  <Table.Td className="!px-2">Bunny</Table.Td>
                  <Table.Td className="!px-2">Kandy</Table.Td>
                 
                  <Table.Td className="!px-2 text-right">Rs. 100.00</Table.Td>
                  <Table.Td className="!px-2 text-right">Rs. 400.00</Table.Td>
                  <Table.Td className="!px-2">Phone</Table.Td>
                  <Table.Td className="!px-2">Me</Table.Td>
                </Table.Tr>

              </Table.Tbody>

            </Table>
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
                          'stockAdjustment.fields.allStock.fields.view.title'
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
                                  Business :{' '}
                                  <div className="mb-2"></div>
                                    <strong
                                      style={{
                                        maxWidth: '20px',
                                        wordWrap: 'break-word',
                                      }}
                                    >
                                     RAINBO KIDS Bunny outlet galle
                                    </strong>
                                    <div className="mb-2"></div>
                                    <div className=" font-medium ">
                                    Mobile : <strong>091-876432</strong>
                                  </div>
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
                                  Adjustment Type : <strong> In Transit</strong>
                                  </div>
                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                  Reason : <strong> In Transit</strong>
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
                                 

                                  <div className="mb-2"></div>
                                  <div className=" font-medium ">
                                    Date : <strong>06/30/2023</strong>
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between sm:w-auto sm:px-6">
                     
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
                                 
                                  <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                                  Product 
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                                  Lot & Expiry
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap border-b-2 dark:border-darkmode-400">
                                  Quantity
                                  </Table.Th>
                        
                                  <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                                  Subtotal
                                  </Table.Th>
                                 
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                                <Table.Tr>
                                  <Table.Td className="border-b dark:border-darkmode-400">
                                  Bluetooth headset, 76981
                                  <div>Lot & Expiry:</div>
                                  </Table.Td>
                                 
                                  <Table.Td className=" border-b dark:border-darkmode-400">
                                  1
                                  </Table.Td>
                                  <Table.Td className="border-b font-medium dark:border-darkmode-400">
                                  1.00 Pc(s)
                                  </Table.Td>
                                  <Table.Td className="border-b text-right font-medium dark:border-darkmode-400">
                                    Rs.50.00
                                  </Table.Td>
                                 
                 
                                </Table.Tr>
                              </Table.Tbody>
                            </Table>
                          </div>

                          <div className="mb-5  pt-6 ">
                            {/* <div className="mb-3 ml-1 text-xl font-medium text-primary">
                              Payment Info :
                            </div> */}
                            <div className=" lg:mt-0 lg:text-right grid grid-cols-1 gap-7 md:grid-cols-2">
                          
                              <Table>
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td className="border-b dark:border-darkmode-400 ">
                                      <div className=" whitespace-nowrap ">
                                      Total Amount
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
                                      Total Amount Recovered
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
    </div></div>
  )
}

export default Main
