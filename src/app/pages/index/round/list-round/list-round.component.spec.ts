import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoundComponent } from './list-round.component';

describe('ListRoundComponent', () => {
  let component: ListRoundComponent;
  let fixture: ComponentFixture<ListRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
