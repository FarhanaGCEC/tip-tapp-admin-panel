/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom'
import Button from '../common/button'
import { DRIVERS, formatAed } from '../../data/fleet-dummy'
import { useCompanyStore } from '../../stores/companyStore'

function TopTippers() {
  const navigate = useNavigate()
  const company = useCompanyStore((state) => state.company)
  const drivers = DRIVERS.filter((driver) => driver.platforms.includes(company))
    .sort((a, b) => b.rentThisWeek - a.rentThisWeek)
    .slice(0, 5)

  return (
    <div>
      <div className="col-span-12 mt-6">
        <div className="intro-y block h-10 items-center sm:flex">
          <h2 className="mb-[5px] mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
            Top Drivers This Week
          </h2>
        </div>
        <div className="h-full w-full">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="mt-[10px] flex h-[95px] w-full items-center justify-between rounded-xl bg-white px-4 shadow-md"
            >
              <div>
                <p className="text-base font-semibold">{driver.name}</p>
                <p className="text-sm text-gray-500">
                  {company} · {driver.city} · {formatAed(driver.rentThisWeek)}
                </p>
              </div>
              <div className="flex h-[29px] items-center justify-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-slate-900">
                {driver.tripsThisWeek} trips
              </div>
            </div>
          ))}
          <Button
            className="mt-[15px] h-[40px] w-full bg-primary hover:bg-brand-red-dark"
            onClick={() => navigate('/manage-tippers')}
          >
            <span className="text-slate-900">View all</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopTippers
