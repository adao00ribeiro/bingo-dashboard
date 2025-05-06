import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralRoomComponent } from './geral-room.component';

describe('GeralRoomComponent', () => {
  let component: GeralRoomComponent;
  let fixture: ComponentFixture<GeralRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeralRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeralRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
