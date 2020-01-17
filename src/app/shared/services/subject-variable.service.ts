import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectVariableService {
  public reloadList$: Subject<undefined> = new Subject();
  public destroy$: Subject<boolean> = new Subject<boolean>();
}
