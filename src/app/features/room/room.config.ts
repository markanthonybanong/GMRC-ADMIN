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
    delete: {
      name: 'delete',
      path: 'room/remove/'
    },
    submit: {
      addRoom: {
        name: 'submit',
        path: 'room/createRoom',
      },
      updateRoom: {
        name: 'submit',
        path: 'room/updateRoom',
      }
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
