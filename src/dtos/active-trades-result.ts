import Status from './status';
import NegociatedSummary from './negociated-summary';
import TradedAsset from './traded-asset';

export default class ActiveTradesResult {
  brokerName: string;

  brokerCode: string;

  tradedAssetList: TradedAsset[];

  negociatedSummaryList: NegociatedSummary[];

  status: Status = Status.Error;

  errors: string[] = [];

  public static create(result: ActiveTradesResult): ActiveTradesResult {
    const activeTradesResult: ActiveTradesResult = new ActiveTradesResult();
    activeTradesResult.brokerName = result.brokerName;
    activeTradesResult.brokerCode = result.brokerCode;
    activeTradesResult.status = result.status;
    activeTradesResult.tradedAssetList = result.tradedAssetList;
    activeTradesResult.negociatedSummaryList = result.negociatedSummaryList;
    activeTradesResult.errors = result.errors;
    return activeTradesResult;
  }
}
