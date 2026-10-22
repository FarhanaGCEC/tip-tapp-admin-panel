import { useMemo } from 'react'
import Table from '../../components/common/table'
import RoleUsersTabs from '../../components/country/role-users-tabs'
import { useCompanyStore } from '../../stores/companyStore'
import {
  DRIVERS,
  formatAed,
} from '../../data/fleet-dummy'

const HEADERS = ['Driver', 'City', 'Platforms', 'Car', 'Trips this week', 'Rent', 'Status']

function MultiPlatformPage() {
  const company = useCompanyStore((state) => state.company)

  const rows = useMemo(
    () =>
      DRIVERS.filter(
        (row) => row.platforms.length > 1 && row.platforms.includes(company)
      ),
    [company]
  )

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-4 block h-10 items-center sm:flex">
        <h2 className="mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
          Multi-Platform Drivers
        </h2>
      </div>
      <RoleUsersTabs active="both" />
      <p className="mb-4 text-sm text-slate-500">
        Drivers who take fleet cars out on more than one app.
      </p>
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
              <Table.Td className="font-medium">{row.name}</Table.Td>
              <Table.Td>{row.city}</Table.Td>
              <Table.Td>{row.platforms.join(', ')}</Table.Td>
              <Table.Td>
                {row.car}
                <p className="text-xs text-slate-500">{row.plate}</p>
              </Table.Td>
              <Table.Td>{row.tripsThisWeek}</Table.Td>
              <Table.Td>{formatAed(row.rentThisWeek)}</Table.Td>
              <Table.Td>{row.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {rows.length === 0 ? (
        <p className="mt-4 text-center text-sm text-slate-500">
          No multi-platform drivers on {company}.
        </p>
      ) : null}
    </div>
  )
}

export default MultiPlatformPage
