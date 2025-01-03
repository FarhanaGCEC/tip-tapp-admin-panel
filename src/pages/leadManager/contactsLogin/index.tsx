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
    contactNo: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.customers.fields.contactNo.validationMessage'
        )}`
      ),
      email: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.email.validationMessage'
        )}`
      ),
      username: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.username.validationMessage'
        )}`
      ),
      password: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.password.validationMessage'
        )}`
      ),
      confirmPassword: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.confirmPassword.validationMessage'
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
  const handleChange = () => {}

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
  const [buttonContactModalPreview, setContactButtonModalPreview] = useState(false)
  const [editButtonContactModalPreview, setEditContactButtonModalPreview] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
                {`${t('Contacts Logins')}`}
               
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
                        <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-3">
                        
          <SearchSelectElement
           label={`${t('contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.contact.label')}`}
            register={register}
            name="campaignType"
            id="campaignType"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          
          
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
   
      </div>
      <div className="intro-y box col-span-12">
        <div className="items-center justify-center border-slate-200/60 px-5 py-5 dark:border-darkmode-400 sm:py-3">
        <div className="intro-y ">
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
                    <Button
                     variant="primary"
                     onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setContactButtonModalPreview(true)
                    }}
                    >
                      Add Login
                    </Button>
                  </div>
                 
    <div className="overflow-y-auto overflow-x-scroll mt-3">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Action
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
             Contact
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
             Username
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Name
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Email
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
            lang_v1.department
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
            lang_v1.designation
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td> <div className="items-left flex border-t border-slate-200/60 dark:border-darkmode-400 lg:justify-start">
                <Button variant="primary" size="sm" className="mb-2  mr-2 " onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setEditContactButtonModalPreview(true)
                    }}>
                  <a className="flex items-center" href="#">
                    <Lucide icon="Edit" className="h-4 w-4 " />
                  </a>
                </Button>
                
                <Button variant="danger" size="sm" className="mb-2 flex items-center"
                onChange={handleChange}
                        onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 " /> 
                    
                </Button>
                
              </div></Table.Td>
            <Table.Td className="">J.K.L Nandasenas</Table.Td>
            <Table.Td className="">Nanda</Table.Td>
            <Table.Td className="">J.K.L Nandasena</Table.Td>
            <Table.Td className="">nanda@gmail.com</Table.Td>
            <Table.Td className="">2023.04.05 14:12P.M</Table.Td>
            <Table.Td className="">2023.04.05 14:12P.M</Table.Td>
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
  <Dialog
              open={deleteConfirmationModal}
              onClose={() => {
                setDeleteConfirmationModal(false)
              }}
              initialFocus={deleteButtonRef}
            >
              <Dialog.Panel>
                <div className="p-5 text-center">
                  <Lucide
                    icon="XCircle"
                    className="mx-auto mt-3 h-16 w-16 text-danger"
                  />
                  <div className="mt-5 text-3xl">Are you sure?</div>
                  <div className="mt-2 text-slate-500">
                    Do you really want to delete these records? <br />
                    This process cannot be undone.
                  </div>
                </div>
                <div className="px-5 pb-8 text-center">
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => {
                      setDeleteConfirmationModal(false)
                    }}
                    className="mr-1 w-24"
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
                  open={buttonContactModalPreview}
                  onClose={() => {
                    setContactButtonModalPreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setContactButtonModalPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description className='px-5' >
                      <div className="grid gap-7 md:grid-cols-2">
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.prefix.label'
                        )}`}
                        register={register}
                        name="prefix"
                        id="prefix"
                      />
                      </div>  <div className="grid gap-7 mt-7 md:grid-cols-2">
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.firstName.label'
                        )}`}
                        register={register}
                        name="firstName"
                        id="firstName"
                        required
                        error={errors.firstName}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.lastName.label'
                        )}`}
                        register={register}
                        name="lastName"
                        id="lastName"
                      />
                       <SelectElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.contact.label'
                        )}`}
                        register={register}
                        required
                        error={errors.contact}
                        name="contact"
                        id="contact"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.email.label'
                        )}`}
                        type='email'
                        register={register}
                        name="email"
                        id="email"
                        required
                        error={errors.email}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.contactNo.label'
                        )}`}
                        register={register}
                        name="contactNo"
                        id="contactNo"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.alternateContactNumber.label'
                        )}`}
                        register={register}
                        name="alternateContactNumber"
                        id="alternateContactNumber"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langContactNumber.label'
                        )}`}
                        register={register}
                        name="langContactNumber"
                        id="langContactNumber"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langDepartment.label'
                        )}`}
                        register={register}
                        name="langDepartment"
                        id="langDepartment"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langDesignation.label'
                        )}`}
                        register={register}
                        name="langDesignation"
                        id="langDesignation"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.username.label'
                        )}`}
                        register={register}
                        name="username"
                        id="username"
                        required
                        error={errors.username}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.password.label'
                        )}`}
                        register={register}
                        name="password"
                        id="password"
                        required
                        error={errors.password}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.confirmPassword.label'
                        )}`}
                        register={register}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        error={errors.confirmPassword}
                      />
                                    <FormCheck className="">
                              <div className="mr-2 font-medium">{`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.isActive.label'
                              )}`}</div>

                              <FormCheck.Input
                                id="vertical-form-3"
                                type="checkbox"
                                value=""
                                onChange={handleChange}
                              />
                              <FormCheck.Label
                                className="mr-2"
                                htmlFor="vertical-form-3"
                              >
                                <div className="mx-1 -ml-1 flex">
                                  <FormInfo
                                    tooltip={`${t(
                                      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.isActive.tooltip'
                                    )}`}
                                  />
                                </div>
                              </FormCheck.Label>
                            </FormCheck>
                            </div>
                    </Dialog.Description>

                    <div className="flex justify-end px-3 pb-4 text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                        
                      >
                        {`${t('common.button.save')}`}
                       
                      </Button>
                 <Button type="button" variant="outline-secondary" onClick={()=> {
                setContactButtonModalPreview(false);
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
                  open={editButtonContactModalPreview}
                  onClose={() => {
                    setEditContactButtonModalPreview(false)
                  }}
                >
                  <Dialog.Panel className="overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'Edit Login'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setEditContactButtonModalPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description className='px-5' >
                      <div className="grid gap-7 md:grid-cols-2">
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.prefix.label'
                        )}`}
                        register={register}
                        name="prefix"
                        id="prefix"
                      />
                      </div>  <div className="grid gap-7 mt-7 md:grid-cols-2">
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.firstName.label'
                        )}`}
                        register={register}
                        name="firstName"
                        id="firstName"
                        required
                        error={errors.firstName}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.lastName.label'
                        )}`}
                        register={register}
                        name="lastName"
                        id="lastName"
                      />
                       <SelectElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.contact.label'
                        )}`}
                        register={register}
                        required
                        error={errors.contact}
                        name="contact"
                        id="contact"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.email.label'
                        )}`}
                        type='email'
                        register={register}
                        name="email"
                        id="email"
                        required
                        error={errors.email}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.contactNo.label'
                        )}`}
                        register={register}
                        name="contactNo"
                        id="contactNo"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.alternateContactNumber.label'
                        )}`}
                        register={register}
                        name="alternateContactNumber"
                        id="alternateContactNumber"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langContactNumber.label'
                        )}`}
                        register={register}
                        name="langContactNumber"
                        id="langContactNumber"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langDepartment.label'
                        )}`}
                        register={register}
                        name="langDepartment"
                        id="langDepartment"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langDesignation.label'
                        )}`}
                        register={register}
                        name="langDesignation"
                        id="langDesignation"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.username.label'
                        )}`}
                        register={register}
                        name="username"
                        id="username"
                        required
                        error={errors.username}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.password.label'
                        )}`}
                        register={register}
                        name="password"
                        id="password"
                        required
                        error={errors.password}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.confirmPassword.label'
                        )}`}
                        register={register}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        error={errors.confirmPassword}
                      />
                                    <FormCheck className="">
                              <div className="mr-2 font-medium">{`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.isActive.label'
                              )}`}</div>

                              <FormCheck.Input
                                id="vertical-form-3"
                                type="checkbox"
                                value=""
                                onChange={handleChange}
                              />
                              <FormCheck.Label
                                className="mr-2"
                                htmlFor="vertical-form-3"
                              >
                                <div className="mx-1 -ml-1 flex">
                                  <FormInfo
                                    tooltip={`${t(
                                      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.isActive.tooltip'
                                    )}`}
                                  />
                                </div>
                              </FormCheck.Label>
                            </FormCheck>
                            </div>
                    </Dialog.Description>

                    <div className="flex justify-end px-3 pb-4 text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                        
                      >
                        {`${t('common.button.update')}`}
                       
                      </Button>
                 <Button type="button" variant="outline-secondary" onClick={()=> {
                setEditContactButtonModalPreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button>
                    </div>
                  </Dialog.Panel>
                </Dialog>
                </div>
        </div>
      </div>
   
    </div>
  )
}

export default Main
