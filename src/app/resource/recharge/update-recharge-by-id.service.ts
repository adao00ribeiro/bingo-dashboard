import { Injectable, inject, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { BaseHttpResourceService } from "../base-http-resource.service";
import { IRecharge } from "../../interfaces/IRecharge";


@Injectable({
  providedIn: 'root' // Garantimos que o serviço é um singleton
})
export class UpdateRechargeByIdResourceService extends BaseHttpResourceService {
  private recharge = signal<IRecharge | null>(null);
  resource = rxResource({
    request: () => ({
      recharge: this.recharge(), // Obtém o ID dinamicamente
    }), // Pode ser um objeto vazio caso não precise de parâmetros
    loader: ({request}) => {
      var data = request.recharge
      if (!data) {
        throw new Error("ID do round não informado!");
      }
     return this.httpClient.patch<boolean>(`${this.url}/recharge/complete`,data )
    },
  });

  // Método opcional para recarregar os rounds
  reload(recharge: IRecharge ) {
    this.recharge.set(recharge);
    this.resource.reload();
  }

}
