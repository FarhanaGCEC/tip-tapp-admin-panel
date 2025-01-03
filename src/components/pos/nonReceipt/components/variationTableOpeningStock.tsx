/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import Table from '../../../common/table'
import { FormInput, InputGroup } from '../../../common/form-elements/components'
import { DateElement } from '../../../common/form-elements'

function VariationTableOpeningStock() {
    const [date, setDate] = useState('')

  return (
    <div className="mt-3 overflow-x-auto">
      <Table bordered>
        <Table.Thead variant="default">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Location
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Quantity
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Unit Cost (Before Tax)
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Expiry Date
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Lot Number
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
              Subtotal (Before Tax)
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className="!px-4">Tipapp-Demo (BL0001)</Table.Td>
            <Table.Td className="!px-4">
              <InputGroup className="flex-1">
                <FormInput type="number" placeholder="0" />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-4">
              {' '}
              <InputGroup className="flex-1">
                <FormInput type="text" />
              </InputGroup>
            </Table.Td>
            <Table.Td>
              <DateElement
                value={date}
                onChange={setDate}
                options={{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                name="date_of_birth"
                id="date_of_birth"
              />
            </Table.Td>
            <Table.Td>
              {' '}
              <InputGroup className="flex-1">
                <FormInput type="text" />
              </InputGroup>
            </Table.Td>
            <Table.Td className=" text-right">100</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTableOpeningStock
