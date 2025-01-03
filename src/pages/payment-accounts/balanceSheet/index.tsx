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

  const [tooltipContent1] = useState(
    'Status which are not marked as completed will be displayed here.'
  )
  const [tooltipContent2] = useState(
    'Status which are marked as completed will be displayed here.'
  )

  const [discountPreview,  setDiscountPreview] = useState(false)  
  const [checked, setChecked] = useState(false)
  const [ locationPreview,  setLocationPreview] = useState(false) 
  const [accountPreview, setAccountPreview] = useState(false) 
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const [productPricePreview, setproductPricePreview] = useState(false) 
  const [daterange, setDaterange] = useState('')
  

  return (
    
    <div className="">

          <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
           
            
           <h2 className="mr-auto text-lg font-medium ml-2">
           Balance Sheet
                         
                         </h2>
                         <div className=" flex w-full sm:mt-0 sm:w-auto">
                         <div className="relative  text-slate-500">
    <Lucide
      icon="Calendar"
      className="absolute inset-y-0 left-0 z-10 justify-end w-4 h-4 my-auto ml-3"
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
      className="pl-10 sm:w-56 !box"
    />
  </div>
                   </div>
                       
                     </div>
          <div className="justify-end gap-4">

</div>

 
         

          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
          <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-1">
          <div className="overflow-x-auto">
    <Table>
        <Table.Thead variant="light">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Liability</Table.Th>
                <Table.Th className="whitespace-nowrap">
                    
                </Table.Th>

            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Supplier Due</Table.Td>
                <Table.Td className="text-right">₨ 38,826.00</Table.Td>

            </Table.Tr>
          

        </Table.Tbody>
        <Table.Thead variant="dark">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Total Liability</Table.Th>
                <Table.Th className="text-right">₨ 38,826.00
                    
                </Table.Th>

            </Table.Tr>
        </Table.Thead>
    </Table>
    </div>
      </div>
      </div>
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
          <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-1">
<div className="overflow-x-auto">
    <Table>
        <Table.Thead variant="light">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Assets</Table.Th>
                <Table.Th className="whitespace-nowrap">
                    
                </Table.Th>

            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td className="font-medium"> Customer Due</Table.Td>
                <Table.Td className="text-right">₨ 38,826.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className="font-medium">Closing stock</Table.Td>
                <Table.Td className="text-right">₨ 38,826.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className="font-medium">Account Balances :</Table.Td>
                <Table.Td ></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Cash in hand</Table.Td>
                <Table.Td className="text-right">₨ 38,826.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Bank Account</Table.Td>
                <Table.Td className="text-right">₨ 38,826.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Cash in hand New</Table.Td>
                <Table.Td className="text-right">₨ 38,826.00</Table.Td>
            </Table.Tr>
        </Table.Tbody>
        <Table.Thead variant="dark">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Total Assets</Table.Th>
                <Table.Th className="text-right">₨ 38,826.00
                    
                </Table.Th>

            </Table.Tr>
        </Table.Thead>
    </Table>
</div>
      </div>
      </div>
    </div>
  )
}

export default Main
