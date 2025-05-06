import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigBotsComponent } from './edit-config-bots.component';

describe('EditConfigBotsComponent', () => {
  let component: EditConfigBotsComponent;
  let fixture: ComponentFixture<EditConfigBotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConfigBotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConfigBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
