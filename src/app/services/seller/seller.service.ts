import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ISeller } from '../../interfaces/ISeller';
import { Observable } from 'rxjs';
import { ISellerRequest } from '../../interfaces/ISelerRequest';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private url = `${environment.api}/api/v1/seller`;
  private httpClient: HttpClient = inject(HttpClient);
  private sellersSignal = signal<ISeller[]>([]);
  public readonly sellers = this.sellersSignal.asReadonly();

  loadSellers(): void {
    this.GetAll().subscribe({
      next: (sellers) => this.sellersSignal.set(sellers),
      error: (error) => console.error('Erro ao carregar rounds:', error),
    });
  }

  GetAll(): Observable<ISeller[]> {
    return this.httpClient.get<ISeller[]>(this.url);
  }

  Create(round: ISellerRequest): Observable<ISeller> {
    return this.httpClient.post<ISeller>(this.url, round);
  }
  GetMe(): Observable<ISeller> {
    return this.httpClient.get<ISeller>(`${this.url}/me`);
  }
  GetById(id: string): Observable<ISeller> {
    return this.httpClient.get<ISeller>(`${this.url}/id/${id}`);
  }
  GetByEmail(email: string): Observable<ISeller> {
    return this.httpClient.get<ISeller>(`${this.url}/email/${email}`);
  }
  UpdateById(id: number, round: ISeller): Observable<ISeller> {
    return this.httpClient.put<ISeller>(`${this.url}/${id}`, round);
  }

  DeleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

}
