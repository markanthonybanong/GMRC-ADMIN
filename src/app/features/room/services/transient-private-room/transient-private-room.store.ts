import { Injectable, OnDestroy } from '@angular/core';
import { TransientPrivateRoomEndpoint } from './transient-private-room.endpoint';
import { Store } from 'rxjs-observable-store';
import { TransientPrivateRoomStoreState } from './transient-private-room.store.state';
import { PageEvent } from '@angular/material';
import { Subject } from 'rxjs';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { getStoreRequestStateUpdater, updateState, reloadTable, removeEmptyKeys } from '@gmrc-admin/shared/helpers';
import { tap, retry, takeUntil } from 'rxjs/operators';
import { ROOM_CONFIG } from '../../room.config';
import { Request } from '@gmrc-admin/shared/enums';

@Injectable()
export class TransientPrivateRoomStore extends Store<TransientPrivateRoomStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private endpoint: TransientPrivateRoomEndpoint,
    private dataStoreService: DataStoreService
  ) {
    super(new TransientPrivateRoomStoreState());
  }

  ngOnDestroy(): void {
     this.destroy$.next(true);
     this.destroy$.unsubscribe();
  }
  get displayedColumns(): Array<string> {
    return [
      'roomNumber',
      'floorNumber',
      'roomType',
      'aircon',
      'roomStatus',
      'dueRentDate',
      'tenant',
      'actions'
    ];
  }
  get totalCount(): number {
    return this.state.table.totalCount;
  }
  get request(): object {
    return Request;
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.initReloadTable$();
    reloadTable(this.dataStoreService.reloadTable$);
  }
  onSearch(search: object): void {
    this.setState({
      ...this.state,
      table: {
        ...this.state.table,
        pageRequest: {
          page: null,
          limit: null,
          filters: {
            type: ROOM_CONFIG.filters.types.ADVANCESEARCHTRANSIENTPRIVATEROOMS,
            roomFilter: removeEmptyKeys(search),
          }
        }
      }
    });
    reloadTable(this.dataStoreService.reloadTable$);
  }
  onDisplayAllRooms(): void {
    this.setState({
      ...this.state,
      table: {
        ...this.state.table,
        pageRequest: {
          page: 1,
          limit: 10,
          filters: {
            type: ROOM_CONFIG.filters.types.TRANSIENTPRIVATEROOMS,
          }
        }
      }
    });
    reloadTable(this.dataStoreService.reloadTable$);
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.setState({
      ...this.state,
      table: {
        ...this.state.table,
        pageRequest: {
          ...this.state.table.pageRequest,
          page: $event.pageIndex + 1,
          limit: $event.pageSize,
        }
      }
    });
    reloadTable(this.dataStoreService.reloadTable$);
  }
  private initReloadTable$(): void {
    this.dataStoreService.reloadTable$
      .pipe(
        switchMap(() => {
          return this.endpoint.rooms(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
        }),
        tap((pageData) => {
          updateState(this, pageData);
        }),
        retry(1),
        takeUntil(this.destroy$)
      ).subscribe();
  }
}
