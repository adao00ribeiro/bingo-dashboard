import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScratchSellerGameComponent } from './edit-scratch-seller-game.component';

describe('EditScratchSellerGameComponent', () => {
  let component: EditScratchSellerGameComponent;
  let fixture: ComponentFixture<EditScratchSellerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditScratchSellerGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditScratchSellerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
