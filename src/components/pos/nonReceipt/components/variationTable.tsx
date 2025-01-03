/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Table from '../../../common/table'
import Lucide from '../../../common/lucide'
import { FormInput, InputGroup } from '../../../common/form-elements/components'
import UploadFilesElement from '../../../common/form-elements/upload-files-element'
import { useTranslation } from 'react-i18next'
import Tippy from '../../../common/tippy'

function VariationTable() {
  const {
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')
  const { register } = useForm({
    mode: 'onChange',
  })
  const [tooltipContent1] = useState(
    'Default profit margin for the product. You can manage default profit margin in Business Settings.'
  )
  const [tooltipContent2] = useState(
    'The DEFAULT PURCHASE PRICE means the Last Added/Edited PURCHASE PRICE AFTER DISCOUNT.'
  )

  return (
    <div className="mt-3 overflow-x-auto">
      <Table bordered>
        <Table.Thead variant="default">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              <div className="flex items-center">
                Default Purchase Price
                <Tippy content={tooltipContent2}>
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className="-mt-0.5 ml-2 h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy>
                
              </div>
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              <div className="flex items-center">
                x Margin %{' '}
                <Tippy content={tooltipContent1}>
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className="-mt-0.5 ml-2 h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy>
              </div>
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Default Selling Price
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Minimum Selling price
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className="flex !px-4">
              <InputGroup className="flex-1">
                <FormInput type="text" placeholder="Exc.tax:*" />
              </InputGroup>
              <InputGroup className="ml-2 flex-1">
                <FormInput type="text" placeholder="Inc.tax:*" />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-4">
              {' '}
              <InputGroup className="flex-1">
                <FormInput type="text" />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-4">
              {' '}
              <InputGroup className="flex-1">
                <FormInput type="text" placeholder="Exc.tax:*" />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-4">
              {' '}
              <InputGroup className="flex-1">
                <FormInput type="text" placeholder="Exc.tax:*" />
              </InputGroup>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTable
