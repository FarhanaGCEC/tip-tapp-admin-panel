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
        <h2 className="ml-2 mr-auto text-lg font-medium">Aging Report</h2>
      </div>

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
               A/R Aging Report
              </Tab.Button>
            </Tab>
            <Tab>
              <Tab.Button
                className="w-54 rounded-none py-2 lg:w-64 lg:py-3"
                as="button"
              >
              A/P Aging Report
              </Tab.Button>
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels className="pb-5">
          <Tab.Panel className="mt-5">
  <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('A/R Aging Report')}`}</h2>
                  </div>
                    
    <div className="mb-3 mt-2 flex ">
  <div className="mr-3 mt-2 font-medium">
   {'Aging Details Report '}
  </div>
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
  
</div>
                  </div>
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
            <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('Aging Summary Report')}`}</h2>
                  </div>
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

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search"
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
                      <Table.Th className="whitespace-nowrap">Customer Name</Table.Th>
                      <Table.Th className="whitespace-nowrap">Contact No</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right ">Current</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">1-30 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">31-60 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">61-90 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">Over 90 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">Total</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                    <Table.Td>	Miss Neha</Table.Td>
                      <Table.Td>0788889390</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
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
          </Tab.Panel>
          <Tab.Panel className="mt-5">
  <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('A/P Aging Report')}`}</h2>
                  </div>
                    
    <div className="mb-3 mt-2 flex ">
  <div className="mr-3 mt-2 font-medium">
   {'Aging Details Report '}
  </div>
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
  
</div>
                  </div>
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
            <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('Aging Summary Report')}`}</h2>
                  </div>
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

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search"
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
                      <Table.Th className="whitespace-nowrap">Customer Name</Table.Th>
                      <Table.Th className="whitespace-nowrap">Contact No</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right ">Current</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">1-30 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">31-60 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">61-90 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">Over 90 Days</Table.Th>
                      <Table.Th className="whitespace-nowrap text-right">Total</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                    <Table.Td>	Miss Neha</Table.Td>
                      <Table.Td>0788889390</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
                      <Table.Td className="text-right">₨ 1,090.00</Table.Td>
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
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Main
