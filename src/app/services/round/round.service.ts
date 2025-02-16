import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal, effect } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRound } from '../../interfaces/IRound';
import { IRoundRequest } from '../../interfaces/IRoundRequest';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private url = `${environment.api}/api/v1/round`;
  private httpClient: HttpClient = inject(HttpClient);
  private roundsSignal = signal<IRound[]>([]);

  public readonly rounds = this.roundsSignal.asReadonly();

  loadRounds(): void {
    this.GetAll().subscribe({
      next: (rounds) => this.roundsSignal.set(rounds),
      error: (error) => console.error('Erro ao carregar rounds:', error),
    });
    console.log(this.roundsSignal())
  }

  GetAll(): Observable<IRound[]> {
    return this.httpClient.get<IRound[]>(this.url);
  }

  Create(round: IRoundRequest): Observable<IRound> {
    return this.httpClient.post<IRound>(this.url, round);
  }

  GetById(id: string): Observable<IRound> {
    return this.httpClient.get<IRound>(`${this.url}/id/${id}`);
  }

  UpdateById(id: number, round: IRound): Observable<IRound> {
    return this.httpClient.put<IRound>(`${this.url}/${id}`, round);
  }

  DeleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
  // Atualizar os dados dos rounds manualmente após uma operação
  refreshRounds(): void {
    this.loadRounds();
  }
}
