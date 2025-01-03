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
import {useRef, useState } from 'react'
import { Dialog } from '../../../components/common/headless'
import Table from '../../../components/common/table'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/common/button'
import SharedDataContainer from '../../../containers/sharedData'
import Lucide from '../../../components/common/lucide'


function VariationTableLedger() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const handleChange = () => {}
  
  return (
    <div className="overflow-y-auto overflow-x-scroll ">
                <Table>
                  <Table.Thead
                    variant="default"
                    className="bg-primary text-white"
                  >
                    <Table.Tr>
                      <Table.Th className="whitespace-nowrap border-b-2 dark:border-darkmode-400">
                        Date
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Reference No
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Type
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Location
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Payment status
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Total
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Debit
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Credit
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Payment Method
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap border-b-2 text-right dark:border-darkmode-400">
                        Others
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className="whitespace-nowrap font-medium">
                          02 Jan 2023
                        </div>
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                        2
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Paid
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Card
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        No
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className="whitespace-nowrap font-medium">
                          02 Jan 2023
                        </div>
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                        2
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Paid
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Rs.500.00
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        Card
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right font-medium dark:border-darkmode-400">
                        No
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
  )
}

export default VariationTableLedger