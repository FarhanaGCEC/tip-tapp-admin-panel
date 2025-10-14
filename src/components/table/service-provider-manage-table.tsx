/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-curly-brace-presence */
import { useState } from 'react'
import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { TipItem } from '../../types/tpandsptype'
import Label from '../common/label/active-banned-new-label'
import Lucide from '../common/lucide'
import { useDeactiveUserAndActive } from '../../api/tp-and-sp-management/tp-sp-management'
import StatusButton from '../common/button/statusBtn'

interface TpAndSpManagemenTableProps {
  headers: { key: number; label: string }[]
  tipItems: TipItem[]
  handleClick: (
    formContent: {
      title: string
      component: (props: {
        userId: string
        Ispending: boolean
      }) => React.ReactElement
    },
    userId: string,
    Ispending: boolean
  ) => void
  pending: boolean
}

const SPManagemenTable: React.FC<TpAndSpManagemenTableProps> = ({
  headers,
  tipItems,
  pending,
  handleClick,
}) => {
  const { mutate: deactivateActivateUser } = useDeactiveUserAndActive()

  const DeactiveAndActivehandle = (userid: string, typesatus: string) => {
    deactivateActivateUser({ userid, satustype: typesatus })
  }
  const Tdheader = headers
    .map((header) => {
      if (pending && header.label === 'STATUS') {
        return { ...header, label: 'EMIRATES ID' }
      }
      return header
    })
    .filter((header) => !(pending && header.label === 'STATUS'))
  return (
    <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {Tdheader.map((header) => (
            <Table.Th
              key={header.key}
              className={`whitespace-nowrap border-b-0  ${
                header.label.toLowerCase() === 'status' ? ' px-10 ' : ''
              }`}
            >
              {header.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {tipItems.map((item) => (
          <Table.Tr className="intro-x h-[68px] drop-shadow-lg " key={item.id}>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.FirstName + ' ' + item.LastName || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Email || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Whatsapp || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Phone || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Country || 'no'}
            </Table.Td>
            {pending ? (
              <>
                <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                  {item.EmiratesId || 'Not Provided Yet'}
                </Table.Td>
              </>
            ) : (
              <Table.Td className=" border-b-0  bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <StatusButton status={item?.Status} />
              </Table.Td>
            )}
            <Table.Td className="cursor-pointer border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              <div className=" flex  flex-row  ">
                <Lucide
                  icon="Eye"
                  className="ml-3 h-10 w-6 text-black"
                  onClick={() =>
                    handleClick(
                      SlideoverRegistry.viewTpAndSpManagement,
                      item.KeyCloakID,
                      pending
                    )
                  }
                />
                {pending ? (
                  <>
                    <Lucide
                      icon={'CheckCircle'}
                      className="ml-3 h-10 w-5 text-green-500"
                      onClick={() => {
                        DeactiveAndActivehandle(item.KeyCloakID, item.Status)
                      }}
                    />
                    <Lucide
                      icon={'XCircle'}
                      className="ml-3 h-10 w-5 text-red-500"
                      onClick={() => {
                        DeactiveAndActivehandle(item.KeyCloakID, 'active')
                      }}
                    />
                  </>
                ) : null}
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default SPManagemenTable
