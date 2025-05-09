import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAccumulated } from '../../interfaces/IAccumulated';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccumulatedUpdateService {
 private url = `${environment.api}/api/v1/accumulated`;
  private httpClient: HttpClient = inject(HttpClient);

  UpdateById(id: string, accumulated: IAccumulated): Observable<IAccumulated> {
    return this.httpClient.put<IAccumulated>(`${this.url}/${id}`, accumulated);
  }

}
