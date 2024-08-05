import { Component, inject } from '@angular/core';
import {
  FormArray,
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
        formControlName="description"
      />
      @let description = adminForm.get('description');
      @if (description?.hasError('maxlength')) {
        <span>The description is too long</span>
      }
      <label for="img-input" class="admin__label-img">Img</label>
      <input
        id="img-input"
        class="admin__input-img"
        type="text"
        formControlName="img"
      />
      @let img = adminForm.get('img');
      @if (img?.invalid && (img?.touched || img?.dirty)) {
        @if (img?.hasError('required')) {
          <span>Please enter a link to the image</span>
        }
      }
      <label for="link-input" class="admin__label-link">Link video</label>
      <input
        id="link-input"
        class="admin__input-link"
        type="text"
        formControlName="video"
      />
      @let video = adminForm.get('video');
      @if (video?.invalid && (video?.touched || video?.dirty)) {
        @if (video?.hasError('required')) {
          <span>Please enter a link to the video</span>
        }
      }
      @let tags = adminForm.get('tags')?.value;
      @for (tag of tags; track tag) {
        <app-button class="login__add-tag" (click)="addTag()"
          >Add tag</app-button
        >
      }
      <app-button
        class="login__submit"
        type="submit"
        [disabled]="!adminForm.valid"
        >Create card</app-button
      >
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
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: ['', [Validators.maxLength(255)]],
      img: ['', [Validators.required]],
      video: ['', [Validators.required]],
      tags: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }

  public createCard() {
    console.log(this.adminForm.value);
  }

  get tags() {
    return this.adminForm.get('tags') as FormArray;
  }

  public addTag() {
    this.tags.push(this.formBuilder.control(''));
  }
}
