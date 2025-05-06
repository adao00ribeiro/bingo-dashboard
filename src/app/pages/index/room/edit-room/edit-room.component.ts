import { Component, effect, inject, input, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { GeralRoomComponent } from "./components/geral-room/geral-room.component";
import { EditAccumulatedComponent } from "./components/edit-accumulated/edit-accumulated.component";
import { EditConfigBotsComponent } from "./components/edit-config-bots/edit-config-bots.component";
import { Router } from '@angular/router';

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
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    GeralRoomComponent,
    EditAccumulatedComponent,
    EditConfigBotsComponent
],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.scss'
})
export class EditRoomComponent {
  id = input('');
  private readonly router: Router = inject(Router);


  changeCancel() {
    this.router.navigate(['/rooms']);
    }
}
