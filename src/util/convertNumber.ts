export default class ConvertNumber {
  public static currency(value: string): number {
    if (value) {
      const substitutedValue = value.replace('.', '').replace(',', '.');
      return parseFloat(substitutedValue);
    }
    return 0;
  }
}
