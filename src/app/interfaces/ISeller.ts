import { IPunter } from "./IPunter";
import { IRoom } from "./IRoom";

export interface ISeller {
  id: string,
  balance: number;
  email: string;
  cpf: string;
  dateBirth: Date;
  commission: number;
  punters?: IPunter[];
  ownerRooms?: IRoom[];
}
