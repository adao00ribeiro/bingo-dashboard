import { inject, Injectable, signal } from '@angular/core';
import { BaseResource } from '../base.resource';
import { IPaged } from '../../interfaces/IPaged';
import { Observable } from 'rxjs';
import { IWithdrawalResponse } from '../../interfaces/response/IWithdrawalResponse';
import { WithdrawalService } from '../../services/withdrawal/withdrawal.service';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalResource extends BaseResource<{ page: number; size: number }, IPaged<IWithdrawalResponse>> {

   private withdrawalService= inject(WithdrawalService)

   protected override loader(request: { page: number; size: number }): Observable<IPaged<IWithdrawalResponse>> {
    return this.withdrawalService.GetAll(request.page, request.size);
   }
}
