export const TENANT_CONFIG = {
  filter: {
    type: {
      ALLTENANTS: 'allTenants',
      TENANTBYOBJECTID: 'tenantByObjectId',
      ADVANCESEARCHTENANT: 'advanceSearchTenant',
    },
  },
  request: {
    tenants: {
      name: 'tenants',
      path: 'tenant/page'
    },
    submit: {
      name: 'submit',
      path: 'tenant/'
    }
  },
  action: {
    searchTenant: 'SEARCH TENANT',
    updateTenant: 'UPDATE TENANT',
    addTenant: 'ADD TENANT'
  }
};
