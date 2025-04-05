import { Component, computed, effect, inject, signal } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { RechargesResourceService } from '../../../resource/recharge/recharges-resource.service';
import { IRecharge } from '../../../interfaces/IRecharge';
import { ButtonMenuComponent } from '../../../components/button-menu/button-menu.component';
import { StatusChipComponent } from '../../../components/status-chip/status-chip.component';
import { ERechargeStatus } from '../../../enums/ERechargeStatus';
import { UpdateRechargeByIdResourceService } from '../../../resource/recharge/update-recharge-by-id.service';

@Component({
  selector: 'app-punter-recharge',
  imports: [TableComponent, StatusChipComponent],
  templateUrl: './punter-recharge.component.html',
  styleUrl: './punter-recharge.component.scss'
})
export class PunterRechargeComponent {
  protected readonly rechargeResourceService = inject(RechargesResourceService);
  protected readonly updateRechargeByIdResourceService = inject(UpdateRechargeByIdResourceService);

  recharges = computed(() => this.rechargeResourceService.resource.value()?.items || [] );
  rechargeType = ERechargeStatus.COMPLETED
  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid" },
    { key: 'punter.name', displayName: 'Nome' },
    { key: 'value', displayName: 'Valor', pipe:"currency"},
    { key: 'createAt', displayName: 'Data criação' , pipe: "dateTime" },
    { key: 'status', displayName: 'Status'}, // Adiciona a coluna "Status"
  ];

  constructor(){
    effect(()=>{
      this.updateRechargeByIdResourceService.resource.value();

    })
  }
  handleButtonClick(recharge: IRecharge) {
     this.updateRechargeByIdResourceService.reload(recharge)
  }
}
