import { Directive, ElementRef, Input, input } from '@angular/core';

@Directive({
  selector: '[appColorBorderCard]',
  standalone: true,
})
export class ColorBorderCardDirective {
  @Input() date: Date | undefined;

  constructor(private element: ElementRef) {
    console.log(this.date);
    element.nativeElement.style.borderBottom = '10px solid red';
  }
}
