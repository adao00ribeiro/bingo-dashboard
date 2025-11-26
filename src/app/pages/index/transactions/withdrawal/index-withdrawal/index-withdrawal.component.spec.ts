import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexWithdrawalComponent } from './index-withdrawal.component';

describe('IndexWithdrawalComponent', () => {
  let component: IndexWithdrawalComponent;
  let fixture: ComponentFixture<IndexWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexWithdrawalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
