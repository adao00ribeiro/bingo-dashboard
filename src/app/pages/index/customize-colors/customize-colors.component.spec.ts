import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeColorsComponent } from './customize-colors.component';

describe('CustomizeColorsComponent', () => {
  let component: CustomizeColorsComponent;
  let fixture: ComponentFixture<CustomizeColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizeColorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizeColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
