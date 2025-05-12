import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRoundsComponent } from './report-rounds.component';

describe('ReportRoundsComponent', () => {
  let component: ReportRoundsComponent;
  let fixture: ComponentFixture<ReportRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportRoundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
