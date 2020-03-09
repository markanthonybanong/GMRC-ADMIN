import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PenaltyStoreState } from '../../../services/penalty/penalty/penalty.store.state';
import { Observable } from 'rxjs';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-penalty',
  templateUrl: './container-penalty.component.html',
  styleUrls: ['./container-penalty.component.scss']
})
export class ContainerPenaltyComponent implements OnInit {
  @Input() state$: Observable<PenaltyStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() penalty: object;
  @Input() pageSizeOptions: Array<number>;
  @Input() displayColumns: Array<string>;
  @Output() containerPenaltyOnSearch: EventEmitter<null>               = new EventEmitter<null>();
  @Output() containerPenaltyOnDisplayPenalties: EventEmitter<null>     = new EventEmitter<null>();
  @Output() containerPenaltyOnAddPenalty: EventEmitter<null>           = new EventEmitter<null>();
  @Output() containerPenaltyOnUpdate: EventEmitter<string>             = new EventEmitter<string>();
  @Output() containerPenaltyOnDelete: EventEmitter<string>             = new EventEmitter<string>();
  @Output() containerPenaltyOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnInit() {
  }
  onSearch(): void {
    this.containerPenaltyOnSearch.emit();
  }
  onDisplayAllPenalties(): void {
    this.containerPenaltyOnDisplayPenalties.emit();
  }
  onAddPenalty(): void {
    this.containerPenaltyOnAddPenalty.emit();
  }
  onPenaltyUpdate($event: string): void {
    this.containerPenaltyOnUpdate.emit($event);
  }
  onPenaltyDelete($event: string): void {
    this.containerPenaltyOnDelete.emit($event);
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.containerPenaltyOnPaginatorUpdate.emit($event);
  }
}
