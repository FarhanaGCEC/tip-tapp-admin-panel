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
import SlideoverRegistry from './slideover-registry'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'

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
    setSliderSize('2xl')
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
  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addNew)
    }
  }

  return (
    <div>
   <div className="intro-y mt-4 flex flex-col sm:flex-row items-center">
  <div className="flex flex-grow items-center">
    <h2 className="ml-2 text-lg font-medium">
    Business Locations
    </h2>
    <div className="text-sm text-slate-500 mt-0.5" style={{ marginLeft: '10px' }}>
      <span>Manage your business locations</span>
    </div>
  </div>

  <div className="mt-4 flex sm:mt-0">
    <Button as="a" variant="primary" className="mr-2 shadow-md sm:w-auto"    
    onClick={() => handleClick(SlideoverRegistry.addNew)}>
    Add New
    </Button>

    <Button as="a" variant="primary" className="shadow-md sm:w-auto"  onClick={() => handleClick(SlideoverRegistry.addNew)}>
      <span className="flex h-5 w-5 items-center justify-center">
        <Lucide icon="Plus" className="h-4 w-4" />
      </span>
    </Button>
  </div>
</div>


<div className="intro-y box mb-5 mt-5 px-5 py-5 ">

<div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
    <div className=" items-center sm:mr-4 sm:flex ">
      Page Size
      <FormSelect className=" m-2 w-15  dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"> 
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
            <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As CSV
          </Menu.Item>
          <Menu.Item>
            <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As Excel
          </Menu.Item>
          <Menu.Item>
            <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Print
          </Menu.Item>
          <Menu.Item>
            <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Export
            to PDF
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
  {/* <VariationTableElement register={register} /> */}
  <div className="intro-y mb-3 py-5 overflow-x-auto ">
<Table bordered className="">
<Table.Thead variant="dark">
  <Table.Tr>     
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
      Name
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
      Location ID
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
      Landmark
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
     City
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
   Zip Code
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
    State
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
     Country
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
     Price Group
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
     Invoice Scheme
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
    Invoice layout for POS
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
    Invoice layout for Sale
    </Table.Th>
    <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
      Action
    </Table.Th>
  </Table.Tr>
</Table.Thead>
<Table.Tbody>
  <Table.Tr>
    <Table.Td className="!px-4">Bunny outlet</Table.Td>
    <Table.Td className="!px-4">Bunny outlet</Table.Td>
    <Table.Td className="!px-2">galle</Table.Td>
    <Table.Td className="!px-2">gampola</Table.Td>
    <Table.Td className="!px-2">800000</Table.Td>
    <Table.Td className="!px-2">southern province</Table.Td>
    <Table.Td className="!px-2">Sri lanka</Table.Td>
    <Table.Td className="!px-2">Cash</Table.Td>
    <Table.Td className="!px-2">New</Table.Td>
    <Table.Td className="!px-2">Bunny store</Table.Td>
    <Table.Td className="!px-2">Bunny store</Table.Td>
    <Table.Td className="!px-3">
      <div className="w-30 items-left flex border-t border-slate-200/60 dark:border-darkmode-400 lg:justify-start">
        <Button variant="primary" size="sm" className="mb-2  mr-2 "   onClick={() => handleClick(SlideoverRegistry.editNew)}>
          <a className="flex items-center" href="#">
            <Lucide icon="Edit" className="h-4 w-4 " />
          </a>
        </Button>
        
        <Button variant="success" size="sm" className="mb-2 mr-2 w-18 flex items-center"
        onChange={handleChange}
        onClick={() => handleClick(SlideoverRegistry.settings)}
              >
                <Lucide icon="Wrench" className="w-4 h-4 " /> 
            
        </Button>
        <Button variant="danger" size="sm" className="mb-2 mr-2 w-18 flex items-center"
        onChange={handleChange}
                onClick={(event: { preventDefault: () => void }) => {
                  event.preventDefault();
                  setDeleteConfirmationModal(true);
                }}
              >
                <Lucide icon="Power" className="w-4 h-4 " /> 
            
        </Button>
        
        
      </div>
    </Table.Td>
  </Table.Tr>
 

 
</Table.Tbody>
</Table>
<Dialog
open={deleteConfirmationModal}
onClose={() => {
  setDeleteConfirmationModal(false);
}}
initialFocus={deleteButtonRef}
>
<Dialog.Panel>
  <div className="p-5 text-center">
    <Lucide
      icon="XCircle"
      className="w-16 h-16 mx-auto mt-3 text-danger"
    />
    <div className="mt-5 text-3xl">Are you sure?</div>
    <div className="mt-2 text-slate-500">
      Do you really want to deactivate this location? <br />
      This process cannot be undone.
    </div>
  </div>
  <div className="px-5 pb-8 text-center">
    <Button
      variant="outline-secondary"
      type="button"
      onClick={() => {
        setDeleteConfirmationModal(false);
      }}
      className="w-24 mr-1"
    >
      Cancel
    </Button>
    <Button
      variant="danger"
      type="button"
      className="w-24"
      ref={deleteButtonRef}
    >
      Deactivate
    </Button>
  </div>
</Dialog.Panel>
</Dialog>
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
