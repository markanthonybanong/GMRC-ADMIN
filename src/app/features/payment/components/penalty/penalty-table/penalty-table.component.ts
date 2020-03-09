import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PenaltyStoreState } from '../../../services/penalty/penalty/penalty.store.state';

@Component({
  selector: 'app-penalty-table',
  templateUrl: './penalty-table.component.html',
  styleUrls: ['./penalty-table.component.scss']
})
export class PenaltyTableComponent implements OnInit {
  @Input() displayColumns: Array<string>;
  @Input() state: PenaltyStoreState;
  @Output() penaltyTableOnUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() penaltyTableOnDelete: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onPenaltyUpdate(penaltyObjId: string): void {
    this.penaltyTableOnUpdate.emit(penaltyObjId);
  }
  onPenaltyDelete(penaltyObjId: string): void {
    this.penaltyTableOnDelete.emit(penaltyObjId);
  }

}
