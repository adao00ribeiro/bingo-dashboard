export interface IRoundReportItem {
  roundId : string;
  roundTime: string;         // ou Date, se você estiver convertendo para objeto Date
  cardSaleCount: number;
  botSaleCount: number;
  collected: number;
  botCollected: number;
  finished?: string;         // ou Date | null
  userWinners: number;
  botWinners: number;
  userAwards: number;
  botAwards: number;
  totalPrizes: number;
  comissions: number;
  netValue: number;
}
