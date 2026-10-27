/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom'
import { useAdminDashboard } from '../../api/admin-country'
import { useCountryStore } from '../../stores/countryStore'
import Button from '../common/button'
import { getProfilePictureUrl, DEFAULT_AVATAR } from '../../utils/profilePicture'
import NoDataFound from '../../assets/images/NoDataFound.png'
import { formatDisplayAmount } from '../../utils/formatMoney'
import CountryEmptyState from '../common/country-empty-state'

function TopTippers() {
  const countryCode = useCountryStore((state) => state.countryCode)
  const { data, isLoading } = useAdminDashboard()
  const navigate = useNavigate()
  const tippers = data?.topTippers ?? []

  const handleViewAllClick = () => {
    navigate('/manage-finances')
  }

  if (!countryCode) {
    return (
      <div className="col-span-12 mt-6">
        <CountryEmptyState
          title="Select a country"
          message="Top tippers are shown for the selected country only."
        />
      </div>
    )
  }

  return (
    <div>
      <div className="col-span-12 mt-6">
        <div className="intro-y block h-10 items-center sm:flex">
          <h2 className="mb-[5px] mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
            Top Tippers This Week
          </h2>
        </div>
        <div className="h-full w-full">
          {isLoading ? (
            <div className="mt-[10px] flex h-[200px] w-full items-center justify-center rounded-xl bg-white shadow-md">
              <span className="text-slate-500">Loading…</span>
            </div>
          ) : tippers.length > 0 ? (
            Array.from({ length: 5 }).map((_, index) => {
              const tipper = tippers[index]
              return (
                <div
                  key={index}
                  className="mt-[10px] flex h-[95px] w-full items-center justify-between rounded-xl bg-white px-4 shadow-md"
                >
                  {tipper ? (
                    <div className="flex items-center">
                      <img
                        src={getProfilePictureUrl(tipper.profilePictureUrl)}
                        alt={`${tipper.firstName} ${tipper.lastName}`}
                        className="mr-3 h-[55px] w-[55px] rounded-[30px] object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = DEFAULT_AVATAR
                        }}
                      />
                      <div>
                        <p className="text-base font-semibold capitalize">{`${tipper.firstName} ${tipper.lastName}`}</p>
                        <p className="text-sm text-gray-500">
                          {formatDisplayAmount(tipper.amount)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center"></div>
                  )}
                  {tipper && (
                    <div className="flex h-[29px] w-[78px] items-center justify-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {`${tipper.tipCount || 0} Tips`}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="mt-[10px] flex w-full flex-col items-center  justify-center rounded-xl bg-white px-4  shadow-md">
              <img
                src={NoDataFound}
                alt="No data found"
                className="max-h-[500px] min-h-[500px] w-fit object-cover"
              />
              <span className="mb-12 text-center">No Data Found...</span>
            </div>
          )}

          {tippers.length > 0 && (
            <Button
              className="mt-[15px] h-[40px] w-full bg-primary hover:bg-brand-red-dark"
              onClick={handleViewAllClick}
            >
              <span className="text-white">View all</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopTippers
