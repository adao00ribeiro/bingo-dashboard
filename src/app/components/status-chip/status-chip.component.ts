import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { ERechargeStatus } from '../../enums/ERechargeStatus';

@Component({
  selector: 'app-status-chip',
  imports: [
    CommonModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule],
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.scss'
})
export class StatusChipComponent {
  @Input() data: any;
  @Input() currentStatus!: ERechargeStatus;
  @Input() disabled: boolean = false;
  @Output() statusChange = new EventEmitter<ERechargeStatus>();

  statusOptions: ERechargeStatus[] = Object.values(ERechargeStatus);


  get isDisabled(): boolean {
    return this.disabled || this.currentStatus === ERechargeStatus.COMPLETED;
  }
  getStatusClass(status: ERechargeStatus): string {
    switch (status) {
      case ERechargeStatus.PENDING:
        return 'status-pending';
      case ERechargeStatus.COMPLETED:
        return 'status-completed';
      case ERechargeStatus.FAILED:
        return 'status-failed';
      case ERechargeStatus.CANCELLED:
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getStatusLabel(status: ERechargeStatus): string {
    switch (status) {
      case ERechargeStatus.PENDING:
        return 'Pendente';
      case ERechargeStatus.COMPLETED:
        return 'Concluído';
      case ERechargeStatus.FAILED:
        return 'Falhou';
      case ERechargeStatus.CANCELLED:
        return 'Cancelado';
      default:
        return status;
    }
  }

  onStatusChange(status: ERechargeStatus): void {
    if (this.disabled) return;
    this.currentStatus = status;
    this.statusChange.emit(status);
  }
}
