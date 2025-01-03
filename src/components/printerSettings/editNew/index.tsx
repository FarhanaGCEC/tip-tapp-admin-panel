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
import Button from '../../common/button'
import Lucide from '../../common/lucide'
import {SelectElement, InputElement } from '../../common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'

function EditNew() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      printerName: yup
        .string()
        .required(`${t('settings.fields.printerName.validationMessage')}`),
        connectionType: yup
        .string()
        .required(`${t('settings.fields.connectionType.validationMessage')}`),
        capabilityProfile: yup
        .string()
        .required(`${t('settings.fields.capabilityProfile.validationMessage')}`),
        charactersLine: yup
        .string()
        .required(`${t('settings.fields.charactersLine.validationMessage')}`),
        iP: yup
        .string()
        .required(`${t('settings.fields.iP.validationMessage')}`),
        port: yup
        .string()
        .required(`${t('settings.fields.port.validationMessage')}`),
       

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
      <div className="intro-y box px-5 py-10">
        <div className="mb-12 grid grid-cols-1 gap-7 md:grid-cols-2">
          <InputElement
            label={`${t('settings.fields.printerName.label')}`}
            placeholder={`${t('settings.fields.printerName.placeolder')}`}
            register={register}
            required
            name="printerName"
            id="printerName"
            error={errors.printerName}
          />
          <SelectElement
            label={`${t('settings.fields.connectionType.label')}`}
            register={register}
            name="connectionType"
            id="connectionType"
            required
            error={errors.connectionType}
          />
          <SelectElement
            label={`${t('settings.fields.capabilityProfile.label')}`}
            info={`${t('settings.fields.capabilityProfile.tooltip')}`}
            register={register}
            name="capabilityProfile"
            id="capabilityProfile"
            required
            error={errors.capabilityProfile}
          />
        <InputElement
            label={`${t('settings.fields.charactersLine.label')}`}
            register={register}
            name="charactersLine"
            id="charactersLine"
            required
            error={errors.charactersLine}
          />
           <InputElement
            label={`${t('settings.fields.iP.label')}`}
            placeholder={`${t('settings.fields.iP.placeolder')}`}
            register={register}
            name="iP"
            id="iP"
            required
            error={errors.iP}
          />
          <InputElement
            label={`${t('settings.fields.port.label')}`}
            info={`${t('settings.fields.port.tooltip')}`}
            register={register}
            name="port"
            id="port"
            required
            error={errors.port}
          />
          
        </div>
        <div className="flex items-center ">
                  <span>
                    <Lucide icon="AlertCircle" className="w-5 h-5 text-danger" />
                  </span>
                  <div className="ml-2">
                    <span className="mr-1 font-medium">
                    Connection Type Windows: 
                    </span>
                    <span className="mr-1 text-slate-500">
                    The device files will be along the lines of LPT1 (parallel) or COM1 (serial).
                    </span>
                  </div>
                </div>
                <div className="flex mt-5 items-center ">
                  <span>
                    <Lucide icon="AlertCircle" className="w-5 h-5 text-danger" />
                  </span>
                  <div className="ml-2">
                    <span className="mr-1 font-medium">
                    Connection Type Linux : 
                    </span>
                    <span className="mr-1 text-slate-500">
                    Your printer device file will be somewhere like /dev/lp0 (parallel), /dev/usb/lp1 (USB), /dev/ttyUSB0 (USB-Serial), /dev/ttyS0 (serial).
                    </span>
                  </div>
                </div>
               
        <div className="mt-9 flex justify-end">
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

export default EditNew
