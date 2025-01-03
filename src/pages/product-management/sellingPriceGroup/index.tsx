/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import { PosApi } from '../../../api'
import Table from '../../../components/common/table'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/common/button'
import Lucide from '../../../components/common/lucide'
import { Menu, Dialog } from '../../../components/common/headless'
import Pagination from '../../../components/common/pagination'
import {
  TextareaElement,
  InputElement,
  SelectElement,
} from '../../../components/common/form-elements'
import {
  FormInput,
  FormSelect,
  FormLabel,
  FormInline,
  FormInfo,
  InputGroup,
  FormCheck,
} from '../../../components/common/form-elements/components'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../components/common/loading-icon'
import Alert from "../../../base-components/Alert"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { Icons, NotificationTypes } from '../../../constants'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {
  const posApi = PosApi.useAPI()
  const { setNotification} = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const handleChange = () => {}

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const { t } = useTranslation('pos')
  const [sellingPreview, setSellingGroupPreview] = useState(false) 
  const [editSellingPreview, setEditSellingGroupPreview] = useState(false) 

  const schema = yup
  .object({
    sellingPriceName: yup
      .string()
      .required(
        `${t('productManagement.fields.sellingPriceName.validationMessage')}`
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

  return (
    <div className="">
      
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
              {' '}
              <h2 className="mr-auto text-lg font-medium">
              Selling Price Group
                <Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button>
              </h2>{' '}
            </h2>
      
          </div>  
          <div className="intro-y box mb-5 mt-6 px-5 py-6 ">   
          <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('productManagement.fields.importExportSelling.title')}`}
                  </h2>
                  </div>
                  
                  <div className="flex justify-between mt-7 items-center">
  <Button
    variant="pending"
    className="mr-1 text-white"
    onClick={handleSlider}
  >
    {`${t('common.button.exportSellingPrice')}`}
  </Button>

  <div className="flex" >
    <UploadFilesElement
      id="filetoImport"
      name="filetoImport"
      register={register}
      label={`${t('productManagement.fields.filetoImport.label')}`}
      variant="primary"
      btnLabel={`${t(
        'productManagement.fields.filetoImport.btnPlaceolder'
      )}`}
    />

    <div className="ml-10">
      <Button type="submit" variant="facebook" className="w-24">
        {`${t('common.button.submit')}`}
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
</div>


          
          
         
        </div>
        
        <div className="intro-y box mb-5 mt-6 px-5 py-6 ">   
       <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('contactManagement.fields.importContacts.fields.instruction.title')}`}
                  </h2>
                  </div>
                  <div className="intro-y mt-6 flex items-center "> 
  <Alert variant="soft-primary" className="flex items-center mr-2 "> 
      {/* <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" /> */}
      Export Selling price group prices
    </Alert>
    <Alert variant="soft-primary" className="flex items-center"> 
      {/* <Lucide icon="AlertTriangle" className="w-6 h-6 mr-2" /> */}
      Update the exported file and import the same file
    </Alert>
    <Alert variant="soft-primary" className="flex items-center ml-2"> 
      {/* <Lucide icon="AlertTriangle" className="w-6 h-6 mr-2" /> */}
      Only selling price group prices of the product will be updated. Any blank price will be skipped
    </Alert>
  </div>

</div>
<div className="intro-y box mb-5 mt-6 px-5 py-6 ">   
       <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('productManagement.fields.allSellingPriceGroup.title')}`}
                  </h2>
                  </div>
  
  <div className=" " style={{ overflowY: 'auto' }}>
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

                <div className="mx-auto items-center md:flex">
                <Button className="mr-2 flex items-center">
              <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column Visibility
            </Button>

                  <Menu>
                    <Menu.Button
                      as={Button}
                      variant="facebook"
                      className="flex items-center"
                      size="sm"
                    >
                      Export As{' '}
                      <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        CSV
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        Excel
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

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-auto">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search here"
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                  />
                </div>
                <Button
                  variant="primary"
                  className=" shadow-md sm:w-auto"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    setSellingGroupPreview(true)
                  }}
                >
                  Add 
                 
                </Button>
               
            <Dialog
              size="lg"
              open={sellingPreview}
              onClose={() => {
                setSellingGroupPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.addSellingPriceGroup.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setSellingGroupPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'productManagement.fields.sellingPriceName.label'
                    )}`}
                    register={register}
                    required
                    error={errors.sellingPriceName}
                    name="sellingPriceName"
                    id="sellingPriceName"
                  />
                  
                  
           <TextareaElement
  label={`${t('productManagement.fields.sellingPriceDescription.label')}`}
  register={register}
  name="sellingPriceDescription"
  id="sellingPriceDescription"
/>
<FormCheck className="mb-2">
<div className="mr-2 font-medium">{`${t(
              'productManagement.fields.addAsMarketPrice.label'
            )}`}</div>
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
              {/* <div className="mx-1 -ml-1 flex">
                <FormInfo
                  tooltip={`${t('productManagement.fields.addAsMarketPrice.tooltip')}`}
                />
              </div> */}
            </FormCheck.Label>
          </FormCheck>

       
          <Alert variant="soft-primary" className="flex items-center mr-2 "> 
      <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" />
      The selling price group is not considered when there are lot numbers.
    </Alert>



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
                      setSellingGroupPreview(false)
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
                <Table.Th className="whitespace-nowrap">Name</Table.Th>
                <Table.Th className="whitespace-nowrap">Description</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8 text-center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Phone</Table.Td>
                <Table.Td>1345</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm"  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    setEditSellingGroupPreview(true)
                  }}>
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Dialog
              size="lg"
              open={editSellingPreview}
              onClose={() => {
                setEditSellingGroupPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.editSellingPriceGroup.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditSellingGroupPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'productManagement.fields.sellingPriceName.label'
                    )}`}
                    register={register}
                    required
                    error={errors.sellingPriceName}
                    name="sellingPriceName"
                    id="sellingPriceName"
                  />
                  
                  
           <TextareaElement
  label={`${t('productManagement.fields.sellingPriceDescription.label')}`}
  register={register}
  name="sellingPriceDescription"
  id="sellingPriceDescription"
/>
<FormCheck className="mb-2">
<div className="mr-2 font-medium">{`${t(
              'productManagement.fields.addAsMarketPrice.label'
            )}`}</div>
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
              <div className="mx-1 -ml-1 flex">
                <FormInfo
                  tooltip={`${t('productManagement.fields.addAsMarketPrice.tooltip')}`}
                />
              </div>
            </FormCheck.Label>
          </FormCheck>

       
          <Alert variant="soft-primary" className="flex items-center mr-2 "> 
      <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" />
      The selling price group is not considered when there are lot numbers.
    </Alert>



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
                      setEditSellingGroupPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    onClick={(event: { preventDefault: () => void }) => {
                      event.preventDefault()
                      setDeleteConfirmationModal(true)
                    }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                  <Button variant="danger" className="mb-2 mr-1" size="sm">
                    <Lucide icon="Power" className="h-4 w-4" />
                  </Button>
                </Table.Td>
              </Table.Tr>
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
