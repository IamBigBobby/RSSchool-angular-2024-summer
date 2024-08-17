import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="custom-button"
      [type]="type"
      [disabled]="disabled"
      (click)="onButtonClick()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';

  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();

  onButtonClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
