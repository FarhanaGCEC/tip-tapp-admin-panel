/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
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
import clsx from 'clsx'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import { InputElement } from '../../common/form-elements'
import LoadingIcon from '../../common/loading-icon'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import { SearchSelectElement, SelectElement } from '../../common/form-elements'
import Tippy from '../../common/tippy'
import Lucide from '../../common/lucide'
import Table from '../../common/table'
import {
  Tab,
} from '../../common/headless'
import { FormInput } from '../../common/form-elements/components'
import PreviewImage3 from '../../../assets/images/fakers/image3.jpg'

function Settings() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      receiptPrinterType: yup
        .string()
        .required(`${t('settings.fields.receiptPrinterType.validationMessage')}`),
        invoiceLayout: yup
        .string()
        .required(`${t('settings.fields.invoiceLayout.validationMessage')}`),
        invoiceSchemeNum: yup
        .string()
        .required(`${t('settings.fields.invoiceSchemeNum.validationMessage')}`),
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
  const handleChange = () => { }
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
       <div className="">
        
        <Tab.Group className=" box overflow-y-auto">
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
                    <div className="">{`${t('Receipt Settings')}`}</div>
                  </Tippy>
                </Tab.Button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="grid gap-7 p-5 md:grid-cols-1">
              <div className="rounded-md border border-slate-200/60 p-5 dark:border-darkmode-400">
                <div className="felx mr-2 mt-2 text-sm text-slate-500">
                  {`${t(
                    'All Receipt Related Settings for this Location'
                  )}`}
                </div>
                <div className="mb-7 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
          <SelectElement
            label={`${t('settings.fields.autoPrint.label')}`}
            info={`${t('settings.fields.autoPrint.tooltip')}`}
            register={register}
            name="autoPrint"
            id="autoPrint"
          />
           <SelectElement
            label={`${t('settings.fields.showPreview.label')}`}
            register={register}
            name="name"
            id="name"
          />
           <SelectElement
            label={`${t('settings.fields.receiptPrinterType.label')}`}
            info={`${t('settings.fields.receiptPrinterType.tooltip')}`}
            required
            error={errors.receiptPrinterType}
            register={register}
            name="receiptPrinterType"
            id="receiptPrinterType"
          />
           <SearchSelectElement
            label={`${t('settings.fields.invoiceLayout.label')}`}
            info={`${t('settings.fields.invoiceLayout.tooltip')}`}
            register={register}
            name="invoiceLayout"
            id="invoiceLayout"
            required
            error={errors.invoiceLayout}
            onChange={handleChange}
          />
           <SelectElement
            label={`${t('settings.fields.invoiceSchemeNum.label')}`}
            info={`${t('settings.fields.invoiceSchemeNum.tooltip')}`}
            register={register}
            name="invoiceSchemeNum"
            id="invoiceSchemeNum"
            required
            error={errors.invoiceSchemeNum}
          />
        </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
          <div className=" flex justify-end px-5 mb-5">
        <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.save')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>
        </div>
        </Tab.Group>
       
      </div>
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('Business Location Logo')}`}
                  </h2>

      </div>
      <div className="mx-auto w-52 xl:mr-0 xl:ml-2">
                  <div className="p-5 border-2 border-dashed rounded-md shadow-sm border-slate-200/60 dark:border-darkmode-400">
                    <div className="relative h-40 mx-auto cursor-pointer image-fit zoom-in">
                      <img
                        className="rounded-md"
                        alt="Midone Tailwind HTML Admin Template"
                        src= {PreviewImage3 }
                      />
                      <Tippy
                        as="div"
                        content="Remove this profile photo?"
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
                      >
                        <Lucide icon="X" className="w-4 h-4" />
                      </Tippy>
                    </div>
                    <div className="relative mx-auto mt-5 cursor-pointer">
                      <Button
                        variant="primary"
                        type="button"
                        className="w-full"
                      >
                        Change Photo
                      </Button>
                      <FormInput
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </div>
                <div className="felx mr-2 mt-2 text-sm text-slate-500">
                  {`${t(
                    ' Previous logo (if exists) will be replaced'
                  )}`}
                </div>
      </div>
    </form>
  )
}

export default Settings
