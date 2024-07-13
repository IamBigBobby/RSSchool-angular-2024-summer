import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button class="custom-button" (click)="handleClick()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss',
})
export default class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    console.log('detailed button');
    this.clicked.emit();
  }
}
