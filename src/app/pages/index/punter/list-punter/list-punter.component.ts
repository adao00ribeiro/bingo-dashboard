import { Component, computed, inject } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';
import { PunterMeResourceService } from '../../../../resource/punter/punter-me-resource.service';
import { Router } from '@angular/router';
import { PuntersResourceService } from '../../../../resource/punter/punters-resource.service';

@Component({
  selector: 'app-list-punter',
  imports: [TableComponent],
  templateUrl: './list-punter.component.html',
  styleUrl: './list-punter.component.scss'
})
export class ListPunterComponent {
  protected readonly puntersResourceService: PuntersResourceService = inject(PuntersResourceService);
  private router: Router = inject(Router);

  punters =  computed(() => this.puntersResourceService.resource.value() || []);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid"},
    { key: 'name', displayName: 'Nome' },
    { key: 'seller.email', displayName: 'Vendedor' },
    { key: 'balance', displayName: 'Saldo' , pipe: "currency"},
    { key: 'prizeBalance', displayName: 'Saldo Premios' , pipe: "currency"},
    { key: 'createAt', displayName: 'Data de Cadastro' , pipe: "dateTime"},

  ];
  ngOnInit(): void {
    this.puntersResourceService.reload();
  }

  addSala(){
  //  this.router.navigate(['/addrooms']);
  }
  editRoom(room : any){
   // this.router.navigate(['/editroom', room.id]);
  }
}
