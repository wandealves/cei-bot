import Transforme from '../constant/transforme';
import ConvertNumber from '../util/convertNumber';

export default class TransformeService {
  public static fromTo(tag: string): string {
    if (!tag) return tag;

    if (Transforme.TO.ACTIVE === tag) return Transforme.FROM.ACTIVE;
    if (
      Transforme.TO.SPECIFICATION === tag ||
      Transforme.TO.SPEC === tag ||
      Transforme.TO.TYPE === tag
    )
      return Transforme.FROM.SPECIFICATION;
    if (Transforme.TO.CODE === tag || Transforme.TO.TRADINGCODE === tag)
      return Transforme.FROM.CODE;
    if (Transforme.TO.PAYMENTDATE === tag || Transforme.TO.CREDITDATE === tag)
      return Transforme.FROM.PAYMENTDATE;
    if (Transforme.TO.EVENTTYPE === tag) return Transforme.FROM.EVENTTYPE;
    if (Transforme.TO.QUANTItY === tag || Transforme.TO.QTDE === tag)
      return Transforme.FROM.QUANTItY;
    if (Transforme.TO.QUOTATIONFACTOR === tag)
      return Transforme.FROM.QUOTATIONFACTOR;
    if (Transforme.TO.GROSSVALUE === tag || Transforme.TO.VALUE === tag)
      return Transforme.FROM.GROSSVALUE;
    if (Transforme.TO.NETVALUE === tag) return Transforme.FROM.NETVALUE;
    if (Transforme.TO.COMPANY === tag) return Transforme.FROM.COMPANY;
    if (Transforme.TO.CODEISIN === tag) return Transforme.FROM.CODEISIN;
    if (Transforme.TO.PRICE === tag) return Transforme.FROM.PRICE;

    return tag;
  }

  public static parseNumber(value: any, tag: string): any | number {
    if (
      value &&
      (tag === Transforme.TO.GROSSVALUE ||
        tag === Transforme.TO.NETVALUE ||
        tag === Transforme.TO.QUANTItY ||
        tag === Transforme.TO.QUOTATIONFACTOR)
    ) {
      return ConvertNumber.currency(value);
    }

    return value;
  }

  public static replaceLogin(login: string): string {
    if (login) {
      return login.replace('-', '').replace('.', '').replace('/', '');
    }

    return login;
  }
}
