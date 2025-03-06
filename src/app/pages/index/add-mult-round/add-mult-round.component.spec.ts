import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultRoundComponent } from './add-mult-round.component';

describe('AddMultRoundComponent', () => {
  let component: AddMultRoundComponent;
  let fixture: ComponentFixture<AddMultRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMultRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMultRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
