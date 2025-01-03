import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../api'
import Button from '../common/button'
import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import LoadingIcon from '../common/loading-icon'
import InputElement from '../common/form-elements/input-element-secondary'
import SelectElement from '../common/form-elements/select-element-secondary'
import { GetCreateFAQCategory } from '../../api/faq-management/faq-management'
import { useFormik } from 'formik'

interface FormData {
  name: string
  addedBy: string
}

function AddFAQCategory() {
  const posApi = PosApi.useAPI()
  const { setNotification } = SharedDataContainer.useContainer()
  const { t } = useTranslation('pos')
  const { handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [addedBy, setAddedBy] = useState<string>('')

  const validationSchema = yup.object().shape({
    name: yup.string().required('Category Name is required'),
    addedBy: yup.string().required('Description is required'),
  })

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    const firstName = userData.FirstName || 'Unknown'
    const lastName = userData.LastName || 'User'
    setAddedBy(`${firstName} ${lastName}`) 
  }, [])


  const successMessage = () => {
    setNotification({
      title: '',
      message: t('FAQ Category added successfully') as string,
      icon: Icons.CHECKCIRCLE,
      type: NotificationTypes.SUCCESS,
    })
    Toast()
  }

  const errorMessage = () => {
    setNotification({
      title: '',
      message: t('Something went wrong') as string,
      icon: Icons.XCIRCLE,
      type: NotificationTypes.ERROR,
    })
    Toast()
  }


  const { mutate: addFaqCategory, isLoading: isMutating } =
    GetCreateFAQCategory(
      () => {
        successMessage()
        handleSlider()
      },
      () => {
        errorMessage()
      }
    )

  const formik = useFormik({
    initialValues: {
      name: '',
      addedBy: addedBy,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values: FormData) => {
      addFaqCategory(values, {})
    },
  })

  return (
    <div>
      <div className=" text-[18px] font-[500] text-[#475569]">
        Add New FAQ Category Details
      </div>
      <hr className="my-8 h-px w-full border-0 bg-white dark:bg-gray-700" />
      <form onSubmit={formik.handleSubmit} className="validate-form">
        <div className="intro-y box lg:flex gap-20 px-8 py-5 pt-7 ">
          <div className=" mb-6 w-full">
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
            <InputElement
              label={t('Category Name') as string}
              name="name"
              id="name"
              placeholder='Category'
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className=" mb-6 w-full ">
            <InputElement
              label={t('Added By') as string}
              name="addedBy"
              id="addedBy"
              value={formik.values.addedBy}
              onChange={formik.handleChange}
              required
              disabled
            />
          </div>
          {formik.errors.addedBy && formik.touched.addedBy && (
            <div className="text-red-500">{formik.errors.addedBy}</div>
          )}
        </div>
        <div className="mt-5 flex justify-end gap-4">
          <Button
            variant="secondary"
            className="mb-2 mr-1 w-24 bg-[#EDF2F6] text-black"
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault()
              handleSlider()
            }}
          >
            {t('common.button.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="mb-2 mr-1 w-24"
            disabled={isMutating || isLoading}
          >
            {t('Add')}
            {isMutating && (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddFAQCategory
