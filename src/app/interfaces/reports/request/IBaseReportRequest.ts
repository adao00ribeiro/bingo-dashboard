export interface IBaseReportRequest {
  startingOn: string; // ou Date, se for convertido
  endingOn: string;   // ou Date, idem acima
  page?: number;
  perPage?: number;
  filters?: Record<string, any>;
  orders?: string[];
}
