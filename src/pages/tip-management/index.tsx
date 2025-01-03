import React, { ReactElement, useRef, useState } from 'react'
import {
  FormInput,
  FormSelect,
} from '../../components/common/form-elements/components'
import TipCard from '../../components/common/card/card'
import Tips from '../../components/tp-managemet/tips'
import Withdrawal from '../../components/tp-managemet/withdrawal'
import {
  GetTipAppBalance,
  GetTipsBalance,
  GetWithdrawalBalance,
} from '../../api/tip-management'
import TipBlanceIcon from '../../assets/images/tip-balance-icon.png'
import TipGivenIcon from '../../assets/images/tip-given-icon.png'
import TipWithdrawIcon from '../../assets/images/tip-withdraw-icon.png'
import ToggleButtonSecondary from '../../components/common/toggle-button/toggle-button-secondary'

const TipManagementPage = () => {
  const [query, setQuery] = useState<string>('')
  const [datewithdrawal, setDateWithdrawal] = useState<string>('')
  const [activeordeactive, setactiveordeactive] = useState<string>('')
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [tips, settips] = useState<boolean>(true)
  const [withdraw, setwithdraw] = useState<boolean>(false)

  const {
    data: withdrawalBalanceData,
    isSuccess: withdrawalBalanceSuccess,
    isLoading: withdrawalBalanceLoading,
    refetch: withdrawalBalanceRefetch,
  } = GetWithdrawalBalance()
  const {
    data: TipsBalanceData,
    isSuccess: TipsBalanceSuccess,
    isLoading: TipsBalanceLoading,
    refetch: TipsBalanceRefetch,
  } = GetTipsBalance()
  const {
    data: TipAppBalanceData,
    isSuccess: TipAppBalanceSuccess,
    isLoading: TipAppBalanceLoading,
    refetch: TipAppBalanceRefetch,
  } = GetTipAppBalance()

   
  let typingTimeout: NodeJS.Timeout
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const handletable = (type: string) => {
    if (type === 'withdraw') {
      settips(false)
      setwithdraw(true)
    } else if (type === 'tip') {
      setwithdraw(false)
      settips(true)
    }
  }
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const ActiveAndDeactiveSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeout = setTimeout(() => {
      setactiveordeactive(value)
    }, 70)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateWithdrawal(event.target.value)
  }

  return (
    <div className="col-span-12 mt-6">
      <div className=" mt-5 lg:grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[39px]">
        <TipCard
          title={'Tip Given'}
          amount={parseFloat(TipsBalanceData?.data)}
          icon={TipGivenIcon}
        />
        <TipCard
          title={'Tip Withdrawal'}
          amount={parseFloat(withdrawalBalanceData?.data)}
          icon={TipWithdrawIcon}
        />
        <TipCard
          title={'Tip Balance'}
          amount={parseFloat(TipAppBalanceData?.data)}
          icon={TipBlanceIcon}
        />
      </div>
      <div className=" mb-7 mt-4"></div>

      <div className="m-[29px] mx-auto flex max-w-[250px] items-center justify-center rounded-[7px] bg-white">
        <ToggleButtonSecondary
          toggletext={'Tips'}
          togglestyle={tips}
          onclick={() => {
            handletable('tip')
          }}
        />
        <ToggleButtonSecondary
          toggletext={'Withdraw'}
          togglestyle={withdraw}
          onclick={() => {
            handletable('withdraw')
          }}
        />
      </div>
      <div>
        <div className={`${withdraw ? '' : 'hidden'}`}>
          <Withdrawal />
        </div>
        <div className={`${tips ? '' : 'hidden'}`}>
          <Tips />
        </div>
      </div>
    </div>
  )
}

export default TipManagementPage
