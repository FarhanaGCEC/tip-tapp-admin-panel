import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  InputElement,
  SelectElement,
  TextareaElement,
} from '../../common/form-elements'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import { FormCheck } from '../../common/form-elements/components'

function Shipping() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      shipping_details: yup
        .string()
        .required(
          `${t('shippingForm.fields.shippingDetails.validationMessage')}`
        ),
      delivery_charges: yup
        .string()
        .required(
          `${t('shippingForm.fields.deliveryCharges.validationMessage')}`
        ),
      special_remark: yup
        .string()
        .required(
          `${t('shippingForm.fields.specialRemark.validationMessage')}`
        ),
      city: yup
        .string()
        .required(`${t('shippingForm.fields.city.validationMessage')}`),
      courier_company_cod: yup
        .string()
        .required(
          `${t('shippingForm.fields.courierCompanyCOD.validationMessage')}`
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
  const sucessHandlerCreateShipping = (shipping: any, message: string) => {
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
  const createShipping = async (shipping: any) => {
    setIsLoading(true)
    /* TODO: Remove after after set customer type */
    // eslint-disable-next-line no-param-reassign
    shipping.type = 'both'
    const res = await posApi.createShipping(shipping)
    if (res) {
      const { data } = res
      // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
      const { message, data: shipping } = data
      sucessHandlerCreateShipping(shipping, message)
    } else {
      errorHandler(null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createShipping(data)
  }

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box p-5">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <TextareaElement
            label={`${t('shippingForm.fields.shippingDetails.label')}`}
            register={register}
            required
            name="shipping_details"
            id="shipping_details"
            error={errors.shipping_details}
          />
          <TextareaElement
            label={`${t('shippingForm.fields.deliveryAddress.label')}`}
            register={register}
            name="delevery_address"
            id="delevery_address"
            error={errors.delevery_address}
          />
          <InputElement
            label={`${t('shippingForm.fields.deliveryCharges.label')}`}
            register={register}
            name="delivery_charges"
            required
            id="delivery_charges"
            error={errors.delivery_charges}
            type="number"
          />
          <SelectElement
            label={`${t('shippingForm.fields.shippingStatus.label')}`}
            register={register}
            name="shipping_status"
            id="shipping_status"
            error={errors.shipping_status}
          />
          <InputElement
            label={`${t('shippingForm.fields.deliveredTo.label')}`}
            register={register}
            name="delivery_to"
            id="delivery_to"
            error={errors.delivery_to}
            type="text"
          />
          <SelectElement
            label={`${t('shippingForm.fields.courierCompany.label')}`}
            register={register}
            name="courier_company"
            id="courier_company"
            error={errors.courier_company}
          />
          <InputElement
            label={`${t('shippingForm.fields.waybillNumber.label')}`}
            register={register}
            name="waybill_number"
            id="waybill_number"
            error={errors.waybill_number}
            type="text"
          />

          <FormCheck className="mb-2">
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3" className="font-medium">
              COD
            </FormCheck.Label>
          </FormCheck>
        </div>
        {checked && (
          <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
            <SelectElement
              label={`${t('shippingForm.fields.courierCompanyCOD.label')}`}
              register={register}
              name="courier_company_cod"
              id="courier_company_cod"
              error={errors.courier_company_cod}
              required
            />
            <SelectElement
              label={`${t('shippingForm.fields.city.label')}`}
              register={register}
              name="city"
              id="city"
              required
              error={errors.city}
            />
            <TextareaElement
              label={`${t('shippingForm.fields.specialRemark.label')}`}
              register={register}
              name="special_remark"
              id="special_remark"
              required
              error={errors.special_remark}
            />
          </div>
        )}
      </div>
      <div className="mt-5 flex justify-end">
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

export default Shipping
