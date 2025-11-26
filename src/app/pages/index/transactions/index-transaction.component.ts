import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PunterRechargeComponent } from "./punter-recharge/punter-recharge.component";
import { IndexWithdrawalComponent } from "./withdrawal/index-withdrawal/index-withdrawal.component";

@Component({
  selector: 'app-index-transaction',
  imports: [MatTabsModule, PunterRechargeComponent, IndexWithdrawalComponent],
  templateUrl: './index-transaction.component.html',
  styleUrl: './index-transaction.component.scss'
})
export class IndexTransactionComponent {

}
