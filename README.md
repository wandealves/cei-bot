# cei-bot 💸

<div align="center">
<img src="https://img.shields.io/github/issues/wandealves/cei-bot"/>
<img src="https://img.shields.io/github/stars/wandealves/cei-bot"/>
<img src="https://img.shields.io/github/license/wandealves/cei-bot"/>
<img alt="GitHub language count" src="https://img.shields.io/badge/TS-typescript-blue"/>
</div>


Bot para ler dados do Canal Eletrônico do Investidor, a principal funcionalidade desse projeto é obter dados do CEI - Canal Eletrônico do Investidor e tranformá-lo em informações que possam ser consumidos por outras aplicações.

<!--ts-->
   * [Dependências](#Dependências)
   * [Instalação](#Instalação)
   * [Utilização](#Utilização)
   * [Settings](#Settings)
   * [1. Obtenção dos Rendimentos](#1-Obtenção-dos-Rendimentos)
      * [1.1. Get Income](#11-get-income)
   * [2. Obtenção carteira de ativos](#2-Obtenção-carteira-de-ativos)
      * [2.1. Get Portfolio](#21-get-portfolio)
   * [3. Negociação de ativos](#3-Negociação-de-ativos)
      * [3.1. Get Active Trades](#31-get-active-trades)
      * [3.2. Negociated Summary List](#32-negociated-summary-list)
   * [4. Tesouro Direto](#4-Tesouro-Direto)
      * [4.1. Get Treasure](#41-get-treasure)
   * [Tecnologias](#🛠-Tecnologias)
   * [Features](#Features)
   * [Licença](#Licença)
<!--te-->

## Dependências

O `cei-bot` utiliza a seguinte dependência:

- [puppeteer](https://github.com/puppeteer/puppeteer) API de alto nível para controlar o Chrome ou Chromium

## Instalação

Basta instalar utilizando o NPM:

```
npm i cei-bot
ou
yarn add cei-bot
```

## Utilização

1. **Crie uma instância do `CeiService` passando com os seguintes parametros:**

- `login`: Usuário de entrada no CEI que pode ser o CPF ou CNPJ;
- `password`: Senha de acesso ao CEI;
- `settings`: Configurações para controle da interação com a página do CEI;

### a - Typescript

```javascript
import { CeiService } from 'cei-bot';

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

(async () => {
  const data = await ceiService.getIncomeAsync();
  console.log(JSON.stringify(data, null, 2));
})();
```

### b - Javascript

```javascript
const CeiService = require('cei-bot').CeiService;

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

ceiService.getIncomeAsync().then(data => {
  console.log(JSON.stringify(data, null, 2));
});
```

### c - Settings

```javascript
import { CeiService } from 'cei-bot';

const ceiService = new CeiService(
  {
    login: 'username',
    password: 'password',
  },
  {
    headless: false,
    delay: 200,
    timeout: 400,
  },
);

(async () => {
  const data = await ceiService.getIncomeAsync();
  console.log(JSON.stringify(data, null, 2));
})();
```
## Settings

| Propriedade  | Tipo      | Default | Descrição                                                                                                                                 |
| ------------ | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **headless** | _Boolean_ | _true_  | Se `true`, o navegador interno do Puppeteer será executado pode ser observado as acões.                                                   |
| **delay**    | _Number_  | 300     | Tempo, em ms, usado para adicionar valores nos inputs para evitar problemas de digitação muito rápida.                                    |
| **timeout**  | _Number_  | 300     | Tempo, em ms, de resposta de uma ação, para evitar obtenção de informações nulas ou vazias espera um tempo para a respsosta do navegador. |

## 1. Obtenção dos Rendimentos

Serviço para obtenção dos rendimentos.

a - Javascript

```javascript
const CeiService = require('cei-bot').CeiService;

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

ceiService.getIncomeAsync().then(data => {
  console.log(JSON.stringify(data, null, 2));
});
```

b - TypeScript

```javascript
import { CeiService } from 'cei-bot';

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

const data = await ceiService.getIncomeAsync();
console.log(JSON.stringify(data, null, 2));
```
### 1.1. Get Income

Retorna os dados os rendiementos do mês.

```javascript
const resuls = await ceiService.getIncomeAsync();
```

Resultado:

```javascript
[
  {
    brokerName: '100 - Corretora 100',
    brokerCode: '100',
    status: 'S',
    errors: [],
    incomeList: [
      {
        active: 'Ação 01',
        specification: 'ON NM',
        code: 'ACAO01',
        paymentDate: '01/01/2020',
        eventType: 'DIVIDENDO',
        quantity: 100,
        quotationFactor: 1,
        grossValue: 50.06,
        netValue: 50,
      },
      {
        active: 'Ação 02',
        specification: 'ON NM',
        code: 'ACAO02',
        paymentDate: '05/01/2020',
        eventType: 'DIVIDENDO',
        quantity: 118,
        quotationFactor: 1,
        grossValue: 80.01,
        netValue: 80,
      },
      {
        active: 'Ação 03',
        specification: 'ON NM',
        code: 'ACAO03',
        paymentDate: '10/01/2020',
        eventType: 'JUROS SOBRE CAPITAL PRÓPRIO',
        quantity: 118,
        quotationFactor: 1,
        grossValue: 25.04,
        netValue: 21.13,
      },
      {
        active: 'Ação 04',
        specification: 'CI',
        code: 'ACAO04',
        paymentDate: '15/01/2020',
        eventType: 'RENDIMENTO',
        quantity: 29,
        quotationFactor: 1,
        grossValue: 34.87,
        netValue: 34.06,
      },
    ],
  },
  {
    brokerName: '200 - Corretora 200',
    brokerCode: '200',
    status: 'N',
    errors: [],
    incomeList: [],
  },
  {
    brokerName: '300 - Corretora 300',
    brokerCode: '300',
    status: 'N',
    errors: [],
    incomeList: [],
  },
];
```

- brokerName = Nome da corretora;

- brokerCode = Código da corretora;

- status = Situação do retorno que pode ser S para Sucesso, E para situação de erro e N para situação de resposta não encontrada. Quando S representa que obteve dados do CEI se N significa não existem informações para a corretora;

- errors = Lista de erros em formato de String;
- incomeList = Lista com todos os rendimentos encontrado no CEI;

## Income List

| Propriedade         | Tipo     | Descrição                                                                              |
| ------------------- | -------- | -------------------------------------------------------------------------------------- |
| **active**          | _String_ | Nome completo da ação.                                                                 |
| **specification**   | _String_ | Especificação da ação se é Ações ordinárias (ON) ou preferenciais (PN).                |
| **code**            | _String_ | Código de negociação do ativo.                                                         |
| **paymentDate**     | _String_ | Data de pagamento ou previsão de pagamento do ativo.                                   |
| **eventType**       | _String_ | Tipo de evento do ativo que pode ser: Dividendo, Juros sobre capital, Rendimento, etc. |
| **quantity**        | _Number_ | Quantidade do ativo na carteira.                                                       |
| **quotationFactor** | _Number_ | Fator da cotação.                                                                      |
| **grossValue**      | _Number_ | Valor Bruto (R$) do rendimento do ativo.                                               |
| **netValue**        | _Number_ | Valor líquido (R$) do rendimento do ativo.                                             |

## 2. Obtenção carteira de ativos

Serviço para obtenção dos ativos disponíveis no CEI.

a - Javascript

```javascript
const CeiService = require('cei-bot').CeiService;

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

ceiService.getPortfolioAsync().then(data => {
  console.log(JSON.stringify(data, null, 2));
});
```

b - TypeScript

```javascript
import { CeiService } from 'cei-bot';

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

const data = await ceiService.getPortfolioAsync();
console.log(JSON.stringify(data, null, 2));
```

### 2.1. Get Portfolio

Retorna os dados da carteira de ativos do mês no CEI.

```javascript
const resuls = await ceiService.getPortfolioAsync();
```

Resultado:

```javascript
[
  {
    status: 'S',
    errors: [],
    brokerName: "100 - Corretora 100'",
    brokerCode: '100',
    portfolioList: [
      {
        company: 'Empresa 01',
        specification: 'CI',
        code: 'ABC01',
        codISIN: 'BRBABC01',
        price: '110,10',
        quantity: '60',
        quotationFactor: 1,
        grossValue: '2.100,10',
      },
      {
        company: 'Empresa 02',
        specification: 'ON NM',
        code: 'CCC02',
        codISIN: 'BRECCC02',
        price: '40,60',
        quantity: '200',
        quotationFactor: 1,
        grossValue: '5.000,70',
      },
      {
        company: 'Empresa 03',
        specification: 'ON NM',
        code: 'CCC03',
        codISIN: 'BRECCC03',
        price: '60,60',
        quantity: '700',
        quotationFactor: 1,
        grossValue: '1.000,10',
      },
      {
        company: 'Empresa 04',
        specification: 'ON NM',
        code: 'CCC04',
        codISIN: 'BRECCC04',
        price: '15,60',
        quantity: '600',
        quotationFactor: 1,
        grossValue: '10.000,70',
      },
    ],
  },
  {
    status: 'N',
    errors: [],
    brokerName: 'Empresa 02',
    brokerCode: '200',
    portfolioList: [],
  },
  {
    status: 'N',
    errors: [],
    brokerName: 'Empresa 03',
    brokerCode: '300',
    portfolioList: [],
  },
];
```

- brokerName = Nome da corretora;

- brokerCode = Código da corretora;

- status = Situação do retorno que pode ser S para Sucesso, E para situação de erro e N para situação de resposta não encontrada. Quando S representa que obteve dados do CEI se N significa não existem informações para a corretora;

- errors = Lista de erros em formato de String;
- portfolioList = Lista com todos os ativos da sua carteira encontrado no CEI;

## Portfolio List

| Propriedade         | Tipo     | Descrição                                                               |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| **company**         | _String_ | Nome da empresa .                                                       |
| **specification**   | _String_ | Especificação da ação se é Ações ordinárias (ON) ou preferenciais (PN). |
| **code**            | _String_ | Código de negociação do ativo.                                          |
| **codISIN**         | _String_ | International Securities Identification Number.                         |
| **price**           | _Number_ | Preço do ativo.                                                         |
| **quantity**        | _Number_ | Quantidade do ativo na carteira.                                        |
| **quotationFactor** | _Number_ | Fator da cotação.                                                       |
| **grossValue**      | _Number_ | Valor Bruto (R$) do rendimento do ativo.                                |

## 3. Negociação de ativos

Serviço para a obtenção das negociações de ativos.

a - Javascript

```javascript
const CeiService = require('cei-bot').CeiService;

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

ceiService.getActiveTradesAsync().then(data => {
  console.log(JSON.stringify(data, null, 2));
});
```

b - TypeScript

```javascript
import { CeiService } from 'cei-bot';

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

const data = await ceiService.getActiveTradesAsync();
console.log(JSON.stringify(data, null, 2));
```
### 3.1. Get Active Trades

Retorna os dados das negociações de ativos no período disponivel.

```javascript
const resuls = await ceiService.getActiveTradesAsync();
```

Resultado:

```javascript
[
  {
    "status": "S",
    "errors": [],
    "brokerName": "01 - Corretora 01",
    "brokerCode": "01",
    "startDate": "01/01/2020",
    "endDate"  : "01/01/2021",
    "tradedAssetList": [
      {
        "businessDate": "01/01/2021",
        "buyOrSell": "C",
        "marketplace": "Mercado a Vista",
        "termMaturity": "",
        "code": "COD001",
        "specification": "FII COD001",
        "quantity": 10,
        "price": 100.10,
        "totalAmount": 1001,
        "quotationFactor": 1
      },
      {
        "businessDate": "01/01/2021",
        "buyOrSell": "C",
        "marketplace": "Mercado a Vista",
        "termMaturity": "",
        "code": "COD002",
        "specification": "ON",
        "quantity": 5,
        "price": 0.94,
        "totalAmount": 4.7,
        "quotationFactor": 1
      },
      {
        "businessDate": "01/01/2020",
        "buyOrSell": "C",
        "marketplace": "Merc. Fracionário",
        "termMaturity": "",
        "code": "COD003",
        "specification": "ON",
        "quantity": 9,
        "price": 0.97,
        "totalAmount": 8.73,
        "quotationFactor": 1
      }
    ],
    "negociatedSummaryList": [
      {
        "code": "COD001",
        "period": "01/01/2020 a 01/01/2021",
        "purchaseAmount": 50,
        "saleAmount": 0,
        "averagePurchasePrice": 102.8,
        "averageSalePrice": 0,
        "liquidity": 0,
        "position": "-"
      },
      {
        "code": "COD002",
        "period": "01/01/2020 a 01/01/2021",
        "purchaseAmount": 100,
        "saleAmount": 0,
        "averagePurchasePrice": 42.381,
        "averageSalePrice": 0,
        "liquidity": 0,
        "position": "-"
      },
      {
        "code": "COD003",
        "period": "01/01/2020 a 01/01/2021",
        "purchaseAmount": 28,
        "saleAmount": 0,
        "averagePurchasePrice": 26.831,
        "averageSalePrice": 0,
        "liquidity": 0,
        "position": "-"
      }
    ]
  },
  {
    "status": "S",
    "errors": [],
    "brokerName": "02 - Corretora 02",
    "brokerCode": "02",
    "tradedAssetList": [],
    "negociatedSummaryList": []
  },
  {
    "status": "S",
    "errors": [],
    "brokerName": "03 - Corretora 03",
    "brokerCode": "03",
    "tradedAssetList": [],
    "negociatedSummaryList": []
  }
]
```

- brokerName = Nome da corretora;

- brokerCode = Código da corretora;

- startDate = Período inicial disponível;

- endDate = Período final disponível;

- status = Situação do retorno que pode ser S para Sucesso, E para situação de erro e N para situação de resposta não encontrada. Quando S representa que obteve dados do CEI se N significa não existem informações para a corretora;

- errors = Lista de erros em formato de String;
- tradedAssetList = Lista de todos ativos negociados;
- negociatedSummaryList = Lista do resumo dos negócios no período;

## TradedAsset List

| Propriedade         | Tipo     | Descrição                                                               |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| **businessDate**    | _String_ | Data de negócio.                                                        |
| **buyOrSell**       | _String_ | Compra/Venda.                                                           |
| **marketplace**     | _String_ | Mercado, Mercado a Vista, Merc. Fracionário, etc.                       |
| **termMaturity**    | _String_ | Prazo/Vencimento.                                                       |
| **code**            | _String_ | Código negociação do ativo.                                             |
| **specification**   | _String_ | Especificação do ativo.                                                 |
| **quantity**        | _Number_ | Quantidade de ativos.                                                   |
| **price**           | _Number_ | Preço unitário (R$) do ativo.                                           |
| **totalAmount**     | _Number_ | Valor total da quantidade vezes preço unitário.                         |
| **quotationFactor** | _Number_ | Fator de cotação.                                                       |

### 3.2. Negociated Summary List

| Propriedade              | Tipo     | Descrição                                                               |
| -------------------------| -------- | ----------------------------------------------------------------------- |
| **code**                 | _String_ | Código do ativo.                                                        |
| **period**               | _String_ | período da negociação dos ativos.                                       |
| **purchaseAmount**       | _Number_ | Quantidade de compra.                                                   |
| **saleAmount**           | _Number_ | Quantidade de venda.                                                    |
| **averagePurchasePrice** | _Number_ | Preço médio de compra.                                                  |
| **averageSalePrice**     | _Number_ | Preço médio de venda.                                                   |
| **liquidity**            | _Number_ | Quantidade liquída.                                                     |
| **position**             | _Number_ | Posição.                                                                |

## 4. Tesouro Direto

Serviço para obtenção dos investimentos em tesouro direto.

a - Javascript

```javascript
const CeiService = require('cei-bot').CeiService;

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

ceiService.getTreasureAsync().then(data => {
  console.log(JSON.stringify(data, null, 2));
});
```

b - TypeScript

```javascript
import { CeiService } from 'cei-bot';

const ceiService = new CeiService({
  login: 'username',
  password: 'password',
});

const data = await ceiService.getTreasureAsync();
console.log(JSON.stringify(data, null, 2));
```

### 4.1. Get Treasure

Retorna os dados dos investimentos em tesouro direto.

```javascript
const resuls = await ceiService.getTreasureAsync();
```

Resultado:

```javascript

[
  {
    "status": "S",
    "errors": [],
    "brokerName": "100 - Corretora 01",
    "brokerCode": "100",
    "treasureList": [
      {
        "Title": "Tesouro IPCA+ 2055",
        "maturity": "15/05/2055",
        "Extrato Analítico": "15.330,03",
        "invested": "19.204,41",
        "currentGross": "18.262,37",
        "currentNet": "10,80",
        "total": "0,00",
        "blocked": ""
      },
      {
        "Title": "Tesouro IPCA+ 2035",
        "maturity": "15/05/2035",
        "Extrato Analítico": "3.997,44",
        "invested": "4.133,27",
        "currentGross": "4.096,96",
        "currentNet": "3,14",
        "total": "0,00",
        "blocked": ""
      }
    ]
  },
  {
    "status": "N",
    "errors": [],
    "brokerName": "200 - Corretora 02",
    "brokerCode": "200",
    "treasureList": []
  },
  {
    "status": "N",
    "errors": [],
    "brokerName": "300 - Corretora 03",
    "brokerCode": "300",
    "treasureList": []
  },
]
```

- brokerName = Nome da corretora;

- brokerCode = Código da corretora;

- status = Situação do retorno que pode ser S para Sucesso, E para situação de erro e N para situação de resposta não encontrada. Quando S representa que obteve dados do CEI se N significa não existem informações para a corretora;

- errors = Lista de erros em formato de String;
- treasureList = Lista com todos os investimentos em tesouro direto;

## Treasure List

| Propriedade         | Tipo     | Descrição                                                               |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| **Title**           | _String_ | Título do tesouro direto.                                               |
| **maturity**        | _String_ | Data de vencimento.                                                     |
| **invested**        | _Number_ | Valor investido.                                                        |
| **currentGross**    | _Number_ | Bruto total.                                                            |
| **currentNet**      | _Number_ | Líquido atual.                                                          |
| **total**           | _Number_ | Quatidade total comprado.                                               |
| **blocked**         | _Number_ | Quantidade bloqueada.                                                   |

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Puppeteer](https://pptr.dev/)

## Features

- [x] Rendiemntos
- [x] Carteira de ações
- [x] Negociação de ativos
- [x] Tesouro direto

## Licença

MIT
