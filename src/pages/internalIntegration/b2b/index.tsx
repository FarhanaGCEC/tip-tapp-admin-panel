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
    supplier: yup
      .string()
      .required(
        `${t('internalIntegration.fields.supplier.validationMessage')}`
      ),
      storeName: yup
      .string()
      .required(
        `${t('internalIntegration.fields.storeName.validationMessage')}`
      ),
      storeToken: yup
      .string()
      .required(
        `${t('internalIntegration.fields.storeToken.validationMessage')}`
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
  const [tokenModal, setTokenModal] = useState(false)
  const tokenModalRef = useRef(null)

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
  const [storePreview, setStorePreview] = useState(false) 

  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }
  
  return (
    
    <div>

          
      <Tab.Group className="">
      <div className="flex justify-center mt-6 intro-y">
          <Tab.List
            variant="pills"
            className="w-auto mx-auto overflow-hidden rounded-full box"
          >
            <Tab>
              <Tab.Button
                className="w-54 py-2 rounded-none lg:w-64 lg:py-3"
                as="button"
              >
               B2B
              </Tab.Button>
            </Tab>
            <Tab>
              <Tab.Button
                className="w-54 py-2 rounded-none lg:w-64 lg:py-3"
                as="button"
              >
               Product Mapping
              </Tab.Button>
            </Tab>
            
          </Tab.List>
        </div>


            <Tab.Panels className="pb-5">

              <Tab.Panel className="mt-5">
     
                    <div className="intro-y box mb-5 px-5 py-5">
                    <div className="">
                  <div className="mt- intro-y flex flex-col items-center sm:flex-row">
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
                    <Button
                     variant="primary"
                     onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setStorePreview(true)
                    }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="  py-5" style={{ overflowY: 'auto' }}>
                  <Table
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              <Table.Thead variant="dark">
                <Table.Tr>
               
                 
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                  Store Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                  Host Business Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                 Connection Status
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                 On-Time Sale
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                 Connection Approve
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
                 Supplier
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
                 
                 
                  <Table.Td className="">Liza</Table.Td>
                  <Table.Td className="">Null</Table.Td>
                  <Table.Td className="">Null</Table.Td>
                  <Table.Td className="">Null</Table.Td>
                  <Table.Td className="">Null</Table.Td>
                  <Table.Td className="">Null</Table.Td>
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
              size="lg"
              open={storePreview}
              onClose={() => {
                setStorePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'internalIntegration.fields.StoreAdd.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setStorePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'internalIntegration.fields.storeName.label'
                    )}`}
                    register={register}
                    required
                    error={errors.storeName}
                    name="storeName"
                    id="storeName"
                  />
                  
                  <InputElement
                    label={`${t(
                      'internalIntegration.fields.storeToken.label'
                    )}`}
                    register={register}
                    name="storeToken"
                    id="storeToken"
                    required
                    error={errors.storeToken}
                  />
                   <SelectElement
                    label={`${t(
                      'internalIntegration.fields.supplier.label'
                    )}`}
                    register={register}
                    name="supplier"
                    id="supplier"
                    required
                    error={errors.supplier}
                  />
                   <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                    // onChange={handleChangeHide}
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">{`${t(
                      'internalIntegration.fields.enableConnectionStatus.label'
                    )}`}</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
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
                      setStorePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                
      </div>
              </Tab.Panel>
              <Tab.Panel className="mt-5">
              <div className="intro-y box mb-5 mt-5 px-5 py-5">
              <div className="grid grid-cols-1 gap-6 mt-3 md:grid-cols-2">     
              <SelectElement
                    label={`${t(
                      'internalIntegration.fields.storeName.label'
                    )}`}
                    register={register}
                    name="storeName"
                    id="storeName"
                  />
                   <SelectElement
                    label={`${t(
                      'internalIntegration.fields.location.label'
                    )}`}
                    register={register}
                    name="location"
                    id="location"
                  />
                  <SelectElement
                    label={`${t(
                      'internalIntegration.fields.homeProduct.label'
                    )}`}
                    register={register}
                    name="homeProduct"
                    id="homeProduct"
                  />
                  <SelectElement
                    label={`${t(
                      'internalIntegration.fields.mappingProduct.label'
                    )}`}
                    register={register}
                    name="mappingProduct"
                    id="mappingProduct"
                  />

          </div> 
          
          <div className="mt-5 flex justify-end">
         
          <Button
              variant="twitter"
              className="mb-2 mr-1 text-white"
              onClick={handleSlider}
            >
              {`${t('Product Mapping')}`}
            </Button>
            <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
              {`${t('common.button.syncAll')}`}
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
            
          </div>
</div>

     <div className="intro-y box mb-5 px-5 py-5">
     <div className="flex flex-col border-b mb-5 font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('B2B Connection')}`}
                  </h2>
                  </div>
     <div >
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
               
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 Home Product
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                Mapping Product & Store
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
</Tab.Panel>
              </Tab.Panels>
              </Tab.Group>

    
    </div>
  )
}

export default Main
