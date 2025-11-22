import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoundReportRequest } from '../../interfaces/reports/request/IRoundReportRequest';
import { IRoundReportItem } from '../../interfaces/reports/IRoundReportItem';
import { IRoundReportStats } from '../../interfaces/reports/IRoundReportStats';
import { IPaged } from '../../interfaces/IPaged';

@Injectable({
  providedIn: 'root'
})
export class ReportRoundsService {
  private url = `${environment.api}/api/v1/report`;
  private httpClient: HttpClient = inject(HttpClient);

  Rounds(data: IRoundReportRequest): Observable<IPaged<IRoundReportItem, IRoundReportStats>> {
    return this.httpClient.post<IPaged<IRoundReportItem, IRoundReportStats>>(this.url + "/rounds", data);
  }

}
