import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';

@Injectable()
export class FormEndpoint {
  constructor(private apiService: ApiService) {}
}
