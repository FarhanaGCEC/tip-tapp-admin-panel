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
  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addLayout)
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
  const [date, setDate] = useState('')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [checked, setChecked] = useState(false)
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [invoicePreview,  setInvoicePreview] = useState(false)
  const [editInvoicePreview,  setEditInvoicePreview] = useState(false)
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
  const [tooltipContent1] = useState(
    'Give a short meaningful name to the Invoice Scheme.'
  )
  const [tooltipContent2] = useState(
    'Prefix for an Invoice Scheme.A Prefix can be a custom text or current year. Ex: #XXXX0001, #2018-0002'
  )
  const [tooltipContent3] = useState(
    'Start number for invoice numbering.You can make it 1 or any other number from which numbering will start.'
  )
  const [tooltipContent4] = useState(
    'Total number of invoices generated for the Invoice Scheme'
  )
  const [tooltipContent5] = useState(
    'Length of the Invoice Number excluding Invoice Prefix'
  )

const [selectedBox, setSelectedBox] = useState('')
  
const handleBoxClick = (boxName: SetStateAction<string>) => {
      setSelectedBox(boxName);
    }    

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col sm:flex-row items-center">
    <h2 className="ml-2 text-lg font-medium">
    Layout Settings
    </h2>
    <div className="text-sm text-slate-500" style={{ marginLeft: '10px' }}>
      <span>Manage your invoice settings</span>
    </div>
  </div>
      <div className="intro-y "> 
        <Tab.Group className=" box mt-5 overflow-y-auto">
          <Tab.List className="flex-col border-transparent bg-slate-200 dark:border-transparent dark:bg-darkmode-800 sm:flex-row">
            <Tab fullWidth={false}>
              {({ selected }) => (
                <Tab.Button
                  className={clsx([
                    'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                    !selected &&
                      'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                    selected &&
                      'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                  ])}
                  as="button"
                >
                  <Tippy
                    content=""
                    className="flex w-full items-center justify-center py-4"
                    aria-controls="content"
                    aria-selected="true"
                  >
                    <div className="">{`${t('Invoice Schemes')}`}</div>
                  </Tippy>
                </Tab.Button>
              )}
            </Tab>
            <Tab fullWidth={false}>
              {({ selected }) => (
                <Tab.Button
                  className={clsx([
                    'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                    !selected &&
                      'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                    selected &&
                      'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                  ])}
                  as="button"
                >
                  <Tippy
                    content=""
                    className="flex w-full items-center justify-center py-4"
                    aria-controls="content"
                    aria-selected="true"
                  >
                    <div className="">{`${t('Invoice Layouts')}`}</div>
                  </Tippy>
                </Tab.Button>
              )}
            </Tab>
            <Tab fullWidth={false}>
              {({ selected }) => (
                <Tab.Button
                  className={clsx([
                    'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                    !selected &&
                      'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                    selected &&
                      'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                  ])}
                  as="button"
                >
                  <Tippy
                    content=""
                    className="flex w-full items-center justify-center py-4"
                    aria-controls="content"
                    aria-selected="true"
                  >
                    <div className="">{`${t('Waybill Schemes')}`}</div>
                  </Tippy>
                </Tab.Button>
              )}
            </Tab>
            <Tab fullWidth={false}>
              {({ selected }) => (
                <Tab.Button
                  className={clsx([
                    'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-64',
                    !selected &&
                      'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                    selected &&
                      'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                  ])}
                  as="button"
                >
                  <Tippy
                    content=""
                    className="flex w-full items-center justify-center py-4"
                    aria-controls="content"
                    aria-selected="true"
                  >
                    <div className="">{`${t('Payment Receipt Layouts')}`}</div>
                  </Tippy>
                </Tab.Button>
              )}
            </Tab>
            <Tab fullWidth={false}>
              {({ selected }) => (
                <Tab.Button
                  className={clsx([
                    'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                    !selected &&
                      'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                    selected &&
                      'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                  ])}
                  as="button"
                >
                  <Tippy
                    content=""
                    className="flex w-full items-center justify-center py-4"
                    aria-controls="content"
                    aria-selected="true"
                  >
                    <div className="">{`${t('Suspend Layouts')}`}</div>
                  </Tippy>
                </Tab.Button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
              <div className="">
              <div className="intro-y  flex flex-col sm:flex-row items-center">
  <div className="flex flex-grow items-center">
    <h2 className="text-lg font-medium">
    All Your Invoice Schemes
    </h2>
    
  </div>

  <div className="mt-4 flex sm:mt-0">
    <Button as="a" variant="primary" className="mr-2 shadow-md sm:w-auto"
    onClick={(event: React.MouseEvent) => {
      event.preventDefault()
      setInvoicePreview(true)
    }}>
    Add New
    </Button>

    <Button as="a" variant="primary" className="shadow-md sm:w-auto"
     onClick={(event: React.MouseEvent) => {
      event.preventDefault()
      setInvoicePreview(true)
    }}>
      <span className="flex h-5 w-5 items-center justify-center">
        <Lucide icon="Plus" className="h-4 w-4" />
      </span>
    </Button>
  </div>
</div>

<div className="intro-y mt-4 flex flex-col sm:flex-row items-center">
   <div className="flex flex-grow items-center">
    Page Size
    <FormSelect className="m-2 w-15  dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"> 
      <option>10</option>
      <option>25</option>
      <option>50</option>
      <option>100</option>
    </FormSelect>
  </div>

  <div className="relative justify-end flex sm:mt-0 sm:w-72">
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

  {/* <VariationTableElement register={register} /> */}
  <div className="intro-y mb-3 py-5 overflow-x-auto ">
<Table bordered className="">
<Table.Thead variant="light">
  <Table.Tr>     
  <Table.Th className="whitespace-nowrap "> <div className="flex "> Name <Tippy content={tooltipContent1} className="ml-2 mt-0.5">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></div> </Table.Th>
                <Table.Th className="whitespace-nowrap "> <div className="flex ">
                  Prefix <Tippy content={tooltipContent2} className="ml-2 mt-0.5">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></div> </Table.Th>
                <Table.Th className="whitespace-nowrap "> <div className="flex ">
                  Start from <Tippy content={tooltipContent3} className="ml-2 mt-0.5">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></div> </Table.Th>
                <Table.Th className="whitespace-nowrap "> <div className="flex">
                  Invoice Count <Tippy content={tooltipContent4} className="ml-2 mt-0.5">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></div> </Table.Th>
                <Table.Th className="whitespace-nowrap"> <div className="flex ">
                  Numbers of Digits <Tippy content={tooltipContent5} className="ml-2 mt-0.5">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></div> </Table.Th>
                <Table.Th className="whitespace-nowrap"> Action </Table.Th>
  </Table.Tr>
</Table.Thead>
<Table.Tbody>
  <Table.Tr>
    <Table.Td className="!px-4">Default</Table.Td>
    <Table.Td className="!px-4">MC</Table.Td>
    <Table.Td className="!px-2">	1</Table.Td>
    <Table.Td className="!px-2">	21</Table.Td>
    <Table.Td className="!px-2">	20</Table.Td>
    <Table.Td className="!px-3 ">
      <div className="w-30  flex   border-t border-slate-200/60 dark:border-darkmode-400 ">
        <Button variant="primary" size="sm" className="mb-2  mr-2 "  onClick={(event: React.MouseEvent) => {
      event.preventDefault()
      setEditInvoicePreview(true)
    }} >
          <a className="flex items-center" href="#">
            <Lucide icon="Edit" className="h-4 w-4 " />
          </a>
        </Button>
        
       
        <Button variant="danger" size="sm" className="mb-2 mr-2 w-18 flex items-center"
        onChange={handleChange}
                onClick={(event: { preventDefault: () => void }) => {
                  event.preventDefault();
                  setDeleteConfirmationModal(true);
                }}
              >
                <Lucide icon="Trash2" className="w-4 h-4 " /> 
            
        </Button>
        <Button variant="facebook" size="sm" className="mb-2 mr-2 w-18 flex items-center"
        onChange={handleChange}
       
              > Set as Default
               
            
        </Button>
        
      </div>
    </Table.Td>
  </Table.Tr>
  <Table.Tr>
    <Table.Td className="!px-4">Default</Table.Td>
    <Table.Td className="!px-4">MC</Table.Td>
    <Table.Td className="!px-2">	1</Table.Td>
    <Table.Td className="!px-2">	21</Table.Td>
    <Table.Td className="!px-2">	20</Table.Td>
    <Table.Td className="!px-3 ">
      <div className="w-30  flex   border-t border-slate-200/60 dark:border-darkmode-400 ">
        <Button variant="primary" size="sm" className="mb-2  mr-2 "  onClick={(event: React.MouseEvent) => {
      event.preventDefault()
      setEditInvoicePreview(true)
    }} >
          <a className="flex items-center" href="#">
            <Lucide icon="Edit" className="h-4 w-4 " />
          </a>
        </Button>
        
       
        <Button variant="danger" size="sm" className="mb-2 mr-2 w-18 flex items-center"
        onChange={handleChange}
                onClick={(event: { preventDefault: () => void }) => {
                  event.preventDefault();
                  setDeleteConfirmationModal(true);
                }}
              >
                <Lucide icon="Trash2" className="w-4 h-4 " /> 
            
        </Button>
        <Button variant="success" size="sm" className="mb-2 mr-2 w-18 flex items-center"
        onChange={handleChange}
       
              > Default
               
            
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
      Do you really want to delete this record? <br />
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
      Delete
    </Button>
  </div>
</Dialog.Panel>
</Dialog>

<Dialog
              size="xl"
              open={invoicePreview}
              onClose={() => {
                setInvoicePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'settings.fields.addNewInvoice.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setInvoicePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                <div className="grid px-3 grid-cols-12 gap-5 ">
                <div
        className={`col-span-12 p-5  cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in ${
          selectedBox === '1' ? 'border-2 intro-y dark:border-primary bg-primary text-white' : ''
        }`}
        onClick={() => handleBoxClick('1')}
      >
        <div className="text-base font-medium">Format</div>
        <div className="dark:text-white-500">XXXXXXX</div>
        {/* {selectedBox === '1' && (
          <Lucide icon="CheckCircle" className="h-4 w-4" />
        )} */}
      </div>
      <div
        className={`col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in ${
          selectedBox === '2' ? ' border-2 intro-y dark:border-primary bg-primary text-white' : ''
        }`}
        onClick={() => handleBoxClick('2')}
      >
        <div className="text-base font-medium">Format</div>
        <div className=" dark:text-white-500">2023-XXXXXXX</div>
       
      </div>

      {/* Conditional rendering based on the selected box */}
      {selectedBox === '1' && (
        <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3">
          <div className="text-base font-medium">Preview</div>
          <div className="text-slate-500 dark:text-white-500">#00000</div>
        </div>
      )}

      {selectedBox === '2' && (
        <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3">
          <div className="text-base font-medium">Preview</div>
          <div className="text-slate-500 dark:text-white-500">#2023-00000</div>
        </div>
      )}
          </div>
          <div className="mb-4 mt-5 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t(
                     'settings.fields.name.label'
                    )}`}
                    register={register}
                    name="accountNumber"
                    id="accountNumber"
                    required
                    error={errors.name}
                  />
                  <div className='flex font-medium'>
                  <FormLabel className='mt-2 ' htmlFor="regular-form-5">{`${t(
                      'settings.fields.prefix.label'
                    )}`}</FormLabel>
         <FormInput id="regular-form-5" className='ml-32' type="text" placeholder='2023' disabled />
         
                  </div>
         
    <InputElement
                    label={`${t(
                      'settings.fields.startFrom.label'
                    )}`}
                    register={register}
                    name="startFrom"
                    id="startFrom"
                    type="number"
                  />
       <SelectElement
                    label={`${t(
                      'settings.fields.numberDigits.label'
                    )}`}
                    register={register}
                    name="numberDigits"
                    id="numberDigits"
                  />
                           <FormCheck className="mt-5">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 <div className="mr-2 font-medium">{`${t('settings.fields.setAsDefault.label')}`}</div>
</FormCheck.Label>
</FormCheck>
       </div>
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center  mb-3 ">
                  <Button
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
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                      setInvoicePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>

            <Dialog
              size="xl"
              open={editInvoicePreview}
              onClose={() => {
                setEditInvoicePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'settings.fields.editNewInvoice.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditInvoicePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                <div className="grid px-3 grid-cols-12 gap-5 ">
                <div
        className={`col-span-12 p-5  cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in ${
          selectedBox === '1' ? 'bg-primary text-white' : ''
        }`}
        onClick={() => handleBoxClick('1')}
      >
        <div className="text-base font-medium">Format</div>
        <div className="dark:text-white-500">XXXXXXX</div>
        {/* {selectedBox === '1' && (
          <Lucide icon="CheckCircle" className="h-4 w-4" />
        )} */}
      </div>
      <div
        className={`col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in ${
          selectedBox === '2' ? 'bg-primary text-white' : ''
        }`}
        onClick={() => handleBoxClick('2')}
      >
        <div className="text-base font-medium">Format</div>
        <div className=" dark:text-white-500">2023-XXXXXXX</div>
       
      </div>

      {/* Conditional rendering based on the selected box */}
      {selectedBox === '1' && (
        <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3">
          <div className="text-base font-medium">Preview</div>
          <div className="text-slate-500 dark:text-white-500">#00000</div>
        </div>
      )}

      {selectedBox === '2' && (
        <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3">
          <div className="text-base font-medium">Preview</div>
          <div className="text-slate-500 dark:text-white-500">#2023-00000</div>
        </div>
      )}
          </div>
          <div className="mb-4 mt-5 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t(
                     'settings.fields.name.label'
                    )}`}
                    register={register}
                    name="accountNumber"
                    id="accountNumber"
                    required
                    error={errors.name}
                  />
                  <div className='flex font-medium'>
                  <FormLabel className='mt-2 ' htmlFor="regular-form-5">{`${t(
                      'settings.fields.prefix.label'
                    )}`}</FormLabel>
         <FormInput id="regular-form-5" className='ml-32' type="text" placeholder='2023' disabled />
         
                  </div>
         
    <InputElement
                    label={`${t(
                      'settings.fields.startFrom.label'
                    )}`}
                    register={register}
                    name="startFrom"
                    id="startFrom"
                    type="number"
                  />
       <SelectElement
                    label={`${t(
                      'settings.fields.numberDigits.label'
                    )}`}
                    register={register}
                    name="numberDigits"
                    id="numberDigits"
                  />
                           <FormCheck className="mt-5">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 <div className="mr-2 font-medium">{`${t('settings.fields.setAsDefault.label')}`}</div>
</FormCheck.Label>
</FormCheck>
       </div>
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center  mb-3 ">
                  <Button
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
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                      setEditInvoicePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
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
            </Tab.Panel>
            <Tab.Panel className="">

             
            <div className="grid gap-7 p-5 md:grid-cols-1 dark:border-darkmode-400">
              <div className="intro-y  flex flex-col sm:flex-row items-center">
  <div className="flex flex-grow items-center">
   <h2 className="mr-auto text-lg font-medium ">All Your Invoice Layouts<Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button></h2>
    
  </div>
  <div className="mt-4 flex sm:mt-0">
    <Button as="a" href='/settings/layoutSettings/addNewInvoiceLayout' variant="primary" className="mr-2 shadow-md sm:w-auto"
   >
    Add New
    </Button>

    <Button as="a" href='/settings/layoutSettings/addNewInvoiceLayout' variant="primary" className="shadow-md sm:w-auto"
>
      <span className="flex h-5 w-5 items-center justify-center">
        <Lucide icon="Plus" className="h-4 w-4" />
      </span>
    </Button>
  </div>
  
</div> </div>
<div className='grid grid-cols-12 gap-6 p-5'>
            <a
          href="/settings/layoutSettings/editInvoiceLayout"
          className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
        >
          <Lucide
            icon="FileSpreadsheet"
            className="block w-12 h-12 mx-auto text-primary"
          />
          <div className="mt-3 text-base font-medium text-center">
          Default
          </div>
          <div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
          Used in  Location : Kandy
          </div>
        </a>

        <a
          href="/settings/layoutSettings/editInvoiceLayout"
          className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
        >
          <Lucide
            icon="FileSpreadsheet"
            className="block w-12 h-12 mx-auto text-primary"
          />
          <div className="mt-3 text-base font-medium text-center">
         Slim 3
          </div>
          <div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
          Used in  Location : Kandy
          </div>
        </a>
        <a
          href="/settings/layoutSettings/editInvoiceLayout"
          className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
        >
          <Lucide
            icon="FileSpreadsheet"
            className="block w-12 h-12 mx-auto text-primary"
          />
          <div className="mt-3 text-base font-medium text-center">
         A3 Size
          </div>
          <div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
          Used in  Location : Kandy
          </div>
        </a>
        <a
          href="/settings/layoutSettings/editInvoiceLayout"
          className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
        >
          <Lucide
            icon="FileSpreadsheet"
            className="block w-12 h-12 mx-auto text-primary"
          />
          <div className="mt-3 text-base font-medium text-center">
        A4 Size
          </div>
          <div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
          Used in  Location : Kandy
          </div>
        </a>
        <a
          href="/settings/layoutSettings/editInvoiceLayout"
          className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
        >
          <Lucide
            icon="FileSpreadsheet"
            className="block w-12 h-12 mx-auto text-primary"
          />
          <div className="mt-3 text-base font-medium text-center">
         Slim 3
          </div>
          <div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
          Used in  Location : Kandy
          </div>
        </a>
        </div>
    
</Tab.Panel>
<Tab.Panel className="">

             
<div className="grid gap-7 p-5 md:grid-cols-1 dark:border-darkmode-400">
  <div className="intro-y  flex flex-col sm:flex-row items-center">
<div className="flex flex-grow items-center">
<h2 className="mr-auto text-lg font-medium ">Waybill Layouts</h2>

</div>
<div className="mt-4 flex sm:mt-0">
<Button as="a" variant="primary" className="mr-2 shadow-md sm:w-auto"
 onClick={() => handleClick(SlideoverRegistry.addLayout)}>
Add New
</Button>

<Button as="a" variant="primary" className="shadow-md sm:w-auto"
 onClick={() => handleClick(SlideoverRegistry.addLayout)}>
<span className="flex h-5 w-5 items-center justify-center">
<Lucide icon="Plus" className="h-4 w-4" />
</span>
</Button>
</div>

</div> </div>
<div className='grid grid-cols-12 gap-6 p-5'>
<a
 onClick={() => handleClick(SlideoverRegistry.editLayout)}
className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
>
<Lucide
icon="FileSpreadsheet"
className="block w-12 h-12 mx-auto text-primary"
/>
<div className="mt-3 text-base font-medium text-center">
Default
</div>
<div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
Used in  Location : Kandy
</div>
</a>

</div>

</Tab.Panel>
<Tab.Panel className="">

             
<div className="grid gap-7 p-5 md:grid-cols-1 dark:border-darkmode-400">
  <div className="intro-y  flex flex-col sm:flex-row items-center">
<div className="flex flex-grow items-center">
<h2 className="mr-auto text-lg font-medium ">Payment Receipt Layouts</h2>

</div>
<div className="mt-4 flex sm:mt-0">
<Button as="a" variant="primary" className="mr-2 shadow-md sm:w-auto"
 onClick={() => handleClick(SlideoverRegistry.addReceiptLayout)}>
Add New
</Button>

<Button as="a" variant="primary" className="shadow-md sm:w-auto"
 onClick={() => handleClick(SlideoverRegistry.addReceiptLayout)}>
<span className="flex h-5 w-5 items-center justify-center">
<Lucide icon="Plus" className="h-4 w-4" />
</span>
</Button>
</div>

</div> </div>
<div className='grid grid-cols-12 gap-6 p-5'>
<a
 onClick={() => handleClick(SlideoverRegistry.editReceiptLayout)}
className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
>
<Lucide
icon="FileSpreadsheet"
className="block w-12 h-12 mx-auto text-primary"
/>
<div className="mt-3 text-base font-medium text-center">
Default
</div>
<div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
Used in  Location : Kandy
</div>
</a>

</div>

</Tab.Panel>
<Tab.Panel className="">

             
            <div className="grid gap-7 p-5 md:grid-cols-1 dark:border-darkmode-400">
              <div className="intro-y  flex flex-col sm:flex-row items-center">
  <div className="flex flex-grow items-center">
   <h2 className="mr-auto text-lg font-medium ">Suspend Layout</h2>
    
  </div>
  <div className="mt-4 flex sm:mt-0">
    <Button as="a" href='/settings/layoutSettings/addSuspendLayout' variant="primary" className="mr-2 shadow-md sm:w-auto"
   >
    Add New
    </Button>

    <Button as="a" href='/settings/layoutSettings/addSuspendLayout' variant="primary" className="shadow-md sm:w-auto"
>
      <span className="flex h-5 w-5 items-center justify-center">
        <Lucide icon="Plus" className="h-4 w-4" />
      </span>
    </Button>
  </div>
  
</div> </div>
<div className='grid grid-cols-12 gap-6 p-5'>
            <a
          href="/settings/layoutSettings/editSuspendLayout"
          className="col-span-12 py-10 border-2 intro-y lg:col-span-4 box cursor-pointer zoom-in border-primary dark:border-white"
        >
          <Lucide
            icon="FileSpreadsheet"
            className="block w-12 h-12 mx-auto text-primary"
          />
          <div className="mt-3 text-base font-medium text-center">
          Default
          </div>
          <div className="w-3/4 mx-auto mt-2 text-center text-slate-500">
          Used in  Location : Kandy
          </div>
        </a>

      
        </div>
    
</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
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