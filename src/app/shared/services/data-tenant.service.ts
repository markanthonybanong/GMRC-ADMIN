import { Injectable } from '@angular/core';
import { enumsToArray } from '../helpers';
import { Gender, Network } from 'src/app/features/tenant/tenant.enums';
import { Subject } from 'rxjs';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';
import { ApiService } from './api.service';
import { ROOM_CONFIG } from 'src/app/features/room/room.config';
import { PageData } from '../types';
import { tap, debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTenantService {
  public tenants: Array<Tenant> = [];
  private searchTenantByName$: Subject<object> = new Subject<object>();
  constructor(private apiService: ApiService) {
    this.searchTenants$();
  }
  get genders(): Array<string> {
    return enumsToArray(Gender);
  }
  get networks(): Array<string> {
    return enumsToArray(Network);
  }
  get displayedColumns(): Array<string> {
    return [
      'photo',
      'firstname',
      'middlename',
      'lastname',
      'gender',
      'typeOfNetWork',
      'roomNumber',
      'dueRentDate',
      'action'
    ];
  }
  onSearchTenant(name: string): void {
    const pageRequest = {
      filters: {
        type: ROOM_CONFIG.filter.type.TENANTBYKEYSTROKE,
        tenantName: name,
      }
    };
    this.searchTenantByName$.next(pageRequest);
  }
  private searchTenants$(): void {
    const request = ROOM_CONFIG.request.tenantByKeyStroke;
    this.searchTenantByName$
      .pipe(
        debounceTime(800),
        switchMap((pageRequest) => this.apiService.post<PageData<Tenant>>(request.path, pageRequest)),
        tap((pageData) => {
          this.tenants = pageData.data;
        }),
      ).subscribe();
  }
}
