import { Component,  computed,  inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IRoundRequest } from '../../../../interfaces/IRoundRequest';
import { RoundService } from '../../../../services/round/round.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AddPrizesComponent } from '../../../../components/add-prizes/add-prizes.component';
import { IPrize } from '../../../../interfaces/IPrize';
import { RoomsResource } from '../../../../resource/room/rooms.resource';

export interface maxBalls {
  value: number,
  view: string
}
@Component({
    selector: 'app-add-round',
    imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AddPrizesComponent],
    templateUrl: './add-round.component.html',
    styleUrl: './add-round.component.scss'
})
export class AddRoundComponent {
  roundForm: FormGroup;
  private readonly roundService = inject(RoundService);
  protected readonly roomResource = inject(RoomsResource);
  private router: Router = inject(Router);
  readonly snackBar = inject(MatSnackBar);
  rooms = computed(() => this.roomResource.resource.value()?.rows|| undefined);

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
    this.roomResource.reload({page:1 , size: 5000})
  }

  maxBalls: maxBalls[] = [
    { value: 90, view: '90' },
    { value: 80, view: '80' },
    { value: 75, view: '75' },
    { value: 50, view: '50' },
    { value: 30, view: '30' },
  ];

  handleAddRoundClick() {

    if(this.roundForm.invalid){
      return;
    }
    const rowCol = this.getRowCol( this.roundForm.value.maxBalls);
    const prizes =   this.roundForm.get('prizes') as FormArray
    const roundRequest: IRoundRequest = {
      roomId: this.roundForm.value.roomId,
      cardValue: parseFloat(this.roundForm.value.cardValue),
      startedDate: new Date(this.roundForm.value.startedDate).toISOString(),
      timeBetweenBalls: parseInt(this.roundForm.value.timeBetweenBalls),
      maxBalls: parseInt(this.roundForm.value.maxBalls),
      cardRows: rowCol.rows ,
      cardColumns: rowCol.cols,
      prizes:  prizes.controls.map(x => ({
        type: x.value.tipo,  // Certifique-se de que "tipo" é o nome correto do campo no FormGroup
        value: x.value.value
      }) as IPrize)

    };

    this.roundService.Create(roundRequest).subscribe({
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
        this.snackBar.open("Rodada Adicionado com Sucesso", 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['sucess-snackbar'],
        });
        this.router.navigate(['/rounds']);
      }
    });
  }
  getRowCol(maxBalls: number): { rows: number; cols: number }  {
    const config: Record<number, { rows: number; cols: number }> = {
      90: { rows: 3, cols: 5 },
      80: { rows: 4, cols: 4 },
      75: { rows: 5, cols: 5 },
      50: { rows: 5, cols: 5 },
      30: { rows: 3, cols: 3 },
    };

    return config[maxBalls] ;
  }
  toGoBack(){
    this.router.navigate(['/rounds']);
  }
  onPrizesChange(updatedPrizes: FormArray) {
    this.roundForm.setControl('prizes', updatedPrizes);
  }
}
