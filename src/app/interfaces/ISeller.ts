import { IPunter } from "./IPunter";
import { IRoom } from "./IRoom";
import { ISellerSettings } from "./ISellerSettings";
import { IOnlineHouseResponse } from "./response/bingo/IOnlineHouseResponse";

export interface ISeller {
  id: string,
  balance: number;
  email: string;
  cpf: string;
  dateBirth: Date;
  commission: number;
  onlineHouse?: IOnlineHouseResponse;
  //settings : ISellerSettings
 // punters?: IPunter[];
 // ownerRooms?: IRoom[];
}
