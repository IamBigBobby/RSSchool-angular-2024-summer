import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  public adminForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    img: new FormControl(),
    link: new FormControl(),
  });

  public createCard() {
    console.log(this.adminForm.value.title);
  }
}
