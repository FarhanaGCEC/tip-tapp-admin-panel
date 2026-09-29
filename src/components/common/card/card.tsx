import React from 'react'
import DashboardTileSeconary from '../../dashboard/dashboard-tiles-secondary'
import { AmountLike } from '../../../types/currency'
import { useCurrencyStore } from '../../../stores/currencyStore'
import { formatMoney } from '../../../utils/formatMoney'

interface TipCardProps {
  title: string
  amountData?: AmountLike
  icon?: string
}

const TipCard: React.FC<TipCardProps> = ({ title, amountData, icon }) => {
  const currency = useCurrencyStore((state) => state.currency)

  return (
    <div>
      <DashboardTileSeconary
        amount={formatMoney(amountData, currency)}
        label={title}
        tooltipText="Higher than last month"
        icon={icon}
      />
    </div>
  )
}

export default TipCard
