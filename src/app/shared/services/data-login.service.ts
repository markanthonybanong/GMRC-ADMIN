import { Injectable } from '@angular/core';
import { enumsToArray } from '@gmrc-admin/shared/helpers';
import { UserType } from 'src/app/features/login/login.enums';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  constructor() { }
  get userTypes(): Array<string> {
    return enumsToArray(UserType);
  }

}
