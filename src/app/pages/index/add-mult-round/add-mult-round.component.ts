import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';
import { AddPrizesComponent } from "../../../components/add-prizes/add-prizes.component";

@Component({
  selector: 'app-add-mult-round',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AddPrizesComponent],
  templateUrl: './add-mult-round.component.html',
  styleUrl: './add-mult-round.component.scss'
})
export class AddMultRoundComponent {
  roundForm: FormGroup;
protected readonly roomService = inject(RoomService);
  private router: Router = inject(Router);

 constructor(private fb: FormBuilder) {
    this.roundForm = this.fb.group({
      roomId: ['', [Validators.required]],
      startedDate: [new Date().toISOString(), [Validators.required]],
      cardValue: [0.20, [Validators.required]],
      timeBetweenBalls: [4, [Validators.required]],
      //maxBalls: [this.maxBalls[0].value, [Validators.required]],
      prizes: this.fb.array([]) // Array para prêmios
    });
  }

ngOnInit(): void {
  this.roomService.loadRooms();
}
onPrizesChange(updatedPrizes: FormArray) {
  this.roundForm.setControl('prizes', updatedPrizes);
}
}
