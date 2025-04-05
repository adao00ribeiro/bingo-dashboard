import { Injectable,  signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { BaseHttpResourceService } from "../base-http-resource.service";
import { IRoom } from "../../interfaces/IRoom";




@Injectable({
  providedIn: 'root'
})
export class RoomByIdResourceService extends BaseHttpResourceService {

  private roomId = signal<string | null>(null);

  // Recurso para buscar um room específico por ID
  resource = rxResource({
    request: () => ({
      id: this.roomId(), // Obtém o ID dinamicamente
    }),
    loader: ({ request }) => {
      if (!request.id) {
        throw new Error("ID do Room não informado!");
      }
      return this.httpClient.get<IRoom>(`${this.url}/room/id/${request.id}`);;
    },
  });

  // Método para carregar um round por ID
  loadRoundById(id: string) {
    this.roomId.set(id);
    this.resource.reload(); // Recarrega os dados
  }
}
