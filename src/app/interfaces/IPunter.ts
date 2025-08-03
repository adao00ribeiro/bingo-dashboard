import { ISeller } from "./ISeller"

export interface IPunter {
  id: string,
  name: string,
  balance:number
  prizeBalance:number
  createdAt : Date
  seller: ISeller
}
