/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useState, useRef } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../../components/common/button'
import { InputElement, SelectElement } from '../../../components/common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../../components/common/loading-icon'
import {
  TextareaElement,
  DateElement,
  SearchSelectElement,
  ImageUploadElement,
} from '../../../components/common/form-elements'
import Lucide from '../../../components/common/lucide'
import { AlignmentTypes } from '../../../constants/common-enums'
import { Menu, Dialog } from '../../../components/common/headless'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import TomSelect from '../../../components/common/tom-select'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import {
  FormInput,
  FormCheck,
  InputGroup,
  FormSelect,
  FormLabel,
  FormInfo,
} from '../../../components/common/form-elements/components'
import Table from '../../../components/common/table'

function AddJobSheet() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      date: yup
        .string()
        .required(`${t('stockTransfer.fields.addStock.fields.date.validationMessage')}`),
        status: yup
        .string()
        .required(`${t('stockTransfer.fields.addStock.fields.status.validationMessage')}`),
        locationFrom: yup
        .string()
        .required(`${t('stockTransfer.fields.addStock.fields.locationFrom.validationMessage')}`),
        locationTo: yup
        .string()
        .required(`${t('stockTransfer.fields.addStock.fields.locationTo.validationMessage')}`),
        role: yup
  .string()
  .required(`${t('stockTransfer.fields.addStock.fields.date.validationMessage')}`),
  otherwise: yup.string().notRequired(),

        prefix: yup.string().when('_', {
        is: () => 'tooltip',
        then: yup
          .string()
          .required(`${t('customerForm.fields.prefix.tooltip')}`),
          otherwise: yup.string().notRequired(),
      }),
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


  const [date, setDate] = useState('')


  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [checkedPickUp, setCheckedPickUp] = useState(false);
  const [checkedOnSite, setCheckedOnSite] = useState(false);

  const handlePickUpChange = () => {
    setCheckedPickUp(!checkedPickUp);
    if (!checkedPickUp) {
      // If Pick Up is checked, uncheck On Site
      setCheckedOnSite(false);
    }
  };

  const handleOnSiteChange = () => {
    setCheckedOnSite(!checkedOnSite);
    if (!checkedOnSite) {
      // If On Site is checked, uncheck Pick Up
      setCheckedPickUp(false);
    }
  }
  const [showMoreInfo2, setShowMoreInfo2] = useState(false)
  const handleMoreInfoClick2 = () => {
    setShowMoreInfo2(!showMoreInfo2)
  }
  const [select, setSelect] = useState('1')
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              Add Stock Transfer
              <Button
            variant="twitter"
            className="intro-y mx-1 h-7 w-7 rounded-full"
          >
            ?
          </Button> 
              </h2>
            </h2>
            
          </div>
          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      {/* <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.addJobSheet.fields.details1.label')}`}
                  </h2>
      </div> */}
<div className="grid grid-cols-1 gap-7 mt-3 md:grid-cols-2 mb-3">
<DateElement
            label={`${t('stockTransfer.fields.addStock.fields.date.label')}`}
            value={date}
            
            onChange={setDate}
            options={{
              autoApply: false,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }}
            error={errors.date}
            required
            name="date"
            id="date"
          />
          <InputElement
            label={`${t('stockTransfer.fields.addStock.fields.referenceNo.label')}`}
            register={register}
            name="referenceNo"
            id="referenceNo"

          />
<SelectElement
            label={`${t('stockTransfer.fields.addStock.fields.status.label')}`}
            register={register}
            name="status"
            id="status"
            error={errors.status}
            required
            info={`${t('stockTransfer.fields.addStock.fields.status.tooltip')}`}
          />
        <SelectElement
             label={`${t('stockTransfer.fields.addStock.fields.locationFrom.label')}`}
            register={register}
            name="locationFrom"
            id="locationFrom"
            error={errors.locationFrom}
            required
            
          />
          <SelectElement
           label={`${t('stockTransfer.fields.addStock.fields.locationTo.label')}`}
            register={register}
            name="locationTo"
            id="locationTo"
            error={errors.locationTo}
            required
          />

          
        </div>

      </div>
     
<div className="intro-y box mb-5 px-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('stockTransfer.fields.addStock.fields.searchProduct.title')}`}
                  </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-7 mt-5 md:grid-cols-1 ">
                        <div className="relative flex sm:mt-0 sm:w-auto">
                          <FormInput
                            type="text"
                            className="box custom-input"
                            placeholder="Search Product for Stock Transfer"
                          />
                          <Lucide
                            icon="Search"
                            className="absolute inset-y-0 right-0 my-auto mr-18 h-5 w-8"
                          />

                        </div>
                        <div className="overflow-y-auto overflow-x-scroll ">
                          <Table bordered>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Products
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                               Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                               Sub Total
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
  <div className="flex justify-center items-center">
    <a>
      {' '}
      <Lucide
        icon="Trash2"
        className=" h-4 w-4"
      />{' '}
    </a>
  </div>
</Table.Th>

                               
                               
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  Test111 (77006)
                                </Table.Td>
                                <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
                               
                                <Table.Td className=" text-slate-500 flex justify-center items-center">
                                  <a
                                    href=""
                                    onChange={handleChange}
                                    onClick={(event: {
                                      preventDefault: () => void
                                    }) => {
                                      event.preventDefault()
                                      setDeleteConfirmationModal(true)
                                    }}
                                  >
                                    <Lucide icon="Trash2" className="h-4 w-4" />
                                  </a>
                                </Table.Td>
         
                              </Table.Tr>
           
                            </Table.Tbody>
                            <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                               
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                              
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 text-right !px-2 text-slate-500 dark:bg-darkmode-800">
                                Total Amount: 0.00
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">

</Table.Th>

                               
                               
                              </Table.Tr>
                            </Table.Thead>
                          </Table>

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
                                <div className="mt-5 text-3xl">
                                  Are you sure?
                                </div>
                                <div className="mt-2 text-slate-500">
                                  Do you really want to delete these records?{' '}
                                  <br />
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
                        </div>
 </div> 
        
          
      </div>

      <div className="intro-y box mb-5 px-5 py-5">
      <div className=" lg:mt-0 lg:text-right grid grid-cols-1 gap-7 md:grid-cols-2">
      <InputElement
            label={`${t('stockTransfer.fields.addStock.fields.shippingCharges.label')}`}
            register={register}
            name="shippingCharges"
            id="shippingCharges"
            type="number"

          />
      <TextareaElement
                                  label={`${t(
                                    'stockTransfer.fields.allStock.fields.additionalNotes.label'
                                  )}`}
                                  register={register}
                                  name="additionalNotes"
                                 
                                  id="additionalNotes"
                                />{' '}
</div>
</div>
       <div className=" flex justify-end">


          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.save')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>
        </div>
    </form>
  )
}

export default AddJobSheet
