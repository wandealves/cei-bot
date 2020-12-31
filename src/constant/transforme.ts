/* eslint max-classes-per-file: ["error", 3] */

export default class Transforme {
  public static TO = class {
    public static ACTIVE = 'Ativo';

    public static SPECIFICATION = 'Especificação';

    public static CODE = 'Cód. Negociação';

    public static PAYMENTDATE = 'Prev. Pagamento';

    public static EVENTTYPE = 'Tipo Evento';

    public static QUANTItY = 'Quantidade Base';

    public static QUOTATIONFACTOR = 'Fator Cotação';

    public static GROSSVALUE = 'Valor Bruto (R$)';

    public static NETVALUE = 'Valor Líquido (R$)';

    public static SPEC = 'Espec.';

    public static CREDITDATE = 'Data Crédito';
  };

  public static FROM = class {
    public static ACTIVE = 'active';

    public static SPECIFICATION = 'specification';

    public static CODE = 'code';

    public static PAYMENTDATE = 'paymentDate';

    public static EVENTTYPE = 'eventType';

    public static QUANTItY = 'quantity';

    public static QUOTATIONFACTOR = 'quotationFactor';

    public static GROSSVALUE = 'grossValue';

    public static NETVALUE = 'netValue';
  };
}