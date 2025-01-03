/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import { FormCheckElement, InputElement } from '../../common/form-elements'
import LoadingIcon from '../../common/loading-icon'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import { FormLabel } from '../../common/form-elements/components'
import Lucide from '../../common/lucide'
import { AlignmentTypes } from '../../../constants/common-enums'

function Discount() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      discount_type: yup
        .string()
        .required(`${t('discountForm.fields.discountType.validationMessage')}`),
      discount_amount: yup
        .string()
        .required(
          `${t('discountForm.fields.discountAmount.validationMessage')}`
        ),
      redeem_points: yup
        .string()
        .required(`${t('discountForm.fields.redeemPoints.validationMessage')}`),
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

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const [inputList, setInputList] = useState([
    { gift_card_number: '', value: '' },
  ])

  const addComponent = () => {
    setInputList([...inputList, { gift_card_number: '', value: '' }])
  }

  const removeComponent = (index: number) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 p-5">
        <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
          <h2 className="mb-4 mr-auto text-base font-medium">
            {`${t('discountForm.subTitles.editDiscount.label')}`}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
          <div>
            <FormLabel className="font-medium" id="discount_type">
              {`${t('discountForm.fields.discountType.label')}`}
            </FormLabel>
            <FormCheckElement
              id="discount_type_1"
              name="discount_type"
              register={register}
              value={`${t(
                'discountForm.fields.discountType.values.percentage'
              )}`}
              type="radio"
            />
            <FormCheckElement
              id="discount_type_2"
              name="discount_type"
              register={register}
              value={`${t('discountForm.fields.discountType.values.fixed')}`}
              type="radio"
            />
          </div>
          <div>
            <InputElement
              info={`${t('discountForm.fields.discountAmount.tooltip')}`}
              register={register}
              name="discount_amount"
              placeholder={`${t(
                'discountForm.fields.discountAmount.placeolder'
              )}`}
              required
              id="discount_amount"
              error={errors.discount_amount}
              type="number"
              iconLeft={Icons.DOLLARSIGN}
              label={`${t('discountForm.fields.discountAmount.label')}`}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
        </div>
      </div>
      <div className="intro-y box mb-5 p-5">
        <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
          <h2 className="mb-4 mr-auto text-base font-medium">
            {`${t('discountForm.subTitles.loyalty.label')}`}
            <span className="text-slate-1000 ml-3 font-normal">{`${t(
              'discountForm.subTitles.loyalty.subLabel'
            )}`}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-5">
          <div className="mt-2 flex md:col-span-2">
            <FormLabel className="font-medium" id="redeemable_points">
              {`${t('discountForm.fields.redeemablePoints.label')}`}
            </FormLabel>
            <div className="ml-4 flex">
              <Lucide className="mr-1" icon={Icons.HEART} />
              <FormLabel className="mt-0.5 font-medium" id="redeemable_points">
                {`${t('discountForm.fields.redeemablePoints.placeolder')}`}
              </FormLabel>
            </div>
          </div>
          <div>
            <InputElement
              label={`${t('discountForm.fields.redeemPoints.label')}`}
              register={register}
              name="redeem_points"
              placeholder={`${t(
                'discountForm.fields.redeemPoints.placeolder'
              )}`}
              required
              id="redeem_points"
              error={errors.redeem_points}
              type="number"
              iconLeft={Icons.HEART}
              info={`${t('discountForm.fields.redeemPoints.tooltip')}`}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
          <div>
            <FormLabel className="font-medium" id="redeem_value">
              {`${t('discountForm.fields.redeemValue.label')}`}
            </FormLabel>
            <p className="mt-0 md:mt-2.5">{`${t(
              'discountForm.fields.redeemValue.placeolder'
            )}`}</p>
          </div>
        </div>
      </div>
      <div className="intro-y box mb-5 p-5">
        <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
          <h2 className="mb-4 mr-auto text-base font-medium">
            {`${t('discountForm.subTitles.promoCodeRedeem.label')}`}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2 md:w-1/2 md:pr-3">
            <FormLabel
              className="font-medium text-lime-700"
              id="scan_your_promo_code_here"
            >
              {`${t('discountForm.fields.scanYourPromoCodeHere.label')}`}
            </FormLabel>
            <InputElement
              register={register}
              name="scan_your_promo_code_here"
              id="scan_your_promo_code_here"
              error={errors.scan_your_promo_code_here}
              type="text"
              iconLeft={Icons.QRCODE}
            />
          </div>
          <div>
            <FormLabel className="font-medium" id="bill_discount">
              {`${t('discountForm.fields.billDiscount.label')}`}
            </FormLabel>
            <p className="mt-0 md:mt-2">{`${t(
              'discountForm.fields.billDiscount.placeolder'
            )}`}</p>
          </div>
          <div>
            <FormLabel className="font-medium" id="commission">
              {`${t('discountForm.fields.commission.label')}`}
            </FormLabel>
            <p className="text-slate-1000 -mt-3 text-xs">{`${t(
              'discountForm.fields.commission.hint'
            )}`}</p>
            <p className="mt-1">{`${t(
              'discountForm.fields.commission.placeolder'
            )}`}</p>
          </div>
        </div>
      </div>
      <div className="intro-y box mb-5 p-5">
        <div className="mb-4 flex flex-col border-b border-slate-200/100 text-base font-medium dark:border-darkmode-400">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-medium">
              {`${t('discountForm.subTitles.giftCardRedeem.label')}`}
            </h2>
            <div className="flex">
              <div className="mr-3 flex-initial pt-1">
                <FormLabel className="font-medium" id="add_gift_card">
                  {`${t('discountForm.fields.addGiftCard.label')}`}
                </FormLabel>
              </div>
              <div className="flex-initial">
                <Button
                  variant="primary"
                  className="mr-2 px-2"
                  onClick={addComponent}
                >
                  <span className="flex h-4 w-4 items-center justify-center">
                    <Lucide icon="Plus" className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {inputList.map((x, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="flex space-x-3 md:col-span-3">
                <div className="w-1/2 flex-initial content-end">
                  <InputElement
                    label={`${t('discountForm.fields.giftCardNumber.label')}`}
                    register={register}
                    name="gift_card_number"
                    id="gift_card_number"
                    error={errors.gift_card_number}
                    type="number"
                    iconLeft={Icons.GIFT}
                    labelAlignment={AlignmentTypes.BLOCK}
                  />
                </div>
                <div className="w-1/2 flex-initial content-end">
                  <InputElement
                    label={`${t('discountForm.fields.value.label')}`}
                    register={register}
                    name="value"
                    id="value"
                    disabled
                    error={errors.value}
                    type="number"
                    iconLeft={Icons.DOLLARSIGN}
                    labelAlignment={AlignmentTypes.BLOCK}
                  />
                </div>
                <div className="mt-8 flex-initial content-end">
                  <Button
                    onClick={() => removeComponent(i)}
                    className="flex items-center border-0 shadow-none"
                  >
                    <Lucide
                      icon={Icons.CLOSE}
                      className="h-4 w-4 text-danger"
                    />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-5 flex justify-end">
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

export default Discount
