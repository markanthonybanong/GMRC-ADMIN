import { Injectable} from '@angular/core';
import { InquiryFormEndpoint } from './inquiry-form.endpoint';
import { Subject, Observable } from 'rxjs';
import { InquiryFormStoreState } from './inquiry-form.store.state';
import { Store } from 'rxjs-observable-store';
import { FormBuilder, Validators } from '@angular/forms';
import {  getStoreRequestStateUpdater} from '@gmrc-admin/shared/helpers';
import { Router  } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DataStoreService, DataRoomService, ModalService } from '@gmrc-admin/shared/services';
import { RoomType } from 'src/app/features/room/room.enums';
import { Inquiry } from '../../../types/inquiry/inquiry';
import { INQUIRY_CONFIG } from '../../../inquiry.config';
import { createBedInfo } from '../../../helpers/inquiry/inquiry-form/create-bed-info';
import { getBedInfos } from '../../../helpers/inquiry/inquiry-form/get-bed-info';
import { setInquiryFormValues } from '../../../helpers/inquiry/inquiry-form/set-form-values';

@Injectable()
export class InquiryFormStore extends Store<InquiryFormStoreState>{
  private inquiryForm = this.formBuilder.group({
    name: [null, Validators.required],
    roomNumber: [null, Validators.required],
    howDidYouFindUs: null,
    willOccupyIn:  [null, Validators.required],
    phoneNumber: null,
    gender: null,
    roomType:  null,
    bedInfos: this.formBuilder.array([]),
    _id: null,
  });

  constructor(
    private endpoint: InquiryFormEndpoint,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: ModalService,
    private dataStoreService: DataStoreService,
    private dataRoomService: DataRoomService
  ) {
    super(new InquiryFormStoreState());
  }



  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    if (this.state.update) {
      this.getInquiry();
    }
  }
  onRoomChange(roomType: string): void {
    if (roomType === RoomType.BEDSPACE && getBedInfos(this.inquiryForm).length === 0) {
      getBedInfos(this.inquiryForm).push(createBedInfo());
    } else if (roomType !== RoomType.BEDSPACE && getBedInfos(this.inquiryForm).length) {
      getBedInfos(this.inquiryForm).removeAt(0);
    }
  }
  onBack(): void {
    this.router.navigate(['inquiry']);
  }
  onSubmit(): void {
    const inquiry: Observable<Inquiry> = this.state.update
                                         ? this.endpoint.updateInquiry(this.inquiryForm.value, this.dataStoreService.storeRequestStateUpdater)
                                         : this.endpoint.addInquiry(this.inquiryForm.value, this.dataStoreService.storeRequestStateUpdater);
    inquiry
      .pipe(
        tap(
          (inquiryFromServer) => {
            const title   = this.state.update
                            ? INQUIRY_CONFIG.action.update
                            : INQUIRY_CONFIG.action.add;
            const content = this.state.update
                            ? `Updated ${inquiryFromServer.name}'s inquiry`
                            : `Added inquiry for ${inquiryFromServer.name}`;
            this.modalService.success(title, content);
            this.setState({
              ...this.state,
              update: true,
            });
          },
          () => {
            this.modalService.error(this.state.update ? INQUIRY_CONFIG.action.update : INQUIRY_CONFIG.action.add);
          }
        )
      )
      .subscribe();
  }
  private getInquiry(): void {
    this.endpoint.getInquiry(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap((pageData) => {
          setInquiryFormValues(this.inquiryForm, pageData.data[0]);
        })
      )
      .subscribe();
  }

}
