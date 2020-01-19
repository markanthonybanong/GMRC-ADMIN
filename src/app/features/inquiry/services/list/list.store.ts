import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { ListStoreState } from './list.store.state';
import { Store } from 'rxjs-observable-store';
import { PageEvent, MatDialog } from '@angular/material';
import { PageData } from '@gmrc-admin/shared/types';
import { Subject } from 'rxjs';
import { getStoreRequestStateUpdater, removeEmptyKeys } from '@gmrc-admin/shared/helpers';
import { Request } from '@gmrc-admin/shared/enums';
import { Router } from '@angular/router';
import { switchMap, map, tap, takeUntil, retry } from 'rxjs/operators';
import { Inquiry } from '../../types/inquiry';
import { ListEndpoint } from './list.endpoint';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { ToDelete } from '../../types/to-delete';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { modifyInquiryObject } from '../../helpers/list/modify-inquiry-object';
@Injectable()
export class ListStore  extends Store<ListStoreState> implements OnDestroy{
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private endpoint: ListEndpoint,
    private router: Router,
    private dataStoreService: DataStoreService,
    private dialog: MatDialog
  ) {
    super(new ListStoreState());
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
    this.reloadLists();
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.setState({
      ...this.state,
      list: {
        ...this.state.list,
        pageRequest: {
          ...this.state.list.pageRequest,
          page: $event.pageIndex + 1,
          limit: $event.pageSize
        }
      }
    });
    this.reloadLists();
  }
  onAddInquiry(): void {
    this.router.navigate(['inquiry/add']);
  }
  onInquiryUpdate(objectId: string): void {
    this.router.navigate([`inquiry/update/${objectId}`]);
  }
  onInquiryDelete(toDelete: ToDelete): void {
    const dialogRef = this.dialog.open(
      ActionResponseComponent, {
        data: {
          title: INQUIRY_CONFIG.actions.delete,
          content: `Are you sure you want to delete ${toDelete.name}'s inquiry?`
        }
      }
    );
    dialogRef.afterClosed().subscribe(deleteInquiry => {
       if (deleteInquiry) {
        this.deleteInquiry(toDelete.objectId);
       }
    });
  }
  onSearch(search: object): void {
    this.setState({
      ...this.state,
      list: {
        ...this.state.list,
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
    this.reloadLists();
  }
  onDisplayAllInquiry(): void {
    this.setState({
      ...this.state,
      list: {
        ...this.state.list,
        pageRequest: {
          page: 1,
          limit: 10,
          filters: {
            type: INQUIRY_CONFIG.filters.types.ALLINQUIRIES,
          }
        }
      }
    });
    this.reloadLists();
  }

  private reloadLists(): void {
    this.dataStoreService.reloadList$.next();
  }
  private initReloadList$(): void {
    this.dataStoreService.reloadList$
      .pipe(
        switchMap(() => {
          return this.endpoint.list(this.state.list.pageRequest, this.dataStoreService.storeRequestStateUpdater);
        }),
        map((pageData) => {
          return modifyInquiryObject(pageData);
        }),
        tap((pageData) => {
         this.updateState(pageData);
        }),
        retry(1),
        takeUntil(this.destroy$)
      ).subscribe();
  }
  private updateState(pageData: PageData<Inquiry>): void {
    this.setState({
      ...this.state,
      list: {
        ...this.state.list,
        totalCount: pageData.totalCount,
        dataSource: pageData.data,
      }
    });
  }
  private deleteInquiry(objectId: string): void {
    this.endpoint.delete(objectId, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap(
          (inquiry) => {
            this.dialog.open(ActionResponseComponent, {
              data: {
                title: INQUIRY_CONFIG.actions.delete,
                content: `Deleted ${inquiry.name}'s inquiry`
              }
            });
            this.reloadLists();
          },
          () => {
            this.dialog.open(ActionResponseComponent, {
              data: {
                title: INQUIRY_CONFIG.actions.delete,
                content: Request.Error,
              }
            });
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
