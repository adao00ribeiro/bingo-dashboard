import { inject, Injectable, signal } from '@angular/core';
import { IBotConfig } from '../../interfaces/IBotConfig';
import { BaseResource } from '../base.resource';
import { IPaged } from '../../interfaces/IPaged';
import { BotConfigService } from '../../services/bot-config/bot-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotConfigResource extends BaseResource<{ page: number; size: number }, IPaged<IBotConfig>> {

   private botConfigService = inject(BotConfigService)

   protected override loader(request: { page: number; size: number }): Observable<IPaged<IBotConfig>> {
        return this.botConfigService.GetAll(request.page, request.size);
   }
}
