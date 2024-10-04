import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { CustomVideoCardComponent } from './custom-video-card.component';
import { VideoActions } from '../../../core/store/actions/edit-video.actions';
import { CustomVideo } from './custom-video-interface';

describe('CustomVideoCardComponent', () => {
  let component: CustomVideoCardComponent;
  let fixture: ComponentFixture<CustomVideoCardComponent>;
  let store: MockStore;

  const mockCustomItem: CustomVideo = {
    img: 'image_url',
    title: 'Test Video',
    video: 'http://testvideo.com',
    description: 'Test description',
    date: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomVideoCardComponent],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(CustomVideoCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    component.customItem = mockCustomItem;
    fixture.detectChanges();
  });

  it('should dispatch removeVideo action when delete button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const button = fixture.debugElement.query(
      By.css('app-button'),
    ).nativeElement;

    button.click();

    expect(dispatchSpy).toHaveBeenCalledWith(
      VideoActions.removeVideo({ video: mockCustomItem }),
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
