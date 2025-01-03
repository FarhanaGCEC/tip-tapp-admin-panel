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
    statusName: yup
      .string()
      .required(
        `${t('repair.fields.jobsheet.fields.statusName.validationMessage')}`
      ),
      addDevice: yup
      .string()
      .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.validationMessage')}`),
      addDeviceModel: yup
      .string()
      .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.validationMessage')}`),
     
      
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
    'Default Status When Addding a New Job Sheet'
  )
  const [tooltipContent2] = useState(
    'Status which are marked as completed will be displayed here.'
  )
  const [tooltipContent3] = useState(
    'The date the technician should return the item after repairing to the customer.'
  )
  const [buttonReportHistoryPreview, setReportHistoryPreview] = useState(false)
  const [notificationPreview,  setNotificationPreview] = useState(false)  
  const [editNotificationPreview,  setEditNotificationPreview] = useState(false)  
  const [devicePreview,  setDevicePreview] = useState(false) 
  const [editDevicePreview,  setEditDevicePreview] = useState(false)
  const [deviceModelPreview,  setDeviceModelPreview] = useState(false) 
  const [editDeviceModelPreview,  setEditDeviceModelPreview] = useState(false)
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
  const [select, setSelect] = useState('1')
  const [editorData] = useState(
    `<p>{ ' Terms and Conditions

    Title to any product supplied under this invoice shall pass to Customer only on full payment of this invoice.
    In case of Invoice type as CREDIT, payment shall be accepted only by account payee cheque,Favoring company
    name mentioned on top & handed over to our authorized representative only.
    Delayed payment shall result in a charge of interest at 18% per annum.
    In case of Invoice type as CREDIT & if cheque is dishonored by bank, debit note for actual bank charges shall be
    sent to the customer.
    Warranty for the product shall be as mentioned in this invoice and as detailed in the Apple warranty document
    provided with the product.
    Product supplied under this invoice shall be accepted for return only under a return authorization issued by Mac
    Center Pvt Ltd.
    Jurisdiction for settlement of any dispute shall be the appropriate Court at Colombo.
    Cheque in favor of - Mac Center (Pvt) Ltd
    Warranty- One year standard warranty for brand new units only
    
    ' }.</p>`
  )

  const [editorDataTwo] = useState(`<p>{' Thank You for Your Business!!! Mac Center (Pvt) Ltd, 56 Supun Arcade, Galle Road, Colombo 6
  info@maccenter.lk 011-2364141 / 0777 97 97 98'}.</p>`)
  
  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
               Settings
                
              </h2>
            </h2>
            
          </div>
 
          <div className="intro-y box mb-5 mt-5  py-5 ">
        <div className="items-center justify-center border-slate-200/60 px-5 py-5 dark:border-darkmode-400 sm:py-3">
        {/* <Tab.Group>
    <Tab.List variant="link-tabs">
        <Tab>
            <Tab.Button className="w-full py-2 flex" as="button">
                Example Tab 1 <Tippy content={tooltipContent2}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 mt-0.5 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Example Tab 2
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Example Tab 2
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Example Tab 2
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Example Tab 2
            </Tab.Button>
        </Tab>
    </Tab.List>
    <Tab.Panels className="mt-5">
        <Tab.Panel className="leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of
            Lorem Ipsum.
        </Tab.Panel>
        <Tab.Panel className="leading-relaxed">
            It is a long established fact that a reader will be
            distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum
            is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many
            desktop publishing packages and web page editors now
            use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites
            still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
        </Tab.Panel>
    </Tab.Panels>
</Tab.Group> */}
      <Tab.Group className=" overflow-hidden intro-y box">
                <Tab.List className="flex-col border-transparent dark:border-transparent sm:flex-row bg-slate-200 dark:bg-darkmode-800">
                    <Tab fullWidth={false}>
                        {({ selected }) => (
                            <Tab.Button
                                className={clsx([
                                    "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                                    !selected &&
                                    "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                                    selected &&
                                    "text-primary border-transparent dark:bg-darkmode-600 dark:border-transparent dark:text-white",
                                ])}
                                as="button"
                            >
                                <Tippy
                                    content="All Job Sheet Status"
                                    className="flex items-center justify-center w-full py-4"
                                    aria-controls="content"
                                    aria-selected="true"
                                >

                                    Status
                                </Tippy>
                            </Tab.Button>
                        )}
                    </Tab>
                    <Tab fullWidth={false}>
                        {({ selected }) => (
                            <Tab.Button
                                className={clsx([
                                    "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                                    !selected &&
                                    "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                                    selected &&
                                    "text-primary border-transparent dark:bg-darkmode-600 dark:border-transparent dark:text-white",
                                ])}
                                as="button"
                            >
                                <Tippy
                                    content="Electronic Devices like Laptop, Desktop, Mobile"
                                    className="flex items-center justify-center w-full py-4"
                                    aria-selected="false"
                                >
                                    Devices
                                </Tippy>
                            </Tab.Button>
                        )}
                    </Tab>
                    <Tab fullWidth={false}>
                        {({ selected }) => (
                            <Tab.Button
                                className={clsx([
                                    "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                                    !selected &&
                                    "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                                    selected &&
                                    "text-primary border-transparent dark:bg-darkmode-600 dark:border-transparent dark:text-white",
                                ])}
                                as="button"
                            >
                                <Tippy
                                    content="Here device models can be added along with its repair checklist"
                                    className="flex items-center justify-center w-full py-4"
                                    aria-selected="false"
                                >

                                   Device Models
                                </Tippy>
                            </Tab.Button>
                        )}
                    </Tab>
                    <Tab fullWidth={false}>
                        {({ selected }) => (
                            <Tab.Button
                                className={clsx([
                                    "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                                    !selected &&
                                    "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                                    selected &&
                                    "text-primary border-transparent dark:bg-darkmode-600 dark:border-transparent dark:text-white",
                                ])}
                                as="button"
                            >
                                <Tippy
                                    content=""
                                    className="flex items-center justify-center w-full py-4"
                                    aria-selected="false"
                                >

                                   Repair Settings
                                </Tippy>
                            </Tab.Button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel className="p-5">
                        <div>

                            <div className="flex flex-col items-center mt- intro-y sm:flex-row" />
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
                        placeholder="Search Status"
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
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setNotificationPreview(true)
                      }}
                      // onClick={() => handleClick(SlideoverRegistry.addJobSheet)}
                    >
                      Add Status
                    </Button>
                    <Dialog
              size="xl"
              open={notificationPreview}
              onClose={() => {
                setNotificationPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.addStatus.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setNotificationPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="">
                <div className="grid gap-7 md:grid-cols-2">
                <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.statusName.label'
                    )}`}
                    register={register}
                    name="statusName"
                    id="statusName"
                    required
                    error={errors.statusName}
                  />
                   <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.color.label'
                    )}`}
                    register={register}
                    name="color"
                    id="color"

                  />
               
                   <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.sortOrder.label'
                    )}`}
                    register={register}
                    name="sortOrder"
                    id="sortOrder"
                  />

<FormCheck className="mb-2">
<div className="mr-2 font-medium">Mark This Status as Complete</div>
            <FormCheck.Input
              id="vertical-form-4"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-4">
              
            </FormCheck.Label>
          </FormCheck>
        </div>
              
                     
        <div className="grid gap-7 mt-7 md:grid-cols-1">
                        <TextareaElement
                          id="smsTemplate"
                          name="smsTemplate"
                          label={`${t(
                            'repair.fields.jobsheet.fields.smsTemplate.label'
                          )}`}
                         
                          register={register}
                        />
                         <InputElement
                          label={`${t(
                            'repair.fields.jobsheet.fields.sendNotifications.fields.subject.label'
                          )}`}
                        
                          register={register}
                          name="subject"
                          id="subject"
                        />
                        <ClassicEditorElement
                          id="emailBody"
                          name="emailBody"
                          label={`${t(
                            'repair.fields.jobsheet.fields.sendNotifications.fields.emailBody.label'
                          )}`}
                          register={register}
                          value={editorDataExpensesNote}
                        />
                      </div>
                      <div className="mr-2 mt-7 font-medium">
                        {`${t(
                          'repair.fields.jobsheet.fields.sendNotifications.fields.availabletags.label'
                        )}`}
                        :{' '}
                      </div>{' '}
                      <div className=" mt-2 ">
                        {' '}
                        {`${t(
                          'repair.fields.jobsheet.fields.sendNotifications.fields.availabletags.placeolder'
                        )}`}
                      </div>


           </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mb-8 ">
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
                      setNotificationPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                 
                </div>
              </Dialog.Panel>
            </Dialog>
                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table bordered striped hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Status Name</Table.Th>
                <Table.Th className="whitespace-nowrap">Color</Table.Th>
                <Table.Th className="whitespace-nowrap  ">Sort Order</Table.Th>
                <Table.Th className="whitespace-nowrap text-center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Completes</Table.Td>
                <Table.Td>	#0ad527 •</Table.Td>
                <Table.Td>3</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm"  onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setEditNotificationPreview(true)
                      }}>
                              <Dialog
              size="xl"
              open={editNotificationPreview}
              onClose={() => {
                setEditNotificationPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.editStatus.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditNotificationPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="">
                <div className="grid gap-7 md:grid-cols-2">
                <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.statusName.label'
                    )}`}
                    register={register}
                    name="statusName"
                    id="statusName"
                    required
                    error={errors.statusName}
                  />
                   <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.color.label'
                    )}`}
                    register={register}
                    name="color"
                    id="color"

                  />
               
                   <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.sortOrder.label'
                    )}`}
                    register={register}
                    name="sortOrder"
                    id="sortOrder"
                  />

<FormCheck className="mb-2">
<div className="mr-2 font-medium">Mark This Status as Complete</div>
            <FormCheck.Input
              id="vertical-form-4"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-4">
              
            </FormCheck.Label>
          </FormCheck>
        </div>
              
                     
        <div className="grid gap-7 mt-7 md:grid-cols-1">
                        <TextareaElement
                          id="smsTemplate"
                          name="smsTemplate"
                          label={`${t(
                            'repair.fields.jobsheet.fields.smsTemplate.label'
                          )}`}
                         
                          register={register}
                        />
                         <InputElement
                          label={`${t(
                            'repair.fields.jobsheet.fields.sendNotifications.fields.subject.label'
                          )}`}
                        
                          register={register}
                          name="subject"
                          id="subject"
                        />
                        <ClassicEditorElement
                          id="emailBody"
                          name="emailBody"
                          label={`${t(
                            'repair.fields.jobsheet.fields.sendNotifications.fields.emailBody.label'
                          )}`}
                          register={register}
                          value={editorDataExpensesNote}
                        />
                      </div>
                      <div className="mr-2 mt-7 font-medium">
                        {`${t(
                          'repair.fields.jobsheet.fields.sendNotifications.fields.availabletags.label'
                        )}`}
                        :{' '}
                      </div>{' '}
                      <div className=" mt-2 ">
                        {' '}
                        {`${t(
                          'repair.fields.jobsheet.fields.sendNotifications.fields.availabletags.placeolder'
                        )}`}
                      </div>


           </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mb-8 ">
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
                      setEditNotificationPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                 
                </div>
              </Dialog.Panel>
            </Dialog>
                    <Lucide icon="Edit" className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </Table.Td>
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
                            <div className="flex flex-wrap items-center col-span-10 intro-y sm:flex-row sm:flex-nowrap" />
                        </div>


                    </Tab.Panel>
                    <Tab.Panel className="p-5">
                        <div>

                            <div className="flex flex-col items-center mt- intro-y sm:flex-row" />
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
                        placeholder="Search Device"
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
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setDevicePreview(true)
                      }}
                      // onClick={() => handleClick(SlideoverRegistry.addJobSheet)}
                    >
                      Add Device
                    </Button>
                    <Dialog
              size="lg"
              open={devicePreview}
              onClose={() => {
                setDevicePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setDevicePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.label'
                    )}`}
                    register={register}
                    required
                    error={errors.addDevice}
                    name="addDevice"
                    id="addDevice"
                  />
                  
                  <TextareaElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.description.label'
                    )}`}
                    register={register}
                    name="shortDescription"
                    id="shortDescription"
                  />
        
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                        setDevicePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table bordered striped hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Device</Table.Th>
                <Table.Th className="whitespace-nowrap">Description</Table.Th>
                <Table.Th className="whitespace-nowrap text-center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Phone</Table.Td>
                <Table.Td>3</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm"  onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setEditDevicePreview(true)
                      }}>
                              <Dialog
              size="lg"
              open={editDevicePreview}
              onClose={() => {
                setEditDevicePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.editDevice.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditDevicePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.label'
                    )}`}
                    register={register}
                    required
                    error={errors.addDevice}
                    name="addDevice"
                    id="addDevice"
                  />
                  
                  <TextareaElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.description.label'
                    )}`}
                    register={register}
                    name="shortDescription"
                    id="shortDescription"
                  />
        
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                      setEditDevicePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button variant="danger" className="mb-2 mr-1" size="sm" >
 
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                </Table.Td>
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
                            <div className="flex flex-wrap items-center col-span-10 intro-y sm:flex-row sm:flex-nowrap" />
                        </div>


                    </Tab.Panel>
                    <Tab.Panel className="p-5">
                        <div >
                        <div className="flex justify-between">
  <div className="flex font-medium items-center text-left">
    <span>
      {`${t(
        'repair.fields.jobsheet.fields.brand.label'
      )}`}{' '}
      :
    </span>
    <div className="relative mr-3 text-slate-500 sm:ml-3">
      <TomSelect
        id="update-profile-form-1" 
        value={select}
        onChange={setSelect}
        className="w-64"
      >
        <option value="1">All</option>
        <option value="2">Bunny Stores</option>
        <option value="3">Kandy</option>
      </TomSelect>
    </div>
  </div>
  <div className="flex font-medium items-center ml-2 text-left">
    <span>
      {`${t(
        'repair.fields.jobsheet.fields.device.label'
      )}`}{' '}
      :
    </span>
    <div className="relative text-slate-500 ml-2 text-right">
      <TomSelect
        id="update-profile-form-2" 
        value={select}
        onChange={setSelect}
        className="w-64"
      >
        <option value="1">All </option>
        <option value="2">Bunny Stores</option>
        <option value="3">Kandy</option>
      </TomSelect>
    </div>
  </div>
</div>

                            <div className="flex flex-col items-center mt- intro-y sm:flex-row" />
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
                        placeholder="Search Device Model"
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
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setDeviceModelPreview(true)
                      }}
                      // onClick={() => handleClick(SlideoverRegistry.addJobSheet)}
                    >
                      Add Device Model
                    </Button>
                    <Dialog
              size="lg"
              open={deviceModelPreview}
              onClose={() => {
                setDeviceModelPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setDeviceModelPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.label'
                    )}`}
                    register={register}
                    required
                    error={errors.addDeviceModel}
                    name="addDeviceModel"
                    id="addDeviceModel"
                  />
                  <SelectElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.brandModel.label'
                    )}`}
                    register={register}
                    name="brandModel"
                    id="brandModel"
                  />
                  <SelectElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.device.label'
                    )}`}
                    register={register}
                    name="device"
                    id="device"
                  />
                  <TextareaElement
                   info={`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.repairChecklist.tooltip'
                  )}`}
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.repairChecklist.label'
                    )}`}
                    register={register}
                    name="repairChecklist"
                    id="repairChecklist"
                  />
        
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                        setDeviceModelPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table bordered striped hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Model name</Table.Th>
                <Table.Th className="whitespace-nowrap">Repair Checklist</Table.Th>
                <Table.Th className="whitespace-nowrap">Device</Table.Th>
                <Table.Th className="whitespace-nowrap">Brand</Table.Th>
                <Table.Th className="whitespace-nowrap text-center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Phone</Table.Td>
                <Table.Td>3</Table.Td>
                <Table.Td>I Phone</Table.Td>
                <Table.Td>Apple</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm"  onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setEditDeviceModelPreview(true)
                      }}>
    <Dialog
              size="lg"
              open={editDeviceModelPreview}
              onClose={() => {
                setEditDeviceModelPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'repair.fields.jobsheet.fields.editDeviceModel.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditDeviceModelPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.label'
                    )}`}
                    register={register}
                    required
                    error={errors.addDeviceModel}
                    name="addDeviceModel"
                    id="addDeviceModel"
                  />
                  <SelectElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.brandModel.label'
                    )}`}
                    register={register}
                    name="brandModel"
                    id="brandModel"
                  />
                  <SelectElement
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.device.label'
                    )}`}
                    register={register}
                    name="device"
                    id="device"
                  />
                  <TextareaElement
                   info={`${t(
                    'repair.fields.jobsheet.fields.addJobSheet.fields.repairChecklist.tooltip'
                  )}`}
                    label={`${t(
                      'repair.fields.jobsheet.fields.addJobSheet.fields.repairChecklist.label'
                    )}`}
                    register={register}
                    name="repairChecklist"
                    id="repairChecklist"
                  />
        
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                      setEditDeviceModelPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button variant="danger" className="mb-2 mr-1" size="sm" >
 
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                </Table.Td>
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
                            <div className="flex flex-wrap items-center col-span-10 intro-y sm:flex-row sm:flex-nowrap" />
                        </div>


                    </Tab.Panel>
                    <Tab.Panel className="p-5">
                    <div className="flex font-medium items-center text-left">
    <span  className="flex">
    {`${t('repair.fields.settings.fields.defaultStatus.label')}`}
     <Tippy content={tooltipContent1}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-2 mt-0.5 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
    </span>
    <div className="relative mr-3 text-slate-500 sm:ml-10">
      <TomSelect
        id="update-profile-form-1" 
        value={select}
        onChange={setSelect}
        className="w-72"
      >
        <option value="1">All</option>
        <option value="2">Bunny Stores</option>
        <option value="3">Kandy</option>
      </TomSelect>
    </div>
  </div>
  <div className="grid grid-cols-1 gap-7 mt-7 md:grid-cols-2">
       
          <InputElement
            label={`${t('repair.fields.settings.fields.jobSheetNumber.label')}`}
            register={register}
            name="jobSheetNumber"
           
            id="jobSheetNumber"
          />
          <InputElement
            label={`${t('repair.fields.settings.fields.jobSheetNumberTwo.label')}`}
            register={register}
            name="jobSheetNumberTwo"
            id="jobSheetNumberTwo"
          />
          <InputElement
            label={`${t('repair.fields.settings.fields.jobSheetNumberThree.label')}`}
            register={register}
            name="jobSheetNumberThree"
            id="jobSheetNumberThree"
          />
          </div>  
           <div className="grid grid-cols-1 gap-7 mt-7 md:grid-cols-2">
          <TextareaElement
                          id="productConfiguration"
                          name="productConfiguration"
                          label={`${t(
                            'repair.fields.settings.fields.productConfiguration.label'
                          )}`}
                          info={`${t(
                            'repair.fields.settings.fields.productConfiguration.tooltip'
                          )}`}
                          register={register}
                        />
                        <TextareaElement
                          id="problemReportedCustomer"
                          name="problemReportedCustomer"
                          label={`${t(
                            'repair.fields.settings.fields.problemReportedCustomer.label'
                          )}`}
                          info={`${t(
                            'repair.fields.settings.fields.problemReportedCustomer.tooltip'
                          )}`}
                          register={register}
                        />
                        <TextareaElement
                          id="conditionOfProduct"
                          name="conditionOfProduct"
                          label={`${t(
                            'repair.fields.settings.fields.conditionOfProduct.label'
                          )}`}
                          info={`${t(
                            'repair.fields.settings.fields.conditionOfProduct.tooltip'
                          )}`}
                          register={register}
                        />
                        
          </div>
          <div className="grid grid-cols-1 gap-7 mt-7 md:grid-cols-1">
            <ClassicEditorElement
              label={`${t('repair.fields.settings.fields.repairTerms.label')}`}
              register={register}
              value={editorData}
            />
          </div>
          <div className="grid grid-cols-1 gap-7 mt-7 md:grid-cols-2">
       
          <InputElement
            label={`${t('repair.fields.settings.fields.labelJobSheet1.label')}`}
            register={register}
            name="labelJobSheet1"
           
            id="labelJobSheet1"
          />
          <InputElement
            label={`${t('repair.fields.settings.fields.labelJobSheet2.label')}`}
            register={register}
            name="labelJobSheet1"
            id="labelJobSheet1"
          />
          <InputElement
            label={`${t('repair.fields.settings.fields.labelJobSheet3.label')}`}
            register={register}
            name="labelJobSheet1"
            id="labelJobSheet1"
          />
           <InputElement
            label={`${t('repair.fields.settings.fields.labelJobSheet4.label')}`}
            register={register}
            name="labelJobSheet1"
            id="labelJobSheet1"
          />
          </div>
          <div className="grid grid-cols-1 gap-7 mt-7 md:grid-cols-1">
            <ClassicEditorElement
              label={`${t('repair.fields.settings.fields.pageFooter.label')}`}
              register={register}
              value={editorDataTwo}
            />
          </div>  
          <div className="mt-5 flex justify-end">
<Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
                               {`${t('common.button.update')}`}
                               {isLoading ? (
                                 <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
                               ) : (
                                 ''
                               )}
                             </Button> 
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
