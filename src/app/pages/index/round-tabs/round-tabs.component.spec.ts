import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTabsComponent } from './round-tabs.component';

describe('RoundTabsComponent', () => {
  let component: RoundTabsComponent;
  let fixture: ComponentFixture<RoundTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoundTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
