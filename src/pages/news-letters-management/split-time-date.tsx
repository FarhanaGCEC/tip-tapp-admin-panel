/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { DateTime } from 'luxon'
import Lucide from '../../base-components/lucide'
import 'react-datepicker/dist/react-datepicker.css'

interface SplitDateTimePickerProps {
  selectedDate: DateTime | null
  onDateChange: (date: DateTime | null) => void
}

const SplitDateTimePicker: React.FC<SplitDateTimePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  // Convert initial DateTime to Date for react-datepicker
  const initialDate = selectedDate ? selectedDate.toJSDate() : null

  // Separate states for date and time using Date objects for react-datepicker
  const [date, setDate] = useState<Date | null>(initialDate)
  const [time, setTime] = useState<Date | null>(initialDate)

  // Handler for date changes
  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate)
    if (newDate && time) {
      const luxonDate = DateTime.fromJSDate(newDate)
      const luxonTime = DateTime.fromJSDate(time)

      const combinedDateTime = luxonDate.set({
        hour: luxonTime.hour,
        minute: luxonTime.minute,
      })

      onDateChange(combinedDateTime)
    } else {
      onDateChange(newDate ? DateTime.fromJSDate(newDate) : null)
    }
  }

  // Handler for time changes
  const handleTimeChange = (newTime: Date | null) => {
    setTime(newTime)
    if (newTime && date) {
      const luxonDate = DateTime.fromJSDate(date)
      const luxonTime = DateTime.fromJSDate(newTime)

      const combinedDateTime = luxonDate.set({
        hour: luxonTime.hour,
        minute: luxonTime.minute,
      })

      onDateChange(combinedDateTime)
    } else {
      onDateChange(newTime ? DateTime.fromJSDate(newTime) : null)
    }
  }
  const today = new Date()

  return (
    <div className="flex flex-col gap-4 md:flex-row lg:flex-row">
      {/* Date Picker */}
      <div className="relative w-full ">
        <div className="absolute z-10 flex h-full w-10 items-center justify-center rounded-l border bg-slate-50 text-black">
          <Lucide icon="Calendar" className="h-5 w-5" />
        </div>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={today}
          className="w-full rounded-md border-[#C7C7C7] bg-white pl-12 text-sm shadow-sm transition duration-200 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20"
          placeholderText="Select date"
        />
      </div>

      {/* Time Picker */}
      <div className="relative w-full ">
        <div className="absolute z-10 flex h-full w-10 items-center justify-center rounded-l border bg-slate-50 text-black">
          <Lucide icon="Clock" className="h-5 w-5" />
        </div>
        <DatePicker
          selected={time}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          minTime={
            date && date.toDateString() === today.toDateString()
              ? new Date() // Minimum time for today is current time
              : new Date(new Date().setHours(0, 0, 0, 0)) // Midnight for other days
          }
          maxTime={
            date && date.toDateString() === today.toDateString()
              ? new Date(new Date().setHours(23, 59, 59, 999)) // Max time for today
              : new Date(new Date().setHours(23, 59, 59, 999)) // Max time for other days
          }
          dateFormat="h:mm aa"
          className="w-full rounded-md border-[#C7C7C7] bg-white pl-12 text-sm shadow-sm transition duration-200 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary focus:ring-opacity-20"
          placeholderText="Select time"
        />
      </div>
    </div>
  )
}

export default SplitDateTimePicker
