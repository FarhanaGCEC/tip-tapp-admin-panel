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


  const handleChange = () => {
    setChecked(!checked)
  }
  const [saleTypePreview, setSaleTypePreview] = useState(false) 
  const [editSaleTypePreview, setEditSaleTypePreview] = useState(false) 

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            
            
<h2 className="mr-auto text-lg font-medium ml-2">
            Sale Types
              
              </h2>
              <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          <Button
            variant="primary"
            className="mr-2 shadow-md sm:w-auto"
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setSaleTypePreview(true)
            }}
          >
            Add Sale Type
          </Button>

          <Button
            variant="primary"
            className=" mr-2 px-2 "
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setSaleTypePreview(true)
            }}
          >
            <Dialog
              size="lg"
              open={saleTypePreview}
              onClose={() => {
                setSaleTypePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'sales.fields.saleTypes.fields.addSale.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setSaleTypePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'sales.fields.saleTypes.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
                  
                  <TextareaElement
                    label={`${t(
                      'sales.fields.saleTypes.fields.description.label'
                    )}`}
                    register={register}
                    name="description"
                    id="description"
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
                      setSaleTypePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
            <span className="flex h-5 w-5 items-center justify-center">
              <Lucide icon="Plus" className="h-4 w-4" />
            </span>
          </Button>
        </div>
            
          </div>
          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
          <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('sales.fields.saleTypes.title')}`}
                  </h2>
                  </div>
        <div className="items-center justify-center border-slate-200/60 py-5 dark:border-darkmode-400 sm:py-3">
       
        <div className="intro-y">
      
                  <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                    <div className="items-center sm:mr-4 sm:flex ">
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
                  Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Description
                  </Table.Th>
                 
                 
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
              <Table.Td className="!px-2 w-96">
              <div className="w-32 items-left flex border-t border-slate-200/60 dark:border-darkmode-400 lg:justify-start">
              <Button variant="primary" className="mb-2 mr-1"  size="sm"    onChange={handleChange}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault()
        setEditSaleTypePreview(true)
      }}  >
                  <a className=" flex items-center" href="#">
                    <Lucide icon="Edit" className="h-4 w-4 " />
                  </a>
                </Button>
                <Dialog
              size="lg"
              open={editSaleTypePreview}
              onClose={() => {
                setEditSaleTypePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'sales.fields.saleTypes.fields.editSale.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditSaleTypePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'sales.fields.saleTypes.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
                  
                  <TextareaElement
                    label={`${t(
                      'sales.fields.saleTypes.fields.description.label'
                    )}`}
                    register={register}
                    name="description"
                    id="description"
                  />
       
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.update')}`}
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
                      setEditSaleTypePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                <Button variant="danger" size="sm" className="mb-2 mr-1 w-18 flex items-center"
                onChange={handleChange}
                        onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 " /> 
                    
                </Button>
                <Button variant="danger" size="sm" className="mb-2 w-18 flex items-center"
              
                      >
                        <Lucide icon="Power" className="w-4 h-4 " /> 
                    
                </Button>
                
              </div>
            </Table.Td>
                  <Table.Td className="!px-2">	Apple Brand discoun</Table.Td>
                  <Table.Td className="!px-2">123</Table.Td>
                 
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
              Do you really want to delete these records? <br />
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
        </div>
       
      </div>
      
    </div>
  )
}

export default Main
