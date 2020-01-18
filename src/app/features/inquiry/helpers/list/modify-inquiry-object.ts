import { toDateString, isDateAfter, dateDiff } from '@gmrc-admin/shared/helpers';
import { PageData } from '@gmrc-admin/shared/types';
import { Inquiry } from '../../types/inquiry';

export function modifyInquiryObject(pageData: PageData<Inquiry>): PageData<Inquiry> {
  return {
    data: pageData.data.map((inquiry) => ({
      ...inquiry,
      willOccupyIn: toDateString(inquiry.willOccupyIn),
      willOccupyInWarningMsg: isDateAfter(inquiry.willOccupyIn)
      ? `${dateDiff(inquiry.willOccupyIn)} day/s over, since reservation date`
      : null,
    })),
    pageCount: pageData.pageCount,
    totalCount: pageData.totalCount,
  };
}
