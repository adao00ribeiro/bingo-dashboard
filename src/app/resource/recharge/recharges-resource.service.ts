import { Injectable, inject, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { RoundService } from "../../services/round/round.service";
import { IRound } from "../../interfaces/IRound";
import { BaseHttpResourceService } from "../base-http-resource.service";
import { IRecharge } from "../../interfaces/IRecharge";


@Injectable({
  providedIn: 'root' // Garantimos que o serviço é um singleton
})
export class RechargesResourceService extends BaseHttpResourceService {

  resource = rxResource({
    request: () => ({}), // Pode ser um objeto vazio caso não precise de parâmetros
    loader: () => {
     return this.httpClient.get<IRecharge[]>(this.url + "/recharge")
    },
  });

  // Método opcional para recarregar os rounds
  reloadRounds() {
    this.resource.reload();
  }
}
