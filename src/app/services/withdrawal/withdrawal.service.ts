import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IWithdrawalResponse } from '../../interfaces/response/IWithdrawalResponse';
import { IPaged } from '../../interfaces/IPaged';
import { Observable } from 'rxjs';
import { IWithdrawalRequest } from '../../interfaces/request/IWithdrawalRequest';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

   private url = `${environment.api}/api/v1/withdrawal`;
   private httpClient: HttpClient = inject(HttpClient);

   GetAll(page: number, size: number): Observable<IPaged<IWithdrawalResponse>> {
     return this.httpClient.get<IPaged<IWithdrawalResponse>>(this.url + `?page=${page}&size=${size}`)
   }

   /*
   UpdateById(id: string, accumulated: IAccumulated): Observable<IAccumulated> {
     return this.httpClient.put<IAccumulated>(`${this.url}/${id}`, accumulated);
   }
   GetByRoomId(roomId: string): Observable<IAccumulated> {
     return this.httpClient.get<IAccumulated>(`${this.url}/room/${roomId}`);;
   }
   */
  PatchById( Withdrawal: IWithdrawalRequest): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.url}/complete`, Withdrawal);
  }
}
