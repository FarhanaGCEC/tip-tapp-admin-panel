/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import date from 'date-and-time'
import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { ReviewFeedbackItem } from '../../types/reviewAndFeedback'
import Lucide from '../common/lucide'
import Rating from '../rating/Rating'

interface ReviewFeedbackManagementTableProps {
  headers: { key: number; label: string }[]
  tipItems: ReviewFeedbackItem[]
  handleClick: (
    formContent: {
      title: string
      component: (props: { reviewId: string }) => React.ReactElement
    },
    userId: string
  ) => void
}

const ReviewFeedbackManagementTable: React.FC<
  ReviewFeedbackManagementTableProps
> = ({ headers, tipItems, handleClick }) => {
  return (
    <Table cards className="sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              className={` whitespace-nowrap${
                header.key == 4
                  ? 'whitespace-nowrap text-center'
                  : header.key == 5
                  ? ' text-end'
                  : 'whitespace-nowrap'
              }`}
            >
              {header.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {tipItems.map((item) => (
          <Table.Tr
            key={item.TipId}
          >
            <Table.Td
              className={` shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 ${
                item.status ? 'bg-gray-200' : ''
              }`}
            >
              {date.format(new Date(item.createdAt), 'DD/MM/YYYY')}
            </Table.Td>
            <Table.Td
              className={` shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 ${
                item.status ? 'bg-gray-200' : ''
              }`}
            >
              {item.tipperName || 'N/A'}
            </Table.Td>
            <Table.Td
              className={` shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 ${
                item.status ? 'bg-gray-200' : ''
              }`}
            >
              {item.serviceProviderName || 'N/A'}
            </Table.Td>
            <Table.Td
              className={` shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 ${
                item.status ? 'bg-gray-200' : ''
              }`}
            >
              <Rating
                isToDisplay
                className="w-[10px] gap-[5px]"
                size={20}
                value={item.rating}
              />
            </Table.Td>

            <Table.Td
              className={`cursor-pointer text-end shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 ${
                item.status ? 'bg-gray-200' : ''
              }`}
            >
              <div className="flex justify-end pr-4">
                <Lucide
                  icon="Eye"
                  className="ml-3 h-6 w-6 text-black"
                  onClick={() =>
                    handleClick(
                      SlideoverRegistry.viewReviewFeedbackManagement,
                      item.TipId.toString()
                    )
                  }
                />
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default ReviewFeedbackManagementTable
