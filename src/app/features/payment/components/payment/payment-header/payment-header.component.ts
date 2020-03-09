import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-header',
  templateUrl: './payment-header.component.html',
  styleUrls: ['./payment-header.component.scss']
})
export class PaymentHeaderComponent implements OnInit {
  @Input() paymentTableName: string;
  @Output() paymentHeaderOnEntry: EventEmitter<null> = new EventEmitter<null>();
  @Output() paymentHeaderOnRoom: EventEmitter<null> = new EventEmitter<null>();
  @Output() paymentHeaderOnPenalty: EventEmitter<null> = new EventEmitter<null>();
  @Output() paymentHeaderOnUnsettleBill: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }

  onEntry(): void {
    this.paymentHeaderOnEntry.emit();
  }
  onRoom(): void{
    this.paymentHeaderOnRoom.emit();
  }
  onPenalty(): void {
    this.paymentHeaderOnPenalty.emit();
  }
  onUnsettleBill(): void {
    this.paymentHeaderOnUnsettleBill.emit();
  }


}
