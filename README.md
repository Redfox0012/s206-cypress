Aula de Cypress Inatel

comandos
1. Abrir o cypress no projeto: ./node_modules/.bin/cypress open
2. Executar testes na linha de Comando: ./node_modules/.bin/cypress run --spec 'cypress/integration/pasta-teste/**/'
3. Relatorio de teste: npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
4. Merge em todos .json em report (relatorios): npx mochawesome-merge "cypress/reports/*.json" > mochawesome.json
5. Gera um HTML do relatorio: npx marge mochawesome.json