import Status from './status';
import Treasure from './treasure';

export default class TreasureResult {
  brokerName: string;

  brokerCode: string;

  status: Status = Status.Error;

  treasureList: Treasure[];

  errors: string[] = [];

  public static create(result: TreasureResult): TreasureResult {
    const treasureResultResult: TreasureResult = new TreasureResult();
    treasureResultResult.brokerName = result.brokerName;
    treasureResultResult.brokerCode = result.brokerCode;
    treasureResultResult.status = result.status;
    treasureResultResult.treasureList = result.treasureList;
    treasureResultResult.errors = result.errors;
    return treasureResultResult;
  }
}
