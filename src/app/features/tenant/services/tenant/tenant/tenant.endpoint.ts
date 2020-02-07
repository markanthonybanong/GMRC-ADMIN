import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpErrorResponse } from '@angular/common/http';
import { TENANT_CONFIG } from '../../../tenant.config';
import { Tenant } from '../../../types/tenant/tenant';

@Injectable()
export class TenantEndpoint {
  constructor(private apiService: ApiService) {}
  tenants(pageRequest: any, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Tenant>> {
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
}
