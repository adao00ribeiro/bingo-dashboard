import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScratchSellerGameComponent } from './new-scratch-seller-game.component';

describe('NewScratchSellerGameComponent', () => {
  let component: NewScratchSellerGameComponent;
  let fixture: ComponentFixture<NewScratchSellerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewScratchSellerGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewScratchSellerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
