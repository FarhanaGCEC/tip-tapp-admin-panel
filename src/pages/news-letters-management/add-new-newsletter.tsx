/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
import { useState } from 'react'
import { useFormik } from 'formik'
import TextEditor from '../../components/quil-text-editor/text-editor'
import { useAddNewsletters } from '../../api/newsletters-management/newsletter-management'
import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import * as Yup from 'yup'
import Lucide from '../../base-components/lucide'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Button from '../../components/common/button'
import { useTranslation } from 'react-i18next'
import Separator from '../../components/common/separator/separator'
import SplitDateTimePicker from './split-time-date'
import { DateTime } from 'luxon'

const AddNewNewsLetter = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime | null>(
    DateTime.now()
  )

  const { setNotification } = SharedDataContainer.useContainer()
  const { handleSlider } = SharedDataContainer.useContainer()
  const { t } = useTranslation('pos')
  // const [date, setDate] = useState<Date | null>(new Date)

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(5, 'Title must be at least 5 characters long'),
    body: Yup.string().required('Body is required'),
  })

  const successMessage = () => {
    setNotification({
      title: '',
      message: 'Newsletter added successfully',
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

  const { mutate: addNewsletters, isLoading } = useAddNewsletters(
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
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (!selectedDateTime) {
        errorMessage()
        return
      }

      const newsletterData = {
        title: values.title,
        body: values.body,
        dateTime: selectedDateTime.toISO(), // Convert to ISO string for consistent timezone handling
        status: 'in-progress', // Changed from 'sent' to 'in_progress'
      }
      addNewsletters(newsletterData)
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" rounded-[7px] bg-white ">
        <div className="p-5 text-[18px] font-[700]">Add a new newsletter</div>
        <Separator />

        {/* Title Input */}
        <div className="flex flex-col items-start gap-3 px-[20px] py-[37px]">
          <span className="text-base font-[400]">Title :</span>
          <input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-md border-[#C7C7C7] bg-white text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-[#B2BEB5] focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-slate-100 ${
              formik.errors.title && formik.touched.title
                ? 'border-red-500'
                : ''
            }`}
            type="text"
            placeholder="Enter Title"
          />
          {formik.errors.title && formik.touched.title && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.title}
            </div>
          )}
        </div>
        {/* DateTime Picker */}
        <div className="flex flex-col items-start gap-3 px-[20px] pb-[37px]">
          <span className="text-base font-[400]">Set Date & Time : </span>
          <div className="w-full max-w-[400px]">
            <div className="relative mx-auto w-full">
              <SplitDateTimePicker
                selectedDate={selectedDateTime}
                onDateChange={setSelectedDateTime}
              />
            </div>
          </div>
        </div>

        {/* Body Input (Text Editor) */}
        <div className="flex flex-col   items-start gap-3 px-[20px] pb-[40px]">
          <span className="text-base font-[400]">Body :</span>
          {formik.errors.body && formik.touched.body && (
            <div className="text-sm text-red-500">{formik.errors.body}</div>
          )}
          <TextEditor
            onChange={(body: string) => formik.setFieldValue('body', body)}
            value={formik.values.body}
          />
        </div>

        {/* Submit and Cancel Buttons */}
      </div>

      <div className="bottom-[-120px] right-[-35px] mb-3 mt-6 flex w-full items-center justify-end gap-3 pb-[37px]">
        <Button
          className=" bg-[#EDF2F6] py-2 max-lg:min-w-[55px] max-lg:px-4 lg:min-w-[120px] lg:px-10 "
          type="button"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            handleSlider()
          }}
        >
          Cancel
        </Button>

        <Button
          className=" bg-black py-2 text-white max-lg:min-w-[55px] max-lg:px-4 lg:min-w-[120px] lg:px-10"
          type="submit"
          disabled={isLoading}
        >
          {`${isLoading ? 'Submitting...' : 'Submit'}`}
        </Button>
      </div>
    </form>
  )
}

export default AddNewNewsLetter
