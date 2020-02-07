import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

export function getTransientPrivateRoomTenantsObjectIds(tenants: Array<Tenant>): Array<string> {
  const objectIds: Array<string> = [];
  tenants.forEach( tenant => objectIds.push(tenant._id));
  return objectIds;
}
