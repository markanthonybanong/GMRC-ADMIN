export const ROOM_CONFIG = {
  request: {
    list: {
      name: 'list',
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
      ROOMBYOBJECTID: 'roomByObjectId',
      ADVANCESEARCHROOM: 'advanceSearchRoom'
    },
    roomObjectId: 'roomObjectId',
  },
  actions: {
    add: 'ADD ROOM',
    update: 'UPDATE ROOM',
    delete: 'DELETE ROOM'
  }
};
