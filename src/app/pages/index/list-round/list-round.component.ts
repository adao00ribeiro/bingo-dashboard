import { Component, inject, OnInit } from '@angular/core';
import { RoundService } from '../../../services/round/round.service';
import { Router } from '@angular/router';
import { TableComponent } from '../../../components/table/table.component';
import { CurrencyPipe } from '../../../pipes/currency.pipe';

@Component({
  selector: 'app-list-round',
  standalone: true,
  imports: [CurrencyPipe,TableComponent],
  templateUrl: './list-round.component.html',
  styleUrl: './list-round.component.scss'
})
export class ListRoundComponent implements OnInit {
  protected readonly roundService: RoundService = inject(RoundService);
 private router: Router = inject(Router);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid" },
    { key: 'cardValue', displayName: 'Valor Cartela' , pipe: "currency" },
    { key: 'startedDate', displayName: 'Data Inicial'  },
    { key: 'maxBalls', displayName: 'Numero Maximo'  },
    { key: 'cardSaleCount', displayName: 'Vendidos' },
  ];
  ngOnInit(): void {
    this.roundService.loadRounds();
  }

  addRodada(){
    this.router.navigate(['/addrounds']);
  }
}
