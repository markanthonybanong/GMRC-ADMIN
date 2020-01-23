import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '../types';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public storeRequestStateUpdater: StoreRequestStateUpdater;
  public reloadTable$: Subject<undefined> = new Subject();
}
