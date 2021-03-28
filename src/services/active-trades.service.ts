import puppeteer from 'puppeteer';

import ActiveTradesResult from '../dtos/active-trades-result';
import TradedAsset from '../dtos/traded-asset';
import NegociatedSummary from '../dtos/negociated-summary';
import Item from '../dtos/item';
import Status from '../dtos/status';
import EvaluateService from './evaluate.service';
import Setting from '../util/setting';
import Config from '../constant/config';
import TransformeService from './transformer.service';

export default class ActiveTradesService {
  constructor(public page: puppeteer.Page, public setting?: Setting) {}

  public async executeAsync(): Promise<ActiveTradesResult[]> {
    await this.page.goto(Config.URL_ACTIVE_TRADES);
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
  ): Promise<ActiveTradesResult[]> {
    const results: ActiveTradesResult[] = [];

    if (!institutions) {
      const activeTradesResultError: ActiveTradesResult = new ActiveTradesResult();
      activeTradesResultError.errors.push(`Institutions not found`);
      results.push(activeTradesResultError);
      return results;
    }

    const institutionsFilter = institutions.filter(item => item.id !== '0');

    const startDate = await EvaluateService.singleValueTextAsync(
      page,
      Config.TAG.SPAN_START_PERIOD,
    );

    const endDate = await EvaluateService.singleValueTextAsync(
      page,
      Config.TAG.SPAN_END_PERIOD,
    );

    let brokerName = '';

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < institutionsFilter.length; i++) {
      try {
        const institutionId = institutionsFilter[i].id;
        brokerName = institutionsFilter[i].name;

        if (this.isbrokerNameValid(brokerName)) {
          const activeTradesResult = ActiveTradesResult.create({
            brokerName,
            brokerCode: institutionId,
            status: Status.NotFound,
            tradedAssetList: [],
            negociatedSummaryList: [],
            errors: [],
          });
          results.push(activeTradesResult);

          await page.select(
            `[name=${Config.TAG.SLC_INSTITUTION}]`,
            `${institutionId}`,
          );

          await this.page.type(
            `[name=${Config.TAG.TEXT_START_DATE_ACTIVE_TRADES}]`,
            startDate,
            {
              delay: this.setting?.delay || Config.DELAY,
            },
          );

          await this.page.type(
            `[name=${Config.TAG.TEXT_END_DATE_ACTIVE_TRADES}]`,
            endDate,
            {
              delay: this.setting?.delay || Config.DELAY,
            },
          );

          await page.click(`[name=${Config.TAG.BTN_CALL_CONSULT}]`);
          await page.waitForTimeout(
            this.setting?.timeout || Config.TIMEOUTRESPONSE.timeout,
          );

          await this.transformDataAsync(
            activeTradesResult.tradedAssetList,
            page,
            Config.TAG.TABLE_HEADER_TRADES_TABLE_ONE,
            Config.TAG.TABLE_BODY_ACTIVE_TRADES_TABLE_ONE,
          );

          await this.transformDataAsync(
            activeTradesResult.negociatedSummaryList,
            page,
            Config.TAG.TABLE_HEADER_TRADES_TABLE_TWO,
            Config.TAG.TABLE_BODY_ACTIVE_TRADES_TABLE_TWO,
          );

          if (
            activeTradesResult.tradedAssetList ||
            activeTradesResult.negociatedSummaryList
          ) {
            activeTradesResult.status = Status.Success;
          }
        }
      } catch {
        // I want application to not crush, but don't care about the message
      }
    }
    return results;
  }

  private async transformDataAsync(
    list: TradedAsset[] | NegociatedSummary[],
    page: puppeteer.Page,
    tableHeaderTag: string,
    tableBodyTage: string,
  ): Promise<TradedAsset[] | NegociatedSummary[]> {
    // Config.TAG.TABLE_HEADER_TRADES_TABLE_ONE
    const header: string[] = await EvaluateService.getListTextAsync(
      page,
      tableHeaderTag,
    );
    // Config.TAG.TABLE_BODY_ACTIVE_TRADES_TABLE_ONE
    const rows: string[] = await EvaluateService.getRowsAsync(
      page,
      tableBodyTage,
    );

    // const tradedAssetList: TradedAsset[] = [];

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

      list.push(dataRow);
    });

    return list;
  }

  private isbrokerNameValid(brokerName: string): boolean {
    if (!brokerName) return false;

    if (brokerName === 'Selecione') return false;

    return true;
  }
}
