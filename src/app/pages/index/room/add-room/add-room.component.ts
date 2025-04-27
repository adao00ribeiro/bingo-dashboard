import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-room',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {

  private router: Router = inject(Router);
  cancelar() {
    console.log("fdp")
    this.router.navigate(['/rooms']);
  }
  addRoom() {
    throw new Error('Method not implemented.');
  }
}
