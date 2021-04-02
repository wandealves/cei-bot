import puppeteer from 'puppeteer';

import Item from '../dtos/item';
import Status from '../dtos/status';
import TreasureResult from '../dtos/treasure-result';
import Treasure from '../dtos/treasure';
import EvaluateService from './evaluate.service';
import TransformeService from './transformer.service';
import Setting from '../util/setting';
import Config from '../constant/config';

export default class TreasureService {
  constructor(public page: puppeteer.Page, public setting?: Setting) {}

  public async executeAsync(): Promise<TreasureResult[]> {
    await this.page.goto(Config.URL_TREASURE);
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
  ): Promise<TreasureResult[]> {
    const results: TreasureResult[] = [];

    if (!institutions) {
      const treasureResultResultError: TreasureResult = new TreasureResult();
      treasureResultResultError.errors.push(`Institutions not found`);
      results.push(treasureResultResultError);
      return results;
    }

    const institutionsFilter = institutions.filter(item => item.id !== '0');

    let brokerName = '';
    let newSearch = false;

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < institutionsFilter.length; i++) {
      try {
        const institutionId = institutionsFilter[i].id;
        brokerName = institutionsFilter[i].name;

        if (this.isbrokerNameValid(brokerName)) {
          const treasureResultResult = TreasureResult.create({
            brokerName,
            brokerCode: institutionId,
            status: Status.NotFound,
            treasureList: [],
            errors: [],
          });

          results.push(treasureResultResult);

          if (newSearch) {
            await page.click(`[name=${Config.TAG.BTN_CALL_NEW_CONSULT}]`);
            await page.waitForTimeout(1000);
          }

          await page.select(
            `[name=${Config.TAG.SLC_INSTITUTION}]`,
            `${institutionId}`,
          );
          await page.waitForTimeout(1000);
          const accounts = await EvaluateService.getItemsAsync(
            this.page,
            `[name=${Config.TAG.SLC_ACCOUNTS}]`,
          );

          const treasures = await this.getItemsAsync(accounts, page);

          if (treasures && treasures.length > 0) {
            treasureResultResult.status = Status.Success;
            treasureResultResult.treasureList = treasures;
          }

          newSearch = true;
        }
      } catch {
        // I want application to not crush, but don't care about the message
      }
    }
    return results;
  }

  private async getItemsAsync(
    accounts: Item[],
    page: puppeteer.Page,
  ): Promise<Treasure[]> {
    const results: Treasure[] = [];
    if (accounts) {
      const accountResults = accounts.filter(f => f.id !== '-1');
      for (let i = 0; i < accountResults.length; i++) {
        const account = accountResults[i];
        await page.select(`[name=${Config.TAG.SLC_ACCOUNTS}]`, `${account.id}`);
        await page.waitForTimeout(2000);
        await page.click(`[name=${Config.TAG.BTN_CALL_CONSULT}]`);
        await page.waitForTimeout(
          this.setting?.timeout || Config.TIMEOUTRESPONSE.timeout,
        );
        const datas = await this.transformDataAsync(page);
        datas.forEach((row: Treasure) => results.push(row));
      }
    }
    return results;
  }

  private async transformDataAsync(page: puppeteer.Page): Promise<Treasure[]> {
    const header: string[] = await EvaluateService.getListTextWithItemExclusionAsync(
      page,
      ['Valor (R$)', 'Quantidade'],
      Config.TAG.TABLE_HEADER_TREASURE,
    );

    const rows: string[] = await EvaluateService.getRowsAsync(
      page,
      Config.TAG.TABLE_BODY_TREASURE,
    );

    const datas: Treasure[] = [];

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

  private isbrokerNameValid(brokerName: string): boolean {
    if (!brokerName) return false;

    if (brokerName === 'Selecione') return false;

    return true;
  }
}
