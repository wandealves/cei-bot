export default class ConvertNumber {
  public static currency(value: string): number {
    if (value) {
      const result = parseFloat(
        value
          .replace(/[^0-9,.]/g, '')
          .replace(/[.]/g, '')
          .replace(',', '.'),
      );

      return result;
    }
    return 0;
  }
}
