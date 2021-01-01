import puppeteer from 'puppeteer';

import Cei from '../dtos/cei';
import IncomeService from './income.service';
import BusinessError from '../util/errors/business.error';
import Setting from '../util/setting';
import Config from '../constant/config';

export default class CeiService {
  private page: puppeteer.Page;

  private browser: puppeteer.Browser;

  constructor(public cei: Cei, public setting?: Setting) {}

  public async startAsync(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: this.setting ? this.setting.headless : Config.HEADLESS,
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
      delay: this.setting ? this.setting.delay : Config.DELAY,
    });
    await this.page.type(
      `[name=${Config.TAG.TEXT_PASSWORD}]`,
      this.cei.password,
      { delay: this.setting ? this.setting.delay : Config.DELAY },
    );
    this.page.click(`[name=${Config.TAG.BTN_LOGIN}]`);

    await this.page.waitForSelector(`#ctl00_Breadcrumbs_lblTituloPagina`, {
      timeout: this.setting
        ? this.setting.timeout
        : Config.TIMEOUTRESPONSE.timeout,
    });
  }

  public async GetIncome(): Promise<void> {
    await this.loginAsync();

    const incomeService = new IncomeService(this.page, this.setting);
    const results = await incomeService.executeAsync();
    console.log(JSON.stringify(results, null, 2));
    await this.closeAsync();
  }
}
