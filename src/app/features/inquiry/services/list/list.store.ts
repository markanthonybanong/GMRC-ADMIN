import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { ListStoreState } from './list.store.state';
import { Store } from 'rxjs-observable-store';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { StoreRequestStateUpdater, PageData, PageRequest } from '@gmrc-admin/shared/types';
import { Subject } from 'rxjs';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { Router } from '@angular/router';
import { switchMap, map, tap, takeUntil, retry, startWith } from 'rxjs/operators';
import { Inquiry } from '../../types/inquiry';
import { ListEndpoint } from './list.endpoint';
import { toDateString, isDateAfter, dateDiff} from '@gmrc-admin/shared/helpers';
import { StateVariableService, DataTableService } from '@gmrc-admin/shared/services';
import { SubjectVariableService } from 'src/app/shared/services/subject-variable.service';
import { Request} from '@gmrc-admin/shared/enums';
import { DataSource } from '@angular/cdk/table';
import * as inquiryHelpers from '../../helpers/inquiry.helpers';
@Injectable()
export class ListStore  extends Store<ListStoreState> implements OnDestroy{
  // private storeRequestStateUpdater: StoreRequestStateUpdater;
  private reloadList$: Subject<undefined> = new Subject();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private endpoint: ListEndpoint,
    private router: Router,
    private stateVarService: StateVariableService,
    private subjectVarService: SubjectVariableService,
    private dataTableService: DataTableService
  ) {
    super(new ListStoreState());
  }
  get request(): object {
    return Request;
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
  get pageSizeOptions(): Array<number> {
    return this.dataTableService.pageSizeOptions;
  }
  init(): void {
    this.stateVarService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.initReloadList$();
    this.reloadLists();
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
    this.reloadLists();
  }
  onAddInquiry(): void {
    this.router.navigate(['inquiry/add']);
  }
  onInquiryUpdate(objectId: string): void {
    this.router.navigate([`inquiry/update/${objectId}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  private reloadLists(): void {
    this.reloadList$.next();
  }
  private initReloadList$(): void {
    this.reloadList$
      .pipe(
        switchMap(() => {
          return this.endpoint.list(this.state.table.pageRequest, this.stateVarService.storeRequestStateUpdater);
        }),
        map((pageData) => {
          return inquiryHelpers.modifyInquiryObject(pageData);
        }),
        tap((pageData) => {
         this.updateState(pageData);
        }),
        retry(1),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  private updateState(pageData: PageData<Inquiry>): void {
    this.setState({
      ...this.state,
      table: {
        ...this.state.table,
        totalCount: pageData.totalCount,
        dataSource: pageData.data,
      }
    });
  }

}
