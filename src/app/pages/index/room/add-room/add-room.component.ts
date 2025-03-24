import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-add-room',
    imports: [FormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './add-room.component.html',
    styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {

}
