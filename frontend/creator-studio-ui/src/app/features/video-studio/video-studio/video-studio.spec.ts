import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStudio } from './video-studio';

describe('VideoStudio', () => {
  let component: VideoStudio;
  let fixture: ComponentFixture<VideoStudio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoStudio],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoStudio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
