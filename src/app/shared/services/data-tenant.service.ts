import { Injectable } from '@angular/core';
import { enumsToArray } from '../helpers';
import { Gender } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class DataTenantService {
  public genders: Array<string> = enumsToArray(Gender);
}
