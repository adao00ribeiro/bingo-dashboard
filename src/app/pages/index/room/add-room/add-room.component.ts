import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { IRoomRequest } from '../../../../interfaces/IRoomRequest';
import { RoomService } from '../../../../services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SellerMeResourceService } from '../../../../resource/seller/seller-me-resource.service';
import { ISeller } from '../../../../interfaces/ISeller';

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
  protected readonly sellerMeResourceService = inject(SellerMeResourceService);

  user = signal<ISeller | undefined>(undefined);

  constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      roomName: ['', [Validators.required]],
    });


    effect(() => {
      this.user.set(this.sellerMeResourceService.resource.value());
      console.log(this.user())
    })

  }
  cancelar() {
    console.log("fdp")
    this.router.navigate(['/rooms']);
  }
  addRoom() {

    const id = this.user()?.id
    if (!id) {
      return;
    }
    const roomRequest: IRoomRequest = {
      name: this.roomForm.value.roomName,
      ownerId: id
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
