import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  get pageSizeOptions(): Array<number> {
    return [10, 20, 30, 40];
  }
}
