import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '../types';
import { Request } from '@gmrc-admin/shared/enums';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public storeRequestStateUpdater: StoreRequestStateUpdater;
  public request: object = Request;
  public reloadTable$: Subject<undefined> = new Subject();
}
