import { FormGroup, FormBuilder } from '@angular/forms';
import { Bedspace } from '../../types/room/bedspace';
import { getBedsFormArray } from './get-beds-form-array';
import { setAwayFormArrValues } from './set-away-form-arr-values';
import { isObjectEmpty } from '@gmrc-admin/shared/helpers';

export function setBedFormValues(form: FormGroup, beds: Array<Bedspace>): void {
  const formBuilder = new FormBuilder();

  beds.forEach((bed) => {
    const decks = formBuilder.array([]);
    bed.decks.forEach((deck) => {
      decks.push(formBuilder.group({
        number: deck.number,
        status: deck.status,
        dueRentDate: deck.dueRentDate,
        monthlyRent: deck.monthlyRent,
        riceCookerBill: deck.riceCookerBill,
        tenant: deck.tenant !== null ? `${deck.tenant.firstname}  ${deck.tenant.middlename} ${deck.tenant.lastname}` : null,
        away: isObjectEmpty(deck.away[0]) ? formBuilder.array([]) :  setAwayFormArrValues(deck.away[0]),
        tenantObjectId: deck.tenant !== null ? deck.tenant._id : null,
        fromServer: true,
      }));
    });
    getBedsFormArray(form).push(formBuilder.group({
      number: bed.number,
      decks,
    }));
  });
}
