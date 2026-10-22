import { useMemo, useState } from 'react'
import Table from '../../components/common/table'
import { FormInput } from '../../components/common/form-elements/components'
import { useCompanyStore } from '../../stores/companyStore'
import {
  DRIVERS,
  formatAed,
} from '../../data/fleet-dummy'

const HEADERS = [
  'Driver',
  'Phone',
  'City',
  'Platforms',
  'Car out',
  'This week',
  'Status',
]

function DriversPage() {
  const company = useCompanyStore((state) => state.company)
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return DRIVERS.filter((row) => {
      if (!row.platforms.includes(company)) return false
      if (!needle) return true
      return [row.name, row.phone, row.car, row.plate, row.platforms.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [company, query])

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-4 block h-10 items-center sm:flex">
        <h2 className="mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
          Drivers
        </h2>
      </div>
      <div className="mb-5">
        <FormInput
          type="text"
          className="box custom-input w-full sm:w-72"
          placeholder="Search driver, car, platform"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
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
              <Table.Td>{row.phone}</Table.Td>
              <Table.Td>{row.city}</Table.Td>
              <Table.Td>{row.platforms.join(', ')}</Table.Td>
              <Table.Td>
                <p>{row.car}</p>
                <p className="text-xs text-slate-500">{row.plate}</p>
              </Table.Td>
              <Table.Td>
                <p>{row.tripsThisWeek} trips</p>
                <p className="text-xs text-slate-500">{formatAed(row.rentThisWeek)}</p>
              </Table.Td>
              <Table.Td>{row.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {rows.length === 0 ? (
        <p className="mt-4 text-center text-sm text-slate-500">No drivers on {company}.</p>
      ) : null}
    </div>
  )
}

export default DriversPage
