export  interface IReport<TRow, TStats> {
  rows: TRow[];
  stats: TStats;
  startingOn: string; // ou Date, se você for trabalhar como objeto Date no frontend
  endingOn: string;   // idem acima
  page: number;
  perPage: number;
  rowsCount: number;
}
