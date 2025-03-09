import { Component, inject, input, output, signal, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EPrizeType } from '../../enums/EPrizeType';

@Component({
    selector: 'app-add-prizes',
    imports: [MatIcon, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    templateUrl: './add-prizes.component.html',
    styleUrl: './add-prizes.component.scss'
})
export class AddPrizesComponent {


  prizeForm: FormGroup;
  prizeTypes = Object.keys(EPrizeType) as EPrizeType[];
  prizeTypeTranslations = {
     [EPrizeType.FourInLine]: "Quatro em Linha",
     [EPrizeType.FourCorners]: "Quatro Cantos",
     [EPrizeType.SingleLine]: "Uma Linha",
     [EPrizeType.SingleColumn]: "Uma Coluna",
     [EPrizeType.Diagonal]: "Diagonal",
     [EPrizeType.InvertedDiagonal]: "Diagonal Invertida",
     [EPrizeType.DoubleLine]: "Duas Linhas",
     [EPrizeType.DoubleColumn]: "Duas Colunas",
     [EPrizeType.FullCard]: "Cartela Cheia",
     [EPrizeType.TShape]: "Formato de T",
     [EPrizeType.XShape]: "Formato de X",
     [EPrizeType.PlusShape]: "Formato de +",
     [EPrizeType.OuterEdge]: "Borda Externa"
   };
   maxBalls = input.required<number>()
   prizesChange = output<FormArray>();
   constructor(private fb: FormBuilder) {
    this.prizeForm = this.fb.group({
      prizes: this.fb.array([]), // Inicializa o array de prêmios
    });
  }
  get prizes(): FormArray {
    return this.prizeForm.get('prizes') as FormArray;
  }
  private excludedPrizesByMaxBalls: Record<number, EPrizeType[]> = {
    90: [EPrizeType.Diagonal, EPrizeType.InvertedDiagonal], // Remove "T" e "+"
    80: [EPrizeType.TShape],
    75: [],
    50: [],
    30: [],
  };
  get filteredPrizeTypes(): EPrizeType[] {
    const excludedPrizes = this.excludedPrizesByMaxBalls[this.maxBalls()] || [];
    return this.prizeTypes.filter(type => !excludedPrizes.includes(type));
  }
  addPrize() {
    const prizeForm = this.fb.group({
      tipo: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0)]]
    });
    this.prizes.push(prizeForm);
    this.prizesChange.emit(this.prizes)
  }
  removePrize(index: number) {
    this.prizes.removeAt(index);
    this.prizesChange.emit(this.prizes)
  }
}
