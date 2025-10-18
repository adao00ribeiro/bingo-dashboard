import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAccumulated } from '../../interfaces/IAccumulated';
import { Observable } from 'rxjs';
import { IPaged } from '../../interfaces/IPaged';

@Injectable({
  providedIn: 'root'
})
export class AccumulatedService {
  private url = `${environment.api}/api/v1/accumulated`;
  private httpClient: HttpClient = inject(HttpClient);

  GetAll(page: number, size: number): Observable<IPaged<IAccumulated>> {
    return this.httpClient.get<IPaged<IAccumulated>>(this.url + `?page=${page}&size=${size}`)
  }
  UpdateById(id: string, accumulated: IAccumulated): Observable<IAccumulated> {
    return this.httpClient.put<IAccumulated>(`${this.url}/${id}`, accumulated);
  }
  GetByRoomId(roomId: string): Observable<IAccumulated> {
    return this.httpClient.get<IAccumulated>(`${this.url}/room/${roomId}`);;
  }

}
