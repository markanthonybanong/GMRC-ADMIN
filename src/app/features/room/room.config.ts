export const ROOM_CONFIG = {
  request: {
    rooms: {
      name: 'rooms',
      path: 'room/page',
    },
    room: {
      name: 'room',
      path: 'room/page',
    },
    tenantByKeyStroke: {
      name: 'tenants',
      path: 'tenant/page'
    },
    removeTenantInTransientPrivateRoom: {
      name: 'removeTenant',
      path: 'room/removeTenantInTransientPrivateRoom'
    },
    submit: {
      addRoom: {
        name: 'submit',
        path: 'room/createRoom',
      },
      updateRoom: {
        name: 'submit',
        path: 'room/updateRoom',
      },
      addTenantInTransientPrivateRoom: {
        name: 'submit',
        path: 'room/addTenantInTransientPrivateRoom'
      }
    }
  },
  filters: {
    types: {
      ALLROOMS: 'allRooms',
      TRANSIENTPRIVATEROOMS: 'transientPrivateRooms',
      TRANSIENTPRIVATEROOMBYOBJECTID: 'transientPrivateRoomByObjectId',
      ADVANCESEARCHTRANSIENTPRIVATEROOMS: 'advanceSearchTransientPrivateRooms',
      TENANTBYKEYSTROKE: 'tenantByKeyStroke',
    },
    roomObjectId: 'roomObjectId',
  },
  actions: {
    add: 'ADD ROOM',
    update: 'UPDATE ROOM',
    delete: 'DELETE ROOM',
    searchTransientPrivateRoom: 'SEARCH TRANSIENT/PRIVATE ROOM',
    addTenant: 'ADD TENANT',
    removeTenant: 'REMOVE TENANT',
  }
};
