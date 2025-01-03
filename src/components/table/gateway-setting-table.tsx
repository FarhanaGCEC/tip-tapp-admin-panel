import React, { useState } from 'react'
import Table from '../../components/common/table'
import SlideoverRegistry, {
  FormContents,
} from '../../pages/user-management/slideover-registry'
import Label from '../common/label/active-banned-new-label'
import Lucide from '../common/lucide'
import { GatewayItem } from '../../types/gatewaytype'
import { GatewaySettingUpdate } from '../../api/gateway-setting-management/gateway-and-tip-setting-management'
import { Dialog } from '../common/headless'

interface GatewaySettingTableProps {
  headers: { key: number; label: string }[]
  settingItems: GatewayItem[]
  handleClick: (
    formContent: FormContents,
    userId: string,
    title?: string
  ) => void
}

const GatewaySettingTable: React.FC<GatewaySettingTableProps> = ({
  headers,
  settingItems,
  handleClick,
}) => {
  const [deleteConfirmationModal, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleError = (message: string) => {
    setErrorMessage(message)
    setErrorDialogOpen(true) 
  }

  const { mutate, isLoading } = GatewaySettingUpdate(handleError)

  const handleUpdate = (settingid: string, isActive: boolean) => {
    mutate({ settingid: settingid, updatedData: { is_active: isActive } })
  }

  return (
    <>
      <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`whitespace-nowrap border-b-0 ${
                  header.key === 3
                    ? ' pr-12 text-end'
                    : header.key === 4
                    ? '  text-end pr-10 '
                    : ''
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {settingItems.map((item) => (
            <Table.Tr className="intro-x h-[68px] drop-shadow-lg" key={item.id}>
              <Table.Td className="border-b-0 bg-white    shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <div className="whitespace-nowrap   ">{item?.gateway_name}</div>
              </Table.Td>
              <Table.Td className="border-b-0 bg-white  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <div className="whitespace-nowrap ">
                  {item?.gateway_type?.charAt(0).toUpperCase() +
                    item?.gateway_type?.slice(1)}
                </div>
              </Table.Td>
              <Table.Td className=" border-b-0 bg-white text-center shadow-[20px_3px_20px_#0000000b]  first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <div className="flex justify-end whitespace-nowrap ">
                  {item.is_active ? (
                    <Label
                      labledata={'Active'}
                      lablestyle={'bg-[#03C50B] max-w-[115px] min-w-[115px]'}
                    />
                  ) : (
                    <Label
                      labledata={'Inactive'}
                      lablestyle={'bg-[#D70000] max-w-[115px] min-w-[115px]'}
                    />
                  )}
                </div>
              </Table.Td>
              <Table.Td className=" h-[68px]  cursor-pointer     items-center justify-center border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <div className="  flex flex-row justify-end  pr-2 ">
                  <Lucide
                    icon="Eye"
                    className="ml-3 h-6 w-6 text-black"
                    onClick={() => {
                      handleClick(
                        SlideoverRegistry.viewGatewaySetting,
                        item.id.toString()
                      )
                    }}
                  />
                  <Lucide
                    icon="Edit"
                    className="ml-3 h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(
                        SlideoverRegistry.GatewaySettingUpdate,
                        item.id.toString()
                      )
                    }
                  />

                  {item.is_active ? (
                    <Lucide
                      icon={'XCircle'}
                      className={`ml-3 h-5 w-5   ${'text-red-500'}`}
                      onClick={() => handleUpdate(item.id.toString(), false)}
                    />
                  ) : (
                    <Lucide
                      icon={'CheckCircle'}
                      className={`ml-3 h-5 w-5   ${'text-green-500'}`}
                      onClick={() => handleUpdate(item.id.toString(), true)}
                    />
                  )}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setErrorDialogOpen(false)
          setErrorMessage(null)
        }}
      >
        <Dialog.Panel>
          <div className="mt-44 p-5 text-center">
            <Lucide
              icon="XCircle"
              className="mx-auto mt-3 h-16 w-16 text-danger"
            />
            <div className="mt-5 text-3xl">Error</div>
            <div className="mt-2 text-slate-500">
              {errorMessage || 'An unexpected error occurred.'}
            </div>
          </div>
          <div className="px-5 pb-8 text-center"></div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default GatewaySettingTable
