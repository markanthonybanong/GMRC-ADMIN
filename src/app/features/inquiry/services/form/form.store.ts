import { Injectable, OnDestroy } from '@angular/core';
import { FormEndpoint } from './form.endpoint';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { Subject, pipe, of, Observable, observable } from 'rxjs';
import { FormStoreState } from './form.store.state';
import { Store } from 'rxjs-observable-store';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { enumsToArray, getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { Gender, RoomType, Request } from '@gmrc-admin/shared/enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Inquiry } from '../../types/inquiry';
import { switchMap, tap, takeUntil, filter } from 'rxjs/operators';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { MatDialog } from '@angular/material';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { setFormValues } from '../../helpers/form/set-form-values';
import { createBedInfo } from '../../helpers/form/create-bed-info';
import { getBedInfos } from '../../helpers/form/get-bed-info';
import { DataStoreService } from '@gmrc-admin/shared/services';

@Injectable()
export class FormStore extends Store<FormStoreState> implements OnDestroy {
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

  constructor(
    private endpoint: FormEndpoint,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dataStoreService: DataStoreService
  ) {
    super(new FormStoreState());
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
  onSubmit(inputInquiry: Inquiry): void {
    const observableInquiry: Observable<Inquiry> = this.state.update
    ? this.endpoint.update(inputInquiry, this.dataStoreService.storeRequestStateUpdater)
    : this.endpoint.add(inputInquiry, this.dataStoreService.storeRequestStateUpdater);

    observableInquiry
      .pipe(
        tap(
          (inquiry) => {
            this.dialog.open(
              ActionResponseComponent, {
                data: {
                  title: this.state.update ? INQUIRY_CONFIG.actions.update : INQUIRY_CONFIG.actions.add,
                  content: this.state.update
                  ? `Updated ${inquiry.name}'s inquiry`
                  : `Added inquiry for ${inquiry.name}`,
                }
              }
            );
          },
          () => {
            this.dialog.open(
              ActionResponseComponent, {
                data: {
                  title: this.state.update ? INQUIRY_CONFIG.actions.update : INQUIRY_CONFIG.actions.add,
                  content: Request.Error,
                }
              }
            );
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  private getInquiry(): void {
    this.endpoint.inquiry(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap((pageData) => {
          setFormValues(this.form, pageData.data[0]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
