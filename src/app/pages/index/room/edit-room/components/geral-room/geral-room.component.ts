import { Component, effect, inject, input, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RoomByIdResourceService } from '../../../../../../resource/room/room-by-id-resource.service';

@Component({
  selector: 'app-geral-room',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule],
  templateUrl: './geral-room.component.html',
  styleUrl: './geral-room.component.scss'
})
export class GeralRoomComponent {
  id = input('');
  editForm: FormGroup;
  onClickCancel = output<void>();
  readonly roomByIdResource: RoomByIdResourceService = inject(RoomByIdResourceService)

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
    });

    effect(() => {
      let room = this.roomByIdResource.resource.value()
      this.editForm.patchValue({
        name: room?.name
      });
    })
  }
  ngOnInit(): void {
    this.roomByIdResource.loadRoundById(this.id());
  }
  onSubmit() { }


}
