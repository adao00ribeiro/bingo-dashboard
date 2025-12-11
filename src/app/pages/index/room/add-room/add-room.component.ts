import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { IRoomRequest } from '../../../../interfaces/IRoomRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISeller } from '../../../../interfaces/ISeller';
import { RoomService } from '../../../../services/room/room.service';
import { SellerMeResource } from '../../../../resource/seller/seller-me.resource';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-room',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {
  roomForm: FormGroup;
  private router: Router = inject(Router);
  private readonly roomService = inject(RoomService);
  readonly snackBar = inject(MatSnackBar);
  protected readonly sellerMeResource = inject(SellerMeResource);

  user = signal<ISeller | undefined>(undefined);
  imageUrl: string | null = null;
  imageAvatar: File | null = null;
  constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      roomName: ['', [Validators.required]],
    });


    effect(() => {
      this.user.set(this.sellerMeResource.resource.value());
      console.log(this.user())
    })

  }
  removeImage() {
    this.imageAvatar = null;
    this.imageUrl = null;
  }
  cancelar() {

    this.imageAvatar = null;
    this.imageUrl = null;
    this.router.navigate(['/rooms']);
  }
  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const image = input.files[0];

    if (image.type === 'image/png' || image.type === 'image/jpeg') {
      this.imageAvatar = image;

      // Preview
      this.imageUrl = URL.createObjectURL(image);
    }
  }

  addRoom() {

    const id = this.user()?.id
    if (!id) {
      return;
    }
    const formData = new FormData();
    formData.append("name", this.roomForm.value.roomName);
    formData.append("ownerId", id);

    if (this.imageAvatar) {
      formData.append("image", this.imageAvatar);
    }
    this.roomService.Create(formData).subscribe({
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
