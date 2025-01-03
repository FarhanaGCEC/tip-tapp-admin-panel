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
import {
  FormSelect,
  FormInput,
  FormCheck,
  FormInfo,
} from '../../common/form-elements/components'

function AddCustomerLogin() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
      contactsUser: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.customerLogins.fields.contactsUser.validationMessage'
          )}`
        ),
        password: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.customerLogins.fields.contactsUser.validationMessage'
          )}`
        ),
        confirmPassword: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.customerLogins.fields.contactsUser.validationMessage'
          )}`
        ),
        firstName: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.customerLogins.fields.firstName.validationMessage'
          )}`
        ),
        email: yup
        .string()
        .required(
          `${t(
            'contactManagement.fields.customerLogins.fields.email.validationMessage'
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
  const [checked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked(!checked)
  }
  const [checkedMore, setCheckedMore] = useState(false)
  const handleChangeMore = () => {
    setCheckedMore(!checkedMore)
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
      <div className="intro-y box p-5 mb-5">

        <div className="grid gap-7 mb-5 mt-5 md:grid-cols-2">
       
              <InputElement
                label={`${t(
                  'contactManagement.fields.customerLogins.fields.prefix.label'
                )}`}
                register={register}
                name="prefix"
                placeholder={`${t(
                  'contactManagement.fields.customerLogins.fields.prefix.placeolder'
                )}`}
                id="prefix"
              />
               <InputElement
                label={`${t(
                  'contactManagement.fields.customerLogins.fields.firstName.label'
                )}`}
                register={register}
                name="firstName"
                placeholder={`${t(
                  'contactManagement.fields.customerLogins.fields.firstName.placeolder'
                )}`}
                id="firstName"
                required
                error={errors.firstName}
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.customerLogins.fields.lastName.label'
                )}`}
                register={register}
                name="last"
                placeholder={`${t(
                  'contactManagement.fields.customerLogins.fields.lastName.placeolder'
                )}`}
                id="last"
              />
               <InputElement
                label={`${t(
                  'contactManagement.fields.customerLogins.fields.email.label'
                )}`}
                register={register}
                name="email"
                placeholder={`${t(
                  'contactManagement.fields.customerLogins.fields.email.placeolder'
                )}`}
                id="email"
                required
                error={errors.email}
              />
              <FormCheck className="">
                            <FormCheck.Input
                                id="vertical-form-3"
                                type="checkbox"
                                value=""
                                onChange={handleChange}
                              />
                              <div className="ml-2 font-medium">{`${t(
                                'contactManagement.fields.customerLogins.fields.isActive.label'
                              )}`}</div>
                               <div className="ml-2 font-medium"></div>
 <FormInfo
                                    tooltip={`${t(
                                      'contactManagement.fields.customerLogins.fields.isActive.tooltip'
                                    )}`}
                                  />
                              <FormCheck.Label
                                className="mr-2"
                                htmlFor="vertical-form-3"
                              >
                              </FormCheck.Label>
                            </FormCheck> 


                            
        </div>
  
          </div>
         <div className="intro-y box p-5">
         <FormCheck className="mt-5">
                            <FormCheck.Input
                                id="vertical-form-3"
                                type="checkbox"
                                value=""
                                onChange={handleChangeMore}
                              />
                              <div className="ml-2 font-medium">{`${t(
                                'contactManagement.fields.customerLogins.fields.allowLogins.label'
                              )}`}</div>

                              
                              <FormCheck.Label
                                className="mr-2"
                                htmlFor="vertical-form-3"
                              >
                              </FormCheck.Label>
                            </FormCheck> 
                            {checkedMore && (
          <div className="mt-3 grid grid-cols-1 mt-7 gap-7 md:grid-cols-2">
           <InputElement
                label={`${t(
                  'contactManagement.fields.customerLogins.fields.userName.label'
                )}`}
                register={register}
                name="userName"
                placeholder={`${t(
                  'contactManagement.fields.customerLogins.fields.userName.placeolder'
                )}`}
                id="userName"
              />
              
            <InputElement
                label={`${t(
                  'contactManagement.fields.customerLogins.fields.password.label'
                )}`}
                required
                error={errors.password}
                register={register}
                name="password"
                placeholder={`${t(
                  'contactManagement.fields.customerLogins.fields.password.placeolder'
                )}`}
                id="password"
              />
             <InputElement
                label={`${t(
                  'contactManagement.fields.customerLogins.fields.confirmPassword.label'
                )}`}
                required
                error={errors.confirmPassword}
                register={register}
                name="confirmPassword"
                placeholder={`${t(
                  'contactManagement.fields.customerLogins.fields.confirmPassword.placeolder'
                )}`}
                id="confirmPassword"
              />
          </div>
        )}  
 <div className="grid grid-cols-1 gap-7 mb-5 mt-9 md:grid-cols-1">
          <FormCheck className="">
            <div className=" font-medium">
              {`${t(
                'contactManagement.fields.customerLogins.fields.accessLocations.label'
              )}`}
            </div>
            <FormCheck.Label className="mr-5">
              <div className="flex">
                <FormInfo
                  tooltip={`${t(
                    'contactManagement.fields.customerLogins.fields.accessLocations.tooltip'
                  )}`}
                />
              </div>
            </FormCheck.Label>
            <FormCheck.Input
              className="mr-2 "
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <div className="mr-1 flex">All Locations </div>
            <div className="flex">
              <FormInfo
                tooltip={`${t(
                  'contactManagement.fields.customerLogins.fields.allLocations.tooltip'
                )}`}
              />
            </div>
            <div className="pl-6 font-medium">
              <FormCheck.Input
                className="mr-2 font-medium"
                type="checkbox"
                value=""
                onChange={handleChange}
              />{' '}
              Bunny Outlet
            </div>
            <div className="pl-6 font-medium">
              <FormCheck.Input
                className="mr-2 font-medium"
                type="checkbox"
                value=""
                onChange={handleChange}
              />{' '}
              Test
            </div>
          </FormCheck>
        </div>



        <div className="flex justify-end  pb-7 text-center">
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
      </div>
    </form>
  )
}

export default AddCustomerLogin
