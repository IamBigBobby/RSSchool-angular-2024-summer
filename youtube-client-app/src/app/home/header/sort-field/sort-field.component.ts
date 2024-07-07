import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-field',
  standalone: true,
  imports: [],
  template: `
    <div class="sort-wrapper">
      <p>Sorting by:</p>
      <div class="sort-settings">
        <div>date</div>
        <div>count of views</div>
        <div class="sort-input">
          <p>by word of sentance</p>
          <form>
            <input type="text" placeholder="" />
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: './sort-field.component.scss',
})
export class SortFieldComponent {}
