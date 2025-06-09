import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { IRoomRequest } from '../../../../interfaces/IRoomRequest';
import { RoomService } from '../../../../services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-room',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {
  roomForm: FormGroup;
  private router: Router = inject(Router);
  private readonly roomService = inject(RoomService);
  readonly snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      roomName: ['', [Validators.required]],
    });
  }
  cancelar() {
    console.log("fdp")
    this.router.navigate(['/rooms']);
  }
  addRoom() {
    const roomRequest: IRoomRequest = {
      name: this.roomForm.value.roomName,
      ownerId: '831733d3-e0ae-4560-811b-8d5ae5a2bd13'
    };

    this.roomService.Create(roomRequest).subscribe({
      next: (data) => {
          console.log(data);
      },
      error: (err) => {
        this.snackBar.open(err.error.detail, 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar',
        });
      },
      complete: () => {
        this.snackBar.open("Sala criada com Sucesso", 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['sucess-snackbar'],
        });
        this.router.navigate(['/rooms']);
      }
    });
  }
}
