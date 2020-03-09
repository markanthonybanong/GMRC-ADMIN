import { RequestState } from '@gmrc-admin/shared/types';

export interface Requests {
    submit?: RequestState;
    entryPayments?: RequestState;
    roomPayments?: RequestState;
    penaltyPayments?: RequestState;
    unsettleBillPayments?: RequestState;
}
