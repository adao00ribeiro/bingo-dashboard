import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRecharge } from '../../interfaces/IRecharge';
import { Observable } from 'rxjs';
import { IRoundReportRequest } from '../../interfaces/reports/request/IRoundReportRequest';
import { IReport } from '../../interfaces/reports/IReport';
import { IRoundReportItem } from '../../interfaces/reports/IRoundReportItem';
import { IRoundReportStats } from '../../interfaces/reports/IRoundReportStats';

@Injectable({
  providedIn: 'root'
})
export class ReportRoundsService {
  private url = `${environment.api}/api/v1/report`;
  private httpClient: HttpClient = inject(HttpClient);

  Rounds(data: IRoundReportRequest): Observable<IReport<IRoundReportItem, IRoundReportStats>> {
    return this.httpClient.post<IReport<IRoundReportItem, IRoundReportStats>>(this.url + "/rounds", data);
  }

}
