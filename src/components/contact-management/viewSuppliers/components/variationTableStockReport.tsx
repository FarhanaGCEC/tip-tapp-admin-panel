/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash'
import Table from '../../../common/table'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../../common/button'
import SharedDataContainer from '../../../../containers/sharedData'
import Lucide from '../../../common/lucide'


function VariationTableStockReport() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')

  return (
    <div className="overflow-y-auto overflow-x-scroll ">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Products
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
             SKU
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
              Purchase Quantity
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Total Transfer In
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
              Total Sold
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
            Total Transfer Out
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
            Total Returned
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
            Current Stock
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
            Current Stock Value
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
          <Table.Td >Iphone</Table.Td>
            <Table.Td className="">23467</Table.Td>
            <Table.Td className="text-right">200 Pc(s)</Table.Td>
            <Table.Td className="text-right">Rs.20,000,000.00</Table.Td>
            <Table.Td className="text-right">Rs.200,000.00</Table.Td>
            <Table.Td className="text-right">Rs.20,000,000.00</Table.Td>
            <Table.Td className="text-right">Rs.20,000,000.00</Table.Td>
            <Table.Td className="text-right">200 Pc(s)</Table.Td>
            <Table.Td className="text-right">Rs.20,000,000.00</Table.Td>
          </Table.Tr>
         
         
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTableStockReport