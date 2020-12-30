import puppeteer from 'puppeteer';
import config from 'config';

import Cei from '../models/cei';
import BusinessError from '../util/errors/business.error';

interface Item {
  id: string;
  name: string;
}
export default class CeiService {
  private page: puppeteer.Page;

  private browser: puppeteer.Browser;

  constructor(public cei: Cei) {}

  public async startAsync(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: config.get('App.cei.headless'),
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

    await this.page.goto(config.get('App.cei.url'));

    await this.page.type(
      `[name=${config.get('App.cei.tags.login')}]`,
      this.cei.login,
      { delay: config.get('App.cei.delay') },
    );
    await this.page.type(
      `[name=${config.get('App.cei.tags.password')}]`,
      this.cei.password,
      { delay: config.get('App.cei.delay') },
    );
    this.page.click(`[name=${config.get('App.cei.tags.btnLogin')}]`);

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

  public async earnings(): Promise<void> {
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
  }
}
