import { Component, computed, effect, inject, signal } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { IRecharge } from '../../../interfaces/IRecharge';
import { StatusChipComponent } from '../../../components/status-chip/status-chip.component';
import { ERechargeStatus } from '../../../enums/ERechargeStatus';
import { RechargesResource } from '../../../resource/recharge/recharges.resource';
import { RechargeService } from '../../../services/recharge/recharge.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-punter-recharge',
  imports: [TableComponent, StatusChipComponent],
  templateUrl: './punter-recharge.component.html',
  styleUrl: './punter-recharge.component.scss'
})
export class PunterRechargeComponent {
  protected readonly rechargeResource = inject(RechargesResource);
  protected readonly rechargeService = inject(RechargeService);
  readonly snackBar = inject(MatSnackBar);

  recharges = computed(() => this.rechargeResource.resource.value() || undefined);
  rechargeType = ERechargeStatus.COMPLETED
  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid" },
    { key: 'punter.name', displayName: 'Nome' },
    { key: 'value', displayName: 'Valor', pipe: "currency" },
    { key: 'createdAt', displayName: 'Data criação', pipe: "dateTime" },
    { key: 'status', displayName: 'Status' }, // Adiciona a coluna "Status"
  ];

  constructor() {

  }
  refresh(page: number, size: number) {
    this.rechargeResource.reload({ page: page, size: size });
  }
  ngOnInit(): void {

  }
  handleButtonClick(recharge: IRecharge) {

    this.rechargeService.PatchById( recharge).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open(err.error.detail, 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar',
        });
      },
      complete: () => {
        this.snackBar.open("Concluido com Sucesso", 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['sucess-snackbar'],
        });
      }
    });
  }
}
