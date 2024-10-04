import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MainContentComponent } from './main-content.component';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentComponent],
      providers: [{ provide: Store, useValue: { select: () => of([]) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have sortedVideoItems$ as observable', () => {
    expect(component.sortedVideoItems$).toBeDefined();
  });

  it('should have a defined store instance', () => {
    expect(component.store).toBeDefined();
  });
});
