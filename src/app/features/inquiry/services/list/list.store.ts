import { Injectable, OnDestroy } from '@angular/core';
import { ListStoreState } from './list.store.state';
import { Store } from 'rxjs-observable-store';
import { PageEvent } from '@angular/material';
import { StoreRequestStateUpdater, PageRequest, PageData } from '@gmrc-admin/shared/types';
import { Subject } from 'rxjs';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { Router } from '@angular/router';
import { switchMap, map, tap, takeUntil } from 'rxjs/operators';
import { Inquiry } from '../../types/inquiry';
import { ListEndpoint } from './list.endpoint';
import { toDateString, isDateAfter, dateDiff} from '@gmrc-admin/shared/helpers';
@Injectable()
export class ListStore  extends Store<ListStoreState> implements OnDestroy {
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  private reloadList$: Subject<undefined> = new Subject();
  pageSizeOptions: number[] = [10, 20, 30, 40];
  totalCount: number = null;
  private pageRequest = new PageRequest(1, this.pageSizeOptions[0]);
  private destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = [
    'name',
    'roomType',
    'roomNumber',
    'willOccupyIn',
    'phoneNumber',
    'actions',
  ];
  constructor(
    private endPoint: ListEndpoint,
    private router: Router
  ) {
    super(new ListStoreState());
  }
  init(): void {
    this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.pageRequest.filters.type = INQUIRY_CONFIG.filters.types.ALLINQUIRIES;
    this.initReloadList$();
    this.reloadLists();
  }
  reloadLists(): void {
    this.reloadList$.next();
  }
  private initReloadList$(): void {
    this.reloadList$
      .pipe(
        switchMap(() => {
          return this.endPoint.list(this.pageRequest, this.storeRequestStateUpdater);
        }),
        map((pageData) => {
           return this.modifyInquiryObject(pageData);
        }),
        tap((pageData) => {
          this.updateInquiryListState(pageData);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  private updateInquiryListState(pageData: PageData<Inquiry>): void {
    this.setState({
      ...this.state,
      dataSource: pageData.data,
      totalCount: pageData.totalCount
    });
  }
  private modifyInquiryObject(pageData: PageData<Inquiry>): PageData<Inquiry> {
    return {
      data: pageData.data.map((inquiry) => ({
        ...inquiry,
        willOccupyInWarningMsg: this.willOccupyInWarningMsg(inquiry.willOccupyIn),
        willOccupyIn: toDateString(inquiry.willOccupyIn),
      })),
      pageCount: pageData.pageCount,
      totalCount: pageData.totalCount,
    };
  }
  private willOccupyInWarningMsg(date: Date): string {
    return isDateAfter(date)
           ? `${dateDiff(date)} day/s over, since reservation date`
           : null;
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.pageRequest.page = $event.pageIndex + 1;
    this.pageRequest.limit = $event.pageSize;
    this.reloadLists();
  }
  onAddInquiry(): void {
    this.router.navigate(['inquiry/add']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
