import Status from './status';
import Portfolio from './portfolio';

export default class PortfolioResult {
  brokerName: string;

  brokerCode: string;

  portfolioList: Portfolio[];

  status: Status = Status.Error;

  errors: string[] = [];

  public static create(result: PortfolioResult): PortfolioResult {
    const portfolioResult: PortfolioResult = new PortfolioResult();
    portfolioResult.brokerName = result.brokerName;
    portfolioResult.brokerCode = result.brokerCode;
    portfolioResult.status = result.status;
    portfolioResult.portfolioList = result.portfolioList;
    portfolioResult.errors = result.errors;
    return portfolioResult;
  }
}
