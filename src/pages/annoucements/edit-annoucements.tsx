import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import TextEditor from '../../components/quil-text-editor/text-editor'
import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import * as Yup from 'yup'
import Lucide from '../../base-components/lucide'
import { Litepicker } from '../../components/common/form-elements/components'
import ToggleButton from '../../components/common/toggle-button'
import { useUpdateAnnouncement } from '../../api/announcement-management/announcement-management' // Assume you have this hook for editing
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Separator from '../../components/common/separator/separator'

interface EditAnnouncementsProps {
  id: string
  title: string
  body: string
  dateTime: string
  scope: string
  type: string | 'email' | 'inApp'
  UserType: string
}

const EditAnnouncements = (announcement: EditAnnouncementsProps) => {
  // Accepting announcement data as props
  const [selectedType, setSelectedType] = useState<string>(
    announcement.type || 'email'
  )
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
      message: 'Announcement updated successfully',
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

  const { mutate: editAnnouncements, isLoading } = useUpdateAnnouncement(
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
      title: announcement.title || '',
      body: announcement.body || '',
      time: announcement.dateTime || '',
    },
    validationSchema,
    onSubmit: (values) => {
      const announcementData = {
        ...announcement,
        id: announcement.id,
        title: values.title,
        body: values.body,
        dateTime: date,
        type: selectedType,
        scope: userType,
      }

      editAnnouncements(announcementData)
    },
  })
  const [date, setDate] = useState<Date | null>(
    announcement.dateTime ? new Date(announcement.dateTime) : null
  )
  const [userType, setUserType] = useState(announcement.scope || '')
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" rounded-[7px] bg-white">
        <div className="flex w-full">
          <div className="flex w-full flex-col items-start gap-3 px-[20px] py-[37px]">
            <div className="flex items-start gap-1">
              <span className="text-base font-[400] max-lg:text-[14px]">
                User Type{' '}
              </span>
              <span className="text-red-500">*</span>
            </div>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full rounded-md border-[#C7C7C7] bg-white text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-[#B2BEB5] focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              {userTypeOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex w-full flex-col items-start gap-3 px-[10px]  py-[37px]">
            <div className="flex items-start gap-1">
              <span className="text-base font-[400] max-lg:text-[14px]">
                Set Date & Time{' '}
              </span>
              <span className="text-red-500">*</span>
            </div>
            <div className="w-full">
              <div className="relative mx-auto w-full">
                <div className="w-full max-w-[400px]">
                  <div className="relative mx-auto w-full">
                    <div className="absolute z-10 flex h-full w-10 items-center justify-center rounded-l border bg-slate-50 text-black dark:border-darkmode-800 dark:bg-darkmode-700 dark:text-slate-400">
                      <Lucide icon="Calendar" className="h-6 w-6" />{' '}
                    </div>
                    <DatePicker
                      showTimeSelect
                      selected={date}
                      onChange={setDate}
                      dateFormat="dd/MM/yyyy h:mm a"
                      className="w-full rounded-md border-[#C7C7C7]  pl-12 text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-[#B2BEB5] focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-red-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-[29px] mx-auto flex max-w-[250px] items-center justify-center rounded-[7px]  bg-white">
        <ToggleButton
          selectedType={selectedType}
          onClick={(type) => setSelectedType(type)}
          editbutton={
            selectedType === 'email'
              ? true
              : selectedType === 'inApp'
              ? true
              : false
          }
        />
      </div>
      <div className=" rounded-[7px] bg-white ">
        <div className="p-5 text-[18px] font-[700] max-lg:text-[16px]">
          {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{' '}
          Announcement
        </div>
        <Separator />
        {/* Title Input */}
        <div className="flex flex-col items-start gap-3 px-[20px] py-[37px]">
          <span className="text-base font-[400] max-lg:text-[14px]">
            Title :
          </span>
          <input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-[#C7C7C7] bg-white text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-[#B2BEB5] focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-slate-100"
            type="text"
            placeholder="Enter Title"
          />
        </div>
        <div className="flex flex-col items-start gap-3 overflow-hidden px-[20px] pb-[37px]  ">
          <span className="text-base font-[400] max-lg:text-[14px]">
            Body :
          </span>
          <TextEditor
            onChange={(body) => formik.setFieldValue('body', body)}
            value={formik.values.body}
          />
        </div>
      </div>
      <div className="mb-3 mt-5 flex w-full items-center justify-end gap-3  pb-[37px]">
        <button
          className="min-w-[104px] max-w-[104px] rounded-lg bg-[#EDF2F6] px-3 py-2 text-center text-[15px] "
          type="button"
          onClick={() => handleSlider()}
        >
          Cancel
        </button>

        <button
          className="min-w-[104px] max-w-[104px] rounded-lg bg-black px-3 py-2 text-center text-[15px] text-white"
          type="submit"
          disabled={isLoading}
        >
          {`${isLoading ? 'Submitting...' : 'Submit'}`}
        </button>
      </div>
    </form>
  )
}

export default EditAnnouncements
