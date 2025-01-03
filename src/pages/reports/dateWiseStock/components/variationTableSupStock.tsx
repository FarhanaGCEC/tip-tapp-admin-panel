/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import Table from '../../../../components/common/table'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../../../components/common/button'
import SharedDataContainer from '../../../../containers/sharedData'
import Lucide from '../../../../components/common/lucide'
import Tippy from '../../../../components/common/tippy'
import {
  InputElement, SelectElement, DateElement, TextareaElement,
} from '../../../../components/common/form-elements'
import { Dialog } from '../../../../components/common/headless'

function VariationTableSupStockReport() {

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')
  const [tooltipContent1] = useState(
    'Stock Left from Total Manufactured'
  )
  const [buttonViewPricePreview, setViewPricePreview] = useState(false)


  return (
    <div className="overflow-y-auto overflow-x-scroll ">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
          <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Supplier Name
            </Table.Th>
          <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Products
            </Table.Th>
          <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             SKU
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Purchase Return
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Total Sell
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Total Sell Return
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Total Stock Transfer Out
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Total Stock Adjustment
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Closing Stock
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Last Purchased Price
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        <Table.Tr>
          <Table.Td className="!px-4">23467</Table.Td>
            <Table.Td className="!px-4">Iphone</Table.Td>
            <Table.Td className="!px-4">1234</Table.Td>
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>  
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right"> 20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right"> 20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right"> 20,000,000.00</div></Table.Td>
          </Table.Tr>
        
         
        </Table.Tbody>
      </Table>
    </div>
  )
}
                
export default VariationTableSupStockReport