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
import { useRef, useState } from 'react'
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
  Litepicker,
} from '../../../components/common/form-elements/components'
import {
  SearchSelectElement,
  SelectElement,
  TextareaElement,
  InputElement,
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
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

  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addJobSheet)
    }
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

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [tooltipContent1] = useState(
    'Status which are not marked as completed will be displayed here.'
  )
  const [tooltipContent2] = useState(
    'Status which are marked as completed will be displayed here.'
  )
  const [tooltipContent3] = useState(
    'The date the technician should return the item after repairing to the customer.'
  )
  const [buttonReportHistoryPreview, setReportHistoryPreview] = useState(false)
  const [notificationPreview,  setNotificationPreview] = useState(false)  
  const [progressPreview,  setProgressPreview] = useState(false) 
  const [checked, setChecked] = useState(false)
  const [daterange, setDaterange] = useState('')
  const handleChange = () => {
    setChecked(!checked)
  }
  const [editorDataExpensesNote, setEditorDataExpensesNote] = useState(
    `<p>${t(
      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.purchase.fields.sendNotifications.fields.emailBody.placeolder'
    )}.</p>`
  )
  const [selectMultiple, setSelectMultiple] = useState(['1', '5'])

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
               Invoices
                
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
           label={`${t('repair.fields.jobsheet.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <SearchSelectElement
           label={`${t('repair.fields.jobsheet.fields.customer.label')}`}
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
                        'contactManagement.fields.customers.fields.viewContact.fields.dateRange.label'
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
          label={`${t('repair.fields.jobsheet.fields.user.label')}`}
          labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="user"
            id="user"
            onChange={handleChange}
       
          />
         
      <div className="relative font-medium sm:mt-0">
     <div className="mb-2">{`${t(
          'repair.fields.jobsheet.fields.paymentStatus.label'
        )}`}{' '}
        </div> 
                  <TomSelect
                    value={selectMultiple}
                    onChange={setSelectMultiple}
                    options={{
                      placeholder: 'Select Payment Status',
                    }}
                    className="sm:w-auto"
                    multiple
                  >
                    <option value="1">All</option>
                    <option value="2">Paid</option>
                    <option value="3">Due</option>
                    <option value="4">Partial</option>
                    <option value="5">Overdue</option>
                  </TomSelect>
             

      
    </div>
    <SelectElement
          label={`${t('repair.fields.jobsheet.fields.status.label')}`}
          labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="status"
            id="status"
          
       
          />
          <SelectElement
          label={`${t('repair.fields.jobsheet.fields.technician.label')}`}
          labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="status"
            id="status"
            
       
          />
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
   
      </div>
      <div className="intro-y box col-span-12">
        <div className="items-center justify-center border-slate-200/60 px-5 py-5 dark:border-darkmode-400 sm:py-3">
          <Tab.Group className="">
            <Tab.List
              variant="pills"
              className="mx-auto w-60 rounded-md border-slate-300 p-1 dark:border-darkmode-300"
            >
              <Tab>
                <Tab.Button as="button" className="w-full py-1.5 flex ">
                  Pending
                  <Tippy content={tooltipContent1}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 mt-0.5 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                </Tab.Button>
              </Tab>
              <Tab>
                <Tab.Button as="button" className="w-full py-1.5 flex">
                 Completed <Tippy content={tooltipContent2}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 mt-0.5 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                </Tab.Button>
              </Tab>
            </Tab.List>
            <Tab.Panels className="px-5 pb-5">
              <Tab.Panel className="mt-5">
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
                      className="shadow-md sm:w-auto"
                      onChange={handleChange}
                      // onClick={() => handleClick(SlideoverRegistry.addJobSheet)}
                    >
                      Add Invoice
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
                  <Table.Th className="whitespace-nowrap flex bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Deivery Date
                    <Tippy content={tooltipContent3}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 mt-0.5 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Job Sheet Number
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Invoice No
                  </Table.Th>

                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Technician
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Added By
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Customer Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Brand
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Device Model
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Serial Number
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Location
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Repair Warranty
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Payment Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Total Amount
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Payment Due
                  </Table.Th> <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Sell Return Due
                  </Table.Th>
                 
                  

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
                 
                  <Table.Td className="!px-1" >
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-38 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onChange={handleChange}
                       
                      >
                          <Lucide icon="PlusCircle" className="mr-2 h-4 w-4" />
                          Add invoice
                        </Menu.Item>
                        <Menu.Item  
                
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                    
                        
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Briefcase" className="mr-2 h-4 w-4" />
                        Add Parts
                        </Menu.Item>
                        <Menu.Item  
                >
                          <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                      Upload Docs
                        </Menu.Item>
                        <Menu.Item 
                >
                          <Lucide icon="Printer" className="mr-2 h-4 w-4" />
                       Print
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="ToggleLeft" className="mr-2 h-4 w-4" />
                       Change Status
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                       Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">BS2022/0024</Table.Td>
                  <Table.Td className="!px-2">1000</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Miss Sathsarani</Table.Td>
                  <Table.Td className="!px-2">Bunny outlet</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">
                  Samsung
                  </Table.Td>
                  <Table.Td className="!px-2">Samsung A30</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                 
                 
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                </Table.Tr>
                <Table.Tr>
                 
                  <Table.Td className="!px-1" >
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-38 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onChange={handleChange}
                       
                      >
                          <Lucide icon="PlusCircle" className="mr-2 h-4 w-4" />
                          Add invoice
                        </Menu.Item>
                        <Menu.Item  
                
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                    
                        
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Briefcase" className="mr-2 h-4 w-4" />
                        Add Parts
                        </Menu.Item>
                        <Menu.Item  
                >
                          <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                      Upload Docs
                        </Menu.Item>
                        <Menu.Item 
                >
                          <Lucide icon="Printer" className="mr-2 h-4 w-4" />
                       Print
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="ToggleLeft" className="mr-2 h-4 w-4" />
                       Change Status
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                       Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">BS2022/0024</Table.Td>
                  <Table.Td className="!px-2">1000</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Miss Sathsarani</Table.Td>
                  <Table.Td className="!px-2">Bunny outlet</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">
                  Samsung
                  </Table.Td>
                  <Table.Td className="!px-2">Samsung A30</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                 
                 
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                </Table.Tr>
              </Table.Tbody>
              <Table.Thead variant="dark">
                <Table.Tr>
               
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                </Table.Th>

                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Total
                  </Table.Th>

                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Rs. 100,000.00
                  </Table.Th>
                  <Table.Th className="text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Rs. 100,000.00
                  </Table.Th> 
                  <Table.Th className="text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Rs. 100,000.00
                  </Table.Th>
                 
                  

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

              
              </Tab.Panel>
              <Tab.Panel className="mt-5">
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
                      className="shadow-md sm:w-auto"
                      onChange={handleChange}
                      // onClick={() => handleClick(SlideoverRegistry.addJobSheet)}
                    >
                      Add Invoice
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
                  <Table.Th className="whitespace-nowrap flex bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Deivery Date
                    <Tippy content={tooltipContent3}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 mt-0.5 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Job Sheet Number
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Invoice No
                  </Table.Th>

                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Technician
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Added By
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Customer Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Brand
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Device Model
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Serial Number
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Location
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Repair Warranty
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Payment Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Total Amount
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Payment Due
                  </Table.Th> <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Sell Return Due
                  </Table.Th>
                 
                  

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
                 
                  <Table.Td className="!px-1" >
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-38 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onChange={handleChange}
                       
                      >
                          <Lucide icon="PlusCircle" className="mr-2 h-4 w-4" />
                          Add invoice
                        </Menu.Item>
                        <Menu.Item  
                
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                    
                        
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Briefcase" className="mr-2 h-4 w-4" />
                        Add Parts
                        </Menu.Item>
                        <Menu.Item  
                >
                          <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                      Upload Docs
                        </Menu.Item>
                        <Menu.Item 
                >
                          <Lucide icon="Printer" className="mr-2 h-4 w-4" />
                       Print
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="ToggleLeft" className="mr-2 h-4 w-4" />
                       Change Status
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                       Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">BS2022/0024</Table.Td>
                  <Table.Td className="!px-2">1000</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Miss Sathsarani</Table.Td>
                  <Table.Td className="!px-2">Bunny outlet</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">
                  Samsung
                  </Table.Td>
                  <Table.Td className="!px-2">Samsung A30</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                 
                 
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                </Table.Tr>
                <Table.Tr>
                 
                  <Table.Td className="!px-1" >
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-38 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onChange={handleChange}
                       
                      >
                          <Lucide icon="PlusCircle" className="mr-2 h-4 w-4" />
                          Add invoice
                        </Menu.Item>
                        <Menu.Item  
                
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                    
                        
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Briefcase" className="mr-2 h-4 w-4" />
                        Add Parts
                        </Menu.Item>
                        <Menu.Item  
                >
                          <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                      Upload Docs
                        </Menu.Item>
                        <Menu.Item 
                >
                          <Lucide icon="Printer" className="mr-2 h-4 w-4" />
                       Print
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="ToggleLeft" className="mr-2 h-4 w-4" />
                       Change Status
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                       Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">09/29/2022 01:02 PM</Table.Td>
                  <Table.Td className="!px-2">BS2022/0024</Table.Td>
                  <Table.Td className="!px-2">1000</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Saman</Table.Td>
                  <Table.Td className="!px-2">Miss Sathsarani</Table.Td>
                  <Table.Td className="!px-2">Bunny outlet</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">Apple</Table.Td>
                  <Table.Td className="!px-2">
                  Samsung
                  </Table.Td>
                  <Table.Td className="!px-2">Samsung A30</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                 
                 
                  <Table.Td className="!px-2 text-right">₨ 3,000.00</Table.Td>
                </Table.Tr>
              </Table.Tbody>
              <Table.Thead variant="dark">
                <Table.Tr>
               
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                </Table.Th>

                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Total
                  </Table.Th>

                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Rs. 100,000.00
                  </Table.Th>
                  <Table.Th className="text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Rs. 100,000.00
                  </Table.Th> 
                  <Table.Th className="text-right whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Rs. 100,000.00
                  </Table.Th>
                 
                  

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

              
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <ShortcutKey onKeyUp={handleKeyUp} />
      <SlideoverPanel
        close
        size={sliderSize}
        heading={sliderContent.header}
        footer={sliderContent.footer}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default Main
