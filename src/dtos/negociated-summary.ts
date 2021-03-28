export default interface NegociatedSummary {
  code: string;
  period: string;
  quantityBuy: number;
  quantitySale: number;
  averagePurchasePrice: number;
  averageSalePrice: number;
  quantityNet: number;
  position: string;
}
