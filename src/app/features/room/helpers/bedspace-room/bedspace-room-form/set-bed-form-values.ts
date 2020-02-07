import { FormGroup, FormBuilder } from '@angular/forms';
import { getBedsFormArray } from './get-beds-form-array';
import { setAwayFormArrValues } from './set-away-form-arr-values';
import { Bedspace } from '../../../types/room/bedspace';

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
        away: deck.away === null ? formBuilder.array([]) :  setAwayFormArrValues(deck.away[0]),
        tenantObjectId: deck.tenant !== null ? deck.tenant._id : null,
        fromServer: deck.tenant !== null ? true : false,
      }));
    });
    getBedsFormArray(form).push(formBuilder.group({
      number: bed.number,
      decks,
     _id: bed._id
    }));
  });
}
