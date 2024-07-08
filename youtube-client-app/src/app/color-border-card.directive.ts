import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appColorBorderCard]',
  standalone: true,
})
export class ColorBorderCardDirective {
  @Input() date: string | undefined;

  constructor(private element: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('date' in changes) {
      console.log('decorator', this.date);
      this.element.nativeElement.style.borderBottom = '10px solid red';
    }
  }
}
