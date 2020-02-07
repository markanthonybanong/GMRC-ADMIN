export const ROOM_CONFIG = {
  request: {
    rooms: {
      name: 'rooms',
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
      },
      addBed: {
        name: 'submit',
        path: 'room/createBed'
      },
      updateBed: {
        name: 'submit',
        path: 'room/updateBed'
      }
    }
  },
  filter: {
    type: {
      ALLROOMS: 'allRooms',
      TRANSIENTPRIVATEROOMS: 'transientPrivateRooms',
      TRANSIENTPRIVATEROOMBYOBJECTID: 'transientPrivateRoomByObjectId',
      ADVANCESEARCHTRANSIENTPRIVATEROOMS: 'advanceSearchTransientPrivateRooms',
      BEDSPACEROOMS: 'bedspaceRooms',
      BEDSPACEROOMBYOBJECTID: 'bedspaceRoomByObjectId',
      ADVANCESEARCHBEDSPACEROOMS: 'advanceSearchBedspaceRooms',
      TENANTBYKEYSTROKE: 'tenantByKeyStroke',
    },
    roomObjectId: 'roomObjectId',
  },
  action: {
    add: 'ADD ROOM',
    update: 'UPDATE ROOM',
    delete: 'DELETE ROOM',
    searchTransientPrivateRoom: 'SEARCH TRANSIENT/PRIVATE ROOM',
    searchBedspaceRoom: 'SEARCH BEDSPACE ROOM',
    addTenant: 'ADD TENANT',
    removeTenant: 'REMOVE TENANT',
    addBed: 'ADD BED',
    updateBed: 'UPDATE BED',
    updateDeck: 'UPDATE DECK'
  }
};
