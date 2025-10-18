import { Component, effect, inject, input, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RoomService } from '../../../../../../services/room/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  readonly roomService: RoomService = inject(RoomService)
  readonly snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
      this.roomService.GetById(this.id()).subscribe({
      next: (data) => {
        this.editForm.patchValue({
        name: data?.name
      });
      },
      error: (err) => {
      },
      complete: () => {
      }
    });
  }
  onSubmit() { }


}
