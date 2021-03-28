/* eslint max-classes-per-file: ["error", 2] */
export default class Config {
  public static URL_BASE = 'https://ceiapp.b3.com.br/CEI_Responsivo/';

  public static URL_LOGIN = `${Config.URL_BASE}login.aspx`;

  public static URL_DIVIDEND = `${Config.URL_BASE}ConsultarProventos.aspx`;

  public static URL_PORTFOLIO = `${Config.URL_BASE}ConsultarCarteiraAtivos.aspx`;

  public static URL_ACTIVE_TRADES = `${Config.URL_BASE}negociacao-de-ativos.aspx`;

  public static HEADLESS = false;

  public static DELAY = 300;

  public static TIMEOUTRESPONSE = { timeout: 8 * 1000 };

  public static TAG = class {
    public static TEXT_LOGIN = "'ctl00$ContentPlaceHolder1$txtLogin'";

    public static TEXT_PASSWORD = "'ctl00$ContentPlaceHolder1$txtSenha'";

    public static TEXT_START_DATE_ACTIVE_TRADES =
      "'ctl00$ContentPlaceHolder1$txtDataDeBolsa'";

    public static TEXT_END_DATE_ACTIVE_TRADES =
      "'ctl00$ContentPlaceHolder1$txtDataAteBolsa'";

    public static BTN_LOGIN = "'ctl00$ContentPlaceHolder1$btnLogar'";

    public static BTN_CALL_CONSULT = "'ctl00$ContentPlaceHolder1$btnConsultar'";

    public static SLC_INSTITUTION = "'ctl00$ContentPlaceHolder1$ddlAgentes'";

    public static LABEL_ID_DIVIDEND =
      '#ctl00_ContentPlaceHolder1_rptAgenteProventos_ctl00_lblAgenteProventos';

    public static LABEL_ID_BREADCRUMB = '#ctl00_Breadcrumbs_lblTituloPagina';

    public static TABLE_HEADER_DIVIDEND = '.responsive > thead > tr > th';

    public static TABLE_HEADER_PORTFOLIO = '.Responsive > thead > tr > th';

    public static TABLE_BODY_DIVIDEND = '.responsive > tbody > tr';

    public static TABLE_BODY_PORTFOLIO = '.Responsive > tbody > tr';

    public static TABLE_BODY_ACTIVE_TRADES_TABLE_ONE =
      '#ctl00_ContentPlaceHolder1_rptAgenteBolsa_ctl00_rptContaBolsa_ctl00_pnAtivosNegociados .responsive > tbody > tr';

    public static TABLE_HEADER_TRADES_TABLE_ONE =
      '#ctl00_ContentPlaceHolder1_rptAgenteBolsa_ctl00_rptContaBolsa_ctl00_pnAtivosNegociados .responsive > thead > tr > th';

    public static TABLE_BODY_ACTIVE_TRADES_TABLE_TWO =
      '#ctl00_ContentPlaceHolder1_rptAgenteBolsa_ctl00_rptContaBolsa_ctl00_pnResumoNegocios .responsive > tbody > tr';

    public static TABLE_HEADER_TRADES_TABLE_TWO =
      '#ctl00_ContentPlaceHolder1_rptAgenteBolsa_ctl00_rptContaBolsa_ctl00_pnResumoNegocios .responsive > thead > tr > th';

    public static SPAN_START_PERIOD =
      '#ctl00_ContentPlaceHolder1_lblPeriodoInicialBolsa';

    public static SPAN_END_PERIOD =
      '#ctl00_ContentPlaceHolder1_lblPeriodoFinalBolsa';
  };
}
