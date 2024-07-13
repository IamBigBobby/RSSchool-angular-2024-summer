import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [],
  template: `
    <button class="custom-button" (click)="handleClick()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>(); // событие клика

  handleClick() {
    this.clicked.emit(); // испускаем событие при клике
  }
}
