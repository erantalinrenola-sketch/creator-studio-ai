import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStudio } from './image-studio';

describe('ImageStudio', () => {
  let component: ImageStudio;
  let fixture: ComponentFixture<ImageStudio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageStudio],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageStudio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
