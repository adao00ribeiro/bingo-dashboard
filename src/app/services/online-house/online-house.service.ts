import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaged } from '../../interfaces/IPaged';
import { IOnlineHouseResponse } from '../../interfaces/response/bingo/IOnlineHouseResponse';
import { IOnlineHouseRequest } from '../../interfaces/request/bingo/IOnlineHouseRequest';

@Injectable({
  providedIn: 'root'
})
export class OnlineHouseService {

  private url = `${environment.api}/api/v1/onlinehouse`
  private httpClient: HttpClient = inject(HttpClient);

  GetAll(page: number, size: number,enabledScratch:boolean): Observable<IPaged<IOnlineHouseResponse>> {
    let url = `${this.url}?page=${page}&size=${size}`;
    if (enabledScratch !== undefined) {
      url += `&enabledScratch=${enabledScratch}`;
    }
    return this.httpClient.get<IPaged<IOnlineHouseResponse>>(url)
  }

  PatchById(id: string, onlineSeller: IOnlineHouseRequest): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.url}/${id}`, onlineSeller);
  }
}
