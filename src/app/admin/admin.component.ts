import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../shared/components/button/button.component';
import { noFutureDate } from '../shared/validators/custom-validators';

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
      <label for="date-input" class="admin__label-date">Link video</label>
      <input
        id="date-input"
        class="admin__input-date"
        type="date"
        formControlName="date"
      />
      @let date = adminForm.get('date');
      @if (date?.invalid && (date?.touched || date?.dirty)) {
        @if (date?.hasError('futureDate')) {
          <span>The date is invalid</span>
        }
      }
      <!-- @let tags = adminForm.get('tags'); -->
      <div formArrayName="tags">
        @for (tag of tags.controls; track tag; let i = $index) {
          <label for="tag-input-{{ i }}" class="admin__label-tag">Tag</label>
          <input
            id="tag-input-{{ i }}"
            class="admin__input-tag"
            type="text"
            [formControlName]="i"
          />
          <app-button class="login__add-tag" (click)="addTag()"
            >Add tag</app-button
          >
        }
      </div>
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
      date: ['', noFutureDate()],
      tags: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }

  get tags() {
    return this.adminForm.get('tags') as FormArray;
  }

  public createCard() {
    console.log(this.adminForm.value);
  }

  public addTag() {
    this.tags.push(this.formBuilder.control(''));
  }
}
