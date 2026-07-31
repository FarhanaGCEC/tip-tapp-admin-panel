import React from 'react'
import Label from '../label/active-banned-new-label'

interface StatusButtonProps {
  status: any
}

/** Soft brand-friendly status greens / reds (not neon) */
const STATUS_GREEN = 'bg-[#2F9E44]'
const STATUS_RED = 'bg-[#E03131]'
const STATUS_AMBER = 'bg-[#F08C00]'
const STATUS_GRAY = 'bg-[#868E96]'

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  let labelData = ''
  let additionalStyle = ''

  const baseStyle =
    'max-w-[115px] min-w-[115px] text-white text-center rounded-full text-[12px] font-medium tracking-wide'

  switch (status) {
    case false:
    case 'active':
      labelData = 'Active'
      additionalStyle = STATUS_GREEN
      break
    case 'sent':
      labelData = 'Received'
      additionalStyle = STATUS_GREEN
      break
    case true:
    case 'inactive':
    case 'banned':
      labelData = 'Inactive'
      additionalStyle = STATUS_RED
      break
    case 'rejected':
      labelData = 'Rejected'
      additionalStyle = STATUS_RED
      break
    case 'new':
      labelData = 'Active'
      additionalStyle = STATUS_GREEN
      break
    case 'in-progress':
      labelData = 'In Progress'
      additionalStyle = STATUS_AMBER
      break
    default:
      labelData = 'Pending..'
      additionalStyle = STATUS_GRAY
      break
  }

  const labelStyle = `${baseStyle} ${additionalStyle}`

  return <Label labledata={labelData} lablestyle={labelStyle} />
}

export default StatusButton
