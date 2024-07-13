import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appColorBorderCard]',
  standalone: true,
})
export default class ColorBorderCardDirective implements OnChanges {
  @Input() date: string | undefined;

  constructor(private element: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('date' in changes && this.date) {
      const currentDate = new Date();

      const targetDate = new Date(this.date);

      const differenceMs = targetDate.getTime() - currentDate.getTime();

      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

      let color: string = '';

      if (differenceDays <= -186) {
        color = 'red';
      } else if (differenceDays > -186 && differenceDays <= -31) {
        color = 'yellow';
      } else if (differenceDays > -31 && differenceDays < 7) {
        color = 'green';
      } else {
        color = 'blue';
      }

      this.element.nativeElement.style.borderBottom = `10px solid ${color}`;
    }
  }
}
