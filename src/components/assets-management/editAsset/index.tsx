/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import { InputElement, SelectElement, TextareaElement, } from '../../common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import Lucide from '../../common/lucide'
import { ImageUploadElement,DateElement } from '../../common/form-elements'
import { FormInfo, FormLabel,FormCheck, } from '../../common/form-elements/components'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import Table from '../../common/table'

function EditAsset() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [date, setDate] = useState('')

  const schema = yup
    .object({
      businessLocation: yup
        .string()
        .required(
          `${t(
            'assets.fields.businessLocation.validationMessage'
          )}`
        ),
        assetName: yup
        .string()
        .required(
          `${t(
            'assets.fields.assetName.validationMessage'
          )}`
        ),
        quantity: yup
        .string()
        .required(
          `${t(
            'assets.fields.quantity.validationMessage'
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
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleChange = () => {
    setShowMoreInfo(!showMoreInfo)
  }

  const [tableRows, setTableRows] = useState<Array<TableRow>>([
    { startDate: '', warrantyMonths: '', additionalCost: '', additionalNotes: '' },
  ]);
  
  type TableRow = {
    startDate: string;
    warrantyMonths: string;
    additionalCost: string;
    additionalNotes: string;
  }
  
  const handleAddRow = () => {
    const newTableRows = [...tableRows];
    newTableRows.push({ startDate: '', warrantyMonths: '', additionalCost: '', additionalNotes: '' });
    setTableRows(newTableRows);
  };
  
  const handleRemoveRow = (index: number) => {
    const newTableRows = [...tableRows];
    newTableRows.splice(index, 1);
    setTableRows(newTableRows);
  };

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5 py-5">
     
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('userManagement.fields.title')}`}
                  </h2>
      </div>
          <div className="grid grid-cols-1 gap-7 mb-7 md:grid-cols-2">
        
          <SelectElement
            label={`${t('assets.fields.businessLocation.label')}`}
            register={register}
            name="businessLocation"
            id="businessLocation"
            error={errors.businessLocation}
            required
            // info={`${t('customerForm.fields.prefix.tooltip')}`}
          />
         
          <InputElement
            label={`${t('assets.fields.assetCode.label')}`}
            register={register}
            name="assetCode"
            id="assetCode"

          />
         <InputElement
            label={`${t('assets.fields.assetName.label')}`}
            register={register}
            name="assetName"
            id="assetName"
            error={errors.assetName}
            required
          />
          <InputElement
            label={`${t('assets.fields.quantity.label')}`}
            register={register}
            name="quantity"
            id="quantity"
            error={errors.quantity}
            required
          />
          <InputElement
            label={`${t('assets.fields.modelNumber.label')}`}
            register={register}
            name="modelNumber"
            id="modelNumber"
          />
          <SelectElement
            label={`${t('assets.fields.assetCategory.label')}`}
            register={register}
            name="assetCategory"
            id="assetCategory"
          />
          <InputElement
            label={`${t('assets.fields.serialNumber.label')}`}
            register={register}
            name="serialNumber"
            id="serialNumber"
          />
          <DateElement
            label={`${t('assets.fields.purchaseDate.label')}`}
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
            name="purchaseDate"
            id="purchaseDate"
          />
          <SelectElement
            label={`${t('assets.fields.purchaseType.label')}`}
            register={register}
            name="purchaseType"
            id="purchaseType"
          />
          <InputElement
            label={`${t('assets.fields.unitPrice.label')}`}
            register={register}
            name="unitPrice"
            id="unitPrice"
          />
          <InputElement
            label={`${t('assets.fields.depreciation.label')}`}
            register={register}
            name="depreciation"
            id="depreciation"
          />
                  <FormCheck>

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 <div className=" font-medium">{`${t('assets.fields.isAllocatable.label')}`}</div>
</FormCheck.Label>
<FormInfo
      tooltip={`${t('assets.fields.isAllocatable.tooltip')}`}
    />
</FormCheck>     

<TextareaElement
            label={`${t('assets.fields.description.label')}`}
            register={register}
            name="depreciation"
            id="depreciation"
          />
        </div>
      </div>
      
      

     
        <div className="intro-y box mb-5 px-5 py-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-1 md:pl-10">
            <div className="intro-x flex items-center">
              <FormLabel>{`${t(
                'assets.fields.image.label'
              )}`}</FormLabel>
              <div className='ml-2'> <FormInfo 
      tooltip={`${t('assets.fields.image.tooltip')}`}
    /></div>
             
              <div className="ml-3 mb-2 mt-1 flex text-slate-600 dark:text-slate-500">
                <Lucide icon="Image" className="mr-1 h-4 w-4 " />
                {`${t('assets.fields.image.placeolder')}`}
              </div>
            </div>
            <div className="justify-start ">
              <ImageUploadElement
                image={productPlaceholder}
                alt={`${t('assets.fields.image.imageAlt')}`}
                removeImageContent="Remove this profile photo?"
                buttonLabel="Upload a Photo"
              />
            </div>
          </div>
              </div>
            </div>
            

            <div className="intro-y box mb-5 px-5 py-5">
            <div className="flex justify-between items-center border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
    <h2 className="text-base font-medium mb-4">Warranties</h2>
    <Button variant="primary" size="sm" rounded className="w-26 mb-4" onClick={handleAddRow}>
  Add More
  <Lucide icon="Plus" className="w-[14px] h-[14px] ml-2 text-white" />
</Button>

</div>
{/* 1st Table */}
      <div className="intro-y mb-5 overflow-x-auto ">
    <Table >
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Start Date</Table.Th>
                <Table.Th className="whitespace-nowrap">Warranty Months</Table.Th>
                <Table.Th className="whitespace-nowrap">Additional Cost</Table.Th>
                <Table.Th className="whitespace-nowrap">Additional Notes</Table.Th>
                <Table.Th className="whitespace-nowrap"></Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td> <DateElement
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
            name="purchaseDate"
            id="purchaseDate"
          /></Table.Td>
                <Table.Td> <InputElement
            register={register}
            name="WarrantyMonths"
            id="WarrantyMonths" /></Table.Td>
                <Table.Td><InputElement
            register={register}
            type='number'
            name="AdditionalCost"
            id="AdditionalCost"
          /></Table.Td>
                <Table.Td><TextareaElement
            register={register}
            name="AdditionalNotes"
            id="AdditionalNotes"
          /></Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            {tableRows.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.startDate}<DateElement
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
            name="purchaseDate"
            id="purchaseDate"
          /></Table.Td>
      <Table.Td>{row.warrantyMonths}<InputElement
            register={register}
            name="WarrantyMonths"
            id="WarrantyMonths" /></Table.Td>
      <Table.Td>{row.additionalCost}<InputElement
            register={register}
            type='number'
            name="AdditionalCost"
            id="AdditionalCost"
          /></Table.Td>
      <Table.Td>{row.additionalNotes}<TextareaElement
            register={register}
            name="AdditionalNotes"
            id="AdditionalNotes"
          /></Table.Td>
      <Table.Td>
        <a onClick={() => handleRemoveRow(index)}>
          <Lucide icon="Trash2" className="w-4 h-4" />
        </a>
      </Table.Td>
    </Table.Tr>
  ))}
        </Table.Tbody>
    </Table>
</div>

              </div>
   
               <div className=" mt-5 flex justify-end">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.update')}`}
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

export default  EditAsset
