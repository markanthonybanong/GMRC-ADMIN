import { toDateString, isDateAfter, dateDiff } from '@gmrc-admin/shared/helpers';
import { PageData } from '@gmrc-admin/shared/types';
import { Inquiry } from '../../../types/inquiry/inquiry';

export function modifyInquiryObject(pageData: PageData<Inquiry>): PageData<Inquiry> {
  pageData.data.map((inquiry) => {
    inquiry.willOccupyIn = toDateString(inquiry.willOccupyIn);
    inquiry.willOccupyInWarningMsg = isDateAfter(inquiry.willOccupyIn)
                                     ? `${dateDiff(inquiry.willOccupyIn)} day/s over, since reservation date`
                                     : null;
  });
  return pageData;
}
