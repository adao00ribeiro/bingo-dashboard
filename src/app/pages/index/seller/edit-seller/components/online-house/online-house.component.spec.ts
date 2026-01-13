import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineHouseComponent } from './online-house.component';

describe('OnlineHouseComponent', () => {
  let component: OnlineHouseComponent;
  let fixture: ComponentFixture<OnlineHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineHouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
