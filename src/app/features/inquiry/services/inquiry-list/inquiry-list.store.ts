import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { InquiryListStoreState } from './inquiry-list.store.state';
import { StoreRequestStateUpdater, PageRequest } from '@gmrc-admin/shared/types';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil, catchError, retry } from 'rxjs/operators';
import { InquiryListEndpoint } from './inquiry-list.endpoint';
import { INQUIRY_CONFIG } from '../../inquiry.config';

@Injectable()
export class InquiryListStore extends Store<InquiryListStoreState> {
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  private reloadList$: Subject<undefined> = new Subject();
  private pageSizeOptions: number[] = [10, 20, 30, 40];
  private pageRequest = new PageRequest(1, this.pageSizeOptions[0]);
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private endPoint: InquiryListEndpoint
  ) {
    super(new InquiryListStoreState());
  }
  init(): void {
    console.log('the motherfucking ',this.state);

    this.pageRequest.filters.type = INQUIRY_CONFIG.filters.types.ALLINQUIRIES;
    this.initReloadList$();
    this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
  }
  private initReloadList$(): void {
    this.reloadList$
      .pipe(
        switchMap(() => {
          console.log('xxxxx');
          return this.endPoint.list(this.pageRequest, this.storeRequestStateUpdater);
        }),
        tap(
          (pageData) => {
          console.log('the page data ', pageData);
          },
          (err) => {
            console.log('the error ', err);
          }
        ),
        retry(),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

}
