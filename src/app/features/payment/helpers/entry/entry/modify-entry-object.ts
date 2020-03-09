import { PageData } from '@gmrc-admin/shared/types';

import { toDateString } from '@gmrc-admin/shared/helpers';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';

export function modifyEntryObject(pageData: PageData<EntryPayment>): PageData<EntryPayment> {
    pageData.data.map((entry) => {
        entry.dateEntry= toDateString(entry.dateEntry);
    });
    return pageData;
}
