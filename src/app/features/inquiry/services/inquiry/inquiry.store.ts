import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { InquiryStoreState } from './inquiry.store.state';
import { Store } from 'rxjs-observable-store';
import { PageEvent, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { getStoreRequestStateUpdater, removeEmptyKeys, updateState } from '@gmrc-admin/shared/helpers';
import { Router } from '@angular/router';
import { switchMap, map, tap, takeUntil, retry } from 'rxjs/operators';
import { InquiryEndpoint } from './inquiry.endpoint';
import { DataStoreService, ModalService } from '@gmrc-admin/shared/services';
import { ToDelete } from '../../types/to-delete';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { modifyInquiryObject } from '../../helpers/inquiry/modify-inquiry-object';
@Injectable()
export class InquiryStore  extends Store<InquiryStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private endpoint: InquiryEndpoint,
    private router: Router,
    private dataStoreService: DataStoreService,
    private modalService: ModalService,
  ) {
    super(new InquiryStoreState());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  get displayedColumns(): Array<string> {
    return [
      'name',
      'roomType',
      'roomNumber',
      'willOccupyIn',
      'phoneNumber',
      'actions',
    ];
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.initReloadList$();
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
          limit: $event.pageSize
        }
      }
    });
    this.dataStoreService.reloadTable$.next();
  }
  onAddInquiry(): void {
    this.router.navigate(['inquiry/add']);
  }
  onInquiryUpdate(objectId: string): void {
    this.router.navigate([`inquiry/update/${objectId}`]);
  }
  onInquiryDelete(toDelete: ToDelete): void {
    this.modalService.confirmation(INQUIRY_CONFIG.actions.delete, `Are you sure you want to delete ${toDelete.name}'s inquiry?`)
      .afterClosed().subscribe(deleteInquiry => {
        if (deleteInquiry) {
         this.deleteInquiry(toDelete.objectId);
        }
      });
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
            type: INQUIRY_CONFIG.filters.types.ADVANCESEARCHINQUIRY,
            inquiryFilter: removeEmptyKeys(search),
          }
        }
      }
    });
    this.dataStoreService.reloadTable$.next();
  }
  onDisplayAllInquiry(): void {
    this.setState({
      ...this.state,
      table: {
        ...this.state.table,
        pageRequest: {
          page: 1,
          limit: 10,
          filters: {
            type: INQUIRY_CONFIG.filters.types.ALLINQUIRIES,
          }
        }
      }
    });
    this.dataStoreService.reloadTable$.next();
  }

  private initReloadList$(): void {
    this.dataStoreService.reloadTable$
      .pipe(
        switchMap(() => {
          return this.endpoint.inquiry(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
        }),
        map((pageData) => {
          return modifyInquiryObject(pageData);
        }),
        tap((pageData) => {
         updateState(this, pageData);
        }),
        retry(1),
        takeUntil(this.destroy$)
      ).subscribe();
  }
  private deleteInquiry(objectId: string): void {
    this.endpoint.delete(objectId, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap(
          (inquiry) => {
            this.modalService.success(INQUIRY_CONFIG.actions.delete, `Deleted ${inquiry.name}'s inquiry`);
            this.dataStoreService.reloadTable$.next();
          },
          () => {
            this.modalService.error(INQUIRY_CONFIG.actions.delete);
          }
        )
      )
      .subscribe();
  }
}
