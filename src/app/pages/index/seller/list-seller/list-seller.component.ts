import { Component, computed, inject } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';
import { Router } from '@angular/router';
import { SellersResource } from '../../../../resource/seller/sellers.resource';

@Component({
  selector: 'app-list-seller',
  imports: [TableComponent],
  templateUrl: './list-seller.component.html',
  styleUrl: './list-seller.component.scss'
})
export class ListSellerComponent {
protected readonly sellersResource: SellersResource = inject(SellersResource);
  private router: Router = inject(Router);

  sellers =  computed(() => this.sellersResource.resource.value() || undefined);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid"},
    { key: 'email', displayName: 'Email' },
    { key: 'balance', displayName: 'Saldo' , pipe: "currency"},
    { key: 'createdAt', displayName: 'Data de Cadastro' , pipe: "dateTime"},

  ];
  ngOnInit(): void {
     this.refresh(1,10);
  }
 refresh(page: number, size: number){
     this.sellersResource.reload({page:page,size:size});
  }
  addSeller(){
  //  this.router.navigate(['/addrooms']);
  }
  editSeller(seller : any){
    this.router.navigate(['/seller', seller.id]);
  }
}
