import { Directive, Renderer2, ElementRef } from '@angular/core';
import { PaymentStatus } from 'src/app/features/payment/payment.enums';

@Directive({
  selector: '[appPaymentColorStatus]'
})
export class PaymentColorStatusDirective {

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }
  ngAfterViewInit(): void {
    const paymentStatus = this.elRef.nativeElement.textContent;
    if (paymentStatus === PaymentStatus.BALANCE) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', 'rgb(222, 202, 27)');
    } else if (paymentStatus === PaymentStatus.UNPAID) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
    } else if (paymentStatus === PaymentStatus.PAID) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', 'green');
    }
  }

}
