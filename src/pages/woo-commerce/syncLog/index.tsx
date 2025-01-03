/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-string-refs */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../../components/common/table'
import { useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
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
} from '../../../components/common/form-elements/components'
import {
  SearchSelectElement,
  SelectElement,
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
import * as yup from 'yup'
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

  const { t } = useTranslation('pos')
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      createCustomer(data)
    }

  const schema = yup
  .object({
    firstName: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.firstName.validationMessage'
        )}`
      ),
     
  })
  .required()

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  // eslint-disable-next-line prettier/prettier

  const [sliderSize, setSliderSize] = useState('xl')

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
    setSliderSize('2xl')
  }

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [tooltipContent1] = useState(
    'Enable Woocommerce Sync for Selected Products'
  )
  const [tooltipContent2] = useState(
    'Deactivated Products will Not be Available for Purchase or Sell'
  )
  const [showTableHead, setShowTableHead] = useState(false)

  const handleChange = () => {
    // Toggle the state to show/hide the <Table.Thead>
    setShowTableHead(!showTableHead)
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
                {`${t('Sync Log')}`}
               
              </h2>
            </h2>
            
          </div>
     
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
        
        <div className="items-center justify-center border-slate-200/60  dark:border-darkmode-400 ">
        <div className="intro-y ">
                  <div className=" intro-y flex flex-col items-center sm:flex-row">
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
                        placeholder="Search "
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                    
                  </div>
                 
    <div className="overflow-y-auto overflow-x-scroll mt-3 mb-5">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
             
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
           Date
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
           Sync Type
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
          Operations
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
            Sync by
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
          Records
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
                      className="sm:w-auto"
                      onClick={handleChange}
                      size="sm"
                    >
                      <a>
                        <Lucide icon="PlusCircle" className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </Table.Td>
            <Table.Td className="">	<div>08/04/2022 02:54 PM</div>
            <div>1 year ago</div></Table.Td>
            <Table.Td >Orders</Table.Td>
            <Table.Td >Created</Table.Td>
            <Table.Td >Miss Nimasha Nayanamini</Table.Td>
            <Table.Td className="">	<div>	6960</div>
            <div>1 Records</div></Table.Td>
          </Table.Tr>
        </Table.Tbody>
        {showTableHead && (
                <>
        <Table.Thead variant="default" className="bg-primary text-white">
          <Table.Tr>
          <Table.Th className=" ">
            </Table.Th>
            <Table.Th >   
            </Table.Th>           
            <Table.Th >
            </Table.Th>
            <Table.Th >
            </Table.Th>
            <Table.Th >
            </Table.Th>
            <Table.Th >
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
           <Table.Tr>
           <Table.Td></Table.Td>
           <Table.Td></Table.Td>
           <Table.Td></Table.Td>
           <Table.Td></Table.Td>
           <Table.Td></Table.Td>
           <Table.Td></Table.Td>
          </Table.Tr>
        </Table.Tbody>
        </>
      )}
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
