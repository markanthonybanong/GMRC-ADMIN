import { Directive, Renderer2, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[appSetParentElHeight]'
})
export class SetParentElHeightDirective implements OnInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    const currentElement = this.elRef.nativeElement;
    const parent = this.renderer.parentNode(currentElement);
    this.renderer.setStyle(parent, 'height', '100%');

  }
}
