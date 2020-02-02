# CypressCucumber
Um exemplo de cypress + cucumber

# Instalando e configurando um projeto com o cypress

Após criarmos um novo repositório

```
npm install
npm install cypress –save-dev

```  

Acesse o seu `'package.json'` e coloque o seguinte codigo:

```
{
  "scripts": {
    "cypress:open": "cypress open"
  }
}

```  

Execute o seguinte comando 

```
npm run cypress:open

```  

### Instalando e configurando cucumber

```
npm install cypress-cucumber-preprocessor –save-dev
```

Acesse o `'package.json'` e adicione 

```
  "cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/support/step_definitions"
  }
```

Acesse o seguinte arquivo `'cypress/plugins/index.js'` e adicione
```
const cucumber = require('cypress-cucumber-preprocessor').default
 
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
```
Acesse o seguinte arquivo `'cypress.json'` e adicione
```
{
    "testFiles": "**/*.{feature,features}"
}
```