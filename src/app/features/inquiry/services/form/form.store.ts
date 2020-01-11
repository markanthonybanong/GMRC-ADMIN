import { Injectable, OnDestroy } from '@angular/core';
import { FormEndpoint } from './form.endpoint';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { Subject } from 'rxjs';
import { FormStoreState } from './form.store.state';
import { Store } from 'rxjs-observable-store';
import { FormBuilder, Validators } from '@angular/forms';

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
  knownGMRCThrough: Array<string> = [
    'Through social platforms',
    'Someone suggested',
    'Flyers',
    'etc'
  ];
  constructor(
    private endPoint: FormEndpoint,
    private formBuilder: FormBuilder
  ) {
    super(new FormStoreState());
  }
  init(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
