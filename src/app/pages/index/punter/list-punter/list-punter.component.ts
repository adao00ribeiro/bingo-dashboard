import { Component, computed, inject } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';
import { Router } from '@angular/router';
import { PuntersResource } from '../../../../resource/punter/punters.resource';

@Component({
  selector: 'app-list-punter',
  imports: [TableComponent],
  templateUrl: './list-punter.component.html',
  styleUrl: './list-punter.component.scss'
})
export class ListPunterComponent {
  protected readonly puntersResource: PuntersResource = inject(PuntersResource);
  private router: Router = inject(Router);

  punters =  computed(() => this.puntersResource.resource.value() || undefined);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid"},
    { key: 'name', displayName: 'Nome' },
    { key: 'seller.email', displayName: 'Vendedor' },
    { key: 'balance', displayName: 'Saldo' , pipe: "currency"},
    { key: 'prizeBalance', displayName: 'Saldo Premios' , pipe: "currency"},
    { key: 'createdAt', displayName: 'Data de Cadastro' , pipe: "dateTime"},

  ];
  ngOnInit(): void {
    this.refresh(1,10);
  }
  refresh(page: number, size: number){
     this.puntersResource.reload({page:page,size:size});
  }
  addSala(){
    this.router.navigate(['/addrooms']);
  }
  editRoom(room : any){
   // this.router.navigate(['/editroom', room.id]);
  }
}
