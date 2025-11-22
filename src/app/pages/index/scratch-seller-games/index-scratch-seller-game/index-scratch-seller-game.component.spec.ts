import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexScratchSellerGameComponent } from './index-scratch-seller-game.component';

describe('IndexScratchSellerGameComponent', () => {
  let component: IndexScratchSellerGameComponent;
  let fixture: ComponentFixture<IndexScratchSellerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexScratchSellerGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexScratchSellerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
