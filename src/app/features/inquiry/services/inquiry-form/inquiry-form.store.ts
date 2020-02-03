import { Injectable, OnDestroy } from '@angular/core';
import { InquiryFormEndpoint } from './inquiry-form.endpoint';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { Subject, pipe, of, Observable, observable } from 'rxjs';
import { InquiryFormStoreState } from './inquiry-form.store.state';
import { Store } from 'rxjs-observable-store';
import { FormBuilder, Validators } from '@angular/forms';
import {  getStoreRequestStateUpdater, getRoomNumbers } from '@gmrc-admin/shared/helpers';
import { Router  } from '@angular/router';
import { Inquiry } from '../../types/inquiry';
import { tap } from 'rxjs/operators';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { setInquiryFormValues } from '../../helpers/inquiry-form/set-form-values';
import { createBedInfo } from '../../helpers/inquiry-form/create-bed-info';
import { getBedInfos } from '../../helpers/inquiry-form/get-bed-info';
import { DataStoreService, DataRoomService, ModalService } from '@gmrc-admin/shared/services';
import { RoomType } from 'src/app/features/room/room.enums';

@Injectable()
export class InquiryFormStore extends Store<InquiryFormStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private form = this.formBuilder.group({
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
  public roomNumbers: Array<number>;
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  get knownGMRCThrough(): Array<string> {
    return [
      'Through social platforms',
      'Someone suggested',
      'Flyers',
      'etc'
    ];
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.setRoomNumbers();
    if (this.state.update) {
      this.getInquiry();
    }
  }
  onRoomChange(roomType: string): void {
    if (roomType === RoomType.BEDSPACE && getBedInfos(this.form).length === 0) {
      getBedInfos(this.form).push(createBedInfo());
    } else if (roomType !== RoomType.BEDSPACE && getBedInfos(this.form).length) {
      getBedInfos(this.form).removeAt(0);
    }
  }
  onBack(): void {
    this.router.navigate(['inquiry']);
  }
  onSubmit(): void {
    const observableInquiry: Observable<Inquiry> = this.state.update
    ? this.endpoint.update(this.form.value, this.dataStoreService.storeRequestStateUpdater)
    : this.endpoint.add(this.form.value, this.dataStoreService.storeRequestStateUpdater);
    observableInquiry
      .pipe(
        tap(
          (inquiry) => {
            const title   = this.state.update
                            ? INQUIRY_CONFIG.actions.update
                            : INQUIRY_CONFIG.actions.add;
            const content = this.state.update
                            ? `Updated ${inquiry.name}'s inquiry`
                            : `Added inquiry for ${inquiry.name}`;
            this.modalService.success(title, content);
            setInquiryFormValues(this.form, inquiry);
            this.setState({
              ...this.state,
              update: true,
            });
          },
          () => {
            this.modalService.error(this.state.update ? INQUIRY_CONFIG.actions.update : INQUIRY_CONFIG.actions.add);
          }
        )
      )
      .subscribe();
  }
  private getInquiry(): void {
    this.endpoint.inquiry(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap((pageData) => {
          setInquiryFormValues(this.form, pageData.data[0]);
        })
      )
      .subscribe();
  }
  private setRoomNumbers(): void {
    this.dataRoomService.getAllRooms
      .pipe(
        tap((pageData) => this.roomNumbers = getRoomNumbers(pageData.data)),
      ).subscribe();
  }
}
