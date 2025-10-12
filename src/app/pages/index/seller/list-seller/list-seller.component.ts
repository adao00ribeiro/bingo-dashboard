import { Component, computed, inject } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';
import { SellersResourceService } from '../../../../resource/seller/sellers-resource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-seller',
  imports: [TableComponent],
  templateUrl: './list-seller.component.html',
  styleUrl: './list-seller.component.scss'
})
export class ListSellerComponent {
protected readonly puntersResourceService: SellersResourceService = inject(SellersResourceService);
  private router: Router = inject(Router);

  sellers =  computed(() => this.puntersResourceService.resource.value() || []);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid"},
    { key: 'email', displayName: 'Email' },
    { key: 'balance', displayName: 'Saldo' , pipe: "currency"},
    { key: 'createdAt', displayName: 'Data de Cadastro' , pipe: "dateTime"},

  ];
  ngOnInit(): void {
    this.puntersResourceService.reload();
  }

  addSeller(){
  //  this.router.navigate(['/addrooms']);
  }
  editSeller(seller : any){
    this.router.navigate(['/seller', seller.id]);
  }
}
