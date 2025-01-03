/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import { SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  SelectElement,
  TextareaElement,
  DateElement,
  InputElement,
} from '../../common/form-elements'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import UploadFilesElement from '../../common/form-elements/upload-files-element'

function AddCustomerGroups() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      customerGroupName: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.customerGroups.fields.addCustomerGroups.fields.customerGroupName.validationMessage'
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

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box p-5">

        <div className="grid gap-7 mb-5 md:grid-cols-1">
        <InputElement
                label={`${t(
                  'contactManagement.fields.customerGroups.fields.addCustomerGroups.fields.customerGroupName.label'
                )}`}
                required
                error={errors.customerGroupName}
                register={register}
                name="customerGroupName"
                placeholder={`${t(
                  'contactManagement.fields.customerGroups.fields.addCustomerGroups.fields.customerGroupName.placeolder'
                )}`}
                id="customerGroupName"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.customerGroups.fields.addCustomerGroups.fields.percentage.label'
                )}`}
                register={register}
                name="percentage"
                placeholder={`${t(
                  'contactManagement.fields.customerGroups.fields.addCustomerGroups.fields.percentage.placeolder'
                )}`}
                info={`${t('contactManagement.fields.customerGroups.fields.addCustomerGroups.fields.percentage.tooltip')}`}
                id="percentage"
              />
        </div>
        <div className="flex justify-end  pb-7 text-center">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.save')}`}
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

export default AddCustomerGroups
