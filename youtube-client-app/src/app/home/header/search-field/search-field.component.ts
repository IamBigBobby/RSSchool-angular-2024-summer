import { Component } from '@angular/core';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [],
  template: `
  <section>
    <form>
      <input type="text" placeholder="What are you want to find out?" />
      <button class="primary" type="button">Search</button>
    </form>
  </section>
  `,
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {}
