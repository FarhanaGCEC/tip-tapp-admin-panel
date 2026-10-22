import { useMemo, useState } from 'react'
import Table from '../../components/common/table'
import { FormInput } from '../../components/common/form-elements/components'
import { useCompanyStore } from '../../stores/companyStore'
import { CARS, formatAed } from '../../data/fleet-dummy'

const HEADERS = [
  'Car',
  'Plate',
  'Platform',
  'Driver',
  'City',
  'Daily rent',
  'Status',
]

function CarsPage() {
  const company = useCompanyStore((state) => state.company)
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return CARS.filter((row) => {
      if (row.platform !== company) return false
      if (!needle) return true
      return [row.model, row.plate, row.platform, row.driver, row.city]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [company, query])

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-4 block h-10 items-center sm:flex">
        <h2 className="mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
          Cars
        </h2>
      </div>
      <div className="mb-5">
        <FormInput
          type="text"
          className="box custom-input w-full sm:w-72"
          placeholder="Search car, plate, driver, platform"
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
              <Table.Td className="font-medium">{row.model}</Table.Td>
              <Table.Td>{row.plate}</Table.Td>
              <Table.Td>{row.platform}</Table.Td>
              <Table.Td>{row.driver}</Table.Td>
              <Table.Td>{row.city}</Table.Td>
              <Table.Td>{formatAed(row.dailyRent)}</Table.Td>
              <Table.Td>{row.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {rows.length === 0 ? (
        <p className="mt-4 text-center text-sm text-slate-500">No cars on {company}.</p>
      ) : null}
    </div>
  )
}

export default CarsPage
