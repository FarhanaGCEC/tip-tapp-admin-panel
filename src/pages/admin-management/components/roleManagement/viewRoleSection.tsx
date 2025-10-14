import { useGetRoleById } from '../../../../api/admin-role-management'
import PermissionCard from './permissonCard'
import { Permissions } from '../../constant/permissons'

function ViewRoleSection(props: { roleId: number }) {
  const { roleId } = props
  const { data } = useGetRoleById(roleId)

  return (
    <form className="rounded-lg">
      <div className="mb-6 flex justify-start rounded-lg bg-white p-6">
        {`Role Name: ${
          data?.name === 'SUPER_ADMIN'
            ? 'Administrator'
            : data?.name || 'Unknown'
        }`}
      </div>
      <div className="my-8 text-[16px]">
        <span>Permission List</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Object.keys(Permissions).map((sectionKey, index) => (
          <PermissionCard
            key={index}
            section={sectionKey}
            availablePermissions={Permissions[sectionKey]}
            assignedPermissions={data?.permissions || []}
          />
        ))}
      </div>
    </form>
  )
}

export default ViewRoleSection
