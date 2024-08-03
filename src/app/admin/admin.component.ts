import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../shared/components/button/button.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  template: `
    <form class="admin" [formGroup]="adminForm" (ngSubmit)="createCard()">
      <h2 class="admin__title">Create new card</h2>
      <label for="title-input" class="admin__label-user">Title</label>
      <input
        id="title-input"
        class="admin__input-user"
        type="text"
        placeholder="Enter your login"
        formControlName="title"
      />
      @let title = adminForm.get('title');
      @if (title?.invalid && (title?.touched || title?.dirty)) {
        @if (title?.hasError('required')) {
          <span>Please enter a title</span>
        }
        @if (title?.value?.length > 0) {
          @if (title?.hasError('minlength')) {
            <span>The title is too short</span>
          }
          @if (title?.hasError('maxlength')) {
            <span>The title is too long</span>
          }
        }
      }
      <label for="description-input" class="admin__label-password"
        >Descriptions</label
      >
      <input
        id="description-input"
        class="admin__input-password"
        type="text"
        placeholder="Enter your password"
        formControlName="description"
      />
      <label for="img-input" class="admin__label-img">Img</label>
      <input
        id="img-input"
        class="admin__input-img"
        type="text"
        placeholder="Enter your password"
        formControlName="img"
      />
      <label for="link-input" class="admin__label-link">Link video</label>
      <input
        id="link-input"
        class="admin__input-link"
        type="text"
        placeholder="Enter your password"
        formControlName="link"
      />
      <app-button class="login__submit" type="submit">Create card</app-button>
    </form>
  `,
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private formBuilder = inject(FormBuilder);

  public adminForm: FormGroup;

  constructor() {
    this.adminForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(21),
        ],
      ],
      description: [''],
      img: [''],
      link: [''],
    });
  }

  public createCard() {
    console.log(this.adminForm.value.title);
  }
}
