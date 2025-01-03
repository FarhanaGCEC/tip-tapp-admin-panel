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
import PreviewImage from '../../../../assets/images/fakers/image2.jpg'
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

  const [tooltipContent2] = useState(
    'Stock transfer will not be editable if status is completed'
  )
  const [checked, setChecked] = useState(false)
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const [statusPreview, setStatusPreview] = useState(false)
  const [editorDataExpensesNote, setEditorDataExpensesNote] = useState(
    `<p>${t(
      'Dear {contact_name}, Thank you for shopping with us. {business_name}'
    )}.</p>`
  )
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const handleChangeHide = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setIsCheckboxChecked(event.target.checked)
  }
  const [tooltipContent3] = useState(
    '-ve value = Amount to receive <br> +ve value = Amount to pay'
  )

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          {`Mapping Purchase `}
          
        </h2>
      </div>

      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">     <div >
   <div className="mt- intro-y flex flex-col items-center sm:flex-row ">
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
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              <Table.Thead variant="dark">
                <Table.Tr>
               
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                 Action
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                 Date
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                Reference No
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                  Location
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                 Supplier
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                 Purchase Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                 Payment Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                  Grand Total
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap flex bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                  Payment Due
                  <Tippy content={tooltipContent3}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 mt-0.5 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                  Refund Required
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                 Added By
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
                 Created At
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
   

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
    </div>
  )
}

export default Main
