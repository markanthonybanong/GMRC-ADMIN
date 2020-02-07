import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '../types';
import { Subject } from 'rxjs';
import { RequestResponse } from '../enums';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public storeRequestStateUpdater: StoreRequestStateUpdater;
  public reloadTable$: Subject<undefined> = new Subject();
  public pageSizeOptions: Array<number> = [10, 20, 30, 40];
  public requestResponse: object = RequestResponse;
  public pageLimit = 200;
}
