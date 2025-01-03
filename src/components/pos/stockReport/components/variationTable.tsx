/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Table from '../../../common/table'
import SharedDataContainer from '../../../../containers/sharedData'
import Button from '../../../common/button'
import { Dialog } from '../../../common/headless'
import Lucide from '../../../common/lucide'

function VariationTableHistory() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')
  const [] = useState<boolean>(false)
  const {} = SharedDataContainer.useContainer()
  const [] = useState('')
  const [buttonModalPreview, setButtonModalPreview] = useState(false)

  return (
    <div className="overflow-x-auto">
      <Table bordered>
        <Table.Thead variant="default">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              SKU
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Product
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Location
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-right text-slate-500 dark:bg-darkmode-800">
              Unit Price
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Action
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-right text-slate-500 dark:bg-darkmode-800">
              Current Stock
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className="!px-4">776677</Table.Td>
            <Table.Td className="!px-2">Apple Watch</Table.Td>
            <Table.Td className="!px-2">Bunny Outlet</Table.Td>
            <Table.Td className="text-right">Rs:1,000.00</Table.Td>
            <Table.Td className="!px-2">
              <div className="text-center">
                <Button
                  as="a"
                  href="#"
                  variant="primary"
                  className="px-4 py-1"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    setButtonModalPreview(true)
                  }}
                >
                  View Group Prices
                </Button>
              </div>
              {/* END: Modal Toggle */}
              {/* BEGIN: Modal Content */}
              <Dialog
              open={buttonModalPreview}
              onClose={() => {
                setButtonModalPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'Selected Product Name'
                  )}`}</h2>
                </Dialog.Title>
                <a
onClick={(event: React.MouseEvent) => {
  event.preventDefault()
  setButtonModalPreview(false)
}}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>
                    <div className="overflow-x-auto p-3">
                      <Table>
                        <Table.Thead variant="dark">
                          <Table.Tr>
                            <Table.Th className="whitespace-nowrap">
                              Default Selling Price (Inc.Tax)
                            </Table.Th>
                            <Table.Th className="whitespace-nowrap">
                              Group Prices
                            </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          <Table.Tr>
                            <Table.Td>Rs:10,000.00</Table.Td>
                            <Table.Td>Whole Sale 0 Discount sale - 0</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>Rs:100.00</Table.Td>
                            <Table.Td>Whole Sale 0 Discount sale - 0</Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                      </Table>
                    </div>
                    <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setButtonModalPreview(false)
                    }}
                    className=" mr-1 w-24"
                  >
                    Close
                  </Button>
                </div>
                </Dialog.Panel>
              </Dialog>
            </Table.Td>
            <Table.Td className="text-right">199.999.000.00 Pc(s)</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-4">776677</Table.Td>
            <Table.Td className="!px-2">Apple Watch</Table.Td>
            <Table.Td className="!px-2">Bunny Outlet</Table.Td>
            <Table.Td className="text-right">Rs:1,000.00</Table.Td>
            <Table.Td className="!px-2">
              <div className="text-center">
                <Button
                  as="a"
                  href="#"
                  variant="primary"
                  className="px-4 py-1"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    setButtonModalPreview(true)
                  }}
                >
                  View Group Prices
                </Button>
              </div>
              {/* END: Modal Toggle */}
              {/* BEGIN: Modal Content */}
            </Table.Td>
            <Table.Td className="text-right">199.999.000.00 Pc(s)</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTableHistory
