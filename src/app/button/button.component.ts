import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button class="custom-button" type="button" (click)="handleClick()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
