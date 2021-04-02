/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Transforme from '../constant/transforme';
import ConvertNumber from '../util/convert-number';

export default class TransformeService {
  public static fromTo(tag: string): string {
    if (!tag) return tag;

    if (Transforme.TO.ACTIVE === tag) return Transforme.FROM.ACTIVE;
    if (
      Transforme.TO.SPECIFICATION === tag ||
      Transforme.TO.SPEC === tag ||
      Transforme.TO.TYPE === tag ||
      Transforme.TO.ASSETSPECIFICATION === tag
    )
      return Transforme.FROM.SPECIFICATION;
    if (
      Transforme.TO.CODE === tag ||
      Transforme.TO.TRADINGCODE === tag ||
      Transforme.TO.COMPLETETRADINGCODE === tag ||
      Transforme.TO.SUMMARYCODE === tag
    )
      return Transforme.FROM.CODE;

    if (Transforme.TO.EVENTTYPE === tag) return Transforme.FROM.EVENTTYPE;
    if (Transforme.TO.BUYSELL === tag) return Transforme.FROM.BUYSELL;
    if (Transforme.TO.MARKETPLACE === tag) return Transforme.FROM.MARKETPLACE;
    if (Transforme.TO.PERIOD === tag) return Transforme.FROM.PERIOD;
    if (Transforme.TO.POSITION === tag) return Transforme.FROM.POSITION;

    if (Transforme.TO.TITLE === tag) return Transforme.FROM.TITLE;

    if (Transforme.TO.PAYMENTDATE === tag || Transforme.TO.CREDITDATE === tag)
      return Transforme.FROM.PAYMENTDATE;
    if (Transforme.TO.BUSINESSDATE === tag) return Transforme.FROM.BUSINESSDATE;
    if (Transforme.TO.TERMMATURITY === tag) return Transforme.FROM.TERMMATURITY;
    if (Transforme.TO.MATURITY === tag) return Transforme.FROM.MATURITY;

    if (
      Transforme.TO.QUANTITYBASE === tag ||
      Transforme.TO.QTDE === tag ||
      Transforme.TO.QUANTITY === tag
    )
      return Transforme.FROM.QUANTItY;

    if (Transforme.TO.QUATITYPURCHASE === tag)
      return Transforme.FROM.QUATITYPURCHASE;
    if (Transforme.TO.QUANTITYSALE === tag) return Transforme.FROM.QUANTITYSALE;
    if (Transforme.TO.QUATITYLIQUIDITY === tag)
      return Transforme.FROM.QUATITYLIQUIDITY;

    if (
      Transforme.TO.QUOTATIONFACTOR === tag ||
      Transforme.TO.COMPLETEQUOTATIONFACTOR === tag
    )
      return Transforme.FROM.QUOTATIONFACTOR;

    if (Transforme.TO.GROSSVALUE === tag || Transforme.TO.VALUE === tag)
      return Transforme.FROM.GROSSVALUE;
    if (Transforme.TO.NETVALUE === tag) return Transforme.FROM.NETVALUE;
    if (Transforme.TO.COMPANY === tag) return Transforme.FROM.COMPANY;
    if (Transforme.TO.CODEISIN === tag) return Transforme.FROM.CODEISIN;
    if (Transforme.TO.PRICE === tag || Transforme.TO.PRICEV2 === tag)
      return Transforme.FROM.PRICE;
    if (Transforme.TO.AVERAGEPURCHASEPRICE === tag)
      return Transforme.FROM.AVERAGEPURCHASEPRICE;
    if (Transforme.TO.AVERAGESALEPRICE === tag)
      return Transforme.FROM.AVERAGESALEPRICE;
    if (Transforme.TO.TOTALAMOUNT === tag) return Transforme.FROM.TOTALAMOUNT;
    if (Transforme.TO.INVESTED === tag) return Transforme.FROM.INVESTED;
    if (Transforme.TO.CURRENTGROSS === tag) return Transforme.FROM.CURRENTGROSS;
    if (Transforme.TO.CURRENTNET === tag) return Transforme.FROM.CURRENTNET;
    if (Transforme.TO.TOTAL === tag) return Transforme.FROM.TOTAL;
    if (Transforme.TO.BLOCKED === tag) return Transforme.FROM.BLOCKED;

    return tag;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parseNumber(value: any, tag: string): any | number {
    if (
      value &&
      (tag === Transforme.TO.GROSSVALUE ||
        tag === Transforme.TO.NETVALUE ||
        tag === Transforme.TO.TOTALAMOUNT ||
        tag === Transforme.TO.PRICEV2 ||
        tag === Transforme.TO.QUANTITYBASE ||
        tag === Transforme.TO.QUANTITY ||
        tag === Transforme.TO.QUOTATIONFACTOR ||
        tag === Transforme.TO.COMPLETEQUOTATIONFACTOR ||
        tag === Transforme.TO.QUATITYPURCHASE ||
        tag === Transforme.TO.QUANTITYSALE ||
        tag === Transforme.TO.AVERAGEPURCHASEPRICE ||
        tag === Transforme.TO.AVERAGESALEPRICE ||
        tag === Transforme.TO.QUATITYLIQUIDITY)
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
