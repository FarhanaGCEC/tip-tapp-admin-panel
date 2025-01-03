/* eslint-disable prettier/prettier */
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
  DateElement,
} from '../../common/form-elements'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import Alert from '../../../base-components/Alert'

function Card() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [date, setDate] = useState('')

  const schema = yup
    .object({
    })

  const {
    register,
    handleSubmit,
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
  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box p-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
       
            <InputElement
              label={`${t('cardButton.fields.cardNumber.label')}`}
              register={register}
              name="cardNumber"
              id="cardNumber"
            />
            <InputElement
              label={`${t('cardButton.fields.cardHolderName.label')}`}
              register={register}
              name="cardHolderName"
              id="cardHolderName"
            />
            <InputElement
              label={`${t('cardButton.fields.cardTransactionNo.label')}`}
              register={register}
              name="cardTransactionNo"
              id="cardTransactionNo"
            />
            <SelectElement
              label={`${t('cardButton.fields.cardType.label')}`}
              register={register}
              name="cardType"
              id="cardType"
            />
              <DateElement
            label={`${t('cardButton.fields.period.label')}`}
            value={date}
            onChange={setDate}
            options={{
              autoApply: false,
              showWeekNumbers: true,
              
              dropdowns: {
                minYear: 2020,
                maxYear: 2100,
                months: true,
                years: true,
                date: false,
              },
            }}
            name="period"
            id="period"
          /> 
            <InputElement
              label={`${t('cardButton.fields.securityCode.label')}`}
              register={register}
              name="securityCode"
              id="securityCode"

            />
            <Alert variant="soft-primary" className="mb-2">
            <div className="mr-2">
            {`${t('cardButton.fields.PaymentFee.label')}`} : <strong>{'Rs:10,000.00 '}</strong>
          </div>
</Alert>
            

          </div>
      </div>
      <div className="mt-5 flex justify-end">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-54">
            {`${t('common.button.finalizedPayment')}`}
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

export default Card