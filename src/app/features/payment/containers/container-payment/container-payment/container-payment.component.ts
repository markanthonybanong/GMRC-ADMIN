import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-container-payment',
  templateUrl: './container-payment.component.html',
  styleUrls: ['./container-payment.component.scss']
})
export class ContainerPaymentComponent implements OnInit {
  @Input () paymentTableName: string;
  @Output() containerPaymentOnEntry: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerPaymentOnRoom: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerPaymentOnPenalty: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerPaymentOnUnsettleBill: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerPaymentOnSetTableName: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onEntry(): void {
    this.containerPaymentOnEntry.emit();
  }
  onRoom(): void{
    this.containerPaymentOnRoom.emit();
  }
  onPenalty(): void {
    this.containerPaymentOnPenalty.emit();
  }
  onUnsettleBill(): void {
    this.containerPaymentOnUnsettleBill.emit();
  }
  onSetTableName($event: any): void {
    this.containerPaymentOnSetTableName.emit($event);
  }

}
