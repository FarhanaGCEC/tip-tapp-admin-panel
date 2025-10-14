/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/alt-text */
import React, { ReactNode } from 'react'
import clsx from 'clsx'
import Tippy from '../common/tippy'
import Lucide from '../common/lucide'

interface DashboardTileProps {
  amount: string
  percentage: any
  label: string
  tooltipText: string
  tippyBgColor: string
  icon: any
}

const DashboardTile: React.FC<DashboardTileProps> = ({
  amount,
  percentage,
  label,
  tooltipText,
  tippyBgColor,
  icon,
}) => {
  return (
    <div className="intro-y w-full ">
      <div
        className={clsx([
          'zoom-in relative',
          "h-full before:absolute before:inset-x-0 before:mx-auto before:mt-3 before:h-full before:w-[90%] before:rounded-md before:bg-slate-50 before:shadow-[0px_3px_20px_#0000000b] before:content-[''] before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="box h-full p-3">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-gray-100 p-3">
              <img src={icon} className="h-16 w-16" />
            </div>
            <div>
              <Tippy
                as="div"
                className={clsx([
                  'flex cursor-pointer items-center rounded-full py-[2px] pl-2 pr-1 text-xs font-medium text-white',
                  tippyBgColor,
                ])}
                content={tooltipText}
              >
                {percentage}%
                <Lucide icon="ChevronUp" className="ml-0.5 h-3 w-3" />
              </Tippy>
            </div>
          </div>
          <div className="mt-2 text-xl font-medium leading-6">{amount}</div>
          <div className="max-w-[200px] break-words text-sm text-slate-500">
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardTile
