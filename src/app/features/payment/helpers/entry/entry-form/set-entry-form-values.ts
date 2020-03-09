import { FormGroup, FormBuilder } from '@angular/forms';
import { oneMonthDepositBalanceFormArr } from './one-month-deposit-balance-form-arr';
import { oneMonthAdvanceBalanceFormArr } from './one-month-advance-balance-form-arr';
import { partialPaymentFormArr } from './partial-payment-form-arr';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';

export function setEntryFormValues(entryForm: FormGroup, entry: EntryPayment): void {
    const formBuilder = new FormBuilder();
    if (entry.oneMonthDepositBalance.length) {
        oneMonthDepositBalanceFormArr(entryForm).push(
          formBuilder.group({
            balance: entry.oneMonthDepositBalance[0].balance,
          })
        );
    }
    if (entry.oneMonthAdvanceBalance.length) {
        oneMonthAdvanceBalanceFormArr(entryForm).push(
            formBuilder.group({
                balance: entry.oneMonthAdvanceBalance[0].balance,
            })
         );
    }
    if (entry.partialPayments.length) {
      entry.partialPayments.forEach( payment => {
        partialPaymentFormArr(entryForm).push(
          formBuilder.group({
            date: payment.date,
            amount: payment.amount
          })
        );
      });
    }
    entryForm.patchValue({
      _id: entry._id,
      roomNumber: entry.roomNumber,
      tenant: `${entry.tenant[0].firstname} ${entry.tenant[0].middlename} ${entry.tenant[0].lastname}`,
      monthlyRent: entry.monthlyRent,
      key: entry.key,
      dateEntry: entry.dateEntry,
      dateExit: entry.dateExit,
      oneMonthDeposit: entry.oneMonthDeposit,
      oneMonthAdvance: entry.oneMonthAdvance,
      tenantObjectId: entry.tenant[0]._id,
    });
}
