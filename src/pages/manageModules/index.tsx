/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../components/common/table'
import { SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/common/button'
import Tippy from '../../components/common/tippy'
import Lucide from '../../components/common/lucide'
import { Menu, Tab, Dialog, Disclosure } from '../../components/common/headless'
import Pagination from '../../components/common/pagination'
import {
  FormInput,
  FormSelect,
  FormInfo,
  FormCheck,
  FormLabel,
  FormInline,
  InputGroup,
  Litepicker,
} from '../../components/common/form-elements/components'
import {
  SearchSelectElement,
  DateElement,
  SelectElement,
  TextareaElement,
  InputElement,
} from '../../components/common/form-elements'
import SharedDataContainer from '../../containers/sharedData'
import ShortcutKey from '../../components/common/shortcut-key'
import SlideoverPanel from '../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../constants'
import Alert from '../../base-components/Alert'
import { AlignmentTypes } from '../../constants/common-enums'
import LoadingIcon from '../../components/common/loading-icon'
import clsx from 'clsx'
import ClassicEditorElement from '../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../utils/notification'
import { PosApi } from '../../api'

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

  return (
    <div>
   <div className="intro-y mt-4 flex flex-col sm:flex-row items-center">
  <div className="flex flex-grow items-center">
    <h2 className="ml-2 text-lg font-medium">
    Manage Modules 
    </h2>
    <div className="text-sm text-slate-500" style={{ marginLeft: '10px' }}>
      <span>Only superadmin can access manage modules</span>
    </div>
  </div>

  <div className="mt-4 flex sm:mt-0">
    <Button as="a" variant="primary" className="mr-2 shadow-md sm:w-auto">
    Upload Module
    </Button>

    <Button as="a" variant="primary" className="shadow-md sm:w-auto">
      <span className="flex h-5 w-5 items-center justify-center">
        <Lucide icon="Upload" className="h-4 w-4" />
      </span>
    </Button>
  </div>
</div>


      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div className="overflow-x-auto">
    <Table >
        <Table.Thead variant="dark">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">#</Table.Th>
                <Table.Th className="whitespace-nowrap">
                  Modules
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                    Actions
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                   Description
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>1</Table.Td>
                <Table.Td>AssetManagement</Table.Td>
                <Table.Td>
                <div className="w-30 items-left flex lg:justify-start">
              <Button variant="pending" size="sm" className=" w-24 mr-2" >
                  <a className=" flex items-center" href="#">
                    <Lucide icon="FileX" className="h-4 w-4 mr-1" /> Uninstall
                  </a>
                </Button>
                <Button variant="danger" size="sm" className=" mr-2  flex items-center"
                
                >
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
              
                </Button>
               
              </div>
                </Table.Td>
                <Table.Td >
                  <div className='flex mt-2'>Useful for managing all kinds of assets.
                <div className="px-2 py-1 ml-4 mb-3 -mt-0.5 text-xs w-24 text-center font-medium rounded-full cursor-pointer bg-secondary">
                     Version 1.0
                    </div> </div>
                </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td>OneGalleFaceApi</Table.Td>
                <Table.Td>
                <div className=" items-center flex  ">
              <Button variant="success" size="sm" className=" text-white mr-2 w-24 " >
                  <a className=" flex items-center" href="#">
                    <Lucide icon="FilePlus" className="h-4 w-4 mr-1 text-white" /> Install
                  </a>
                </Button>
                <Button variant="danger" size="sm" className=" mr-2  flex items-center"
                
                >
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
              
                </Button>
               
              </div>
                </Table.Td>
                <Table.Td >
                  Allows you to connect POS with OneGalleFAce website.
                
                </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td>Essentials Module</Table.Td>
                <Table.Td>
                <div className=" items-center flex  ">
              <Button variant="linkedin" size="sm" className=" text-white w-24 " >
                  <a className=" flex items-center" href="#">
                    <Lucide icon="DollarSign" className="h-4 w-4 mr-1 -ml-2 text-white" /> Buy
                  </a>
                </Button>
               
              </div>
                </Table.Td>
                <Table.Td >
               
                Essentials features for every growing businesses.
                </Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
      </div>
      </div>
    </div>
  )
}

export default Main
