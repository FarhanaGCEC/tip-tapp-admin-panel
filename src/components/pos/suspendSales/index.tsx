/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import Lucide from '../../common/lucide'

function SuspendSales() {
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
      <div className="intro-y col-span-12 lg:col-span-12">
        <div className="mt-5 grid grid-cols-12 gap-5">
          <div className="box zoom-in col-span-12 cursor-pointer p-5 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
            <div className="mt-3 text-slate-600 dark:text-slate-500">
              <div className="mt-2 flex items-center">
                <a className="flex  items-center text-primary" href="#">
                  <Lucide icon="CheckSquare" className="mr-2 h-4 w-4" />{' '}
                  Approval
                </a>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="Calendar" className="mr-2 h-4 w-4" />
                Date <strong> : 22.09.2023 </strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="User" className="mr-2 h-4 w-4" /> User{' '}
                <strong> : Jayawardena </strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="Layers" className="mr-2 h-4 w-4" /> Total Items{' '}
                <strong> : 1Pc(s)</strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="DollarSign" className="mr-2 h-4 w-4" /> Total{' '}
                <strong> : Rs.3,300.00 </strong>
              </div>
            </div>
            <div className=" mt-5 flex items-center justify-center border-t border-slate-200/60 p-2 dark:border-darkmode-400 lg:justify-end">
              <a className="mr-auto flex items-center text-primary" href="#">
                <Lucide icon="Eye" className="mr-1 h-4 w-4" /> View
              </a>
              <a className="mr-auto flex items-center" href="#">
                <Lucide icon="ArrowRightCircle" className="mr-1 h-4 w-4" /> Edit
              </a>
              <a className="flex items-center text-danger">
                <Lucide icon="Trash2" className="mr-1 h-4 w-4" /> Cancel
              </a>
            </div>
          </div>
          <div className="box zoom-in col-span-12 cursor-pointer p-5 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
            <div className="mt-3 text-slate-600 dark:text-slate-500">
              <div className="mt-2 flex items-center">
                <a className="flex  items-center text-primary" href="#">
                  <Lucide icon="CheckSquare" className="mr-2 h-4 w-4" />{' '}
                  Approval
                </a>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="Calendar" className="mr-2 h-4 w-4" />
                Date <strong> : 22.09.2023 </strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="User" className="mr-2 h-4 w-4" /> User{' '}
                <strong> : Jayawardena </strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="Layers" className="mr-2 h-4 w-4" /> Total Items{' '}
                <strong> : 1,000Pc(s)</strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="DollarSign" className="mr-2 h-4 w-4" /> Total{' '}
                <strong> : Rs.43,000.00 </strong>
              </div>
            </div>
            <div className=" mt-5 flex items-center justify-center border-t border-slate-200/60 p-2 dark:border-darkmode-400 lg:justify-end">
              <a className="mr-auto flex items-center text-primary" href="#">
                <Lucide icon="Eye" className="mr-1 h-4 w-4" /> View
              </a>
              <a className="mr-auto flex items-center" href="#">
                <Lucide icon="ArrowRightCircle" className="mr-1 h-4 w-4" /> Edit
              </a>
              <a className="flex items-center text-danger">
                <Lucide icon="Trash2" className="mr-1 h-4 w-4" /> Cancel
              </a>
            </div>
          </div>
          <div className="box zoom-in col-span-12 cursor-pointer p-5 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
            <div className="mt-3 text-slate-600 dark:text-slate-500">
              <div className="mt-2 flex items-center">
                <a className="flex  items-center text-primary" href="#">
                  <Lucide icon="CheckSquare" className="mr-2 h-4 w-4" />{' '}
                  Approval
                </a>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="Calendar" className="mr-2 h-4 w-4" />
                Date <strong> : 22.09.2023 </strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="User" className="mr-2 h-4 w-4" /> User{' '}
                <strong> : Jayawardena </strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="Layers" className="mr-2 h-4 w-4" /> Total Items{' '}
                <strong> : 1,000Pc(s)</strong>
              </div>
              <div className="mt-2 flex items-center">
                <Lucide icon="DollarSign" className="mr-2 h-4 w-4" /> Total{' '}
                <strong> : Rs.430,000,000.00 </strong>
              </div>
            </div>
            <div className=" mt-5 flex items-center justify-center border-t border-slate-200/60 p-2 dark:border-darkmode-400 lg:justify-end">
              <a className="mr-auto flex items-center text-primary" href="#">
                <Lucide icon="Eye" className="mr-1 h-4 w-4" /> View
              </a>
              <a className="mr-auto flex items-center" href="#">
                <Lucide icon="ArrowRightCircle" className="mr-1 h-4 w-4" /> Edit
              </a>
              <a className="flex items-center text-danger">
                <Lucide icon="Trash2" className="mr-1 h-4 w-4" /> Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          variant="secondary"
          className="mb-2 mr-1 w-24"
          onClick={handleSlider}
        >
          {`${t('common.button.close')}`}
        </Button>
      </div>
    </form>
  )
}

export default SuspendSales
