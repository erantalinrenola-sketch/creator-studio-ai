import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LipSync } from './lip-sync';

describe('LipSync', () => {
  let component: LipSync;
  let fixture: ComponentFixture<LipSync>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LipSync],
    }).compileComponents();

    fixture = TestBed.createComponent(LipSync);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
