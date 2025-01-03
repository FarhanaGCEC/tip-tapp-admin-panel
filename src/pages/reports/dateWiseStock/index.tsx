/* eslint-disable react/jsx-curly-brace-presence */
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
  FormCheck,
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
import VerticalBarChart1 from '../../../components/VerticalBarChart1'
import VariationTableElementStockReport from './variationTableStockReport-Elements'
import VariationTableElementSupStockReport from './variationTableSupStockReport-Elements'

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
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [tooltipContent1] = useState(
    'The DEFAULT SELLING PRICE Means the Last Added/Edited SALES PRICE'
  )
  const [buttonViewPricePreview, setViewPricePreview] = useState(false)
  const [checked, setChecked] = useState(false)
  const [paidViewPreview, setPaidViewPreview] = useState(false)
  const [buttonReportHistoryPreview, setReportHistoryPreview] = useState(false)
  const [productPricePreview, setproductPricePreview] = useState(false)
  const [daterange, setDaterange] = useState('')
  const tabListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  }
  const [tokenModal, setTokenModal] = useState(false)
  const tokenModalRef = useRef(null)
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
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo)
  }
  const [showTableHead, setShowTableHead] = useState(false)

  const handleChange = () => {
    // Toggle the state to show/hide the <Table.Thead>
    setShowTableHead(!showTableHead)
  }

  return (
    <div>
           <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
      <h2 className="mr-auto text-lg font-medium ml-2">Product Closeout Report<Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button></h2>
      </div>

      {/* <Alert variant="soft-danger" className="mb-6 mt-5 text-center font-medium">
      Note: Beta Testing Purpose
</Alert> */}

      <Tab.Group className="">
        <div className="intro-y mt-6 flex justify-center">
          <Tab.List
            variant="pills"
            className="box mx-auto w-auto overflow-hidden rounded-full"
          >
            <Tab>
              <Tab.Button
                className="w-54 rounded-none py-2 lg:w-64 lg:py-3"
                as="button"
              >
               Product Wise Stock Report 
              </Tab.Button>
            </Tab>
            <Tab>
              <Tab.Button
                className="w-54 rounded-none py-2 lg:w-64 lg:py-3"
                as="button"
              >
               Supplier Wise Stock Report
              </Tab.Button>
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels className="pb-5">
          <Tab.Panel className="mt-5">
          <Alert
  variant="soft-primary"
  dismissible
  className="intro-y box col-span-11 mb-5 mt-5 dark:bg-primary dark:border-darkmode-600"
>
  {/* {({ dismiss }) => ( */}
    <div className="flex items-center font-medium justify-center text-center">
      <span>
        <Lucide icon="Hourglass" className="mr-1 h-4 w-4" />
      </span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>
        Click
        <a onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setTokenModal(true);
                        }} className="ml-1 underline" target="_blank">
            Here
          </a> to Generate Latest Report Details.
         
        </span>
        {/* <Button       size="sm"
                      variant="twitter"
                      className=" ml-2 sm:w-auto"
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setReportHistoryPreview(true)
                      }}
                    >
                      Report History
                    </Button> */}
      </div>
      {/* <Alert.DismissButton className="text-white" onClick={dismiss} aria-label="Close">
        <Lucide icon="X" className="h-4 w-4" />
      </Alert.DismissButton> */}
    </div>
  {/* )} */}
</Alert>
<Dialog
        open={tokenModal}
        onClose={() => {
          setTokenModal(false);
        }}
        initialFocus={tokenModalRef}
      >
        <Dialog.Panel>
        <div className="p-5 text-center">
            <Lucide
              icon="Info"
              className="w-16 h-16 mx-auto mt-3 text-primary"
            />
            <div className="mt-5 text-3xl">Report Requested</div>
            <div className="mt-2 text-slate-500">
            Requested Report will be Generated Soon and  <br /> It will Notify You.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setTokenModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-24"
              ref={tokenModalRef}
            >
             OK
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>  
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
              <Disclosure.Group>
                <Disclosure>
                  <Disclosure.Button className="flex items-center px-5">
                    Filters <Lucide icon="Filter" className="ml-2 h-4 w-4" />
                    {/* <Button className="px-2" variant="primary"  >
             
                <Lucide icon="Filter" className="w-5 h-5 " />
             
            </Button> */}
                  </Disclosure.Button>

                  <Disclosure.Panel className="leading-relaxed ">
                    <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-3">
                      <SearchSelectElement
                        label={`${t(
                          'purchases.fields.businessLocation.label'
                        )}`}
                        register={register}
                        name="businessLocation"
                        id="businessLocation"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                                      <div>
                  <div className="font-medium">
                    {`${t('reports.fields.stokeDate.label')}`}{' '}
                  </div>

                  <Litepicker
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
                    className="box sm:w-54  mt-2"
                  />
                </div>
                    
                    </div>
                  </Disclosure.Panel>
                </Disclosure>
              </Disclosure.Group>
            </div>
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div>
        <div className='intro-y flex justify-center'>
        <Alert variant="soft-danger" className=" text-center font-medium w-96">
    This Report Generated at : 2023.08.30 16:16:09
</Alert>
        </div>
                  
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
                        placeholder="Search by Products"
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                    <Button
                      variant="primary"
                      className="shadow-md sm:w-auto"
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setReportHistoryPreview(true)
                      }}
                    >
                      Report History
                    </Button>
                    <Dialog
                      size="lg"
                      open={buttonReportHistoryPreview}
                      onClose={() => {
                        setReportHistoryPreview(false)
                      }}
                    >
                      <Dialog.Panel className="max-h-screen overflow-y-auto">
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">{`${t(
                            'productManagement.fields.selectReport.title'
                          )}`}</h2>
                        </Dialog.Title>
                        <a
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault()
                            setReportHistoryPreview(false)
                          }}
                          className="absolute right-0 top-0 mr-3 mt-3"
                          href="#"
                        >
                          <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                        </a>

                        <Dialog.Description>
                          <div>
                            <Table>
                              <Table.Thead
                                variant="light"
                              >
                                <Table.Tr>
                                  <Table.Th className="whitespace-nowrap">
                                    Report ID
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap">
                                    Generated At
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap">
                                    Applied Filter
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap text-center">
                                    Action
                                  </Table.Th>
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                              <Table.Tr>
                                  <Table.Td>00767</Table.Td>
                                  <Table.Td> 2023-07-25 16:22:41</Table.Td>
                                  <Table.Td> No Filter Applied</Table.Td>
                                  <Table.Td className="flex justify-end">
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      className="shadow-md sm:w-auto"
                                    >
                                      View History
                                    </Button>
                                  </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                  <Table.Td>00767</Table.Td>
                                  <Table.Td> 2023-07-25 16:22:41</Table.Td>
                                  <Table.Td> No Filter Applied</Table.Td>
                                  <Table.Td className="flex justify-end">
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      className="shadow-md sm:w-auto"
                                    >
                                      View History
                                    </Button>
                                  </Table.Td>
                                </Table.Tr>
                              </Table.Tbody>
                            </Table>
                          </div>
                        </Dialog.Description>

                        <div className=" flex justify-end px-3 pb-4 mr-4 text-center">
                          {/* <Button
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
                      </Button> */}
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                              setReportHistoryPreview(false)
                            }}
                            className="mb-2 mr-1 w-24"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>
                  </div>
                  <div className=" mb-5 py-5" style={{ overflowY: 'auto' }}>
                    <VariationTableElementStockReport register={register} />
                  </div>

                  {/* <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap">
            <div className="mr-auto  font-medium">
              Showing 1 to 10 of 150 entries
            </div>
           
          </div> */}
                </div>
      </div>
          </Tab.Panel>
          <Tab.Panel className="mt-5">
            <div className='flex items-center justify-center '>
            <Alert variant="soft-primary" className=" text-center font-medium ">
    <div className="flex items-center font-medium justify-center text-center">
      <span>
        <Lucide icon="Hourglass" className="mr-1 h-4 w-4" />
      </span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>
        Click
        <a onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setTokenModal(true);
                        }} className="ml-1 underline" target="_blank">
            Here
          </a> to Generate Latest Report Details.
         
        </span>
      
      </div>
      
    </div>
</Alert>
<Alert variant="soft-pending" className=" text-center font-medium  ml-12 ">
  {/* {({ dismiss }) => ( */}
    <div className="flex items-center font-medium justify-center text-center">
      <span>
        <Lucide icon="AlertTriangle" className="mr-1 h-4 w-4" />
      </span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      Note: This report is only for the products which are purchased from the supplier.
      </div>
     
    </div>
  {/* )} */}
</Alert>
            </div>


<Dialog
        open={tokenModal}
        onClose={() => {
          setTokenModal(false);
        }}
        initialFocus={tokenModalRef}
      >
        <Dialog.Panel>
        <div className="p-5 text-center">
            <Lucide
              icon="Info"
              className="w-16 h-16 mx-auto mt-3 text-primary"
            />
            <div className="mt-5 text-3xl">Report Requested</div>
            <div className="mt-2 text-slate-500">
            Requested Report will be Generated Soon and  <br /> It will Notify You.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setTokenModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-24"
              ref={tokenModalRef}
            >
             OK
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>  
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
              <Disclosure.Group>
                <Disclosure>
                  <Disclosure.Button className="flex items-center px-5">
                    Filters <Lucide icon="Filter" className="ml-2 h-4 w-4" />
                    {/* <Button className="px-2" variant="primary"  >
             
                <Lucide icon="Filter" className="w-5 h-5 " />
             
            </Button> */}
                  </Disclosure.Button>

                  <Disclosure.Panel className="leading-relaxed ">
                    <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-3">
                      <SearchSelectElement
                        label={`${t(
                          'purchases.fields.businessLocation.label'
                        )}`}
                        register={register}
                        name="businessLocation"
                        id="businessLocation"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t(
                          'purchases.fields.supplier.label'
                        )}`}
                        register={register}
                        name="supplier"
                        id="supplier"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                                      <div>
                  <div className="font-medium">
                    {`${t('reports.fields.stokeDate.label')}`}{' '}
                  </div>

                  <Litepicker
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
                    className="box sm:w-54  mt-2"
                  />
                </div>
                    
                    </div>
                  </Disclosure.Panel>
                </Disclosure>
              </Disclosure.Group>
            </div>
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div>
        <div className='intro-y flex justify-center'>
        <Alert variant="soft-danger" className=" text-center font-medium w-96">
    This Report Generated at : 2023.08.30 16:16:09
</Alert>
        </div>
                  
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
                        placeholder="Search by Products"
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                    <Button
                      variant="primary"
                      className="shadow-md sm:w-auto"
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setReportHistoryPreview(true)
                      }}
                    >
                      Report History
                    </Button>
                    <Dialog
                      size="lg"
                      open={buttonReportHistoryPreview}
                      onClose={() => {
                        setReportHistoryPreview(false)
                      }}
                    >
                      <Dialog.Panel className="max-h-screen overflow-y-auto">
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">{`${t(
                            'productManagement.fields.selectReport.title'
                          )}`}</h2>
                        </Dialog.Title>
                        <a
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault()
                            setReportHistoryPreview(false)
                          }}
                          className="absolute right-0 top-0 mr-3 mt-3"
                          href="#"
                        >
                          <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                        </a>

                        <Dialog.Description>
                          <div>
                            <Table>
                              <Table.Thead
                                variant="light"
                              >
                                <Table.Tr>
                                  <Table.Th className="whitespace-nowrap">
                                    Report ID
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap">
                                    Generated At
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap">
                                    Applied Filter
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap text-center">
                                    Action
                                  </Table.Th>
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                              <Table.Tr>
                                  <Table.Td>00767</Table.Td>
                                  <Table.Td> 2023-07-25 16:22:41</Table.Td>
                                  <Table.Td> No Filter Applied</Table.Td>
                                  <Table.Td className="flex justify-end">
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      className="shadow-md sm:w-auto"
                                    >
                                      View History
                                    </Button>
                                  </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                  <Table.Td>00767</Table.Td>
                                  <Table.Td> 2023-07-25 16:22:41</Table.Td>
                                  <Table.Td> No Filter Applied</Table.Td>
                                  <Table.Td className="flex justify-end">
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      className="shadow-md sm:w-auto"
                                    >
                                      View History
                                    </Button>
                                  </Table.Td>
                                </Table.Tr>
                              </Table.Tbody>
                            </Table>
                          </div>
                        </Dialog.Description>

                        <div className=" flex justify-end px-3 pb-4 mr-4 text-center">
                          {/* <Button
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
                      </Button> */}
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                              setReportHistoryPreview(false)
                            }}
                            className="mb-2 mr-1 w-24"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>
                  </div>
                  <div className=" mb-5 py-5" style={{ overflowY: 'auto' }}>
                    <VariationTableElementSupStockReport register={register} />
                  </div>

                  {/* <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap">
            <div className="mr-auto  font-medium">
              Showing 1 to 10 of 150 entries
            </div>
           
          </div> */}
                </div>
      </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Main
