import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneGenerator } from './scene-generator';

describe('SceneGenerator', () => {
  let component: SceneGenerator;
  let fixture: ComponentFixture<SceneGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
