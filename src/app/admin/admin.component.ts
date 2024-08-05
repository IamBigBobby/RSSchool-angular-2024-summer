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
        @if (date?.hasError('required')) {
          <span>Please enter a creation date</span>
        }
        @if (date?.hasError('futureDate')) {
          <span>The date is invalid</span>
        }
      }
      <div class="admin__tags-container" formArrayName="tags">
        @for (tag of tags.controls; track tag; let i = $index) {
          <label for="tag-input-{{ i }}" class="admin__label-tag">Tag</label>
          <input
            id="tag-input-{{ i }}"
            class="admin__input-tag"
            type="text"
            [formControlName]="i"
          />
          <app-button class="admin__submit" (click)="removeTag(i)"
            >Remove tag</app-button
          >
        }
        <app-button class="login__add-tag" (click)="addTag()"
          >Add tag</app-button
        >
        @let tagsArr = adminForm.get('tags')?.value;
        @if (tagsArr.length >= maxTags) {
          <span>Maximum of {{ maxTags }} tags allowed</span>
        }
      </div>
      <app-button
        class="admin__submit"
        type="submit"
        [disabled]="!adminForm.valid"
        >Create card</app-button
      >
      <app-button class="admin__reset" (click)="resetForm()">
        Reset form
      </app-button>
    </form>
  `,
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private formBuilder = inject(FormBuilder);

  public adminForm: FormGroup;

  public maxTags = 5;

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
      date: ['', [noFutureDate(), Validators.required]],
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
    if (this.tags.length < this.maxTags) {
      this.tags.push(this.formBuilder.control(''));
    }
  }

  public removeTag(index: number) {
    this.tags.removeAt(index);
  }

  public resetForm() {
    this.adminForm.reset({
      title: '',
      description: '',
      img: '',
      video: '',
      date: '',
      tags: [''],
    });
  }
}
