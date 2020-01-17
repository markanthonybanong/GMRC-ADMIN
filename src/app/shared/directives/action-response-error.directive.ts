import { Directive, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Request } from '@gmrc-admin/shared/enums';
@Directive({
  selector: '[appActionResponseError]'
})
export class ActionResponseErrorDirective implements AfterViewInit {
  constructor(  private renderer: Renderer2, private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    const response = this.elRef.nativeElement.textContent;
    if (response.trim() === Request.Error) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
    }
  }
}
