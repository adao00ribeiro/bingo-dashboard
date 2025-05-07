import { Injectable, signal } from '@angular/core';
import { BaseHttpResourceService } from '../base-http-resource.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { IBotConfig } from '../../interfaces/IBotConfig';

@Injectable({
  providedIn: 'root'
})
export class BotConfigResourceService extends BaseHttpResourceService {

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
      return this.httpClient.get<IBotConfig>(`${this.url}/botconfig/room/${request.roomid}`);;
    },
  });

  // Método para carregar um round por ID
  loadBotConfigByRoomId(id: string) {
    this.roomId.set(id);
    this.resource.reload(); // Recarrega os dados
  }
}
