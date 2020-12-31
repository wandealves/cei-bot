import puppeteer from 'puppeteer';

import Item from '../models/item';
import EvaluateService from './evaluate.service';
import TransformeService from './transformer.service';
import Config from '../constant/config';
import BusinessError from '../util/errors/business.error';

export default class DividendService {
  constructor(public page: puppeteer.Page) {}

  public async getAsync(): Promise<void> {
    await this.page.goto(Config.URL_DIVIDEND);
    await this.page.waitForSelector(`[name=${Config.TAG.SLC_INSTITUTION}]`);

    const institutions = await EvaluateService.getItemsAsync(
      this.page,
      `[name=${Config.TAG.SLC_INSTITUTION}]`,
    );
    await this.getValuesAsync(institutions);
  }

  private async getValuesAsync(institutions: Item[]): Promise<void> {
    if (!institutions) throw new BusinessError(`Institutions not found`);

    const institutionsFilter = institutions.filter(item => item.id !== '0');

    await this.page.select(`[name=${Config.TAG.SLC_INSTITUTION}]`, '308');

    this.page.click(`[name=${Config.TAG.BTN_DIVIDEND}]`);

    await this.page.waitForSelector(Config.TAG.LABEL_ID_DIVIDEND);

    const header: string[] = await EvaluateService.getListTextAsync(
      this.page,
      Config.TAG.TABLE_HEADER_DIVIDEND,
    );

    const rows: string[] = await EvaluateService.getRowsAsync(
      this.page,
      Config.TAG.TABLE_BODY_DIVIDEND,
    );

    const brokerData = [];

    rows.forEach((row: any) => {
      const dataRow: any = {};
      row.forEach((col: string, index: number) => {
        const tag = TransformeService.fromTo(header[index]);
        dataRow[tag] = col;
      });
      brokerData.push(dataRow);
    });

    // const ss = '999';
    console.log(institutionsFilter);
    // console.log(trans);
  }
}
