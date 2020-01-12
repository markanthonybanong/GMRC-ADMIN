import { Injectable, OnDestroy } from '@angular/core';
import { FormEndpoint } from './form.endpoint';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { Subject } from 'rxjs';
import { FormStoreState } from './form.store.state';
import { Store } from 'rxjs-observable-store';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { enumsToArray, getStoreRequestStateUpdater, PageRequest } from '@gmrc-admin/shared/helpers';
import { Gender, RoomType, Request } from '@gmrc-admin/shared/enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Inquiry } from '../../types/inquiry';
import { switchMap, tap, takeUntil, filter } from 'rxjs/operators';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { MatDialog } from '@angular/material';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';

@Injectable()
export class FormStore extends Store<FormStoreState> implements OnDestroy {
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  title = 'ADD INQUIRY';
  form = this.formBuilder.group({
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
  buttonName = 'Add';
  knownGMRCThrough: Array<string> = [
    'Through social platforms',
    'Someone suggested',
    'Flyers',
    'etc'
  ];
  private pageRequest = new PageRequest(null, null);
  constructor(
    private endpoint: FormEndpoint,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    super(new FormStoreState());
  }
  init(): void {
    this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.subscribeToRouteParamater();
  }
  get genders(): Array<string> {
    return enumsToArray(Gender);
  }
  get roomTypes(): Array<string> {
    return enumsToArray(RoomType);
  }
  get bedInfos(): FormArray {
    return this.form.get('bedInfos') as FormArray;
  }
  get bedInfoFormGroup(): FormGroup {
    return this.formBuilder.group({
      bedNumber: [null, Validators.required],
      deckNumber: [null, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  onRoomChange(roomType: string): void {
    if (roomType === RoomType.BEDSPACE && this.bedInfos.length === 0) {
      this.pushBedInfoFormGroup();
    } else if (roomType !== RoomType.BEDSPACE && this.bedInfos.length) {
      this.bedInfos.removeAt(0);
    }
  }
  onBack(): void {
    this.router.navigate(['inquiry']);
  }
  onSubmit(inquiry: Inquiry): void {
    if (this.state.add) {
      this.add(inquiry);
    } else {
      this.update(inquiry);
    }
  }
  private pushBedInfoFormGroup(): void {
    this.bedInfos.push(this.bedInfoFormGroup);
  }
  private subscribeToRouteParamater(): void {
    this.route.paramMap
    .pipe(
      filter( (params) =>  params.get('id') !== null),
      switchMap((params) => {
        this.pageRequest.filters.type = INQUIRY_CONFIG.filters.types.INQUIRYBYOBJECTID;
        this.pageRequest.filters[INQUIRY_CONFIG.filters.inquiryObjectId] = params.get('id');
        return this.endpoint.inquiry(this.pageRequest, this.storeRequestStateUpdater);
      }),
      tap((pageData) => {
        this.updateState();

        //set form value
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();
  }
  private updateState(): void {
    this.setState({
      ...this.state,
      add: false,
    });
  }
  private add(inquiry: Inquiry): void {
    this.endpoint.add(inquiry, this.storeRequestStateUpdater)
      .pipe(
        tap(
          (createdInquiry) => {
            this.dialog.open(
              ActionResponseComponent, {
                data: {
                  title: INQUIRY_CONFIG.actions.add,
                  content: `Added inquiry for ${createdInquiry.name}`
                }
              }
            );
          },
          (error) => {
            this.dialog.open(
              ActionResponseComponent, {
                data: {
                  title: INQUIRY_CONFIG.actions.add,
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
  private update(inquiry: Inquiry): void {

  }
}
