import { Component, effect, inject, input, output, Output, signal } from '@angular/core';
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
import { SellerMeResource } from '../../../../../../resource/seller/seller-me.resource';
import { ISeller } from '../../../../../../interfaces/ISeller';
import { Router } from '@angular/router';
import { MediaService } from '../../../../../../services/media/media.service';

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
  editRoomForm: FormGroup;
  onClickCancel = output<void>();


  private router: Router = inject(Router);
  readonly roomService: RoomService = inject(RoomService)
  readonly mediaService: MediaService = inject(MediaService)
  protected readonly sellerMeResource = inject(SellerMeResource);

  readonly snackBar = inject(MatSnackBar);

  user = signal<ISeller | undefined>(undefined);

  imageUrl: string | null = null;
  imageAvatar: File | null = null;


  removeImage() {
    this.imageAvatar = null;
    this.imageUrl = null;
  }
  constructor(private fb: FormBuilder) {
    this.editRoomForm = this.fb.group({
      roomName: ['', [Validators.required]],
    });

      effect(() => {
      this.user.set(this.sellerMeResource.resource.value());

    })
  }
  ngOnInit(): void {
      this.roomService.GetById(this.id()).subscribe({
      next: async  (data) => {
        this.editRoomForm.patchValue({
        roomName: data?.name
      });

        if (data?.mediaAttachment?.fileName) {
        // Buscar a URL assinada
        this.mediaService.getPresignedUrl(data.mediaAttachment.entityId +"_"+data.mediaAttachment.fileName)
          .subscribe(resp => {
            this.imageUrl = resp;  // Aparecerá no preview
          });
      }
      },
      error: (err) => {
      },
      complete: () => {
      }
    });
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
  onSubmit() {

    const id = this.user()?.id
    if (!id) {
      return;
    }
    const formData = new FormData();
    formData.append("name", this.editRoomForm.value.roomName);
    formData.append("ownerId", id);

    if (this.imageAvatar) {
      formData.append("image", this.imageAvatar);
    }
    this.roomService.UpdateById(this.id(),formData).subscribe({
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
