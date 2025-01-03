import React from 'react'
import Rating from '../../rating/Rating'
import profileImage from '../../../assets/images/profile.svg'
import Button from '../../common/button'
interface FAQCategoryProps {
  name?: string
  orderType?: number
  addedBy?: string
  status?: string
  onCancel: () => void
}

const FAQCategoryCard: React.FC<FAQCategoryProps> = ({
  name,
  orderType,
  addedBy,
  status,
  onCancel,
}) => {
  return (
    <div className="relative mx-auto rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">{orderType}</h2>
        </div>
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">{addedBy}</h2>
        </div>
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">{status}</h2>
        </div>
      </div>

      <div className="relative">
        <div className="-ml-6 h-[3px] w-[calc(100%+3rem)] bg-[#D9D9D9]"></div>
      </div>
      <div className="absolute bottom-[-60px] right-0 mt-6 flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default FAQCategoryCard
