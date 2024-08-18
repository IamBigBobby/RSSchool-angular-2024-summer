import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import {
  selectNextPageToken,
  selectPageNumber,
  selectPrevPageToken,
} from '../../../core/store/selectors/video-selectors';
import { VideoActions } from '../../../core/store/actions/edit-video.actions';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  template: `
    <div class="pagination-container">
      <app-button
        (click)="loadPrevPage()"
        [disabled]="(prevPageToken$ | async) === undefined"
        >Prev</app-button
      >
      <div class="pagination__counter">{{ pageNumber$ | async }}</div>
      <app-button
        (click)="loadNextPage()"
        [disabled]="(nextPageToken$ | async) === undefined"
        >Next</app-button
      >
    </div>
  `,
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  private store = inject(Store);

  public nextPageToken$ = this.store.select(selectNextPageToken);

  public prevPageToken$ = this.store.select(selectPrevPageToken);

  public pageNumber$ = this.store.select(selectPageNumber);

  loadNextPage() {
    if (!this.nextPageToken$) return;
    this.store.dispatch(VideoActions.loadNextPage());
  }

  loadPrevPage() {
    if (!this.prevPageToken$) return;
    this.store.dispatch(VideoActions.loadPrevPage());
  }
}
