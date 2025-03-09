import { Component, input, OnInit } from '@angular/core';
import { EPrizeType } from '../../enums/EPrizeType';

@Component({
    selector: 'app-card-prize',
    imports: [],
    templateUrl: './card-prize.component.html',
    styleUrl: './card-prize.component.scss'
})
export class CardPrizeComponent {
  max:number = 15
  prizeType = input<EPrizeType>()
  createArray(size: number): number[] {
    return Array.from({ length: size }, (_, i) => i);
  }
}
