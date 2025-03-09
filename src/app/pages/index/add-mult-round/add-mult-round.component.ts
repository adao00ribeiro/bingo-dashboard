import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';
import { AddPrizesComponent } from "../../../components/add-prizes/add-prizes.component";
import { maxBalls } from '../add-round/add-round.component';

@Component({
    selector: 'app-add-mult-round',
    imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AddPrizesComponent],
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
      timeBetweenBalls: [4, [Validators.required, Validators.min(4)]],
      maxBalls: [this.maxBalls[0].value, [Validators.required]],
      prizes: this.fb.array([]) // Array para prêmios
    });
  }

  ngOnInit(): void {
    this.roomService.loadRooms();
  }

  maxBalls: maxBalls[] = [
    { value: 90, view: '90' },
    { value: 80, view: '80' },
    { value: 75, view: '75' },
    { value: 50, view: '50' },
    { value: 30, view: '30' },
  ];
  getRowCol(maxBalls: number): { rows: number; cols: number } {
    const config: Record<number, { rows: number; cols: number }> = {
      90: { rows: 3, cols: 5 },
      80: { rows: 4, cols: 4 },
      75: { rows: 5, cols: 5 },
      50: { rows: 5, cols: 5 },
      30: { rows: 3, cols: 3 },
    };

    return config[maxBalls];
  }
  onPrizesChange(updatedPrizes: FormArray) {
    this.roundForm.setControl('prizes', updatedPrizes);
  }
}
