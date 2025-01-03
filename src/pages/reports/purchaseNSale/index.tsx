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

  const [tooltipContent2] = useState(
    '-ve value = Amount to pay +ve Value = Amount to receive'
  )
  const [tooltipContent1] = useState(
    'Total Unpaid Amount for Purchases.'
  )
  const [tooltipContent3] = useState(
    'Total Amount to be Received from Sales'
  )

  const [checked, setChecked] = useState(false)
  const [paidViewPreview,  setPaidViewPreview] = useState(false)  

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
     <div className="intro-y mt-4 flex flex-col sm:flex-row items-center">
  <h2 className="ml-2 text-lg font-medium">
    Purchase & Sale Report
  </h2>
  <div className="text-sm text-slate-500" style={{ marginLeft: '10px' }}>
    <span>Purchase & Sale Details for the Selected Date Range</span>
  </div>
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
      
      <div className="grid grid-cols-12 gap-6 mb-5 mt-5  ">
           {/* BEGIN: Top Categories */}
           <div className="col-span-12 intro-y box lg:col-span-6">
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base text-lg font-medium">
                  Purchases
                  </h2>
                </div>
                <div className="p-5">
                <Table striped>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Total Purchase</Table.Td>
                <Table.Td className='text-right'>	₨ 0.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Purchase Including Tax</Table.Td>
                <Table.Td className='text-right'>	₨ 10.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Total Purchase Return Including Tax</Table.Td>
                <Table.Td className='text-right'>	₨ 20.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='flex'>Purchase Due <Tippy content={tooltipContent1}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className=" mx-2 mt-0.5 h-4 w-4 " />
                    </a>{' '}
                  </Tippy></Table.Td>
                <Table.Td className='text-right'>	₨ 220.00</Table.Td>
            </Table.Tr>
            
        </Table.Tbody>
    </Table>
                 
                </div>
              </div>
              <div className="col-span-12 intro-y box lg:col-span-6">
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base text-lg font-medium">
                  Sales
                  </h2>
                </div>
                <div className="p-5">
                <Table striped>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Total Sale</Table.Td>
                <Table.Td className='text-right'>	₨ 0.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Sale Including Tax</Table.Td>
                <Table.Td className='text-right'>	₨ 0.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Total Sale Return Including Tax</Table.Td>
                <Table.Td className='text-right'>	₨ 0.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='flex'>Sale Due  <Tippy content={tooltipContent3}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className=" mx-2 mt-0.5 h-4 w-4 " />
                    </a>{' '}
                  </Tippy></Table.Td>
                <Table.Td className='text-right'>	₨ 0.00</Table.Td>
            </Table.Tr>
            
        </Table.Tbody>
    </Table>
                </div>
              </div>
             

              
        </div>
        <div className="intro-y box mb-5 px-5 py-5">
       <div className="flex flex-col border-b mb-5 font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base flex font-medium mb-4">
                  {`Overall (Sale - Sale Return - Purchase - Purchase Return)  `}
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
                      Sale - Purchase  <div className="font-medium"> {': Rs 100.00 '}</div>

                      </div>
                      <div className=" text-lg flex mt-3">
                      Due Amount  <div className="font-medium"> {': Rs 10.00 '}</div>

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
    </div>
    
  )
}

export default Main
