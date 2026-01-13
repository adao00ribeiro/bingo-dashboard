import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralSellerComponent } from './geral-seller.component';

describe('GeralSellerComponent', () => {
  let component: GeralSellerComponent;
  let fixture: ComponentFixture<GeralSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeralSellerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeralSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
