import { Injectable, OnDestroy } from '@angular/core';
import { FormEndpoint } from './form.endpoint';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { Subject } from 'rxjs';
import { FormStoreState } from './form.store.state';
import { Store } from 'rxjs-observable-store';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { enumsToArray } from '@gmrc-admin/shared/helpers';
import { Gender, RoomType } from '@gmrc-admin/shared/enums';
import { Router } from '@angular/router';
import { Inquiry } from '../../types/inquiry';

@Injectable()
export class FormStore extends Store<FormStoreState> implements OnDestroy {
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  title = 'ADD INQUIRY';
  form = this.formBuilder.group({
    name: [null, Validators.required],
    roomNumber: [null, Validators.required],
    howDidYouFindUs:  [null, Validators.required],
    willOccupyIn:  [null, Validators.required],
    phoneNumber: [null, Validators.required],
    gender: [null, Validators.required],
    roomType:  [null, Validators.required],
    bedInfos: this.formBuilder.array([]),
    _id: null,
  });
  buttonName = 'Add';
  knownGMRCThrough: Array<string> = [
    'Through social platforms',
    'Someone suggested',
    'Flyers',
    'etc'
  ];
  constructor(
    private endPoint: FormEndpoint,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super(new FormStoreState());
  }
  init(): void {

  }
  get genders(): Array<string> {
    return enumsToArray(Gender);
  }
  get roomTypes(): Array<string> {
    return enumsToArray(RoomType);
  }
  onRoomChange(roomType: string): void {
    if (roomType === RoomType.BEDSPACE && this.bedInfos.length === 0) {
      this.pushBedInfoFormGroup();
    } else if (roomType !== RoomType.BEDSPACE && this.bedInfos.length) {
      this.bedInfos.removeAt(0);
    }
  }
  get bedInfos(): FormArray {
    return this.form.get('bedInfos') as FormArray;
  }
  private pushBedInfoFormGroup(): void {
    this.bedInfos.push(this.bedInfoFormGroup);
  }
  get bedInfoFormGroup(): FormGroup {
    return this.formBuilder.group({
      bedNumber: [null, Validators.required],
      deckNumber: [null, Validators.required]
    });
  }
  onBack(): void {
    this.router.navigate(['inquiry']);
  }
  onSubmit(inquiry: Inquiry): void {
    console.log('the inquiry ', inquiry);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
