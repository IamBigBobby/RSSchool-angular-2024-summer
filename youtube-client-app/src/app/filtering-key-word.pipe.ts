import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteringKeyWord',
  standalone: true,
})
export class FilteringKeyWordPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
