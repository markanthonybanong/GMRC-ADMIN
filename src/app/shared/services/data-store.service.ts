import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '../types';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public storeRequestStateUpdater: StoreRequestStateUpdater;
  public reloadTable$: Subject<undefined> = new Subject();
  public pageSizeOptions: Array<number> = [10, 20, 30, 40];
}
