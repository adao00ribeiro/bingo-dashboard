import { IPrize } from "./IPrize";

export interface IRoundBulk{
  cardValue: number;
  startedDate: string; // DateOnly → string (ISO format recomendado)
  finishedDate: string; // DateOnly → string
  startedTime: string; // TimeOnly → string no formato "HH:mm"
  finishedTime: string; // TimeOnly → string no formato "HH:mm"
  timeBetweenBalls: number;
  timeBetweenRounds: number;
  maxBalls: number;
  cardRows: number;
  cardColumns: number;
  roomId: string; // Guid → string
  prizes?: IPrize[];
}
