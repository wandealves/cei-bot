import puppeteer from 'puppeteer';

import PortfolioResult from '../dtos/portfolioResult';
import Portfolio from '../dtos/portfolio';
import Item from '../dtos/item';
import Status from '../dtos/status';
import EvaluateService from './evaluate.service';
import Setting from '../util/setting';
import Config from '../constant/config';
import TransformeService from './transformer.service';

export default class SearchPortfolioService {
  constructor(public page: puppeteer.Page, public setting?: Setting) {}

  public async executeAsync(): Promise<PortfolioResult[]> {
    await this.page.goto(Config.URL_PORTFOLIO);
    await this.page.waitForSelector(`[name=${Config.TAG.SLC_INSTITUTION}]`);

    const institutions = await EvaluateService.getItemsAsync(
      this.page,
      `[name=${Config.TAG.SLC_INSTITUTION}]`,
    );
    const portfolioResult = await this.filterDataAsync(this.page, institutions);
    return portfolioResult;
  }

  private async filterDataAsync(
    page: puppeteer.Page,
    institutions: Item[],
  ): Promise<PortfolioResult[]> {
    const results: PortfolioResult[] = [];

    if (!institutions) {
      const portfolioError: PortfolioResult = new PortfolioResult();
      portfolioError.errors.push(`Institutions not found`);
      results.push(portfolioError);
      return results;
    }

    const institutionsFilter = institutions.filter(item => item.id !== '0');
    let brokerName = '';

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < institutionsFilter.length; i++) {
      try {
        const institutionId = institutionsFilter[i].id;
        brokerName = institutionsFilter[i].name;

        let datas: Portfolio[] = [];

        const portfolioResult = this.createPortfolioResult(
          [],
          brokerName,
          institutionId,
          Status.NotFound,
          [],
        );
        results.push(portfolioResult);

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
          portfolioResult.status = Status.Success;
          portfolioResult.portfolioList = datas;
        }
      } catch {
        // I want application to not crush, but don't care about the message
      }
    }
    return results;
  }

  private async transformDataAsync(page: puppeteer.Page): Promise<Portfolio[]> {
    const header: string[] = await EvaluateService.getListTextAsync(
      page,
      Config.TAG.TABLE_HEADER_PORTFOLIO,
    );

    const rows: string[] = await EvaluateService.getRowsAsync(
      page,
      Config.TAG.TABLE_BODY_PORTFOLIO,
    );

    const datas: Portfolio[] = [];

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

  private createPortfolioResult(
    datas: Portfolio[],
    brokerName: string,
    brokerCode: string,
    status: Status,
    erros: string[],
  ): PortfolioResult {
    const portfolioResult: PortfolioResult = new PortfolioResult();
    portfolioResult.brokerName = brokerName;
    portfolioResult.brokerCode = brokerCode;
    portfolioResult.status = status;
    portfolioResult.portfolioList = datas;
    portfolioResult.errors = erros;
    return portfolioResult;
  }
}
