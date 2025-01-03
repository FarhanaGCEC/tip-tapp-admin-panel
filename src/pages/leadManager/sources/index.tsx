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
  TextareaElement, 
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
    source: yup
      .string()
      .required(
        `${t(
          'lead.fields.source.validationMessage'
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
    setSliderSize('lg')
  }

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [tooltipContent1] = useState(
    'Enable Woocommerce Sync for Selected Products'
  )
  const [tooltipContent2] = useState(
    'Deactivated Products will Not be Available for Purchase or Sell'
  )
  const [sourcePreview, setSourcePreview] = useState(false)
  const [editSourcePreview, setEditSourcePreview] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
<div className="flex flex-grow items-center">
    <h2 className="ml-2 text-lg font-medium">
    Sources
    </h2>
    <div className="text-sm text-slate-500" style={{ marginLeft: '10px' }}>
      <span>Manage Source</span>
      <Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button>
    </div>
  </div>
  <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          <Button
             as="a" variant="primary" href="/stock-adjustment/addStockAdjustment"
            className="mr-2 shadow-md sm:w-auto"
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setSourcePreview(true)
            }}
          >
          Add Source
          </Button>

          <Button
             as="a" variant="primary" href="/stock-adjustment/addStockAdjustment"
             className="mr-2 shadow-md sm:w-auto"
             onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setSourcePreview(true)
            }}
          >
            <span className="flex h-5 w-5 items-center justify-center">
              <Lucide icon="Plus" className="h-4 w-4" />
            </span>
          </Button>
        </div>
            
          </div>
          <Alert
        variant="soft-primary"
        dismissible
        className="intro-y box col-span-11 mb-6 mt-5 dark:bg-danger dark:border-darkmode-600"
      >
        {({ dismiss }) => (
          <div className="flex items-center">
            <span>
              <Lucide icon="Info" className="mr-2 h-4 w-4" />
            </span>
            <span>
            Sources are used when adding leads
            </span>
            <Alert.DismissButton
              className="text-white"
              onClick={dismiss}
              aria-label="Close"
            >
              <Lucide icon="X" className="h-4 text-primary w-4" />
            </Alert.DismissButton>
          </div>
        )}
      </Alert>
          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
          <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('All Categories')}`}
                  </h2>
                  </div>
        <div className="items-center justify-center border-slate-200/60  py-5 dark:border-darkmode-400 sm:py-3">
        <div className="intro-y ">
        <div className="intro-y  flex flex-col sm:flex-row items-center">
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
    <div className="overflow-y-auto overflow-x-scroll mt-3">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Action
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
             Source
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
            Description
            </Table.Th>
           
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td> <div className="items-left flex border-t border-slate-200/60 dark:border-darkmode-400 lg:justify-start">
                <Button variant="primary" size="sm" className="mb-2  mr-2 " onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setEditSourcePreview(true)
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
            <Table.Td className="">Nandasenas</Table.Td>
            <Table.Td className="">123</Table.Td>
           
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
                  size="lg"
                  open={sourcePreview}
                  onClose={() => {
                    setSourcePreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'Add Source'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setSourcePreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description className='px-5' >
  <div className="grid gap-7 md:grid-cols-1">
                      <InputElement
                        label={`${t(
                          'lead.fields.source.label'
                        )}`}
                        register={register}
                        name="source"
                        id="source"
                        required
                        error={errors.source}
                      />
                      
                      <TextareaElement
                        label={`${t(
                          'lead.fields.description.label'
                        )}`}
                        register={register}
                        name="description"
                        id="description"

                      />
                                  
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
                setSourcePreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button>
                    </div>
                  </Dialog.Panel>
                </Dialog>
                <Dialog
                  size="lg"
                  open={editSourcePreview}
                  onClose={() => {
                    setEditSourcePreview(false)
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
                        setEditSourcePreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description className='px-5' >
                    <div className="grid gap-7 md:grid-cols-1">
                      <InputElement
                        label={`${t(
                          'lead.fields.source.label'
                        )}`}
                        register={register}
                        name="source"
                        id="source"
                        required
                        error={errors.source}
                      />
                      
                      <TextareaElement
                        label={`${t(
                          'lead.fields.description.label'
                        )}`}
                        register={register}
                        name="description"
                        id="description"

                      />
                                  
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
                setEditSourcePreview(false);
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
