import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptGenerator } from './prompt-generator';

describe('PromptGenerator', () => {
  let component: PromptGenerator;
  let fixture: ComponentFixture<PromptGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
