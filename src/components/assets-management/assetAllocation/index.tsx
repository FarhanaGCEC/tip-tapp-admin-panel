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
import { DateElement } from '../../common/form-elements'

function AddAsset() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [date, setDate] = useState('')

  const schema = yup
    .object({
      asset: yup
        .string()
        .required(
          `${t(
            'assets.fields.asset.validationMessage'
          )}`
        ),
        allocatedTo: yup
        .string()
        .required(
          `${t(
            'assets.fields.allocatedTo.validationMessage'
          )}`
        ),
        quantity: yup
        .string()
        .required(
          `${t(
            'assets.fields.quantity.validationMessage'
          )}`
        ),
        allocatedFrom: yup
        .string()
        .required(
          `${t(
            'assets.fields.allocatedFrom.validationMessage'
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



  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5 py-5">
     
    
          <div className="grid grid-cols-1 gap-7 mb-7 md:grid-cols-2">
        
          <InputElement
            label={`${t('assets.fields.allocationCode.label')}`}
            register={register}
            name="allocationCode"
            id="allocationCode"
            info={`${t('assets.fields.allocationCode.tooltip')}`}
          />
         
          <SelectElement
            label={`${t('assets.fields.asset.label')}`}
            register={register}
            name="asset"
            id="asset"
            error={errors.asset}
            required
          />
         <SelectElement
            label={`${t('assets.fields.allocatedTo.label')}`}
            register={register}
            name="allocatedTo"
            id="allocatedTo"
            error={errors.allocatedTo}
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
          <DateElement
            label={`${t('assets.fields.allocatedFrom.label')}`}
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
            name="allocatedFrom"
            id="allocatedFrom"
          />
          <DateElement
            label={`${t('assets.fields.allocatedUpto.label')}`}
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
            name="allocatedUpto"
            id="allocatedUpto"
          />
    

<TextareaElement
            label={`${t('assets.fields.reason.label')}`}
            register={register}
            name="reason"
            id="reason"
          />
        </div>
      </div>
   
               <div className=" mt-5 flex justify-end">
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
    </form>
  )
}

export default AddAsset
