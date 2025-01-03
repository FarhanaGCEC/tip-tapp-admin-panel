/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-redeclare */
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
  FormInfo,
  FormCheck,
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
      fromWarehouse: yup
        .string()
        .required(
          `${t('reports.fields.fromWarehouse.validationMessage')}`
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
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [tooltipContent2] = useState(
    'Difference between total tax collected and total tax paid within the selected time period.'
  )

  const [checked, setChecked] = useState(false)
  const [paidViewPreview, setPaidViewPreview] = useState(false)

  const [productPricePreview, setproductPricePreview] = useState(false)
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
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo)
  }
  const [date, setDate] = useState('')
  const [daterange, setDaterange] = useState('')
  const [showTableHead, setShowTableHead] = useState(false)

  const handleChange = () => {
    // Toggle the state to show/hide the <Table.Thead>
    setShowTableHead(!showTableHead)
  }

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          Stock Movement Report
        </h2>
      </div>
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
                
                <div>
                  <div className="font-medium">
                    {`${t('reports.fields.saleDate.label')}`}{' '}
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
                <SearchSelectElement
                  label={`${t('reports.fields.fromWarehouse.label')}`}
                  labelAlignment={AlignmentTypes.BLOCK}
                  register={register}
                  name="fromWarehouse"
                  id="fromWarehouse"
                  onChange={handleChange}
                  required
                />
              </div>
            </Disclosure.Panel>
          </Disclosure>
        </Disclosure.Group>
      </div>
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
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
              <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column Visibility
            </Button>

            <Menu>
              <Menu.Button
                as={Button}
                variant="facebook"
                className="flex items-center "
              >
                Export As <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As CSV
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As Excel
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Print
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Export to
                  PDF
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
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap">Product Name</Table.Th>
                <Table.Th className="whitespace-nowrap">From Warehous</Table.Th>
                <Table.Th className="whitespace-nowrap ">Supplier</Table.Th>
                <Table.Th className="whitespace-nowrap ">Customer</Table.Th>
                <Table.Th className="whitespace-nowrap ">Reference No</Table.Th>
                <Table.Th className="whitespace-nowrap ">Date</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">Quantity</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                  Total Unit Adjusted
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                  Unit Purchase Price
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                  Stock Balance
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="!px-2 text-center">
                  {showTableHead ? (
                    <Button
                      className={` bg-red-500 text-white sm:w-auto`}
                      onClick={handleChange}
                      size="sm"
                    >
                      <a>
                        <Lucide icon="MinusCircle" className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="twitter"
                      className={`sm:w-auto`}
                      onClick={handleChange}
                      size="sm"
                    >
                      <a>
                        <Lucide icon="PlusCircle" className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </Table.Td>

                <Table.Td>0702021</Table.Td>
                <Table.Td>kasunrocz</Table.Td>
                <Table.Td >kasunrocz</Table.Td>
                <Table.Td>Mr Dhanika</Table.Td>
                <Table.Td>12345</Table.Td>
                <Table.Td>07/02/2021 11:41 AM</Table.Td>
                <Table.Td className=" text-right">1.00</Table.Td>
                <Table.Td className=" text-right">₨ 12.00</Table.Td>
                <Table.Td className=" text-right">₨ 12.00</Table.Td>
                <Table.Td className=" text-right">₨ 12.00</Table.Td>
              </Table.Tr>
            </Table.Tbody>

            {showTableHead && (
                <>
        <Table.Thead variant="default" className="bg-primary text-white">
          <Table.Tr>
          <Table.Th className="  !px-2">
          
            </Table.Th>
            <Table.Th className="  !px-2 ">
            Name
            </Table.Th>
           
            <Table.Th className="  !px-2 ">
            Invoice No / Ref No
            </Table.Th>
            
            <Table.Th className=" !px-2 ">
            Date
            </Table.Th>
            <Table.Th className=" text-right !px-2 ">
            Quantity
            </Table.Th>
            <Table.Th className=" text-right !px-2 ">
            Unit Price
            </Table.Th>
            <Table.Th className="text-right  !px-2 ">
            Discount
            </Table.Th>
            <Table.Th className=" text-right !px-2 ">
            Tax
            </Table.Th>
            <Table.Th className="text-right !px-2 ">
            Price inc. tax
            </Table.Th>
            <Table.Th className=" text-right !px-2 ">
            Total
            </Table.Th>
            <Table.Th className=" !px-2 ">
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
           <Table.Tr>
           <Table.Td>Walking Customer</Table.Td>
           <Table.Td>2022-0163</Table.Td>
           <Table.Td>123</Table.Td>
           <Table.Td>07/02/2021 11:41 AM</Table.Td>
           <Table.Td className=" text-right ">1</Table.Td>
           <Table.Td className=" text-right ">Rs.15.0000</Table.Td>
           <Table.Td className=" text-right ">Rs.15.0000</Table.Td>
           <Table.Td className=" text-right ">Rs.15.0000</Table.Td>
           <Table.Td className=" text-right ">Rs.15.0000</Table.Td>
           <Table.Td className=" text-right ">Rs.15.0000</Table.Td>
          </Table.Tr>
        </Table.Tbody>
        </>
      )}
            <Table.Thead variant="light">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap text-center "></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap text-right"></Table.Th>
                <Table.Th className="whitespace-nowrap "></Table.Th>
                <Table.Th className="whitespace-nowrap "></Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap text-right">Total</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">   Rs 110.00</Table.Th>
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
    </div>
  )
}

export default Main
