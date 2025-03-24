import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunterRechargeComponent } from './punter-recharge.component';

describe('PunterRechargeComponent', () => {
  let component: PunterRechargeComponent;
  let fixture: ComponentFixture<PunterRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PunterRechargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunterRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
