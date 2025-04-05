import { Component, effect, inject, input, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { RoomByIdResourceService } from '../../../../resource/room/room-by-id-resource.service';

@Component({
  selector: 'app-edit-room',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,

  ],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.scss'
})
export class EditRoomComponent implements OnInit{
  id = input('');
   editForm: FormGroup;

  readonly roomByIdResource : RoomByIdResourceService = inject(RoomByIdResourceService)


   constructor(private fb: FormBuilder) {
       this.editForm = this.fb.group({
         name: ['', [Validators.required]],
       });

       effect(()=>{
       let room =  this.roomByIdResource.resource.value()
       this.editForm.patchValue({
        name: room?.name
      });
       })
     }
  ngOnInit(): void {
    this.roomByIdResource.loadRoundById(this.id());
  }

  onSubmit() {}
}
