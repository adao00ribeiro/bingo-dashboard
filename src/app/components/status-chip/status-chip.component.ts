import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { EPaymentStatus } from '../../enums/EPaymentStatus';


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
  @Input() currentStatus!: EPaymentStatus;
  @Input() disabled: boolean = false;
  @Output() statusChange = new EventEmitter<EPaymentStatus>();

  statusOptions: EPaymentStatus[] = Object.values(EPaymentStatus);


  get isDisabled(): boolean {
    return this.disabled || this.currentStatus === EPaymentStatus.SUCCESS;
  }
  getStatusClass(status: EPaymentStatus): string {
    switch (status) {
      case EPaymentStatus.PENDING:
        return 'status-pending';
      case EPaymentStatus.SUCCESS:
        return 'status-completed';
      case EPaymentStatus.FAILED:
        return 'status-failed';
      case EPaymentStatus.REJECTED:
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getStatusLabel(status: EPaymentStatus): string {
    switch (status) {
      case EPaymentStatus.PENDING:
        return 'Pendente';
      case EPaymentStatus.SUCCESS:
        return 'Sucesso';
      case EPaymentStatus.FAILED:
        return 'Falha';
      case EPaymentStatus.REJECTED:
        return 'Rejeitado';
      default:
        return status;
    }
  }

  onStatusChange(status: EPaymentStatus): void {
    if (this.disabled) return;
    this.currentStatus = status;
    this.statusChange.emit(status);
  }
}
