import React, { useState } from 'react'
import Table from '../../components/common/table'
import SlideoverRegistry, {
  FormContents,
} from '../../pages/user-management/slideover-registry'
import Label from '../common/label/active-banned-new-label'
import Lucide from '../common/lucide'
import { GatewayItem, isPaymentGateway } from '../../types/gatewaytype'
import { GatewaySettingUpdate } from '../../api/gateway-setting-management/gateway-and-tip-setting-management'
import { Dialog } from '../common/headless'
import SharedDataContainer from '../../containers/sharedData'
import Toast from '../../utils/notification'
import { Icons, NotificationTypes } from '../../constants'

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
  const { setNotification } = SharedDataContainer.useContainer()
  const [deleteConfirmationModal, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleError = (message: string) => {
    setErrorMessage(message)
    setErrorDialogOpen(true)
  }

  const { mutate } = GatewaySettingUpdate(handleError)

  const handleUpdate = (item: GatewayItem, isActive: boolean) => {
    mutate(
      { settingid: item.id.toString(), updatedData: { is_active: isActive } },
      {
        onSuccess: () => {
          const paymentGateway = isPaymentGateway(item.gateway_type)
          const message = isActive
            ? paymentGateway
              ? `${item.gateway_name} is now the active payment gateway. Other gateways were deactivated automatically.`
              : `${item.gateway_name} is now active. Other gateways were deactivated automatically.`
            : `${item.gateway_name} has been deactivated.`

          setNotification({
            title: 'Success',
            message,
            icon: Icons.CHECKCIRCLE,
            type: NotificationTypes.SUCCESS,
          })
          Toast()
        },
      }
    )
  }

  return (
    <>
      <Table cards className="sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`whitespace-nowrap ${
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
            <Table.Tr key={item.id}>
              <Table.Td >
                <div className="whitespace-nowrap">{item?.gateway_name}</div>
              </Table.Td>
              <Table.Td >
                <div className="whitespace-nowrap">
                  {item?.gateway_type?.charAt(0).toUpperCase() +
                    item?.gateway_type?.slice(1)}
                </div>
              </Table.Td>
              <Table.Td className="text-center">
                <div className="flex justify-end whitespace-nowrap">
                  {item.is_active ? (
                    <Label
                      labledata={
                        isPaymentGateway(item.gateway_type)
                          ? 'Active (Payment)'
                          : 'Active'
                      }
                      lablestyle={'bg-[#2F9E44] min-w-[140px]'}
                    />
                  ) : (
                    <Label
                      labledata={'Inactive'}
                      lablestyle={'bg-[#D70000] max-w-[115px] min-w-[115px]'}
                    />
                  )}
                </div>
              </Table.Td>
              <Table.Td className="cursor-pointer items-center justify-center">
                <div className="flex flex-row justify-end pr-2">
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
                      onClick={() => handleUpdate(item, false)}
                    />
                  ) : (
                    <Lucide
                      icon={'CheckCircle'}
                      className={`ml-3 h-5 w-5   ${'text-green-500'}`}
                      onClick={() => handleUpdate(item, true)}
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
            <div className="mt-2">
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
