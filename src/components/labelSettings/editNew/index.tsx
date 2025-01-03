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
import Button from '../../common/button'
import { InputElement, TextareaElement } from '../../common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import { FormCheck } from '../../common/form-elements/components'

function EditNew() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      name: yup
        .string()
        .required(`${t('settings.fields.labelType.validationMessage')}`),
        stickerSheetSettingName: yup
        .string()
        .required(`${t('settings.fields.stickerSheetSettingName.validationMessage')}`),
        additionalTopMargin: yup
        .string()
        .required(`${t('settings.fields.additionalTopMargin.validationMessage')}`),
        additionalLeftMargin: yup
        .string()
        .required(`${t('settings.fields.additionalLeftMargin.validationMessage')}`),
        widthSticker: yup
        .string()
        .required(`${t('settings.fields.widthSticker.validationMessage')}`),
        heightSticker: yup
        .string()
        .required(`${t('settings.fields.heightSticker.validationMessage')}`),
        widthPaper: yup
        .string()
        .required(`${t('settings.fields.widthPaper.validationMessage')}`),
        heightPaper: yup
        .string()
        .required(`${t('settings.fields.heightPaper.validationMessage')}`),
        stickersOneRow: yup
        .string()
        .required(`${t('settings.fields.stickersOneRow.validationMessage')}`),
        distanceBetweenTwoRows: yup
        .string()
        .required(`${t('settings.fields.distanceBetweenTwoRows.validationMessage')}`),
        distanceBetweenTwoColoumns: yup
        .string()
        .required(`${t('settings.fields.distanceBetweenTwoColoumns.validationMessage')}`),
        noOfSticker: yup
        .string()
        .required(`${t('settings.fields.noOfSticker.validationMessage')}`),
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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box  px-5 py-10">
        <div className="mb-7 grid grid-cols-1 gap-7 md:grid-cols-2">
          <InputElement
            label={`${t('settings.fields.labelType.label')}`}
            register={register}
            required
            name="labelType"
            id="labelType"
            error={errors.labelType}
          />
          <InputElement
            label={`${t('settings.fields.stickerSheetSettingName.label')}`}
            register={register}
            name="stickerSheetSettingName"
            id="stickerSheetSettingName"
            required
            error={errors.stickerSheetSettingName}
          />
          <TextareaElement
            label={`${t('settings.fields.stickerSheetSettingDescription.label')}`}
            register={register}
            name="stickerSheetSettingDescription"
            id="stickerSheetSettingDescription"
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
        <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
        <InputElement
            label={`${t('settings.fields.additionalTopMargin.label')}`}
            register={register}
            name="additionalTopMargin"
            id="additionalTopMargin"
            required
            error={errors.additionalTopMargin}
          />
           <InputElement
            label={`${t('settings.fields.additionalLeftMargin.label')}`}
            register={register}
            name="additionalLeftMargin"
            id="additionalLeftMargin"
            required
            error={errors.additionalLeftMargin}
          />
          <InputElement
            label={`${t('settings.fields.widthSticker.label')}`}
            register={register}
            name="widthSticker"
            id="widthSticker"
            required
            error={errors.widthSticker}
          />
           <InputElement
            label={`${t('settings.fields.heightSticker.label')}`}
            register={register}
            name="heightSticker"
            id="heightSticker"
            required
            error={errors.heightSticker}
          />
          <InputElement
            label={`${t('settings.fields.widthPaper.label')}`}
            register={register}
            name="widthPaper"
            id="widthPaper"
            required
            error={errors.widthPaper}
          />
           <InputElement
            label={`${t('settings.fields.heightPaper.label')}`}
            register={register}
            name="heightPaper"
            id="heightPaper"
            required
            error={errors.heightPaper}
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
            label={`${t('settings.fields.distanceBetweenTwoRows.label')}`}
            register={register}
            name="distanceBetweenTwoRows"
            id="distanceBetweenTwoRows"
            required
            error={errors.distanceBetweenTwoRows}
          />
          <InputElement
            label={`${t('settings.fields.distanceBetweenTwoColoumns.label')}`}
            register={register}
            name="distanceBetweenTwoColoumns"
            id="distanceBetweenTwoColoumns"
            required
            error={errors.distanceBetweenTwoColoumns}
          />
          <InputElement
            label={`${t('settings.fields.noOfSticker.label')}`}
            register={register}
            name="noOfSticker"
            id="noOfSticker"
            required
            error={errors.noOfSticker}
          />
          
        </div>
      
        
               
        <div className="mt-9 flex justify-end">
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
      </div>
    </form>
  )
}

export default EditNew
