import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBotConfig } from '../../interfaces/IBotConfig';

@Injectable({
  providedIn: 'root'
})
export class BotConfigUpdateService {
  private url = `${environment.api}/api/v1/botconfig`;
  private httpClient: HttpClient = inject(HttpClient);

  UpdateById(id: string, botConfig: IBotConfig): Observable<IBotConfig> {
    return this.httpClient.put<IBotConfig>(`${this.url}/${id}`, botConfig);
  }

}
