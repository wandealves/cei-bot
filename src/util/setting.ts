export default class Setting {
  public headless: boolean;

  public delay: number;

  public timeout: number;

  constructor(headless: boolean, delay: number, timeout: number) {
    this.headless = headless;
    this.delay = delay === 0 ? 300 : delay;
    this.timeout = timeout === 0 ? 300 : timeout;
  }
}
