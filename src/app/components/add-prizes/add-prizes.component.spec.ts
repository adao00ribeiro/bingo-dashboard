import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrizesComponent } from './add-prizes.component';

describe('AddPrizesComponent', () => {
  let component: AddPrizesComponent;
  let fixture: ComponentFixture<AddPrizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPrizesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
