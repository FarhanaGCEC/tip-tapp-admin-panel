/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Lucide from '../common/lucide'

import EditPencil from '../../assets/images/svg/edit-pencil.svg'
import EditFooterManagementDetails from '../slider/footer-management/edit-footer-management'
import Table from '../../base-components/Table'
import ViewFooterManagementDetails from '../slider/footer-management/view-footer-management'
import SlideoverRegistry from '../../pages/pos/slideover-registry'

interface FormContent {
  title: string
  component: (props: {
    userId: string
    content: any
    mainTopic: string
  }) => React.ReactElement
}

interface FooterManagementTableProps {
  headers: { key: number; label: string }[]
  footerItems: any[]
  handleClick: (formContent: FormContent, item: any) => void
}

const FooterManagementTable: React.FC<FooterManagementTableProps> = ({
  headers,
  footerItems,
  handleClick,
}) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput)

    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return inputDate.toLocaleDateString('en-US', options)
  }
  return (
    <>
      <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`${
                  header.key == 3
                    ? 'whitespace-nowrap border-b-0 text-center'
                    : header.key == 4
                    ? ' border-b-0 pr-6 text-end'
                    : 'whitespace-nowrap border-b-0'
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {footerItems.map((item) => (
            <Table.Tr
              className="intro-x h-[68px] drop-shadow-lg "
              key={item.id}
            >
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {getDateValue(item.updatedAt)}
              </Table.Td>
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {item.name}
              </Table.Td>
              <Table.Td className="border-b-0 bg-white text-center shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                Admin
              </Table.Td>
              <Table.Td className="cursor-pointer border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <div className="flex items-center justify-end  gap-3  ">
                  <Lucide
                    icon="Eye"
                    className=" h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(
                        {
                          title: `View  Footer List `,
                          component: ViewFooterManagementDetails as any,
                        },
                        item
                      )
                    }
                  />
                  <Lucide
                    icon="Edit"
                    className=" h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(
                        {
                          title: `Edit Footer List`,
                          component: EditFooterManagementDetails as any,
                        },
                        item
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

export default FooterManagementTable
