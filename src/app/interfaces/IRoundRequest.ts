import { ICard } from "./ICard";
import { IPrize } from "./IPrize";
import { IRoom } from "./IRoom";

export interface IRoundRequest {
  cardValue: number;
  cardRows: number;
  cardColumns: number;
  startedDate: string;
  maxBalls: number;
  timeBetweenBalls:number;
  roomId: string;
  prizes?: IPrize[]
}
