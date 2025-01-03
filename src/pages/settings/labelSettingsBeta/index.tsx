/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../../components/common/button'
import {SelectElement, InputElement, TextareaElement } from '../../../components/common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../../components/common/loading-icon'
import { FormCheck } from '../../../components/common/form-elements/components'
import Table from '../../../components/common/table'
import Tippy from '../../../components/common/tippy'
import Lucide from '../../../components/common/lucide'

function AddNew() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      name: yup
        .string()
        .required(`${t('settings.fields.labelType.validationMessage')}`),
        selectYourLabelDesignMillimeter: yup
        .string()
        .required(`${t('settings.fields.selectYourLabelDesignMillimeter.validationMessage')}`),
        additionalTopMarginMillimeter: yup
        .string()
        .required(`${t('settings.fields.additionalTopMarginMillimeter.validationMessage')}`),
        additionalLeftMarginMillimeter: yup
        .string()
        .required(`${t('settings.fields.additionalLeftMarginMillimeter.validationMessage')}`),
        widthPaperMillimeter: yup
        .string()
        .required(`${t('settings.fields.widthPaperMillimeter.validationMessage')}`),
        heightPaper: yup
        .string()
        .required(`${t('settings.fields.heightPaperMillimeter.validationMessage')}`),
        stickersOneRow: yup
        .string()
        .required(`${t('settings.fields.stickersOneRow.validationMessage')}`),
        distanceBetweenTwoRowsMillimeter: yup
        .string()
        .required(`${t('settings.fields.distanceBetweenTwoRowsMillimeter.validationMessage')}`),
        distanceBetweenTwoColoumnsMillimeter: yup
        .string()
        .required(`${t('settings.fields.distanceBetweenTwoColoumnsMillimeter.validationMessage')}`),
        noOfStickerMillimeter: yup
        .string()
        .required(`${t('settings.fields.noOfStickerMillimeter.validationMessage')}`),
        font: yup
        .string()
        .required(`${t('settings.fields.font.validationMessage')}`),
        order: yup
        .string()
        .required(`${t('settings.fields.order.validationMessage')}`),
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
  const [checked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked(!checked)
  }
  const [tooltipContent1] = useState(
    'If `Jewelry label design` is active, it takes precedence over other settings, like the barcode order. Please consider this when using the feature'
  )

  return (
    <div>
   <div className="intro-y mt-4 flex flex-col sm:flex-row items-center">
  <div className="flex flex-grow items-center">
    <h2 className="ml-2 text-lg font-medium">
    Add Label Sticker Setting
    </h2>
    <div className="text-sm text-slate-500 mt-0.5" style={{ marginLeft: '10px' }}>
      <span><Button
      size='sm'
            variant="facebook"
            className=" mr-1 w-12 "
          >
       Beta
          </Button></span>
    </div>
  </div>

</div>
<div className="intro-y box mb-5 mt-5 px-5 py-10 ">
        <div className="mb-7 grid grid-cols-1 gap-7 md:grid-cols-2">
          <InputElement
            label={`${t('settings.fields.labelType.label')}`}
            register={register}
            required
            name="labelType"
            id="labelType"
            error={errors.labelType}
          />
          <SelectElement
            label={`${t('settings.fields.selectYourLabelDesign.label')}`}
            register={register}
            name="selectYourLabelDesign"
            id="selectYourLabelDesign"
            required
            error={errors.selectYourLabelDesign}
          />
          <TextareaElement
            label={`${t('settings.fields.stickerDescription.label')}`}
            register={register}
            name="stickerDescription"
            id="stickerDescription"
          />
          <FormCheck className="mt-5">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 <div className="mr-2 font-medium">{`${t('settings.fields.continousFeedRolls.label')}`}</div>
</FormCheck.Label>
</FormCheck>
          </div>
        <div className="mt-7 grid grid-cols-1 gap-7 mb-5 md:grid-cols-2">
        
           <InputElement
            label={`${t('settings.fields.additionalTopMarginMillimeter.label')}`}
            register={register}
            name="additionalTopMarginMillimeter"
            id="additionalTopMarginMillimeter"
            required
            error={errors.additionalTopMarginMillimeter}
          />
          <InputElement
            label={`${t('settings.fields.additionalLeftMarginMillimeter.label')}`}
            register={register}
            name="additionalLeftMarginMillimeter"
            id="additionalLeftMarginMillimeter"
            required
            error={errors.additionalLeftMarginMillimeter}
          />
          <InputElement
            label={`${t('settings.fields.additionalRightMarginMillimeter.label')}`}
            register={register}
            name="additionalRightMarginMillimeter"
            id="additionalRightMarginMillimeter"
            required
            error={errors.additionalRightMarginMillimeter}
          />
          <InputElement
            label={`${t('settings.fields.widthPaperMillimeter.label')}`}
            register={register}
            name="widthPaperMillimeter"
            id="widthPaperMillimeter"
            required
            error={errors.widthPaperMillimeter}
          />
           <InputElement
            label={`${t('settings.fields.heightPaperMillimeter.label')}`}
            register={register}
            name="heightPaperMillimeter"
            id="heightPaperMillimeter"
            required
            error={errors.heightPaperMillimeter}
          />
          <InputElement
            label={`${t('settings.fields.stickersOneRow.label')}`}
            register={register}
            name="stickersOneRow"
            id="stickersOneRow"
            required
            error={errors.stickersOneRow}
          />
           
           <InputElement
            label={`${t('settings.fields.distanceBetweenTwoRowsMillimeter.label')}`}
            register={register}
            name="distanceBetweenTwoRowsMillimeter"
            id="distanceBetweenTwoRowsMillimeter"
            required
            error={errors.distanceBetweenTwoRowsMillimeter}
          />
          <InputElement
            label={`${t('settings.fields.distanceBetweenTwoColoumnsMillimeter.label')}`}
            register={register}
            name="distanceBetweenTwoColoumnsMillimeter"
            id="distanceBetweenTwoColoumnsMillimeter"
            required
            error={errors.distanceBetweenTwoColoumnsMillimeter}
          />
          <InputElement
            label={`${t('settings.fields.noOfSticker.label')}`}
            register={register}
            name="noOfSticker"
            id="noOfSticker"
            required
            error={errors.noOfSticker}
          />
          <FormCheck className="mt-5">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 <div className="mr-2 font-medium">{`${t('settings.fields.setdefault.label')}`}</div>
</FormCheck.Label>
</FormCheck>
        </div>
      
        
               
      
      </div>
      <div className="intro-y box px-5 mb-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('settings.fields.stickerDesignDetails.title')}`}</h2>
                  </div>
       
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 py-5 ">
          
          <SelectElement
            label={`${t(
              'settings.fields.font.label'
            )}`}
            required
            register={register}
            name="font"
            id="font"
            error={errors.font}
          />
          
        
          
          
        </div>
        <div className="intro-y mb-3  overflow-x-auto ">
    <Table striped>
        <Table.Thead variant="default">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap"></Table.Th>
                <Table.Th className="whitespace-nowrap">
                {`${t(
              'settings.fields.order.label'
            )}`}
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                {`${t(
              'settings.fields.fontSize.label'
            )}`}
            
                </Table.Th>
                
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        <Table.Tr>
                <Table.Td>          
                  <FormCheck className="">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 Product Name
</FormCheck.Label>
</FormCheck>
</Table.Td>
                <Table.Td>
                  <SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
                <Table.Td><SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>
                <FormCheck className="">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 Product Variation (recommended)
</FormCheck.Label>
</FormCheck></Table.Td>
                <Table.Td>
                  <SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
                <Table.Td><SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td><FormCheck className="">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 Product Price
</FormCheck.Label>
</FormCheck></Table.Td>
                <Table.Td>
                  <SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
                <Table.Td><SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td><FormCheck className="">

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 Business Name
</FormCheck.Label>
</FormCheck></Table.Td>
                <Table.Td>
                  <SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
                <Table.Td><SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>
                <div className="flex ">Barcode <Tippy content={tooltipContent1} className="ml-2 mt-0.5">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></div>
                </Table.Td>
                <Table.Td>
                  <SelectElement
            register={register}
            name="font"
            id="font"
          /></Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
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
    </div>
  )
}

export default AddNew
