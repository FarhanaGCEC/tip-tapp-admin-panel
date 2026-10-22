import { useNavigate } from 'react-router-dom'

export type UserRoleTab = 'tp' | 'sp' | 'both'

const TABS: { key: UserRoleTab; label: string; path: string }[] = [
  { key: 'tp', label: 'Drivers', path: '/manage-tippers' },
  {
    key: 'sp',
    label: 'Cars',
    path: '/manage-service-providers',
  },
  { key: 'both', label: 'Multi-Platform', path: '/manage-dual-role' },
]

function RoleUsersTabs({ active }: { active: UserRoleTab }) {
  const navigate = useNavigate()

  return (
    <div className="mb-6 flex w-full max-w-[520px] items-center justify-center rounded-[7px] bg-white p-1 mx-auto">
      {TABS.map((tab) => {
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              if (!isActive) navigate(tab.path)
            }}
            className={`w-full rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default RoleUsersTabs
