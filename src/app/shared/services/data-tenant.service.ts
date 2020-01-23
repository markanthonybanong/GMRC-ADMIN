import { Injectable } from '@angular/core';
import { enumsToArray } from '../helpers';
import { Gender } from 'src/app/features/tenant/tenant.enums';

@Injectable({
  providedIn: 'root'
})
export class DataTenantService {
  public genders: Array<string> = enumsToArray(Gender);
}
