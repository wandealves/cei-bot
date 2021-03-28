import Income from './income';
import Status from './status';

export default class IncomeResult {
  brokerName: string;

  brokerCode: string;

  incomeList: Income[];

  status: Status = Status.Error;

  errors: string[] = [];

  public static create(result: IncomeResult): IncomeResult {
    const incomeResult: IncomeResult = new IncomeResult();
    incomeResult.brokerName = result.brokerName;
    incomeResult.brokerCode = result.brokerCode;
    incomeResult.status = result.status;
    incomeResult.incomeList = result.incomeList;
    incomeResult.errors = result.errors;
    return incomeResult;
  }
}
