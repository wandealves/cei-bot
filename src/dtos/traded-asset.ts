export default interface TradedAsset {
  businessDate: string;
  buyOrSell: string;
  marketplace: string;
  termMaturity: string;
  code: string;
  specification: string;
  quantity: number;
  price: number;
  totalAmount: number;
  quotationFactor: number;
}
