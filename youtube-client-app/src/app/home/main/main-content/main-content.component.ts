import { Component, Input } from '@angular/core';
import { YouTubeInterface } from '../../../you-tube-interface';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [],
  template: ` <p>main-content works!</p> `,
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  @Input() youTubeData!: YouTubeInterface;
}
