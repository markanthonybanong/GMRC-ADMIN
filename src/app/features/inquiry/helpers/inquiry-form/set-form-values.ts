import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Inquiry } from '../../types/inquiry';
import { createBedInfo } from './create-bed-info';

export function setInquiryFormValues(form: FormGroup, inquiry: Inquiry): void {
  if (inquiry.bedInfos.length) {
    const bedInfos = form.get('bedInfos') as FormArray;
    bedInfos.clear();
    bedInfos.push(createBedInfo(inquiry.bedInfos[0].bedNumber, inquiry.bedInfos[0].deckNumber));
  }
  form.patchValue({
    name: inquiry.name,
    roomNumber: inquiry.roomNumber,
    howDidYouFindUs: inquiry.howDidYouFindUs,
    willOccupyIn: inquiry.willOccupyIn,
    phoneNumber: inquiry.phoneNumber,
    gender: inquiry.gender,
    roomType: inquiry.roomType,
    _id: inquiry._id,
  });
}
