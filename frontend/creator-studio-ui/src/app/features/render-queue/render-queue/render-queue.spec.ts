import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderQueue } from './render-queue';

describe('RenderQueue', () => {
  let component: RenderQueue;
  let fixture: ComponentFixture<RenderQueue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderQueue],
    }).compileComponents();

    fixture = TestBed.createComponent(RenderQueue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
