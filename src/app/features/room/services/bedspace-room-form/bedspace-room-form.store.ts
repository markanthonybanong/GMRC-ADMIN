import { Injectable, OnDestroy } from '@angular/core';
import { BedspaceRoomFormStoreState } from './bedspace-room-form.store.state';
import { Store } from 'rxjs-observable-store';
import { Subject } from 'rxjs';
import { DataStoreService, DataRoomService, ModalService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater, getRoomNumbers, getFloorNumbers, isArrayUnique } from '@gmrc-admin/shared/helpers';
import { switchMap, debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Tenant } from 'src/app/features/tenant/types/tenant';
import { BedspaceRoomFormEndpoint } from './bedspace-room-form.endpoint';
import { FormBuilder, Validators } from '@angular/forms';
import { setBedspaceFormValues } from '../../helpers/bedspace-room-form/set-bedspace-form-values';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { Router } from '@angular/router';
import { ROOM_CONFIG } from '../../room.config';
import { addBedFormGroup } from '../../helpers/bedspace-room-form/add-bed-form-group';
import { getDeckFormGroup } from '../../helpers/bedspace-room-form/get-deck-form-group';
import { getAwayFormArray } from '../../helpers/bedspace-room-form/get-away-form-array';
import { DeckStatus, BedspaceTenantType } from '../../room.enums';
import { createAwayFormGroup } from '../../helpers/bedspace-room-form/create-away-form-group';
import { getBedFormGroup } from '../../helpers/bedspace-room-form/get-bed-form-group';
import { getNewlyAddedTenantObjIdInBed } from '../../helpers/bedspace-room-form/get-newly-added-tenant-obj-id-in-bed';
import { addDeckTenantObjectId } from '../../helpers/bedspace-room-form/add-deck-tenant-object-id';
import { addAwayTenantObjectId } from '../../helpers/bedspace-room-form/add-away-tenant-object-id';
import { isNewlyAddedTenantsExist } from '../../helpers/bedspace-room-form/is-newly-added-tenants-exist';
import { getBedsFormArray } from '../../helpers/bedspace-room-form/get-beds-form-array';
import { setBedFormValues } from '../../helpers/bedspace-room-form/set-bed-form-values';
import { setBedBody } from '../../helpers/bedspace-room-form/set-bed-body';
import { setDeckFromServerStatus } from '../../helpers/bedspace-room-form/set-deck-from-server-status';
import { setDeckFormGroupToNull } from '../../helpers/bedspace-room-form/set-deck-form-group-to-null';

@Injectable()
export class BedspaceRoomFormStore extends Store<BedspaceRoomFormStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private searchTenantByName$: Subject<string> = new Subject<string>();
  public tenants: Array<Tenant>;
  public form = this.formBuilder.group({
    number: [{value: null, disabled: true}, Validators.required],
    floor: null,
    type: [{value: null, disabled: true}, Validators.required],
    aircon: null,
    _id: null,
  });
  public bedForm = this.formBuilder.group({
    beds: this.formBuilder.array([]),
  });
  public roomNumbers: Array<number>;
  public floorNumbers: Array<number>;
  constructor(
    private endpoint: BedspaceRoomFormEndpoint,
    private dataStoreService: DataStoreService,
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService,
    private router: Router,
    private modalService: ModalService
  ) {
    super(new BedspaceRoomFormStoreState());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  get requestResponse(): object {
    return RequestResponse;
  }
  get awayDeckStatuses(): Array<string> {
    return this.dataRoomService.deckStatus.filter( e => e !== DeckStatus.AWAY);
  }
  get bedsFormArrayLength(): number {
    return getBedsFormArray(this.bedForm).length;
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.searchTenants$();
    this.getRoom();
    this.setRoomAndFloorNumbers();
  }
  onBack(): void {
    this.router.navigate(['room/bedspace']);
  }
  onSubmit(): void {
    this.endpoint.updateRoom(this.form.value, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap(
          (room) => {
            this.modalService.success(ROOM_CONFIG.actions.update, `Updated room ${room.number}`);
          },
          () => {
            this.modalService.error(ROOM_CONFIG.actions.update);
          }
        )
      )
      .subscribe();
  }
  onAddBed(): void {
    addBedFormGroup(this.bedForm);
    const bedsFormArray =  getBedsFormArray(this.bedForm);
    const bedIndex = bedsFormArray.length !== 0 ? bedsFormArray.length - 1 : 0;
    const body = {
      bed: setBedBody(getBedFormGroup(this.bedForm, bedIndex).value),
      roomObjectId: this.form.get('_id').value,
    };
    this.endpoint.addBed( body, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap(
          (bed) => {
            this.modalService.success(ROOM_CONFIG.actions.addBed, 'Bed added');
            getBedFormGroup(this.bedForm, bedIndex).get('_id').patchValue(bed._id);
          },
          () => {
            this.modalService.error(ROOM_CONFIG.actions.addBed);
          }
        )
      ).subscribe();
  }
  onSearchTenant(name: string): void {
    this.setState({
      ...this.state,
      pageRequest: {
        ...this.state.pageRequest,
        filters: {
          type: ROOM_CONFIG.filters.types.TENANTBYKEYSTROKE,
          tenantName: name,
        }
      }
    });
    this.searchTenantByName$.next();
  }
  onDeckStatusChange(deck: {bedIndex: number, deckIndex: number, deckStatus: string}): void {
    const deckFormGroup = getDeckFormGroup(this.bedForm, deck.bedIndex, deck.deckIndex);
    const awayFormArray = getAwayFormArray(this.bedForm, deck.bedIndex, deck.deckIndex);
    const awayFormGroup = awayFormArray.at(0);
    if (deck.deckStatus === DeckStatus.AWAY && awayFormArray.length === 0) {
      awayFormArray.push(createAwayFormGroup());
    } else if (deck.deckStatus === DeckStatus.VACANT && awayFormArray.length === 0) {
     this.modalService.confirmation(ROOM_CONFIG.actions.updateDeck, 'Setting deck value to vacant will remove its content')
      .afterClosed().subscribe((isTrue) => {
        if (isTrue) {
          setDeckFormGroupToNull(deckFormGroup);
        }
      });
    } else if (deck.deckStatus !== DeckStatus.AWAY && awayFormArray.length && awayFormGroup.get('status').value !== DeckStatus.VACANT) {
      deckFormGroup.get('status').patchValue(DeckStatus.AWAY);
    } else if (deck.deckStatus !== DeckStatus.AWAY && awayFormArray.length) {
      awayFormArray.removeAt(0);
    }
  }
  onTenantClick(tenant: {bedIndex: number, deckIndex: number, tenantObjectId: string, type: string}): void {
    setDeckFromServerStatus(getDeckFormGroup(this.bedForm, tenant.bedIndex, tenant.deckIndex), tenant.type);
    if (tenant.type === BedspaceTenantType.DECK) {
      addDeckTenantObjectId(this.bedForm, tenant.bedIndex, tenant.deckIndex, tenant.tenantObjectId);
    } else {
      addAwayTenantObjectId(this.bedForm, tenant.bedIndex, tenant.deckIndex, tenant.tenantObjectId);
    }
  }
  onBedFormUpdate(bedIndex: number): void {
    const bedFormGroup = getBedFormGroup(this.bedForm, bedIndex);
    const newlyAddedTenants = getNewlyAddedTenantObjIdInBed(bedFormGroup.value);
    const addedTenantsUnique = isArrayUnique(newlyAddedTenants);
    this.setState({...this.state, requests: {...this.state.requests, submit: {inProgress: true}}});
    this.dataRoomService.getAllRooms
    .pipe(
      tap((pageData) => {
        if (!addedTenantsUnique || isNewlyAddedTenantsExist(newlyAddedTenants, pageData.data)) {
          const content = !addedTenantsUnique ? 'Cannot add duplicate tenants' : 'Tenant already added';
          this.modalService.warn(ROOM_CONFIG.actions.addTenant, content);
          this.setState({...this.state, requests: {...this.state.requests, submit: {inProgress: false}}});
        } else {
          const body = {
            bedObjectId: bedFormGroup.get('_id').value,
            bed: setBedBody(bedFormGroup.value),
          };
          this.endpoint.updateBed(body , this.dataStoreService.storeRequestStateUpdater)
            .pipe(
             tap(
              (bed) => {
                this.modalService.success(ROOM_CONFIG.actions.updateBed, `Updated bed number ${bed.number}`);
              },
              () => {
                this.setState({...this.state, requests: {...this.state.requests, submit: {inProgress: false}}});
                this.modalService.error(ROOM_CONFIG.actions.addTenant);
              }
            )
            ).subscribe();
        }
      }),
    ).subscribe();
  }
  private getRoom(): void {
    this.endpoint.getRoom(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
    .pipe(
      tap((pageData) => {
        setBedspaceFormValues(this.form, pageData.data[0]);
        setBedFormValues(this.bedForm, pageData.data[0].bedspaces);
      })
    )
    .subscribe();
  }
  private searchTenants$(): void {
    this.searchTenantByName$
      .pipe(
        switchMap(() => this.endpoint.getTenants(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)),
        debounceTime(800),
        takeUntil(this.destroy$)
      ).subscribe((pageData) => {
        this.tenants = pageData.data;
      });
  }
  private setRoomAndFloorNumbers(): void {
    this.dataRoomService.getAllRooms
      .pipe(
        tap((pageData) => {
          this.roomNumbers = getRoomNumbers(pageData.data);
          this.floorNumbers = getFloorNumbers(pageData.data);
        }),
      ).subscribe();
  }
}
