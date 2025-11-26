import { EPaymentStatus } from "../enums/EPaymentStatus";

export interface IRecharge {
      id: string,
      value :number
      status : EPaymentStatus.PENDING;
      qrcode : string,
      imagemQrcode : string,
      punterId : string,
      createdAt?: string
   //   Punter { get; set; }
}
