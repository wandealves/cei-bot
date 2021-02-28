import Status from './status';
import Portfolio from './portfolio';

export default class portfolioResult {
  brokerName: string;

  brokerCode: string;

  portfolioList: Portfolio[];

  status: Status = Status.Error;

  errors: string[] = [];
}
