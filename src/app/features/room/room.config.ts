export const ROOM_CONFIG = {
  request: {
    rooms: {
      name: 'rooms',
      path: 'room/page',
    },
    delete: {
      name: 'delete',
      path: 'room/remove/'
    },
    inquiry: {
      name: 'inquiry',
      path: 'room/page',
    },
    submit: {
      name: 'submit',
      path: 'room/',
    }
  },
  filters: {
    types: {
      ALLROOMS: 'allRooms',
      TRANSIENTPRIVATEROOMS: 'transientPrivateRooms',
      TRANSIENTPRIVATEROOMBYOBJECTID: 'transientPrivateRoomByObjectId',
      ADVANCESEARCHTRANSIENTPRIVATEROOMS: 'advanceSearchTransientPrivateRooms',
    },
    roomObjectId: 'roomObjectId',
  },
  actions: {
    add: 'ADD ROOM',
    update: 'UPDATE ROOM',
    delete: 'DELETE ROOM',
    searchTransientPrivateRoom: 'SEARCH TRANSIENT/PRIVATE ROOM'
  }
};
