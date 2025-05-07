import { IRoom } from "./IRoom";

export interface IBotConfig {
  id:string;
  enabled : boolean;
  roomId : string;
  room?: IRoom;
}
