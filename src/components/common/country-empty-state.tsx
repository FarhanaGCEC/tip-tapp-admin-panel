import NoDataFound from '../../assets/images/NoDataFound.png'

function CountryEmptyState({
  title = 'Select a country',
  message = 'Choose one country to load this screen. Nothing here is shown until a country is selected.',
}: {
  title?: string
  message?: string
}) {
  return (
    <div className="mb-3 flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg bg-white px-6 shadow-lg">
      <img src={NoDataFound} alt="" className="w-1/5 max-w-[220px]" />
      <p className="mt-2 text-lg font-medium text-[#2D3748]">{title}</p>
      <p className="mt-1 max-w-md text-center text-sm text-slate-500">{message}</p>
    </div>
  )
}

export default CountryEmptyState
