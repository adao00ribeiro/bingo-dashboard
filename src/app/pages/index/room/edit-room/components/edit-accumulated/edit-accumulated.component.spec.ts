import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccumulatedComponent } from './edit-accumulated.component';

describe('EditAccumulatedComponent', () => {
  let component: EditAccumulatedComponent;
  let fixture: ComponentFixture<EditAccumulatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccumulatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccumulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
