import React from 'react'
import Rating from '../../rating/Rating'
import profileImage from '../../../assets/images/default-image.png'
import Button from '../../common/button'
import Separator from '../../common/separator/separator'
interface ReviewCardProps {
  name?: string
  profilePictureURL?: string
  rating?: number
  review?: string
  reply?: string
  hidden?: boolean
  onCancel: () => void
  onHide: (hide: boolean) => void
  isLoading?: boolean
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  profilePictureURL,
  rating,
  review,
  reply,
  hidden,
  onCancel,
  onHide,
  isLoading = false,
}) => {
  return (
    <div className="relative mx-auto rounded-lg bg-white  shadow-md">
      <div className="items-center justify-between md:flex">
        <div className="ml-6  mr-5 mt-3 flex-1 items-center justify-start max-lg:py-2    lg:flex">
          <div className="ml-2 mt-4 flex-none content-center sm:mt-0 sm:h-24 sm:w-24 ">
            <img
              alt="profile page"
              className={` h-[80px]
                 w-[80px]  rounded-full 
              `}
              src={profilePictureURL || profileImage}
            />
          </div>
          <div className=" ">
            <div className="w-24 truncate text-lg  font-medium max-lg:px-2 sm:w-60 sm:whitespace-normal">
              {name}
            </div>
          </div>
        </div>
        <div className="  ml-5  mr-9 flex  ">
          <Rating value={rating} />
        </div>
      </div>

      {review && <Separator />}

      {review && (
        <div className="mt-3   p-3 ps-8">
          <h3 className="mb-2 text-[14px]">Review :</h3>
          <p className=" text-gray-600">{review}</p>
        </div>
      )}
      {reply && (
        <div className=" p-3 ps-8 ">
          <h3 className="mb-2 text-[14px]">Reply :</h3>
          <p className="mb-4 text-gray-600">{reply}</p>
        </div>
      )}
      <div className="absolute bottom-[-60px] right-0 mt-6  flex justify-end space-x-4 ">
        <Button
          onClick={onCancel}
          className=" bg-[#EDF2F6]  px-10 py-2 max-[600px]:px-4 "
          disabled={isLoading}
        >
          Cancel
        </Button>
        {!hidden ? (
          <div>
            <Button
              className=" bg-primary  px-10 py-2 text-white max-[600px]:px-4"
              disabled={isLoading}
              onClick={() => {
                onHide(true)
              }}
            >
              {isLoading ? 'Hiding...' : 'Hide'}
            </Button>
          </div>
        ) : (
          <Button
            className=" bg-primary  px-10 py-2 text-white max-[600px]:px-4"
            disabled={isLoading}
            onClick={() => {
              onHide(false)
            }}
          >
            {isLoading ? 'Unhiding...' : 'Unhide'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ReviewCard
