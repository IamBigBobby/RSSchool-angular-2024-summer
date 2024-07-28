import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="page-not-found__wrapper">
      <img
        class="page-not-found__img"
        ngSrc="assets/404.svg"
        width="100"
        height="100"
        priority
        alt="404"
      />
      <div class="page-not-found__notification">Sorry, smth went wrong</div>
    </div>
  `,
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {}
