import { Injectable, OnDestroy } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { BedspaceRoomStoreState } from './bedspace-room.store.state';
import { Subject } from 'rxjs';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater, updateState} from '@gmrc-admin/shared/helpers';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { BedspaceRoomEndpoint } from './bedspace-room.endpoint';
import { tap, retry, takeUntil, map } from 'rxjs/operators';
import { modifyRoomObjectForBedspace } from '../../../helpers/bedspace-room/bedspace-room/modify-room-object';
import { PageEvent, MatDialog } from '@angular/material';
import { ROOM_CONFIG } from '../../../room.config';
import { SearchBedspaceRoomComponent } from '../../../modals/bedspace-room/search-bedspace-room/search-bedspace-room.component';
import { modifyBedspaceSearchResult } from '../../../helpers/bedspace-room/bedspace-room/modify-bedspace-search-result';
import { Router } from '@angular/router';

@Injectable()
export class BedspaceRoomStore extends Store<BedspaceRoomStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public tableName = 'Bedspace Rooms';
  constructor(
    private dataStoreService: DataStoreService,
    private endpoint: BedspaceRoomEndpoint,
    private dialog: MatDialog,
    private router: Router,
  ) {
    super( new BedspaceRoomStoreState());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.initReloadTable$();
    this.dataStoreService.reloadTable$.next();
  }
  onSearch(): void {
    const dialogRef = this.dialog.open(
      SearchBedspaceRoomComponent, {
        data: {
          title: ROOM_CONFIG.action.searchBedspaceRoom
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
              filters: modifyBedspaceSearchResult(search),
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
            type: ROOM_CONFIG.filter.type.BEDSPACEROOMS,
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
    this.router.navigate([`room/update-bedspace/${roomObjectId}`]);
  }
  private initReloadTable$(): void {
    this.dataStoreService.reloadTable$
      .pipe(
        switchMap(() => this.endpoint.rooms(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater)),
        map((pageData) => {
          return modifyRoomObjectForBedspace(pageData);
        }),
        tap((pageData) => {
          updateState(this, pageData);
        }),
        retry(1),
        takeUntil(this.destroy$)
      ).subscribe();
  }
}
