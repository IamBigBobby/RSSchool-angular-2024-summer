import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { CustomVideo } from '../../../custom-video/custom-video-interface';
import { ColorBorderCardDirective } from '../../directives/color-border-card.directive';
import { FilteringKeyWordPipe } from '../../pipes/filtering-key-word.pipe';
import { ButtonComponent } from '../button/button.component';
import { AdminComponent } from '../../../admin/admin.component';
import { VideoActions } from '../../../core/store/actions/edit-video.actions';

@Component({
  selector: 'app-custom-video-card',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    FilteringKeyWordPipe,
    ColorBorderCardDirective,
    NgOptimizedImage,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    AdminComponent,
  ],
  template: `
    <div appColorBorderCard [date]="customItem.date" class="custom-video-card">
      <p>Custom card</p>
      <img
        class="custom-video-card__title"
        [ngSrc]="customItem.img"
        width="320"
        height="180"
        priority
        alt="title"
      />
      <div class="custom-video-card__title">
        {{ customItem.title }}
      </div>
      <div class="custom-video-card__link">
        <a [href]="customItem.video">video link</a>
      </div>
      <div class="custom-video-card__description">
        {{ customItem.description }}
      </div>
      <div class="custom-video-card__date">
        {{ customItem.date | date }}
      </div>
      <app-button (click)="removeCustomCard(customItem)"
        >Delete custom card</app-button
      >
    </div>
  `,
  styleUrl: './custom-video-card.component.scss',
})
export class CustomVideoCardComponent {
  private store = inject(Store);

  @Input({
    required: true,
  })
  customItem!: CustomVideo;

  removeCustomCard(video: CustomVideo) {
    this.store.dispatch(VideoActions.removeVideo({ video }));
  }
}
