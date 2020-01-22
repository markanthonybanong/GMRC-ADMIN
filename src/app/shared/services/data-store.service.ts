import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '../types';
import { Request } from '@gmrc-admin/shared/enums';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public storeRequestStateUpdater: StoreRequestStateUpdater;
  public request: {
    Error: string
  } = Request;
  public reloadTable$: Subject<undefined> = new Subject();
}
