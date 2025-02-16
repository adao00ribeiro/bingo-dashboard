import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { ISeller } from '../../../interfaces/ISeller';
import { SellerService } from '../../../services/seller/seller.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {
  seller: ISeller | null = null;
   public readonly sellerService = inject(SellerService);
     constructor() {

       effect(() => {
          this.sellerService.GetMe().subscribe({
           next: (seller) => this.seller = seller ,
           error: (error) => console.error('Erro ao carregar Seller:', error),
         })
       })
     }
}
