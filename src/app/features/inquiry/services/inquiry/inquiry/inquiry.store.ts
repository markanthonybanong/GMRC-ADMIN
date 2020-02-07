import { Injectable, OnDestroy} from '@angular/core';
import { InquiryStoreState } from './inquiry.store.state';
import { Store } from 'rxjs-observable-store';
import { PageEvent, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { getStoreRequestStateUpdater, removeEmptyKeys, updateState } from '@gmrc-admin/shared/helpers';
import { Router } from '@angular/router';
import { switchMap, map, tap, takeUntil, retry } from 'rxjs/operators';
import { InquiryEndpoint } from './inquiry.endpoint';
import { DataStoreService, ModalService } from '@gmrc-admin/shared/services';
import { INQUIRY_CONFIG } from '../../../inquiry.config';
import { SearchInquiryComponent } from '../../../modals/inquiry/search-inquiry/search-inquiry.component';
import { ToDelete } from '../../../types/inquiry/to-delete';
import { modifyInquiryObject } from '../../../helpers/inquiry/inquiry/modify-inquiry-object';
@Injectable()
export class InquiryStore  extends Store<InquiryStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private endpoint: InquiryEndpoint,
    private router: Router,
    private dataStoreService: DataStoreService,
    private modalService: ModalService,
    private dialog: MatDialog
  ) {
    super(new InquiryStoreState());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
    this.modalService.confirmation(INQUIRY_CONFIG.action.delete, `Are you sure you want to delete ${toDelete.name}'s inquiry?`)
      .afterClosed().subscribe(deleteInquiry => {
        if (deleteInquiry) {
         this.deleteInquiry(toDelete.objectId);
        }
      });
  }
  onSearch(search: object): void {
    const dialogRef = this.dialog.open(SearchInquiryComponent, {
      data: {
        title: INQUIRY_CONFIG.action.search
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setState({
          ...this.state,
          table: {
            ...this.state.table,
            pageRequest: {
              page: 1,
              limit: this.dataStoreService.pageLimit,
              filters: {
                type: INQUIRY_CONFIG.filter.type.ADVANCESEARCHINQUIRY,
                inquiryFilter: removeEmptyKeys(result),
              }
            }
          }
        });
        this.dataStoreService.reloadTable$.next();
      }
    });
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
            type: INQUIRY_CONFIG.filter.type.ALLINQUIRIES,
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
          return this.endpoint.inquiries(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
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
            this.modalService.success(INQUIRY_CONFIG.action.delete, `Deleted ${inquiry.name}'s inquiry`);
            this.dataStoreService.reloadTable$.next();
          },
          () => {
            this.modalService.error(INQUIRY_CONFIG.action.delete);
          }
        )
      )
      .subscribe();
  }
}
