/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import _ from 'lodash'
import clsx from 'clsx'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import { Tab } from '../../common/headless'
import Tippy from '../../common/tippy'
import VariationTableElement from './variationTable-Elements'

function RecentTransaction() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      order_tax: yup
        .string()
        .required(`${t('taxForm.fields.orderTax.validationMessage')}`),
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

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <Tab.Group className=" intro-y box overflow-hidden">
        <Tab.List className="flex-col border-transparent bg-slate-200 dark:border-transparent dark:bg-darkmode-800 sm:flex-row">
          <Tab fullWidth={false}>
            {({ selected }) => (
              <Tab.Button
                className={clsx([
                  'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                  !selected &&
                    'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                  selected &&
                    'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                ])}
                as="button"
              >
                <Tippy
                  content=""
                  className="flex w-full items-center justify-center py-4"
                  aria-controls="content"
                  aria-selected="true"
                >
                  Final
                </Tippy>
              </Tab.Button>
            )}
          </Tab>
          <Tab fullWidth={false}>
            {({ selected }) => (
              <Tab.Button
                className={clsx([
                  'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                  !selected &&
                    'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                  selected &&
                    'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                ])}
                as="button"
              >
                <Tippy
                  content=""
                  className="flex w-full items-center justify-center py-4"
                  aria-selected="false"
                >
                  Quotation
                </Tippy>
              </Tab.Button>
            )}
          </Tab>
          <Tab fullWidth={false}>
            {({ selected }) => (
              <Tab.Button
                className={clsx([
                  'flex w-full items-center justify-center px-0 py-0 text-slate-500 sm:w-40',
                  !selected &&
                    'hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300',
                  selected &&
                    'border-transparent text-primary dark:border-transparent dark:bg-darkmode-600 dark:text-white',
                ])}
                as="button"
              >
                <Tippy
                  content=""
                  className="flex w-full items-center justify-center py-4"
                  aria-selected="false"
                >
                  Draft
                </Tippy>
              </Tab.Button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="p-5">
            <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
              <div className="mt- intro-y flex flex-col items-center sm:flex-row" />
              <VariationTableElement register={register} />
              <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
            </div>
          </Tab.Panel>
          <Tab.Panel className="p-5">
            <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
              <div className="mt- intro-y flex flex-col items-center sm:flex-row" />
              <VariationTableElement register={register} />
              <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap" />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

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

export default RecentTransaction
