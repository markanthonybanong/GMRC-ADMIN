import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';

@Injectable({
  providedIn: 'root'
})
export class StateVariableService {
  public storeRequestStateUpdater: StoreRequestStateUpdater;
}
