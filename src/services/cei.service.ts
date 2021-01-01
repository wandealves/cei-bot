import puppeteer from 'puppeteer';

import Cei from '../dtos/cei';
import IncomeResult from '../dtos/incomeResult';
import IncomeService from './income.service';
import TransformeService from './transformer.service';
import BusinessError from '../util/errors/business.error';
import Setting from '../util/setting';
import Config from '../constant/config';

/* eslint-disable import/prefer-default-export */
export class CeiService {
  private page: puppeteer.Page;

  private browser: puppeteer.Browser;

  constructor(public cei: Cei, public setting?: Setting) {}

  public async getIncomeAsync(): Promise<IncomeResult[]> {
    await this.loginAsync(this.cei.login, this.cei.password);
    const incomeService = new IncomeService(this.page, this.setting);
    const results = await incomeService.executeAsync();
    await this.closeAsync();
    return results;
  }

  private async startAsync(setting?: Setting): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: setting ? setting.headless : Config.HEADLESS,
    });
    this.page = await this.browser.newPage();
  }

  private async closeAsync(): Promise<void> {
    if (this.browser) await this.browser.close();
  }

  private async loginAsync(
    login: string,
    password: string,
    setting?: Setting,
  ): Promise<void> {
    if (!login || !password)
      throw new BusinessError(`Enter login and password`);

    await this.startAsync();

    await this.page.goto(Config.URL_LOGIN);

    await this.page.type(
      `[name=${Config.TAG.TEXT_LOGIN}]`,
      TransformeService.replaceLogin(login),
      {
        delay: setting ? setting.delay : Config.DELAY,
      },
    );
    await this.page.type(`[name=${Config.TAG.TEXT_PASSWORD}]`, password, {
      delay: setting ? setting.delay : Config.DELAY,
    });
    this.page.click(`[name=${Config.TAG.BTN_LOGIN}]`);

    await this.page.waitForSelector(`#ctl00_Breadcrumbs_lblTituloPagina`, {
      timeout: setting ? setting.timeout : Config.TIMEOUTRESPONSE.timeout,
    });
  }
}
