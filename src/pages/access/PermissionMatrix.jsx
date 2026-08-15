import { PageHeader } from '../../components/common/PageHeader';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { ALL_PERMISSIONS } from '../../data/permissions';

export function PermissionMatrix() {
  const { roles, setRoles } = useAppData();
  const { hasPermission } = useAuth();
  const canEdit = hasPermission('roles.edit');

  const toggle = (roleId, key) => {
    if (!canEdit) return;
    setRoles(
      roles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.includes(key)
                ? role.permissions.filter((item) => item !== key)
                : [...role.permissions, key],
            }
          : role,
      ),
    );
  };

  return (
    <div className="c-page p-access">
      <PageHeader
        title="Permission matrix"
        crumbs={[
          { label: 'Roles', to: '/access/roles' },
          { label: 'Permissions' },
        ]}
      />

      <section className="c-table-card">
        <div className="c-table-wrap">
          <table className="c-table c-table--matrix is-compact">
            <thead>
              <tr>
                <th scope="col" className="is-sticky">
                  Permission
                </th>
                {roles.map((role) => (
                  <th key={role.id} scope="col" className="is-center">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map((permission) => (
                <tr key={permission.key}>
                  <th scope="row" className="is-sticky c-table__row-head">
                    <span className="c-table__primary">{permission.module}</span>
                    <span className="c-table__meta">{permission.action}</span>
                  </th>
                  {roles.map((role) => (
                    <td key={role.id} className="is-center">
                      <label className="c-table-check">
                        <input
                          type="checkbox"
                          checked={role.permissions.includes(permission.key)}
                          disabled={!canEdit}
                          onChange={() => toggle(role.id, permission.key)}
                          aria-label={`${role.name} ${permission.module} ${permission.action}`}
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
