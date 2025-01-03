/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import { SetStateAction, useState,useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  SearchSelectElement,
  SelectElement,
  InputElement,
} from '../../common/form-elements'
import {
  FormInput,
  InputGroup,
  Litepicker,
} from '../../common/form-elements/components'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import UploadFilesElement from '../../common/form-elements/upload-files-element'
import Table from '../../common/table'
import Lucide from '../../common/lucide'
import { Menu, Dialog } from '../../common/headless'

function AddPurchaseReturn() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      supplier: yup
        .string()
        .required(
          `${t(
            'purchases.fields.supplier.validationMessage'
          )}`
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

  const successHandlerCreateTax = (tax: any, message: string) => {
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

  const createTax = async (tax: any) => {
    setIsLoading(true)
    const res = await posApi.createShipping(tax)
    if (res) {
      const { data } = res
      const { message, data: tax } = data
      successHandlerCreateTax(tax, message)
    } else {
      errorHandler(null)
    }
  }
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createTax(data)
  }
  //   const { t } = useTranslation('pos')
  const [selectedOption, setSelectedOption] = useState('')
  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedOption(event.target.value)
  }
  const handleChange = () => { }
  const [daterange, setDaterange] = useState('')

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y mb-5 box p-5">

        <div className="grid gap-7 mb-5 md:grid-cols-2">
        <SearchSelectElement
         label={`${t('purchases.fields.supplier.label')}`}
                  register={register}
                  name="supplier"
                  id="supplier"
                  onChange={handleChange}
                  error={errors.supplier}
                  iconLeft={Icons.USER}
                  required
                />
                <SelectElement
         label={`${t('purchases.fields.businessLocation.label')}`}
                  register={register}
                  name="businessLocation"
                  id="businessLocation"
                />
                <InputElement
         label={`${t('purchases.fields.referenceNo.label')}`}
                  register={register}
                  name="referenceNo"
                  id="referenceNo"
                />
                
                <div className="font-medium flex">
                <div className="font-medium mt-2.5">
                    {`${t(
                        'purchases.fields.dateRange.label'
                      )}`}{' '}
</div>
                      {/* <Lucide
                        icon="Calendar"
                        className="absolute inset-y-0 left-0 z-10 my-auto ml-4 h-4 w-4"
                      /> */}
                      
                      <Litepicker
                      
                        value={daterange}
                        onChange={setDaterange}
                        options={{
                          autoApply: false,
                          singleMode: false,
                          numberOfColumns: 2,
                          numberOfMonths: 2,
                          showWeekNumbers: true,
                          dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: true,
                            years: true,
                          },
                        }}
                        className="!box ml-20  sm:w-auto"
                      />
        </div>  
        <UploadFilesElement
            id="attach_document"
            name="attach_document"
            register={register}
            label={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.label'
            )}`}
            variant="primary"
            btnLabel={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.placeolder'
            )}`}
            error={errors.attach_document}
            info={`${t(
              'repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.tooltip'
            )}`}
          />
        
        </div>
      
      </div>
      <div className="intro-y box  p-5">
      <div className="flex flex-col border-b  font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('purchases.fields.searchProducts.title')}`}
                  </h2>
                  </div>
        <div>     
        <div className="grid grid-cols-1 gap-7 mt-5 md:grid-cols-1 ">
                        <div className="relative flex sm:mt-0 sm:w-auto">
                          <FormInput
                            type="text"
                            className="box custom-input"
                            placeholder="Seacrh product"
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
                                Product
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Lot Number
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                EXP Date
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                               Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Unit Price
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Subtotal
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                  <a>
                                    {' '}
                                    <Lucide
                                      icon="Trash2"
                                      className="ml-2 h-4 w-4"
                                    />{' '}
                                  </a>
                                </Table.Th>
                               
                               
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Td className="!px-4">1 </Table.Td>
                                <Table.Td className="!px-4">
                                  Test111 (77006)
                                </Table.Td>
                                <Table.Td className="!px-4">
                                  2023.01.11
                                </Table.Td>
                                <Table.Td className="!px-4">
                                11
                                </Table.Td>
                                <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
                                <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
                                {/* <Table.Td className="!px-4">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" />
                                  </InputGroup>
                                </Table.Td> */}
                                <Table.Td className="!pl-4 text-slate-500">
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
                            {/* <Table.Thead variant="default">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                              
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                              
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                               
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                              
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                              
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                Total Amount: 0.00
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                                 
                                </Table.Th>
                               
                               
                              </Table.Tr>
                            </Table.Thead> */}
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
                        <div className="grid gap-7 mb-5 md:grid-cols-2">
                        <SearchSelectElement
         label={`${t('purchases.fields.purchaseTax.label')}`}
                  register={register}
                  name="purchaseTax"
                  id="purchaseTax"
                  onChange={handleChange}
                />
                <div className="flex justify-end mt-2.5 font-medium">  {`${t('Total Amount')}`} : {' Rs. 0.00' }</div>
              
                        </div>
 </div> 
          </div> 
              
       
      </div>
      <div className="flex justify-end mt-7 text-center">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.submit')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>
          <Button
            variant="secondary"
            className="mb-2 mr-1 w-24"
            onClick={handleSlider}
          >
            {`${t('common.button.cancel')}`}
          </Button>
        </div>
    </form>
  )
}

export default AddPurchaseReturn
