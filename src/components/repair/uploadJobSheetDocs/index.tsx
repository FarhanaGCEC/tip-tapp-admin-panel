/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useRef, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import Lucide from '../../common/lucide'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import { FormLabel } from '../../common/form-elements/components'
import UploadFilesElement from '../../common/form-elements/upload-files-element'

function UploadJobSheetDocs() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
        businessLocation: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.businessLocation.validationMessage')}`),
        customer: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.customer.validationMessage')}`),
        serviceType: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.serviceType.validationMessage')}`),
        serialNo: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.serialNo.validationMessage')}`),
        status: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.status.validationMessage')}`),
        addDevice: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.validationMessage')}`),
        addDeviceModel: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.validationMessage')}`),
        role: yup
  .string()
  .required(`${t('userManagement.fields.rolesnPermission.fields.role.validationMessage')}`),
  otherwise: yup.string().notRequired(),

        prefix: yup.string().when('_', {
        is: () => 'tooltip',
        then: yup
          .string()
          .required(`${t('customerForm.fields.prefix.tooltip')}`),
          otherwise: yup.string().notRequired(),
      }),
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

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [checkedPickUp, setCheckedPickUp] = useState(false);
  const [checkedOnSite, setCheckedOnSite] = useState(false);
  const [categoryPreview, setCategoryPreview] = useState(false) 
  const [type] = useState([
    { id: 0, name: ' Supplier' },
    { id: 2, name: 'Customer' },
    { id: 3, name: 'Other' },
  ])
  const [group] = useState([
    { id: 0, name: ' Please Select' },
    { id: 2, name: 'Months' },
    { id: 3, name: 'Dates' },
  ])
  const handlePickUpChange = () => {
    setCheckedPickUp(!checkedPickUp);
    if (!checkedPickUp) {
      // If Pick Up is checked, uncheck On Site
      setCheckedOnSite(false);
    }
  };

  const handleOnSiteChange = () => {
    setCheckedOnSite(!checkedOnSite);
    if (!checkedOnSite) {
      // If On Site is checked, uncheck Pick Up
      setCheckedPickUp(false);
    }
  }
  const [showMoreInfo2, setShowMoreInfo2] = useState(false)
  const handleMoreInfoClick2 = () => {
    setShowMoreInfo2(!showMoreInfo2)
  }
  const [select, setSelect] = useState('1')

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
           <div className="intro-y box mb-5 px-5 py-5">

<div className="grid grid-cols-1 mt-5 mb-5 gap-7 md:grid-cols-2 ">
<div className="flex flex-wrap items-start">
                  <div className="mr-1 flex items-center truncate font-medium sm:w-auto">
                  Job Sheet Number {' : '}
                  </div>
                  <div className=" sm:whitespace-normal">2022/0004</div>
                </div>
                <div className="flex flex-wrap items-start">
                  <div className="mr-1 flex items-center truncate font-medium sm:w-auto">
                  Date {' : '}
                  </div>
                  <div className=" sm:whitespace-normal">02/24/2022 02:08 PM</div>
                </div>
                <div className="flex flex-wrap items-start">
                  <div className="mr-1 flex items-center truncate font-medium sm:w-auto">
                  Customer {' : '}
                  </div>
                  <div className=" sm:whitespace-normal">Walking Customer</div>
                </div>
                <div className="flex flex-wrap items-start">
                  <div className="mr-1 flex items-center truncate font-medium sm:w-auto">
                  Location {' : '}
                  </div>
                  <div className=" sm:whitespace-normal">	Bunny outlet</div>
                </div>
        </div>

      </div>
      <div className="intro-y box mb-5 px-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.document.title')}`}
                  </h2>
      </div>
      <div className="col-span-1 ">
            
            <div className="justify-start">
            <UploadFilesElement
              id="attach_document"
              name="attach_document"
              register={register}
              label={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.placeolder')}`}
              variant="primary"
              btnLabel={`${t(
                'repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.btnPlaceolder'
              )}`}
              error={errors.attach_document}
              info={`${t('repair.fields.jobsheet.fields.addJobSheet.fields.attachDocument.tooltip')}`}
            />
            </div>
          </div>
      </div>

       <div className=" flex justify-end">
       <Button
            variant="secondary"
            className="mb-2 mr-1 w-fit"
            onClick={handleSlider}
          >
           Cancel
          </Button>
      
         
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.save')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>
        </div>
    </form>
  )
}

export default UploadJobSheetDocs
