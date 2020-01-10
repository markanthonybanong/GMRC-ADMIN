import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { InquiryListStoreState } from './inquiry-list.store.state';
import { StoreRequestStateUpdater, PageRequest, PageData } from '@gmrc-admin/shared/types';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { Subject, pairs } from 'rxjs';
import { switchMap, tap, takeUntil, retry, map } from 'rxjs/operators';
import { InquiryListEndpoint } from './inquiry-list.endpoint';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { Inquiry } from '../../types/inquiry';
import { DateService } from '@gmrc-admin/core';

@Injectable()
export class InquiryListStore extends Store<InquiryListStoreState> {
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
    'foundGMRCthrough',
    'actions',
  ];
  constructor(
    private endPoint: InquiryListEndpoint,
    private dateService: DateService
  ) {
    super(new InquiryListStoreState());
  }
  init(): void {
    this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    console.log('the initState ', this.state);
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
          //console.log('the page data ', pageData);
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
        ...inquiry, willOccupyIn: this.dateService.dateToDateString(inquiry.willOccupyIn)
      })),
      pageCount: pageData.pageCount,
      totalCount: pageData.totalCount,
    };
  }


}
