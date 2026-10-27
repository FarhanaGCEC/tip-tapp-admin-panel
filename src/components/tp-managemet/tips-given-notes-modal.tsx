import { useMemo } from 'react'
import Dialog from '../common/headless/Dialog'
import Lucide from '../common/lucide'
import Table from '../common/table'
import { GetTips } from '../../api/tip-management'
import { TipItem } from '../../types/tips'
import { formatDisplayAmount, readDisplayMoney } from '../../utils/formatMoney'
import { downloadTipsExcel } from '../../utils/exportTipManagementExcel'
import { formatCountryName } from '../../utils/countryLabels'
import { useCountryStore } from '../../stores/countryStore'
import NoDataFound from '../../assets/images/NoDataFound.png'

type TipDirection = 'sent' | 'received'

type TipActivityRow = TipItem & { direction: TipDirection }

function formatTipDateTime(value?: string): { date: string; time: string } {
  if (!value) return { date: '—', time: '—' }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return { date: value, time: '—' }
  return {
    date: parsed.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    time: parsed.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  }
}

function namesMatch(a?: string | null, b?: string | null): boolean {
  const left = (a || '').trim().toLowerCase()
  const right = (b || '').trim().toLowerCase()
  if (!left || !right) return false
  return left === right || left.includes(right) || right.includes(left)
}

function DirectionBadge({ direction }: { direction: TipDirection }) {
  const isSent = direction === 'sent'
  return (
    <span
      className={
        isSent
          ? 'inline-flex rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700'
          : 'inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700'
      }
    >
      {isSent ? 'Sent' : 'Received'}
    </span>
  )
}

function TipsActivityTable({
  items,
  dualRole,
  fallbackCountry,
}: {
  items: TipActivityRow[]
  dualRole: boolean
  fallbackCountry?: string | null
}) {
  const headers = dualRole
    ? [
        '#',
        'Type',
        'Date',
        'Time',
        'Tipper',
        'Tipper Country',
        'Service Provider',
        'Service Provider Country',
        'Amount',
        'Currency',
      ]
    : [
        '#',
        'Date',
        'Time',
        'Tipper',
        'Tipper Country',
        'Service Provider',
        'Service Provider Country',
        'Amount',
        'Currency',
      ]

  return (
    <Table cards>
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((label) => (
            <Table.Th
              key={label}
              className={
                label === 'Amount' || label === 'Currency' ? 'text-end' : ''
              }
            >
              {label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.map((item) => {
          const { date, time } = formatTipDateTime(item.createdAt)
          const money = readDisplayMoney(item.amounts ?? item)
          return (
            <Table.Tr key={`${item.direction}-${item.TipId}`}>
              <Table.Td className="whitespace-nowrap font-medium">
                #{item.TipId}
              </Table.Td>
              {dualRole ? (
                <Table.Td>
                  <DirectionBadge direction={item.direction} />
                </Table.Td>
              ) : null}
              <Table.Td className="whitespace-nowrap">{date}</Table.Td>
              <Table.Td className="whitespace-nowrap">{time}</Table.Td>
              <Table.Td className="font-medium">
                {item.tipperName || '—'}
              </Table.Td>
              <Table.Td>
                {formatCountryName(item.tipperCountry || fallbackCountry)}
              </Table.Td>
              <Table.Td className="font-medium">
                {item.serviceProviderName || '—'}
              </Table.Td>
              <Table.Td>
                {formatCountryName(
                  item.serviceProviderCountry || fallbackCountry
                )}
              </Table.Td>
              <Table.Td className="whitespace-nowrap text-end font-semibold">
                {formatDisplayAmount(item.amounts ?? item)}
              </Table.Td>
              <Table.Td className="whitespace-nowrap text-end">
                {money?.currency || '—'}
              </Table.Td>
            </Table.Tr>
          )
        })}
      </Table.Tbody>
    </Table>
  )
}

function TipsGivenContent({
  userName,
  dualRole,
  onClose,
}: {
  userName: string
  dualRole: boolean
  onClose: () => void
}) {
  const countryCode = useCountryStore((state) => state.countryCode)
  const sentQuery = GetTips(userName, '', '', 1, 100, 0, 0, 'given')
  const receivedQuery = GetTips(
    userName,
    '',
    '',
    1,
    100,
    0,
    0,
    'received',
    { enabled: dualRole }
  )

  const items = useMemo(() => {
    const sent = (sentQuery.data?.data?.items ?? [])
      .filter((item) => namesMatch(item.tipperName, userName))
      .map((item): TipActivityRow => ({ ...item, direction: 'sent' }))

    if (!dualRole) return sent

    const received = (receivedQuery.data?.data?.items ?? [])
      .filter((item) => namesMatch(item.serviceProviderName, userName))
      .map((item): TipActivityRow => ({ ...item, direction: 'received' }))

    const merged = [...sent, ...received]
    merged.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime() || 0
      const bTime = new Date(b.createdAt).getTime() || 0
      return bTime - aTime
    })
    return merged
  }, [
    dualRole,
    receivedQuery.data?.data?.items,
    sentQuery.data?.data?.items,
    userName,
  ])

  const isLoading =
    sentQuery.isLoading || (dualRole && receivedQuery.isLoading)
  const isError = sentQuery.isError || (dualRole && receivedQuery.isError)
  const canDownload = !isLoading && !isError && items.length > 0

  const handleDownload = () => {
    if (!canDownload) return
    const safeName = (userName || 'user')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    downloadTipsExcel(
      items,
      dualRole
        ? `tips-activity-${safeName || 'user'}`
        : `tips-given-${safeName || 'tipper'}`,
      countryCode,
      { includeDirection: dualRole }
    )
  }

  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <Lucide icon="Gift" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <Dialog.Title
              as="h2"
              className="!border-0 !p-0 text-lg font-semibold text-[#2D3748]"
            >
              {dualRole ? 'Tips activity' : 'Tips given'}
            </Dialog.Title>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close"
          className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          onClick={onClose}
        >
          <Lucide icon="X" className="h-5 w-5" />
        </button>
      </div>

      <Dialog.Description className="mt-4 max-h-[480px] overflow-y-auto !p-0">
        {isLoading ? (
          <p className="py-8 text-center text-slate-500">Loading tips…</p>
        ) : isError ? (
          <p className="py-8 text-center text-danger">
            Unable to load tip history.
          </p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-8">
            <img src={NoDataFound} alt="" className="w-28" />
            <p className="mt-2 text-sm text-slate-500">
              {dualRole
                ? 'No tips sent or received by this user in this country.'
                : 'No tips given by this tipper in this country.'}
            </p>
          </div>
        ) : (
          <TipsActivityTable
            items={items}
            dualRole={dualRole}
            fallbackCountry={countryCode}
          />
        )}
      </Dialog.Description>

      <Dialog.Footer className="mt-4 flex items-center justify-between gap-3 !border-slate-100 !px-0 !pb-0 !pt-4">
        <button
          type="button"
          disabled={!canDownload}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500 bg-white px-3.5 py-2 text-sm font-medium text-sky-600 shadow-sm hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleDownload}
        >
          <Lucide icon="Download" className="h-4 w-4" />
          Download Excel
        </button>
        <button
          type="button"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-red-dark"
          onClick={onClose}
        >
          Close
        </button>
      </Dialog.Footer>
    </div>
  )
}

function TipsGivenNotesModal({
  open,
  tipperName,
  dualRole = false,
  onClose,
}: {
  open: boolean
  tipperName: string
  dualRole?: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={open} onClose={onClose} size="xl">
      <Dialog.Panel className="!w-[95%] !max-w-6xl sm:!w-[95%]">
        {open && tipperName ? (
          <TipsGivenContent
            userName={tipperName}
            dualRole={dualRole}
            onClose={onClose}
          />
        ) : null}
      </Dialog.Panel>
    </Dialog>
  )
}

export default TipsGivenNotesModal
