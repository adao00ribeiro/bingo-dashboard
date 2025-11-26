import { IPunter } from "../IPunter";

export interface IWithdrawalResponse {
  id: string,
  withdrawalType: string,
  amount: number,
  status: string,
  confirmedAt: string,
  punterId:string,
  punter: IPunter,
  sellerId:string
}
