import Income from './income';
import Status from './status';

export default class IncomeResult {
  brokerName: string;

  brokerCode: string;

  incomeList: Income[];

  status: Status = Status.Error;

  errors: string[] = [];
}
