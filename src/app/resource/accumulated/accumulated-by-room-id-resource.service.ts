import { Injectable, signal } from '@angular/core';
import { BaseHttpResourceService } from '../base-http-resource.service';
import { IAccumulated } from '../../interfaces/IAccumulated';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AccumulatedByRoomIdResourceService extends BaseHttpResourceService {

   private roomId = signal<string | null>(null);
    // Recurso para buscar um room específico por ID
    resource = rxResource({
      request: () => ({
        roomid: this.roomId(), // Obtém o ID dinamicamente
      }),
      loader: ({ request }) => {
        if (!request.roomid) {
          throw new Error("ID do Room não informado!");
        }
        return this.httpClient.get<IAccumulated>(`${this.url}/accumulated/room/${request.roomid}`);;
      },
    });

    // Método para carregar um round por ID
    loadByRoomId(roomId: string) {
      this.roomId.set(roomId);
      this.resource.reload(); // Recarrega os dados
    }
}
