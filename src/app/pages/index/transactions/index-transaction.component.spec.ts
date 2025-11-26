import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTransactionComponent } from './index-transaction.component';

describe('IndexTransactionComponent', () => {
  let component: IndexTransactionComponent;
  let fixture: ComponentFixture<IndexTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
