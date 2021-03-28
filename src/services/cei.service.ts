import puppeteer from 'puppeteer';

import Status from '../dtos/status';
import Cei from '../dtos/cei';
import IncomeResult from '../dtos/incomeResult';
import PortfolioResult from '../dtos/portfolioResult';
import ActiveTradesResult from '../dtos/active-trades-result';
import SearchIncomeService from './search-income.service';
import SearchPortfolioService from './search-portfolio.service';
import TransformeService from './transformer.service';
import ActiveTradesService from './active-trades.service';
import BusinessError from '../util/errors/business.error';
import Setting from '../util/setting';
import Config from '../constant/config';

export class CeiService {
  private page: puppeteer.Page;

  private browser: puppeteer.Browser;

  constructor(public cei: Cei, public setting?: Setting) {}

  public async getIncomeAsync(): Promise<IncomeResult[]> {
    try {
      await this.loginAsync(this.cei.login, this.cei.password);
      const service = new SearchIncomeService(this.page, this.setting);
      const results = await service.executeAsync();
      // await this.closeAsync();
      return results;
    } catch {
      return [
        IncomeResult.create({
          brokerName: '',
          brokerCode: '',
          status: Status.Error,
          incomeList: [],
          errors: [
            `There was an error when trying to obtain income information`,
          ],
        }),
      ];
    } finally {
      this.closeAsync();
    }
  }

  public async getPortfolioAsync(): Promise<PortfolioResult[]> {
    try {
      await this.loginAsync(this.cei.login, this.cei.password);
      const service = new SearchPortfolioService(this.page, this.setting);
      const results = await service.executeAsync();
      await this.closeAsync();
      return results;
    } catch {
      return [
        PortfolioResult.create({
          brokerName: '',
          brokerCode: '',
          status: Status.Error,
          portfolioList: [],
          errors: [
            `There was an error when trying to get information from portfolios`,
          ],
        }),
      ];
    } finally {
      await this.closeAsync();
    }
  }

  public async getActiveTradesAsync(): Promise<ActiveTradesResult[]> {
    try {
      await this.loginAsync(this.cei.login, this.cei.password);
      const service = new ActiveTradesService(this.page, this.setting);
      const results = await service.executeAsync();
      return results;
    } catch (err) {
      return [
        ActiveTradesResult.create({
          brokerName: '',
          brokerCode: '',
          startDate: '',
          endDate: '',
          status: Status.Error,
          tradedAssetList: [],
          negociatedSummaryList: [],
          errors: [
            `There was an error when trying to get information from portfolios`,
          ],
        }),
      ];
    } finally {
      await this.closeAsync();
    }
  }

  private async startAsync(setting?: Setting): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: setting?.headless || Config.HEADLESS,
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

    await this.startAsync(this.setting);

    await this.page.goto(Config.URL_LOGIN);

    await this.page.type(
      `[name=${Config.TAG.TEXT_LOGIN}]`,
      TransformeService.replaceLogin(login),
      {
        delay: setting?.delay || Config.DELAY,
      },
    );
    await this.page.type(`[name=${Config.TAG.TEXT_PASSWORD}]`, password, {
      delay: setting?.delay || Config.DELAY,
    });

    this.page.click(`[name=${Config.TAG.BTN_LOGIN}]`);

    await this.page.waitForSelector(Config.TAG.LABEL_ID_BREADCRUMB);
  }
}
