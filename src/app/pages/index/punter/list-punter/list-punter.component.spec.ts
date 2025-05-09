import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPunterComponent } from './list-punter.component';

describe('ListPunterComponent', () => {
  let component: ListPunterComponent;
  let fixture: ComponentFixture<ListPunterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPunterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
