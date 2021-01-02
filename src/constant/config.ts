/* eslint max-classes-per-file: ["error", 2] */
export default class Config {
  public static URL_LOGIN =
    'https://ceiapp.b3.com.br/CEI_Responsivo/login.aspx';

  public static URL_DIVIDEND =
    'https://ceiapp.b3.com.br/CEI_Responsivo/ConsultarProventos.aspx';

  public static HEADLESS = false;

  public static DELAY = 300;

  public static TIMEOUTRESPONSE = { timeout: 8 * 1000 };

  public static TAG = class {
    public static TEXT_LOGIN = "'ctl00$ContentPlaceHolder1$txtLogin'";

    public static TEXT_PASSWORD = "'ctl00$ContentPlaceHolder1$txtSenha'";

    public static BTN_LOGIN = "'ctl00$ContentPlaceHolder1$btnLogar'";

    public static BTN_DIVIDEND = "'ctl00$ContentPlaceHolder1$btnConsultar'";

    public static SLC_INSTITUTION = "'ctl00$ContentPlaceHolder1$ddlAgentes'";

    public static LABEL_ID_DIVIDEND =
      '#ctl00_ContentPlaceHolder1_rptAgenteProventos_ctl00_lblAgenteProventos';

    public static LABEL_ID_BREADCRUMB = '#ctl00_Breadcrumbs_lblTituloPagina';

    public static TABLE_HEADER_DIVIDEND = '.responsive > thead > tr > th';

    public static TABLE_BODY_DIVIDEND = '.responsive > tbody > tr';
  };
}
