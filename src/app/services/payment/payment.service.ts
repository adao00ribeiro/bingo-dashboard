import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaymentMethodRequest } from '../../interfaces/request/bingo/IPaymentMethodRequest';
import { IPaymentMethodResponse } from '../../interfaces/response/bingo/IPaymentMethodResponse';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = `${environment.api}/api/v1/payment`
  private httpClient: HttpClient = inject(HttpClient);


  PatchById(id: string, onlineSeller: IPaymentMethodRequest): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.url}/${id}`, onlineSeller);
  }
}
