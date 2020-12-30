import puppeteer from 'puppeteer';
import config from 'config';

import Cei from '../models/cei';
import BusinessError from '../util/errors/business.error';

export default class CeiService {
  private page: puppeteer.Page;

  private browser: puppeteer.Browser;

  constructor(public cei: Cei) {}

  public async startAsync(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: config.get('App.cei.headless'),
    });
    this.page = await this.browser.newPage();
    await this.page.goto(config.get('App.cei.url'));
  }

  public async closeAsync(): Promise<void> {
    await this.browser.close();
  }

  public async loginAsync(): Promise<void> {
    if (!this.cei.login || !this.cei.password)
      throw new BusinessError(`Enter login and password`);

    await this.startAsync();

    await this.page.type(
      `[name=${config.get('App.cei.tags.login')}]`,
      this.cei.login,
    );
    await this.page.type(
      `[name=${config.get('App.cei.tags.password')}]`,
      this.cei.password,
    );
  }
}
