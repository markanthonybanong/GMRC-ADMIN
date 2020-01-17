import { PageData } from '@gmrc-admin/shared/types';
import { Inquiry } from '../types/inquiry';
import { toDateString, isDateAfter, dateDiff } from '@gmrc-admin/shared/helpers';

export function modifyInquiryObject(pageData: PageData<Inquiry>): PageData<Inquiry> {
  return {
    data: pageData.data.map((inquiry) => ({
      ...inquiry,
      willOccupyIn: toDateString(inquiry.willOccupyIn),
      willOccupyInWarningMsg: willOccupyInWarningMsg(inquiry.willOccupyIn),
    })),
    pageCount: pageData.pageCount,
    totalCount: pageData.totalCount,
  };
}
function willOccupyInWarningMsg(date: Date): string {
  return isDateAfter(date)
         ? `${dateDiff(date)} day/s over, since reservation date`
         : null;
}
