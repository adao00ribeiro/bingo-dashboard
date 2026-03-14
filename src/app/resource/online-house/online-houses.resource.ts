import { Injectable, inject, signal } from "@angular/core";
import { IPaged } from "../../interfaces/IPaged";
import { BaseResource } from "../base.resource";
import { Observable } from "rxjs";
import { IOnlineHouseResponse } from "../../interfaces/response/bingo/IOnlineHouseResponse";
import { OnlineHouseService } from "../../services/online-house/online-house.service";

@Injectable({
  providedIn: 'root' // Garantimos que o serviço é um singleton
})
export class OnlineHousesResource extends BaseResource<{ page: number; size: number , enabledScratch?:boolean }, IPaged<IOnlineHouseResponse>> {
  private onlineHouseService = inject(OnlineHouseService)

  protected override loader(request: { page: number; size: number , enabledScratch: boolean}): Observable<IPaged<IOnlineHouseResponse>> {
       return this.onlineHouseService.GetAll(request.page, request.size,request.enabledScratch );
  }
}
