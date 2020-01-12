export const INQUIRY_CONFIG = {
  request: {
    list: {
      name: 'list',
      path: 'inquiry/page',
    },
    inquiry: {
      name: 'inquiry',
      path: 'inquiry/page',
    },
    submit: {
      name: 'submit',
      path: {
        add: 'inquiry/',
      }
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
    update: 'UPDATE INQUIRY'
  }
};
