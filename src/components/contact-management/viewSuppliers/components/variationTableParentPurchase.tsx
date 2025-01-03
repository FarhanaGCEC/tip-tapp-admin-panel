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
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  FormInput,
  InputGroup,
} from '../../../../components/common/form-elements/components'

function VariationTableParentPurchase() {
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
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            #
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Products Name
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Lot No
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Unit Price
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Purchase Quantity
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Quantity Remaining
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Return Quantity
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Return Subtotal
            </Table.Th>

          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className="!px-4">77</Table.Td>
            <Table.Td className="!px-4">Apple</Table.Td>
            <Table.Td className="!px-2">70000</Table.Td>
            <Table.Td className="!px-4">Rs. 100.00</Table.Td>
            <Table.Td className="!px-4">1000 Pc(s)</Table.Td>
            <Table.Td className="!px-4">1000 Pc(s)</Table.Td>
            <Table.Td className="!px-4"><InputGroup className="flex-1">
                                    <FormInput type="text" placeholder="0.00" />
                                  </InputGroup></Table.Td>
            <Table.Td className="!px-4">Rs.1000 </Table.Td>
          </Table.Tr> 
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTableParentPurchase