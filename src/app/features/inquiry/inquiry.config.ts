export const INQUIRY_CONFIG = {
  request: {
    inquiries: {
      name: 'inquiries',
      path: 'inquiry/page',
    },
    delete: {
      name: 'delete',
      path: 'inquiry/remove/'
    },
    submit: {
      name: 'submit',
      path: 'inquiry/',
    }
  },
  filter: {
    type: {
      ALLINQUIRIES: 'allInquiries',
      INQUIRYBYOBJECTID: 'inquiryByObjectId',
      ADVANCESEARCHINQUIRY: 'advanceSearchInquiry'
    },
  },
  action: {
    add: 'ADD INQUIRY',
    update: 'UPDATE INQUIRY',
    delete: 'DELETE INQUIRY',
    search: 'SEARCH INQUIRY'
  }
};
