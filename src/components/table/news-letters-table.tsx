/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Lucide from '../common/lucide'
import EditPencil from '../../assets/images/svg/edit-pencil.svg'
import Label from '../common/label/active-banned-new-label'
import ViewNewsLettersDetails from '../slider/news-letters/view-newsletters'
import StatusButton from '../common/button/statusBtn'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import Table from '../common/table'
import EditFooterManagementDetails from '../slider/footer-management/edit-footer-management'
import { DateTime } from 'luxon'

interface FormContent {
  title: string
  component: (props: {
    userletterId: string
    content: any
    mainTopic: string
  }) => React.ReactElement
}

interface NewsLettersTableProps {
  headers: { key: number; label: string }[]
  newsletterItems: any
  // handleClick: (formContent: FormContent, item: any) => void
  handleClick: (
    formContent: {
      title: string
      component: (props: { userletterId: number }) => React.ReactElement
    },
    userletterId: number
  ) => void
}

const NewsLettersTable: React.FC<NewsLettersTableProps> = ({
  headers,
  newsletterItems,
  handleClick,
}) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput)

    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return inputDate.toLocaleDateString('en-US', options)
  }

  return (
    <>
      <Table cards className="sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`${
                  header.key == 3
                    ? 'whitespace-nowrap  '
                    : header.key == 4
                    ? ' whitespace-nowrap pr-24 text-center '
                    : header.key == 5
                    ? '  text-right '
                    : 'whitespace-nowrap'
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {newsletterItems.data.map((item: any) => (
            <Table.Tr
              key={item.id}
            >
              <Table.Td >
                {/* Create Date - using dateTime field */}
                {item.dateTime
                  ? DateTime.fromISO(item.dateTime)
                      .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone) // Set to user's local timezone
                      .toLocaleString({
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })
                  : '-'}
              </Table.Td>
              <Table.Td >
                {/* Received Date - using sentAt field with meaningful text for null */}
                {item.sentAt
                  ? DateTime.fromISO(item.sentAt)
                      .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
                      .toLocaleString({
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })
                  : 'Not Received'}
              </Table.Td>
              <Table.Td >
                {item.title.length > 20
                  ? `${item.title.slice(0, 20)} .....`
                  : item.title}
              </Table.Td>
              <Table.Td className="text-center">
                {/* Status column - showing status from API */}
                <StatusButton status={item.status} />
              </Table.Td>
              <Table.Td className="cursor-pointer">
                <div className="flex items-center justify-end">
                  {/* <Lucide
                    icon="Eye"
                    className="h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(
                        {
                          title: `View ${item.name} Details`,
                          component: ViewFooterManagementDetails as any,
                        },
                        item
                      )
                    }
                  /> */}
                  <Lucide
                    icon="Edit"
                    className="h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(SlideoverRegistry.EditNewsLettes, item.id)
                    }
                  />
                  <Lucide
                    icon="Eye"
                    className="ml-3 h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(
                        SlideoverRegistry.viewNewsLetterManagement,
                        item.id
                      )
                    }
                  />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}

export default NewsLettersTable
