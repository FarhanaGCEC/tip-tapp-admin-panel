/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Table from '../../../common/table'
import SharedDataContainer from '../../../../containers/sharedData'
import Lucide from '../../../common/lucide'

function VariationTable() {
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
  const [basicModalPreview, setBasicModalPreview] = useState(false)

  return (
    <div className=" h-96 overflow-y-auto">
      <Table>
        <Table.Thead variant="default">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              #
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Customer Name
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Transaction
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className="!px-2">1</Table.Td>
            <Table.Td className="!px-2">H.f Jayantha</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">2</Table.Td>
            <Table.Td className="!px-2">G.g Kumara</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">3</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">4</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>{' '}
          <Table.Tr>
            <Table.Td className="!px-2">5</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">6</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">7</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">8</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">9</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className="!px-2">10</Table.Td>
            <Table.Td className="!px-2">Walking Customer</Table.Td>
            <Table.Td className="!px-2">KOT0062</Table.Td>
            <Table.Td className="!px-2">
              <div className="mt-3 flex w-20 text-slate-500 xl:mt-0">
                <a>
                  <Lucide icon="Edit" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Printer" className="h-4 w-4" />
                </a>
                <a href="" className="ml-3 xl:ml-5">
                  <Lucide icon="Mail" className="h-4 w-4" />
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTable
