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
  const [select, setSelect] = useState('1')
  const [date, setDate] = useState('')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [tooltipContent2] = useState(
    'Difference between total tax collected and total tax paid within the selected time period.'
  )

  const [discountPreview, setDiscountPreview] = useState(false)
  const [checked, setChecked] = useState(false)
  const [locationPreview, setLocationPreview] = useState(false)
  const [accountPreview, setAccountPreview] = useState(false)
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const [productPricePreview, setproductPricePreview] = useState(false)
  const [daterange, setDaterange] = useState('')
  const tabListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  
  const tabButtonStyle = {
    display: 'inline-block',
    width: '120px', // Adjust the width as needed
  }

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          Tax Report
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
           label={`${t('purchases.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
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
          

   
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
                    </div>
                   
           {/* BEGIN: Top Categories */}
           <div className="intro-y box mb-5 px-5 py-5">
       <div className="flex flex-col border-b mb-5 font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base flex font-medium mb-4">
                  {`${t('reports.fields.taxReports.title')}`}
                  <Tippy content={tooltipContent2}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className=" mx-2 mt-0.5 h-5 w-5 " />
                    </a>{' '}
                  </Tippy>
                 
                  </h2>
                  
                  </div>
                <div >
                  <div className="flex flex-col sm:flex-row">
                    <div className="mr-auto">
   
                      <div className=" text-lg flex">
                      Output Tax - Input Tax - Expense Tax : <div className="font-medium"> ₨ 0.00</div>

                      </div>
                      
                    </div>
                   
                  </div>
                 
                 
                </div>
              </div>

             
              <div className=" mt-5 flex justify-end">
<Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
                               {`${t('common.button.print')}`}
                               {isLoading ? (
                                 <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
                               ) : (
                                 ''
                               )}
                             </Button> 
</div>
              
     

<div className="">
  <Tab.Group className=" overflow-hidden intro-y box mt-5">
                <Tab.List className="flex-col border-transparent dark:border-transparent sm:flex-row bg-slate-200 dark:bg-darkmode-800" style={tabListStyle}>
                    <Tab fullWidth={false}>
                        {({ selected }) => (
                            <Tab.Button
                                className={clsx([
                                    "flex items-center justify-center w-full px-0 py-0 sm:w-36 text-slate-500",
                                    !selected &&
                                    "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                                    selected &&
                                    "text-primary border-transparent dark:bg-darkmode-600 dark:border-transparent dark:text-white",
                                ])}
                                as="button"
                            >
                                <Tippy
                                    content=""
                                    className="flex items-center justify-center w-full py-4"
                                    aria-controls="content"
                                    aria-selected="true"
                                >

                                   Input Text
                                </Tippy>
                            </Tab.Button>
                        )}
                    </Tab>
                    <Tab fullWidth={false}>
                        {({ selected }) => (
                            <Tab.Button
                                className={clsx([
                                    "flex items-center justify-center w-full px-0 py-0 sm:w-36 text-slate-500",
                                    !selected &&
                                    "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                                    selected &&
                                    "text-primary border-transparent dark:bg-darkmode-600 dark:border-transparent dark:text-white",
                                ])}
                                as="button"
                            >
                                <Tippy
                                    content=""
                                    className="flex items-center justify-center w-full py-4"
                                    aria-controls="content"
                                    aria-selected="true"
                                >

                                   Output Tax
                                </Tippy>
                            </Tab.Button>
                        )}
                    </Tab>
                    <Tab fullWidth={false}>
                        {({ selected }) => (
                            <Tab.Button
                                className={clsx([
                                    "flex items-center justify-center w-full px-0 py-0 sm:w-36 text-slate-500",
                                    !selected &&
                                    "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                                    selected &&
                                    "text-primary border-transparent dark:bg-darkmode-600 dark:border-transparent dark:text-white",
                                ])}
                                as="button"
                            >
                                <Tippy
                                    content=""
                                    className="flex items-center justify-center w-full py-4"
                                    aria-controls="content"
                                    aria-selected="true"
                                >

                              Expense Tax
                                </Tippy>
                            </Tab.Button>
                        )}
                    </Tab>

                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel className="p-5">
                        <div>

                            <div className="flex flex-col items-center mt- intro-y sm:flex-row" />
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
                        placeholder="Search Status"
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
              

                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table bordered hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Date</Table.Th>
                <Table.Th className="whitespace-nowrap">Reference No</Table.Th>
                <Table.Th className="whitespace-nowrap">Supplier</Table.Th>
                <Table.Th className="whitespace-nowrap">Tax Number</Table.Th>
                <Table.Th className="whitespace-nowrap">Total Amount</Table.Th>
                <Table.Th className="whitespace-nowrap">Discount</Table.Th>
                <Table.Th className="whitespace-nowrap">GST</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            <Table.Tr>
                <Table.Td>2023.09.12</Table.Td>
                <Table.Td>kumara</Table.Td>
                <Table.Td>Saman</Table.Td>
                <Table.Td>10.00</Table.Td>
                <Table.Td className="text-right">		₨ 110.00</Table.Td>
                <Table.Td className="text-right">		₨ 110.00</Table.Td>
                <Table.Th className=" text-right">₨ 110.00</Table.Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Thead variant="light">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap ">Total</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
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
                            <div className="flex flex-wrap items-center col-span-10 intro-y sm:flex-row sm:flex-nowrap" />
                        </div>


                    </Tab.Panel>
                    <Tab.Panel className="p-5">
                        <div>

                            <div className="flex flex-col items-center mt- intro-y sm:flex-row" />
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
                        placeholder="Search Status"
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
              

                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table bordered hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Date</Table.Th>
                <Table.Th className="whitespace-nowrap">Invoice No</Table.Th>
                <Table.Th className="whitespace-nowrap">Customer</Table.Th>
                <Table.Th className="whitespace-nowrap">Tax Number</Table.Th>
                <Table.Th className="whitespace-nowrap">Total Amount</Table.Th>
                <Table.Th className="whitespace-nowrap">Discount</Table.Th>
                <Table.Th className="whitespace-nowrap">GST</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            <Table.Tr>
                <Table.Td>2023.09.12</Table.Td>
                <Table.Td>kumara</Table.Td>
                <Table.Td>Saman</Table.Td>
                <Table.Td>10.00</Table.Td>
                <Table.Td className="text-right">		₨ 110.00</Table.Td>
                <Table.Td className="text-right">		₨ 110.00</Table.Td>
                <Table.Th className=" text-right">₨ 110.00</Table.Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Thead variant="light">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap ">Total</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
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
                            <div className="flex flex-wrap items-center col-span-10 intro-y sm:flex-row sm:flex-nowrap" />
                        </div>


                    </Tab.Panel>
                    <Tab.Panel className="p-5">
                        <div>

                            <div className="flex flex-col items-center mt- intro-y sm:flex-row" />
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
                        placeholder="Search Status"
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
              

                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table bordered hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Date</Table.Th>
                <Table.Th className="whitespace-nowrap">Reference No</Table.Th>
                <Table.Th className="whitespace-nowrap">Tax Number</Table.Th>
                <Table.Th className="whitespace-nowrap">Total Amount</Table.Th>
                <Table.Th className="whitespace-nowrap">GST</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            <Table.Tr>
                <Table.Td>2023.09.12</Table.Td>
                <Table.Td>10.00</Table.Td>
                <Table.Td>1000</Table.Td>
                <Table.Td className="text-right">		₨ 110.00</Table.Td>
                <Table.Th className=" text-right">₨ 110.00</Table.Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Thead variant="light">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap "></Table.Th>
                <Table.Th className="whitespace-nowrap">Total</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">₨ 110.00</Table.Th>
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
                            <div className="flex flex-wrap items-center col-span-10 intro-y sm:flex-row sm:flex-nowrap" />
                        </div>


                    </Tab.Panel>
                </Tab.Panels>

               
            </Tab.Group>
</div>
    </div>
    
  )
}

export default Main
