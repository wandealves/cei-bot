import Transforme from '../constant/transforme';

export default class TransformeService {
  public static fromTo(tag: string): string {
    if (!tag) return tag;

    if (Transforme.TO.ACTIVE === tag) return Transforme.FROM.ACTIVE;
    if (Transforme.TO.SPECIFICATION === tag || Transforme.TO.SPEC === tag)
      return Transforme.FROM.SPECIFICATION;
    if (Transforme.TO.CODE === tag) return Transforme.FROM.CODE;
    if (Transforme.TO.PAYMENTDATE === tag || Transforme.TO.CREDITDATE === tag)
      return Transforme.FROM.PAYMENTDATE;
    if (Transforme.TO.EVENTTYPE === tag) return Transforme.FROM.EVENTTYPE;
    if (Transforme.TO.QUANTItY === tag) return Transforme.FROM.QUANTItY;
    if (Transforme.TO.QUOTATIONFACTOR === tag)
      return Transforme.FROM.QUOTATIONFACTOR;
    if (Transforme.TO.GROSSVALUE === tag) return Transforme.FROM.GROSSVALUE;
    if (Transforme.TO.NETVALUE === tag) return Transforme.FROM.NETVALUE;

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
      return parseFloat(value);
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
