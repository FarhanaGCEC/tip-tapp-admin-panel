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
import { InputElement } from '../../common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import { FormCheck } from '../../common/form-elements/components'
import { SelectElement } from '../../common/form-elements'
import Tippy from '../../common/tippy'
import Lucide from '../../common/lucide'
import Table from '../../common/table'

function AddNew() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      name: yup
        .string()
        .required(`${t('settings.fields.name.validationMessage')}`),
      city: yup
        .string()
        .required(`${t('settings.fields.city.validationMessage')}`),
      zip: yup
        .string()
        .required(`${t('settings.fields.zip.validationMessage')}`),
      state: yup
        .string()
        .required(`${t('settings.fields.state.validationMessage')}`),
      country: yup
        .string()
        .required(`${t('settings.fields.country.validationMessage')}`),
      invoiceScheme: yup
        .string()
        .required(`${t('settings.fields.invoiceScheme.validationMessage')}`),
      invoiceLayoutPos: yup
        .string()
        .required(`${t('settings.fields.invoiceLayoutPos.validationMessage')}`),
      suspendLayoutPos: yup
        .string()
        .required(`${t('settings.fields.suspendLayoutPos.validationMessage')}`),
      waybillLayout: yup
        .string()
        .required(`${t('settings.fields.waybillLayout.validationMessage')}`),
      paymentReceiptLlayout: yup
        .string()
        .required(
          `${t('settings.fields.paymentReceiptLlayout.validationMessage')}`
        ),
      invoiceLayoutSale: yup
        .string()
        .required(
          `${t('settings.fields.invoiceLayoutSale.validationMessage')}`
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
  const [tooltipContent2] = useState('Enable or disable payment methods for the location')

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box  px-5 py-10">
        <div className="mb-7 grid grid-cols-1 gap-7 md:grid-cols-2">
          <InputElement
            label={`${t('settings.fields.name.label')}`}
            register={register}
            required
            name="name"
            id="name"
            error={errors.name}
          />
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <InputElement
            label={`${t('settings.fields.locationID.label')}`}
            register={register}
            name="locationID"
            id="locationID"
          />
          <InputElement
            label={`${t('settings.fields.landmark.label')}`}
            register={register}
            name="landmark"
            id="landmark"
          />
          <InputElement
            label={`${t('settings.fields.city.label')}`}
            register={register}
            name="city"
            id="city"
            required
            error={errors.city}
          />
          <InputElement
            label={`${t('settings.fields.zip.label')}`}
            register={register}
            name="zip"
            id="zip"
            required
            error={errors.zip}
          />
          <InputElement
            label={`${t('settings.fields.state.label')}`}
            register={register}
            name="state"
            id="state"
            required
            error={errors.state}
          />
          <InputElement
            label={`${t('settings.fields.country.label')}`}
            register={register}
            name="country"
            id="country"
            required
            error={errors.country}
          />
          <InputElement
            label={`${t('settings.fields.mobile.label')}`}
            register={register}
            name="mobile"
            id="mobile"
          />
          <InputElement
            label={`${t('settings.fields.alternateContactNumber.label')}`}
            register={register}
            name="alternateContactNumber"
            id="alternateContactNumber"
          />
          <InputElement
            label={`${t('settings.fields.email.label')}`}
            register={register}
            name="email"
            id="email"
          />
          <InputElement
            label={`${t('settings.fields.website.label')}`}
            register={register}
            name="website"
            id="website"
          />
          <SelectElement
            label={`${t('settings.fields.invoiceScheme.label')}`}
            info={`${t('settings.fields.invoiceScheme.tooltip')}`}
            register={register}
            name="invoiceScheme"
            id="invoiceScheme"
            required
            error={errors.invoiceScheme}
          />
          <SelectElement
            label={`${t('settings.fields.invoiceLayoutPos.label')}`}
            info={`${t('settings.fields.invoiceLayoutPos.tooltip')}`}
            register={register}
            name="invoiceLayoutPos"
            id="invoiceLayoutPos"
            required
            error={errors.invoiceLayoutPos}
          />
          <SelectElement
            label={`${t('settings.fields.suspendLayoutPos.label')}`}
            info={`${t('settings.fields.suspendLayoutPos.tooltip')}`}
            register={register}
            name="suspendLayoutPos"
            id="suspendLayoutPos"
            required
            error={errors.suspendLayoutPos}
          />
          <SelectElement
            label={`${t('settings.fields.waybillLayout.label')}`}
            info={`${t('settings.fields.waybillLayout.tooltip')}`}
            register={register}
            name="waybillLayout"
            id="waybillLayout"
            required
            error={errors.waybillLayout}
          />
          <SelectElement
            label={`${t('settings.fields.paymentReceiptLlayout.label')}`}
            info={`${t('settings.fields.paymentReceiptLlayout.tooltip')}`}
            register={register}
            name="paymentReceiptLlayout"
            id="paymentReceiptLlayout"
            required
            error={errors.paymentReceiptLlayout}
          />
          <SelectElement
            label={`${t('settings.fields.invoiceLayoutSale.label')}`}
            info={`${t('settings.fields.invoiceLayoutSale.tooltip')}`}
            register={register}
            name="invoiceLayoutSale"
            id="invoiceLayoutSale"
            required
            error={errors.invoiceLayoutSale}
          />
          <SelectElement
            label={`${t('settings.fields.defaultSellingPriceGroup.label')}`}
            info={`${t('settings.fields.defaultSellingPriceGroup.tooltip')}`}
            register={register}
            name="defaultSellingPriceGroup"
            id="defaultSellingPriceGroup"
          />
          </div>
        <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
          <InputElement
            label={`${t('settings.fields.customField.label')}`}
            register={register}
            name="customField"
            id="customField"
          />
          <InputElement
            label={`${t('settings.fields.customField.label')}`}
            register={register}
            name="customField"
            id="customField"
          />
          <InputElement
            label={`${t('settings.fields.customField.label')}`}
            register={register}
            name="customField"
            id="customField"
          />
          <InputElement
            label={`${t('settings.fields.customField.label')}`}
            register={register}
            name="customField"
            id="customField"
          />
        </div>
        <div className="mb-7 mt-7 border-b" />
        <div className="flex items-center">
                  <div className="text-lg font-medium ">Payment Options</div>
                  <Tippy content={tooltipContent2}>
                {' '}
                <a>
                  {' '}
                  <Lucide icon="Info" className=" mx-2 h-4 w-4 " />
                </a>{' '}
              </Tippy>
                </div>
                <Table sm className='mt-5'>
                      <Table.Thead variant="light">
                        <Table.Tr>
                          <Table.Th className="whitespace-nowrap">
                          Payment Method
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                          Enable
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>Cash</Table.Td>
                          <Table.Td className="text-center">
                          <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5"
                    >
                    
                    </FormCheck.Label>
                  </FormCheck>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Card</Table.Td>
                          <Table.Td className="text-center">
                          <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5" >
                    </FormCheck.Label>
                  </FormCheck>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Cheque</Table.Td>
                          <Table.Td className="text-center">
                          <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5" >
                    </FormCheck.Label>
                  </FormCheck>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Bank Transfer</Table.Td>
                          <Table.Td className="text-center">
                          <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5" >
                    </FormCheck.Label>
                  </FormCheck>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Other</Table.Td>
                          <Table.Td className="text-center">
                          <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5" >
                    </FormCheck.Label>
                  </FormCheck>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Test</Table.Td>
                          <Table.Td className="text-center">
                          <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5" >
                    </FormCheck.Label>
                  </FormCheck>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Custom Payment 4</Table.Td>
                          <Table.Td className="text-center">
                          <FormCheck>
                    <FormCheck.Input
                      id="vertical-form-4"
                      type="checkbox"
                      value=""
                    />
                    <FormCheck.Label
                      className="mr-2  flex"
                      htmlFor="vertical-form-5" >
                    </FormCheck.Label>
                  </FormCheck>
                          </Table.Td>
                        </Table.Tr>
                        
                      </Table.Tbody>
                    </Table>
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

export default AddNew
