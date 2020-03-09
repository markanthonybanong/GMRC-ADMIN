import { PageData } from '@gmrc-admin/shared/types';
import { PenaltyPayment } from '../../types/penaltyPayment/penaltyPayment';
import { toDateString } from '@gmrc-admin/shared/helpers';

export function modifyPenaltyObject(pageData: PageData<PenaltyPayment>): PageData<PenaltyPayment> {
    pageData.data.map((penalty) => {
      penalty.date = toDateString(penalty.date);
    });
    return pageData;
  }
  