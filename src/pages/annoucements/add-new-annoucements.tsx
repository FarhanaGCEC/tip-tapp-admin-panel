/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DateTime } from 'luxon'
import TextEditor from '../../components/quil-text-editor/text-editor'
// import { useAddAnnouncements } from '../../api/announcements-management/announcement-management';
import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import Lucide from '../../base-components/lucide'
import { Litepicker } from '../../components/common/form-elements/components'
import ToggleButton from '../../components/common/toggle-button'
import { useAddAnnouncement } from '../../api/announcement-management/announcement-management'
import Button from '../../components/common/button'
import 'react-datepicker/dist/react-datepicker.css'
import Separator from '../../components/common/separator/separator'
import SplitDateTimePicker from '../news-letters-management/split-time-date'

function AddAnnouncements() {
  const [selectedType, setSelectedType] = useState<'email' | 'inApp'>('email')
  const { setNotification } = SharedDataContainer.useContainer()
  const { handleSlider } = SharedDataContainer.useContainer()

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(5, 'Title must be at least 5 characters long'),
    body: Yup.string().required('Body is required'),
  })

  const successMessage = () => {
    setNotification({
      title: '',
      message: 'Announcement added successfully',
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

  const { mutate: addAnnouncements, isLoading } = useAddAnnouncement(
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
      time: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const announcementData = {
        title: values.title,
        body: values.body,
        dateTime: selectedDateTime?.toISO(),
        type: selectedType,
        scope: userType,
      }
      addAnnouncements(announcementData)
    },
  })

  const [date, setDate] = useState<Date | null>(new Date())
  const [userType, setUserType] = useState('')
  const userTypeOptions = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'sp',
      label: 'Service Providers',
    },
    {
      value: 'tp',
      label: 'Tippers',
    },
    {
      value: 'staff',
      label: 'Staff',
    },
  ]
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime | null>(
    DateTime.now()
  )
  const today = new Date()
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" rounded-[7px]  bg-white ">
        <div className="w-full lg:flex">
          <div className="flex flex-col items-start gap-3 px-4 py-5  max-lg:px-3 max-lg:py-2 lg:w-[580px] lg:px-[20px] lg:py-[30px]">
            <div className="flex items-start gap-1">
              <span className="text-base font-[400]">User Type </span>
              <span className="text-red-500">*</span>
            </div>
            <select
              onChange={(e) => {
                setUserType(e.target.value)
              }}
              className="w-full rounded-md border-[#C7C7C7] bg-white text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-[#B2BEB5] focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              {userTypeOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="py-5max-lg:py-2 flex flex-col items-start gap-3 px-4  py-5 lg:w-[580px] lg:px-[20px] lg:py-[30px]">
            <div className="flex items-start gap-1">
              <span className="text-base font-[400]">Set Date & Time </span>
              <span className="text-red-500">*</span>
            </div>
            <div className="w-full">
              <div className="relative mx-auto w-full">
                <div className="w-full max-w-[400px]">
                  <div className="relative mx-auto w-full">
                    <SplitDateTimePicker
                      selectedDate={selectedDateTime}
                      onDateChange={setSelectedDateTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-[29px] mx-auto flex max-w-[250px] items-center justify-center rounded-[7px] bg-white">
        <ToggleButton onClick={(type) => setSelectedType(type)} />
      </div>
      <div className="relative rounded-[7px] bg-white ">
        <div className="p-5 text-[18px] font-[700]">
          {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{' '}
          Announcement
        </div>
        <Separator />

        {/* Title Input */}
        <div className="flex flex-col items-start gap-3 px-[20px] py-[20px]">
          <span className="text-base font-[400]">Title :</span>
          <input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-[#C7C7C7] bg-white text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-[#B2BEB5] focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-slate-100"
            type="text"
            placeholder="Enter Title"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-1  text-[14px] text-red-500">
              {formik.errors.title}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-3 overflow-auto px-[20px] pb-[37px]">
          <span className="text-base font-[400]">Body :</span>
          {formik.touched.title && formik.errors.title && (
            <p className="  text-[14px] text-red-500">{formik.errors.body}</p>
          )}
          <TextEditor
            onChange={(body: string) => formik.setFieldValue('body', body)}
            value={formik.values.body}
          />
        </div>
      </div>
      <div className="bottom-[-120px] right-[-35px] mb-3 mt-6 flex w-full items-center justify-end gap-3 pb-[37px]">
        <Button
          className=" bg-[#EDF2F6] py-2 max-lg:min-w-[55px] max-lg:px-4 lg:min-w-[120px] lg:px-10 "
          type="button"
          onClick={() => {
            formik.resetForm()
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

export default AddAnnouncements
