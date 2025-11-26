import { Component, computed, inject } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';
import { WithdrawalResource } from '../../../../../resource/withdrawal/withdrawal.resource';
import { WithdrawalService } from '../../../../../services/withdrawal/withdrawal.service';
import { StatusChipComponent } from '../../../../../components/status-chip/status-chip.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IWithdrawalRequest } from '../../../../../interfaces/request/IWithdrawalRequest';

@Component({
  selector: 'app-index-withdrawal',
  imports: [TableComponent,StatusChipComponent],
  templateUrl: './index-withdrawal.component.html',
  styleUrl: './index-withdrawal.component.scss'
})
export class IndexWithdrawalComponent {
  protected readonly withdrawalResource = inject(WithdrawalResource);
  protected readonly withdrawalService = inject(WithdrawalService);
    readonly snackBar = inject(MatSnackBar);

  withdrawals = computed(() => this.withdrawalResource.resource.value() || undefined);
  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid" },
    { key: 'punter.cpf', displayName: 'CPF' },
    { key: 'amount', displayName: 'Valor',pipe: "currency" },
    { key: 'withdrawalType', displayName: 'Tipo' },
    { key: 'confirmedAt', displayName: 'Data Confirmação', pipe: "dateTime" },
    { key: 'status', displayName: 'Status' },
  ];
    refresh(page: number, size: number) {
    this.withdrawalResource.reload({ page: page, size: size });
  }

   handleButtonClick(withdrawal: IWithdrawalRequest) {
      console.log(withdrawal)
      this.withdrawalService.PatchById( withdrawal).subscribe({
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
