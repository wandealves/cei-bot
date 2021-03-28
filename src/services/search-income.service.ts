import puppeteer from 'puppeteer';

import Item from '../dtos/item';
import Income from '../dtos/income';
import IncomeResult from '../dtos/incomeResult';
import Status from '../dtos/status';
import EvaluateService from './evaluate.service';
import TransformeService from './transformer.service';
import Setting from '../util/setting';
import Config from '../constant/config';

export default class SearchIncomeService {
  constructor(public page: puppeteer.Page, public setting?: Setting) {}

  public async executeAsync(): Promise<IncomeResult[]> {
    await this.page.goto(Config.URL_DIVIDEND);
    await this.page.waitForSelector(`[name=${Config.TAG.SLC_INSTITUTION}]`);

    const institutions = await EvaluateService.getItemsAsync(
      this.page,
      `[name=${Config.TAG.SLC_INSTITUTION}]`,
    );
    const incomeResult = await this.filterDataAsync(this.page, institutions);
    return incomeResult;
  }

  private async filterDataAsync(
    page: puppeteer.Page,
    institutions: Item[],
  ): Promise<IncomeResult[]> {
    const results: IncomeResult[] = [];

    if (!institutions) {
      const yieldError: IncomeResult = new IncomeResult();
      yieldError.errors.push(`Institutions not found`);
      results.push(yieldError);
      return results;
    }

    const institutionsFilter = institutions.filter(item => item.id !== '0');
    let brokerName = '';

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < institutionsFilter.length; i++) {
      try {
        const institutionId = institutionsFilter[i].id;
        brokerName = institutionsFilter[i].name;

        let datas: Income[] = [];

        const incomeResult = IncomeResult.create({
          incomeList: [],
          brokerName,
          brokerCode: institutionId,
          status: Status.NotFound,
          errors: [],
        });
        results.push(incomeResult);

        await page.select(
          `[name=${Config.TAG.SLC_INSTITUTION}]`,
          `${institutionId}`,
        );
        await page.click(`[name=${Config.TAG.BTN_CALL_CONSULT}]`);
        await page.waitForTimeout(
          this.setting?.timeout || Config.TIMEOUTRESPONSE.timeout,
        );

        datas = await this.transformDataAsync(page);
        if (datas && datas.length > 0) {
          incomeResult.status = Status.Success;
          incomeResult.incomeList = datas;
        }
      } catch {
        // I want application to not crush, but don't care about the message
      }
    }
    return results;
  }

  private async transformDataAsync(page: puppeteer.Page): Promise<Income[]> {
    const header: string[] = await EvaluateService.getListTextAsync(
      page,
      Config.TAG.TABLE_HEADER_DIVIDEND,
    );

    const rows: string[] = await EvaluateService.getRowsAsync(
      page,
      Config.TAG.TABLE_BODY_DIVIDEND,
    );

    const datas: Income[] = [];

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    rows.forEach((row: any) => {
      const dataRow: any = {};
      row.forEach((lineValue: string, index: number) => {
        const headerTag = header[index];
        const transformedTag = TransformeService.fromTo(headerTag);
        dataRow[transformedTag] = TransformeService.parseNumber(
          lineValue,
          headerTag,
        );
      });
      datas.push(dataRow);
    });

    return datas;
  }
}
