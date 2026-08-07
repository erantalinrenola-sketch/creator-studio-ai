import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceStudio } from './voice-studio';

describe('VoiceStudio', () => {
  let component: VoiceStudio;
  let fixture: ComponentFixture<VoiceStudio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceStudio],
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceStudio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
