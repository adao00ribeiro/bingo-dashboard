import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IRoom } from '../interfaces/IRoom';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IRoomRequest } from '../interfaces/IRoomRequest';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = `${environment.api}/api/v1/room`
  private httpClient: HttpClient = inject(HttpClient);
   private roomsSignal = signal<IRoom[]>([]);
  public readonly rooms = this.roomsSignal.asReadonly();


 loadRooms() {
  this.GetAll().subscribe({
    next: (rooms) => this.roomsSignal.set(rooms),
    error: (error) => console.error('Erro ao carregar rounds:', error),
  });
}
 GetAll(): Observable<IRoom[]> {
   return this.httpClient.get<IRoom[]>(this.url);
 }

 Create(room: IRoomRequest): Observable<IRoom> {
   return this.httpClient.post<IRoom>(this.url, room);
 }

 GetById(id: number): Observable<IRoom> {
   return this.httpClient.get<IRoom>(`${this.url}/${id}`);
 }

 UpdateById(id: number, room: IRoom): Observable<IRoom> {
   return this.httpClient.put<IRoom>(`${this.url}/${id}`, room);
 }

 DeleteById(id: number): Observable<void> {
   return this.httpClient.delete<void>(`${this.url}/${id}`);
 }
}
