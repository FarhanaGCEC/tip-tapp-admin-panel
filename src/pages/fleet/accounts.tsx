import Table from '../../components/common/table'
import PlatformAccounts from '../../components/dashboard/platform-accounts'
import { formatAed, RENTALS } from '../../data/fleet-dummy'
import { useCompanyStore } from '../../stores/companyStore'

const HEADERS = ['Trip', 'Driver', 'Car', 'When', 'Route', 'Gross', 'Fee', 'Driver share', 'Owner', 'Fuel']

function AccountsPage() {
  const company = useCompanyStore((state) => state.company)
  const rows = RENTALS.filter((row) => row.platform === company)

  return (
    <div className="col-span-12 mt-6">
      <PlatformAccounts title="Platform accounts" />
      <section className="mt-8">
        <h3 className="mb-3 text-lg font-medium text-[#2D3748]">{company} ledger</h3>
        <Table cards>
          <Table.Thead variant="default">
            <Table.Tr>
              {HEADERS.map((header) => (
                <Table.Th key={header}>{header}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((row) => (
              <Table.Tr key={row.id}>
                <Table.Td className="font-medium">{row.id}</Table.Td>
                <Table.Td>{row.driver}</Table.Td>
                <Table.Td>
                  {row.car}
                  <p className="text-xs text-slate-500">{row.plate}</p>
                </Table.Td>
                <Table.Td className="whitespace-nowrap text-sm">{row.outTime}</Table.Td>
                <Table.Td className="text-sm">
                  {row.from} to {row.to}
                </Table.Td>
                <Table.Td>{formatAed(row.grossRent)}</Table.Td>
                <Table.Td>{formatAed(row.platformFee)}</Table.Td>
                <Table.Td>{formatAed(row.driverShare)}</Table.Td>
                <Table.Td>{formatAed(row.ownerRent)}</Table.Td>
                <Table.Td>{formatAed(row.fuel)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </section>
    </div>
  )
}

export default AccountsPage
