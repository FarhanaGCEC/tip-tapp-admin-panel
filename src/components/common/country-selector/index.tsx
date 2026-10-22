import { COMPANIES, useCompanyStore } from '../../../stores/companyStore'

function CountrySelector() {
  const company = useCompanyStore((state) => state.company)
  const setCompany = useCompanyStore((state) => state.setCompany)

  return (
    <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1" role="group" aria-label="Company">
      {COMPANIES.map((name) => {
        const active = company === name
        return (
          <button
            key={name}
            type="button"
            onClick={() => setCompany(name)}
            className={`h-8 rounded-md px-3 text-xs font-semibold ${
              active ? 'bg-primary text-slate-900 shadow-sm' : 'text-slate-600 hover:text-brand-navy'
            }`}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}

export default CountrySelector
