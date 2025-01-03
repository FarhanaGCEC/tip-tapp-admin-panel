import { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../api'
import Button from '../common/button'
import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import LoadingIcon from '../common/loading-icon'
import InputElement from '../common/form-elements/input-element-secondary'
import {
  GetAllCategoriesList,
  GetCreateFAQs,
} from '../../api/faq-management/faq-management'
import TextEditor from '../quil-text-editor/text-editor-secondary'
import { useFormik } from 'formik'

interface FormData {
  title: string
  description: string
  faqCategoryId: string
}

function AddFAQ() {
  const posApi = PosApi.useAPI()
  const { setNotification } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const { handleSlider } = SharedDataContainer.useContainer()

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .required('Title is required'),
    description: yup.string().required('Description is required'),
    faqCategoryId: yup.number().required('FAQ Category is required'),
  })
  const successMessage = () => {
    setNotification({
      title: '',
      message: 'FAQ Added Successfully',
      icon: Icons.CHECKCIRCLE,
      type: NotificationTypes.SUCCESS,
    })
    Toast()
  }
  const errorMessage = () => {
    setNotification({
      title: '',
      message: 'Something went wrong',
      icon: Icons.CHECKCIRCLE,
      type: NotificationTypes.ERROR,
    })
    Toast()
  }

  const { mutate: addFaqs, isLoading: isMutating } = GetCreateFAQs(
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
      title: '',
      description: '',
      faqCategoryId: '',
    },
    validationSchema,
    onSubmit: (values: FormData) => {
      addFaqs(values, {})
    },
  })

  const { data: categories, isLoading: isCategoriesLoading } =
    GetAllCategoriesList()

  if (isCategoriesLoading) {
    return <div>Loading Categories...</div>
  }

  return (
    <div>
      
      <form onSubmit={formik.handleSubmit} className="validate-form">
        <div className="intro-y box px-8 py-5">
          <InputElement
            label={t('FAQ Title') as string}
            name="title"
            id="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
          />
          <div className="mb-3 mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="w-full text-black">
                  <div className="mb-2 flex gap-1">
                    <span className="font-medium">FAQ Category</span>
                    <span className="text-red-500">*</span>
                  </div>
                  <select
                    id="faqCategoryId"
                    name="faqCategoryId"
                    value={formik.values.faqCategoryId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        'faqCategoryId',
                        Number(e.target.value)
                      )
                    }
                    required
                    className="w-full rounded-md border-[#C7C7C7]"
                  >
                    <option value="">Select a category</option>
                    {categories?.map(
                      (category: { id: number; name: string }) => (
                        <option key={category.id} value={category.id}>
                          {category.name || `Category ${category.id}`}
                        </option>
                      )
                    )}
                  </select>
                  {formik.errors.faqCategoryId &&
                    formik.touched.faqCategoryId && (
                      <div className="text-red-500">
                        {formik.errors.faqCategoryId}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 overflow-auto">
            <span className="mb-2  font-medium">FAQ Description</span>
            <span className="text-red-500"> *</span>
            <TextEditor
              value={formik.values.description}
              onChange={(value: string) =>
                formik.setFieldValue('description', value)
              }
            />

            {formik.errors.description && formik.touched.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-end">
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

export default AddFAQ
