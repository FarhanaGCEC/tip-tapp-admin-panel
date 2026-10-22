import { useMemo, useState } from 'react'
import Table from '../../components/common/table'
import { FormInput } from '../../components/common/form-elements/components'
import { useCompanyStore } from '../../stores/companyStore'
import {
  formatAed,
  RENTALS,
  RentalRecord,
} from '../../data/fleet-dummy'

const HEADERS = [
  'Rental',
  'Platform',
  'Driver',
  'Car',
  'When',
  'Where',
  'Rent details',
  'Status',
]

function statusClass(status: RentalRecord['status']) {
  if (status === 'On trip') return 'bg-emerald-100 text-emerald-800'
  if (status === 'Scheduled') return 'bg-amber-100 text-amber-800'
  return 'bg-slate-100 text-slate-700'
}

function RentalsPage() {
  const company = useCompanyStore((state) => state.company)
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return RENTALS.filter((row) => {
      if (row.platform !== company) return false
      if (!needle) return true
      return [
        row.id,
        row.driver,
        row.car,
        row.plate,
        row.platform,
        row.from,
        row.to,
        row.city,
      ]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [company, query])

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-4 block items-center sm:flex">
        <h2 className="mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
          Rentals
        </h2>
        <p className="text-sm text-slate-500">
          Which driver took which car, when, and where — with the rent split.
          Showing {company}.
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <FormInput
          type="text"
          className="box custom-input w-full sm:w-72"
          placeholder="Search driver, car, plate, place"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl bg-white px-4 py-16 text-center text-slate-500 shadow-sm">
          No rentals match this filter.
        </div>
      ) : (
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
                <Table.Td className="whitespace-nowrap font-medium">
                  {row.id}
                  <p className="text-xs font-normal text-slate-500">{row.city}</p>
                </Table.Td>
                <Table.Td>{row.platform}</Table.Td>
                <Table.Td>
                  <p className="font-medium">{row.driver}</p>
                  <p className="text-xs text-slate-500">{row.phone}</p>
                </Table.Td>
                <Table.Td>
                  <p>{row.car}</p>
                  <p className="text-xs text-slate-500">{row.plate}</p>
                </Table.Td>
                <Table.Td className="whitespace-nowrap text-sm">
                  <p>Out {row.outTime}</p>
                  <p>In {row.inTime}</p>
                  <p className="text-xs text-slate-500">
                    {row.duration}
                    {row.distanceKm ? ` · ${row.distanceKm} km` : ''}
                  </p>
                </Table.Td>
                <Table.Td className="text-sm">
                  <p>{row.from}</p>
                  <p className="text-slate-500">to {row.to}</p>
                </Table.Td>
                <Table.Td className="whitespace-nowrap text-sm">
                  <p>Gross {formatAed(row.grossRent)}</p>
                  <p>Platform fee {formatAed(row.platformFee)}</p>
                  <p>Driver {formatAed(row.driverShare)}</p>
                  <p>Owner {formatAed(row.ownerRent)}</p>
                  <p>Fuel {formatAed(row.fuel)}</p>
                </Table.Td>
                <Table.Td>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(row.status)}`}
                  >
                    {row.status}
                  </span>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </div>
  )
}

export default RentalsPage
