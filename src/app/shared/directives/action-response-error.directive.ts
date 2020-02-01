import { Directive, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { RequestResponse } from '@gmrc-admin/shared/enums';
@Directive({
  selector: '[appActionResponse]'
})
export class ActionResponseErrorDirective implements AfterViewInit {
  constructor(  private renderer: Renderer2, private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    const response = this.elRef.nativeElement.textContent;
    if (response.trim() === RequestResponse.Error) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
    }
  }
}
