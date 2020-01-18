export const INQUIRY_CONFIG = {
  request: {
    list: {
      name: 'list',
      path: 'inquiry/page',
    },
    delete: {
      name: 'delete',
      path: 'inquiry/remove/'
    },
    inquiry: {
      name: 'inquiry',
      path: 'inquiry/page',
    },
    submit: {
      name: 'submit',
      path: 'inquiry/',
    }
  },
  filters: {
    types: {
      ALLINQUIRIES: 'allInquiries',
      INQUIRYBYOBJECTID: 'inquiryByObjectId',
      ADVANCESEARCHINQUIRY: 'advanceSearchInquiry'
    },
    inquiryObjectId: 'inquiryObjectId',
  },
  actions: {
    add: 'ADD INQUIRY',
    update: 'UPDATE INQUIRY',
    delete: 'DELETE INQUIRY'
  }
};
