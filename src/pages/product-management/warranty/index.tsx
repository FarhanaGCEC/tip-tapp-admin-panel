/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
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
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../components/common/loading-icon'
import {
  FormInput,
  FormSelect,
  FormLabel,
  FormInline,
  InputGroup,
  FormCheck,
} from '../../../components/common/form-elements/components'
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
  const { setNotification } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      name: yup
        .string()
        .required(
          `${t('productManagement.fields.name.validationMessage')}`
        ),
        duration: yup
        .string()
        .required(
          `${t('productManagement.fields.duration.validationMessage')}`
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

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [warrantyPreview, setWarrantyPreview] = useState(false) 
  const [editWarrantyPreview, setEditWarrantyPreview] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  
  return (
    <div className="">
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
        Warranty{' '}
          <Button
            variant="twitter"
            className="intro-y mx-1 h-7 w-7 rounded-full"
          >
            ?
          </Button>
        </h2>
        <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          <Button
            variant="primary"
            className="mr-2 shadow-md sm:w-auto"
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setWarrantyPreview(true)
            }}
          >
            Add Warranty
          </Button>

          <Button
            variant="primary"
            className=" mr-2 px-2 "
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setWarrantyPreview(true)
            }}
          >
            <Dialog
              size="lg"
              open={warrantyPreview}
              onClose={() => {
                setWarrantyPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.addWarranty.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setWarrantyPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'productManagement.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
           <TextareaElement
  label={`${t('productManagement.fields.description.label')}`}
  register={register}
  name="description"
  id="description"
  placeholder={`${t(
    'productManagement.fields.description.placeolder'
  )}`}
 
/>
<div  className="flex font-medium ">
{`${t('productManagement.fields.duration.label')}`}
<FormCheck className="ml-44">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              required
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3" className="font-medium">Life Time Warranty</FormCheck.Label>
          </FormCheck>

          </div> <div  className="grid gap-7 md:grid-cols-1">
        {checked && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="Duration" />                               
                              </InputGroup>
                              <FormSelect className="flex-1">
                                <FormInput type="text" placeholder="" />                               
                              </FormSelect>
          </div>
        )}
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
                      setWarrantyPreview(false)
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
              <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column Visibility
            </Button>

            <Menu>
              <Menu.Button
                as={Button}
                variant="facebook"
                className="flex items-center "
              >
                Export As <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
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
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Export to
                  PDF
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
            <FormInput
              type="text"
              className="box custom-input"
              placeholder="Search Warranty"
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
            />
          </div>
        </div>
        <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
          <Table bordered striped hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Name</Table.Th>
                <Table.Th className="whitespace-nowrap">Description</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8">Duration</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8 text-center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Six </Table.Td>
                <Table.Td>Warranty Not Valid for; unusual</Table.Td>
                <Table.Td>1 Months</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm" onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setEditWarrantyPreview(true) 
            }}
          >
    <Dialog
              size="lg"
              open={editWarrantyPreview}
              onClose={() => {
                setEditWarrantyPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.editWarranty.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditWarrantyPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'productManagement.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
           <TextareaElement
  label={`${t('productManagement.fields.description.label')}`}
  register={register}
  name="description"
  id="description"
  placeholder={`${t(
    'productManagement.fields.description.placeolder'
  )}`}
 
/>
<div  className="flex font-medium ">
{`${t('productManagement.fields.duration.label')}`}
<FormCheck className="ml-44">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              required
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3" className="font-medium">Life Time Warranty</FormCheck.Label>
          </FormCheck>

          </div> <div  className="grid gap-7 md:grid-cols-1">
        {checked && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="Duration" />                               
                              </InputGroup>
                              <FormSelect className="flex-1">
                                <FormInput type="text" placeholder="" />                               
                              </FormSelect>
          </div>
        )}
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
                      setEditWarrantyPreview(false)
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
                 
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Six </Table.Td>
                <Table.Td>Warranty Not Valid for; unusual</Table.Td>
                <Table.Td>1 Months</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm" onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setEditWarrantyPreview(true) 
            }}
          >
    <Dialog
              size="lg"
              open={editWarrantyPreview}
              onClose={() => {
                setEditWarrantyPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.editWarranty.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditWarrantyPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'productManagement.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
           <TextareaElement
  label={`${t('productManagement.fields.description.label')}`}
  register={register}
  name="description"
  id="description"
  placeholder={`${t(
    'productManagement.fields.description.placeolder'
  )}`}
 
/>
<div  className="flex font-medium ">
{`${t('productManagement.fields.duration.label')}`}
<FormCheck className="ml-44">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              required
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3" className="font-medium">Life Time Warranty</FormCheck.Label>
          </FormCheck>

          </div> <div  className="grid gap-7 md:grid-cols-1">
        {checked && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="Duration" />                               
                              </InputGroup>
                              <FormSelect className="flex-1">
                                <FormInput type="text" placeholder="" />                               
                              </FormSelect>
          </div>
        )}
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
                      setEditWarrantyPreview(false)
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
    </div>
  )
}

export default Main
