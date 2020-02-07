import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { PageData, PageRequest, StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TENANT_CONFIG } from '../../../tenant.config';
import { Tenant } from '../../../types/tenant/tenant';

@Injectable()
export class TenantFormEndpoint {
  constructor(private apiService: ApiService) {}
  getTenant(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Tenant>> {
    const request = TENANT_CONFIG.request.tenants;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<PageData<Tenant>>(request.path, pageRequest)
    .pipe(
      tap(
        (pageData) => {
          requestStateUpdater(request.name, {inProgress: false, success: true});
          return pageData;
        },
        (error: HttpErrorResponse) => {
          requestStateUpdater(request.name, {inProgress: false, error: true});
          return throwError(error);
        }
      )
    );
  }
  addTenant(tenant: Tenant, requestStateUpdater): Observable<Tenant> {
    const request = TENANT_CONFIG.request.submit;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Tenant>(request.path, tenant)
      .pipe(
        tap(
          (createdTenant) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return createdTenant;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        )
      );
  }
  updateTenant(tenant: Tenant, requestStateUpdater): Observable<Tenant> {
    const request = TENANT_CONFIG.request.submit;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.put<Tenant>(`${request.path}${tenant._id}`, tenant)
      .pipe(
        tap(
          (updatedTenant) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return updatedTenant;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        )
      );
  }
}
