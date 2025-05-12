import { IBaseReportRequest } from "./IBaseReportRequest";

export interface IRoundReportRequest extends IBaseReportRequest{
   sellerIds: string[];
}
