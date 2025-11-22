import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBotConfig } from '../../interfaces/IBotConfig';
import { IPaged } from '../../interfaces/IPaged';

@Injectable({
  providedIn: 'root'
})
export class BotConfigService {
  private url = `${environment.api}/api/v1/botconfig`;
  private httpClient: HttpClient = inject(HttpClient);


  GetAll(page: number, size: number): Observable<IPaged<IBotConfig>> {
    return this.httpClient.get<IPaged<IBotConfig>>(this.url + `?page=${page}&size=${size}`)
  }
  UpdateById(id: string, botConfig: IBotConfig): Observable<IBotConfig> {
    return this.httpClient.put<IBotConfig>(`${this.url}/${id}`, botConfig);
  }
  GetByRoomId(roomId: string): Observable<IBotConfig> {
    return this.httpClient.get<IBotConfig>(`${this.url}/room/${roomId}`);;
  }
}
