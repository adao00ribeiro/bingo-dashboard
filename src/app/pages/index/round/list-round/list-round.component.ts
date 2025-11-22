import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../components/table/table.component';
import { RoundsResource } from '../../../../resource/round/rounds.resource';

@Component({
    selector: 'app-list-round',
    imports: [ TableComponent],
    templateUrl: './list-round.component.html',
    styleUrl: './list-round.component.scss'
})
export class ListRoundComponent implements OnInit {
  protected readonly roundResource: RoundsResource = inject(RoundsResource);
  private router: Router = inject(Router);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid",position:1},
    { key: 'cardValue', displayName: 'Valor Cartela' , pipe: "currency" ,position:2},
    { key: 'startedDate', displayName: 'Data Inicial' , pipe:"dateTime"  ,position:3},
    { key: 'maxBalls', displayName: 'Numero Maximo' ,position:4},
    { key: 'cardSaleCount', displayName: 'Vendidos' ,position:5}
  ];
   rounds = computed(() => this.roundResource.resource.value()|| undefined);
    totalItems = computed(() =>
         this.roundResource.resource.value()?.rowsCount || 0
      );
  ngOnInit(): void {
    this.refresh(1,10);
  }
  refresh(page: number, size: number){
     this.roundResource.reload({page:page,size:size});
  }
  addRodada(){
    this.router.navigate(['/addrounds']);
  }
}
