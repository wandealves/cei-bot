import puppeteer from 'puppeteer';

import Cei from '../models/cei';
import DividendService from './dividend.service';
import BusinessError from '../util/errors/business.error';
import Config from '../constant/config';

export default class CeiService {
  private page: puppeteer.Page;

  private browser: puppeteer.Browser;

  constructor(public cei: Cei) {}

  public async startAsync(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: Config.HEADLESS,
    });
    this.page = await this.browser.newPage();
  }

  public async closeAsync(): Promise<void> {
    if (this.browser) await this.browser.close();
  }

  public async loginAsync(): Promise<void> {
    if (!this.cei.login || !this.cei.password)
      throw new BusinessError(`Enter login and password`);

    await this.startAsync();

    await this.page.goto(Config.URL_LOGIN);

    await this.page.type(`[name=${Config.TAG.TEXT_LOGIN}]`, this.cei.login, {
      delay: Config.DELAY,
    });
    await this.page.type(
      `[name=${Config.TAG.TEXT_PASSWORD}]`,
      this.cei.password,
      { delay: Config.DELAY },
    );
    this.page.click(`[name=${Config.TAG.BTN_LOGIN}]`);

    await this.page.waitForSelector(`#ctl00_Breadcrumbs_lblTituloPagina`, {
      timeout: 120000,
    });

    /*
    console.log('OPA4');
    await this.page.goto(config.get('App.cei.earningUrl'));
    await this.page.waitForSelector(
      '[name="ctl00$ContentPlaceHolder1$ddlAgentes"]',
    );

    console.log('OPA5');

    const header = await this.page.evaluate(selector => {
      return Array.prototype.map.call(document.querySelectorAll(selector), el =>
        el.textContent.trim(),
      );
    }, '[name="ctl00$ContentPlaceHolder1$ddlAgentes"]');

    console.log('OPA6', header); */
    //
  }

  /* public async dividends(): Promise<void> {
    await this.loginAsync();
    await this.page.goto(config.get('App.cei.earningUrl'));
    await this.page.waitForSelector(
      `[name=${config.get('App.cei.tags.institution')}]`,
    );

    let institutions: Item[] = await this.page.evaluate(selector => {
      return Array.prototype.map.call(
        document.querySelector(selector).children,
        el => ({
          id: el.value,
          name: el.textContent.trim(),
        }),
      ) as Item[];
    }, `[name=${config.get('App.cei.tags.institution')}]`);

    if (!institutions) throw new BusinessError(`Institutions not found`);

    institutions = institutions.filter(item => item.id !== '0');
    await this.page.select(
      `[name=${config.get('App.cei.tags.institution')}]`,
      '3',
    );
    console.log(institutions);
  } */

  public async dividends(): Promise<void> {
    await this.loginAsync();

    const dividendService = new DividendService(this.page);
    await dividendService.getAsync();
  }
}
