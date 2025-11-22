import { Component, computed, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AddPrizesComponent } from "../../../../components/add-prizes/add-prizes.component";
import { maxBalls } from '../add-round/add-round.component';
import { IRoundBulk } from '../../../../interfaces/IRoundBulk';
import { IPrize } from '../../../../interfaces/IPrize';
import { RoundService } from '../../../../services/round/round.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsResource } from '../../../../resource/room/rooms.resource';

@Component({
    selector: 'app-add-mult-round',
    imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AddPrizesComponent],
    templateUrl: './add-mult-round.component.html',
    styleUrl: './add-mult-round.component.scss'
})
export class AddMultRoundComponent {
  roundForm: FormGroup;
  private readonly roundService = inject(RoundService);
   protected readonly roomResource = inject(RoomsResource);

  private router: Router = inject(Router);
 readonly snackBar = inject(MatSnackBar);

  rooms = computed(() => this.roomResource.resource.value()?.rows|| undefined);
  constructor(private fb: FormBuilder) {
       this.roundForm = this.fb.group({
      roomId: ['', [Validators.required]],
      cardValue: [0.20, [Validators.required]],
      startedDate: [new Date().toISOString().split('T')[0], [Validators.required]],
      finishedDate: [new Date().toISOString().split('T')[0], [Validators.required]],
      startedTime: ["07:00", [Validators.required]],
      finishedTime: ["23:00", [Validators.required]],
      timeBetweenBalls: [4, [Validators.required, Validators.min(4)]],
      timeBetweenRounds: [10, [Validators.required, Validators.min(10)]],
      maxBalls: [this.maxBalls[0].value, [Validators.required]],
      prizes: this.fb.array([], prizesRequiredValidator()) // Aplica o validador
    });
  }

  ngOnInit(): void {
    this.roomResource.reload({page:1 , size: 5000})
  }
  handleAddRoundClick() {
    const prizes =   this.roundForm.get('prizes') as FormArray
    if (prizes.length === 0) {
      this.snackBar.open('O campo de prêmios não pode estar vazio!', 'Fechar', {
        duration: 3000, // A mensagem fica visível por 3 segundos
        panelClass: ['error-snackbar']
      });
      return;
    }
    if(this.roundForm.invalid){
      return;
    }
    const rowCol = this.getRowCol( this.roundForm.value.maxBalls);
    const bulkData: IRoundBulk = {
      roomId: this.roundForm.value.roomId,
      cardValue: parseFloat(this.roundForm.value.cardValue),
      startedDate: this.roundForm.value.startedDate,
      finishedDate: this.roundForm.value.finishedDate,
      startedTime: this.roundForm.value.startedTime,
      finishedTime: this.roundForm.value.finishedTime,
      timeBetweenBalls: parseInt(this.roundForm.value.timeBetweenBalls),
      timeBetweenRounds: parseInt(this.roundForm.value.timeBetweenRounds),
      maxBalls: parseInt(this.roundForm.value.maxBalls),
      cardRows: rowCol.rows ,
      cardColumns: rowCol.cols,
      prizes:  prizes.controls.map(x => ({
        type: x.value.tipo,  // Certifique-se de que "tipo" é o nome correto do campo no FormGroup
        value: x.value.value
      }) as IPrize)

    };

    this.roundService.CreateBulk(bulkData).subscribe({
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
        this.snackBar.open("Rodadas Adicionado com Sucesso", 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['sucess-snackbar'],
        });
        this.router.navigate(['/rounds']);
      }
    });
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
  toGoBack(){
    this.router.navigate(['/rounds']);
  }
  onPrizesChange(updatedPrizes: FormArray) {
    this.roundForm.setControl('prizes', updatedPrizes);
  }
}
export function prizesRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length > 0) {
      return null; // Válido se tiver ao menos um prêmio
    }
    return { 'prizesRequired': true }; // Retorna um erro caso o array esteja vazio
  };
}
