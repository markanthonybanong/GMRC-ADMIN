import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  public pageSizeOptions: Array<number> = [10, 20, 30, 40];
}
