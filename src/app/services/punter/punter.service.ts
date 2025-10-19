import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaged } from '../../interfaces/IPaged';
import { IPunter } from '../../interfaces/IPunter';



@Injectable({
  providedIn: 'root'
})
export class PunterService {
  private url = `${environment.api}/api/v1/punter`
  private httpClient: HttpClient = inject(HttpClient);

 GetAll(page:number,size:number): Observable<IPaged<IPunter>> {
     return this.httpClient.get<IPaged<IPunter>>(this.url + `?page=${page}&size=${size}`)
   }
 GetMe(): Observable<IPunter> {
    return this.httpClient.get<IPunter>(this.url + "/me")
 }
}
