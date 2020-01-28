import { Injectable, OnDestroy } from '@angular/core';
import { TransientPrivateRoomEndpoint } from './transient-private-room.endpoint';
import { Store } from 'rxjs-observable-store';
import { TransientPrivateRoomStoreState } from './transient-private-room.store.state';
import { PageEvent, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { getStoreRequestStateUpdater, updateState,  removeEmptyKeys } from '@gmrc-admin/shared/helpers';
import { tap, retry, takeUntil } from 'rxjs/operators';
import { ROOM_CONFIG } from '../../room.config';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { Router } from '@angular/router';
import { SearchTransientPrivateRoomComponent } from '../../modals/search-transient-private-room/search-transient-private-room.component';

@Injectable()
export class TransientPrivateRoomStore extends Store<TransientPrivateRoomStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public tableName = 'Private/Transient Rooms';
  constructor(
    private endpoint: TransientPrivateRoomEndpoint,
    private dataStoreService: DataStoreService,
    private router: Router,
    private dialog: MatDialog
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
  get request(): object {
    return RequestResponse;
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.initReloadTable$();
    this.dataStoreService.reloadTable$.next();
  }
  onSearch(): void {
    const dialogRef = this.dialog.open(
      SearchTransientPrivateRoomComponent, {
        data: {
          title: ROOM_CONFIG.actions.searchTransientPrivateRoom
        }
    });
    dialogRef.afterClosed().subscribe(search => {
      if (search) {
        this.setState({
          ...this.state,
          table: {
            ...this.state.table,
            pageRequest: {
              page: null,
              limit: 200,
              filters: {
                type: ROOM_CONFIG.filters.types.ADVANCESEARCHTRANSIENTPRIVATEROOMS,
                roomFilter: removeEmptyKeys(search),
              }
            }
          }
        });
        this.dataStoreService.reloadTable$.next();
      }
    });
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
    this.dataStoreService.reloadTable$.next();
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
    this.dataStoreService.reloadTable$.next();
  }
  onRoomUpdate(roomObjectId: string): void {
    this.router.navigate([`room/update-private-transient/${roomObjectId}`]);
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
