/// <reference types="cypress"/>

describe('Cenario de teste: Testar as funcionalidades de Login do site globalsqa.', () => {
    it ('Caso de teste: Registrar um usuario com sucesso', () => {
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
        cy.get('.btn-link').click();
        cy.get('#firstName').type('meunome');
        cy.get('#Text1').type('meuultimonome');
        cy.get('#username').type('meulogin');
        cy.get('#password').type('minhasenha');
        cy.get('.btn-primary').click();
        cy.get('.ng-binding').should('have.text', 'Registration successful');

    })

    it ('Caso de teste: Falha ao tentar cadastrar um usuario com campo vazio', () => {
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register');
        cy.get('#firstName').type('meunome');
        cy.get('#Text1').type('meuultimonome');
        cy.get('#username').type('meulogin');
        cy.get('#password').type('minhasenha');
        cy.get('#firstName').clear();
        cy.get('.has-error > .help-block').should('have.text', 'First name is required');
        cy.get('.btn-primary').should('be.disabled');
    })

    it ('Caso de teste: Login na plataforma com sucesso', () => {
        var user = criarUsuario();
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
        cy.get('#username').type(user[2]);
        cy.get('#password').type(user[3]);
        cy.get('.btn-primary').click();
        cy.get('h1.ng-binding').should('have.text', 'Hi ' + user[0] + '!' )
    })

    it ('Caso de teste: Remover um usuario cadastrado e verificar', () => {
        var user = criarUsuario();
        cy.loginNinjaQa(user[2], user[3]);
        cy.get('.ng-binding > a').click();
        cy.get('.ng-binding').should('have.text', 'Hi !');
        cy.get('.btn').click();
        cy.get('h2').should('have.text', 'Login')
        cy.loginNinjaQa(user[2], user[3]);
        cy.get('.ng-binding').should('have.text', 'Username or password is incorrect');
    })
})

function criaLoginESenhaAleatorio() {
    let horas = new Date().getHours().toString();
    let minutos = new Date().getMinutes().toString();
    let seg = new Date().getSeconds().toString();
    let userLogin = horas + minutos + seg + '_userLogin';
    let userPass = horas + minutos + seg + '_userPass';
    return [userLogin, userPass];
}

function criaNomeESobrenomeAleatorio() {
    let horas = new Date().getHours().toString();
    let minutos = new Date().getMinutes().toString();
    let seg = new Date().getSeconds().toString();
    let userName = horas + minutos + seg + '_userName';
    let userLastName = horas + minutos + seg + '_userLastName';
    return [userName, userLastName];
}
/// return [name, lastName, login, password]
function criarUsuario() {
    
    var userName = criaNomeESobrenomeAleatorio();
    var user = criaLoginESenhaAleatorio();

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
    cy.get('.btn-link').click();
    cy.get('#firstName').type(userName[0]);
    cy.get('#Text1').type(userName[1]);
    cy.get('#username').type(user[0]);
    cy.get('#password').type(user[1]);
    cy.get('.btn-primary').click();
    cy.get('.ng-binding').should('have.text', 'Registration successful');

    return [
        userName[0],
        userName[1],
        user[0],
        user[1]
    ];
}