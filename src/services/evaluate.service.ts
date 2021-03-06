import puppeteer from 'puppeteer';

import Item from '../dtos/item';

export default class EvaluateService {
  public static async getItemsAsync(
    page: puppeteer.Page,
    tag: string,
  ): Promise<Item[]> {
    const items: Item[] = await page.evaluate(selector => {
      return Array.prototype.map.call(
        document.querySelector(selector).children,
        el => ({
          id: el.value,
          name: el.textContent.trim(),
        }),
      ) as Item[];
    }, tag);

    return items;
  }

  public static async getListTextAsync(
    page: puppeteer.Page,
    tag: string,
  ): Promise<string[]> {
    const rows = await page.evaluate(selector => {
      return Array.prototype.map.call(document.querySelectorAll(selector), el =>
        el.textContent.trim(),
      ) as string[];
    }, tag);

    return rows;
  }

  public static async getListTextWithItemExclusionAsync(
    page: puppeteer.Page,
    deletedItems: string[],
    tag: string,
  ): Promise<string[]> {
    const rows = await page.evaluate(selector => {
      return Array.prototype.map.call(document.querySelectorAll(selector), el =>
        el.textContent.trim(),
      ) as string[];
    }, tag);

    return rows?.filter(x => !deletedItems.includes(x));
  }

  public static async getRowsAsync(
    page: puppeteer.Page,
    tag: string,
  ): Promise<string[]> {
    const rows = await page.evaluate(selector => {
      return Array.prototype.map.call(document.querySelectorAll(selector), el =>
        Array.prototype.map.call(
          el.children,
          subEl => (subEl && subEl.textContent.trim()) || ``,
        ),
      ) as string[];
    }, tag);

    return rows;
  }

  public static async singleValueTextAsync(
    page: puppeteer.Page,
    tag: string,
  ): Promise<string> {
    const element = await page.$(tag);
    const value = await (
      await element?.getProperty('textContent')
    )?.jsonValue();

    if (!value) return '';

    return value as string;
  }
}
