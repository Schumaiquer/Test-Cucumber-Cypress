import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

 
/// <reference types="Cypress" />

var faker = require('faker');
const username = faker.internet.userName()
const password = '12345'
const project_name = '[project]-'+faker.finance.account(5)
let id_task = [];

Given('I open Redmine page', () => {
    cy.visit('')
  })

Then(`creating a new user`, () => {
  cy.get('.register').click()
  cy.get('#user_login').type(username)
  cy.get('#user_password').type(password)
  cy.get('#user_password_confirmation').type(password)
  cy.get('#user_firstname').type(faker.name.firstName())
  cy.get('#user_lastname').type(faker.name.lastName())
  cy.get('#user_mail').type(faker.internet.email())
  cy.get('[type="submit"]').click()
  cy.get('#flash_notice').should('contain','Sua conta foi ativada. Você pode acessá-la agora.')
})

When('create new project', () => {
    cy.login(username,password)
    cy.get('.projects').click()
    cy.get('.icon').click()
    cy.get('#project_name').type(project_name)
    cy.get('#project_trackers > :nth-child(3) > input').uncheck()
    cy.get('#project_trackers > :nth-child(4) > input').uncheck()
    cy.get('[name="commit"]').click()
    cy.get('#flash_notice').should('contain','Criado com sucesso.')
  
  })

Then(`create 30 new tasks`, () => {
  cy.get('.projects').click()
  cy.get('#q').type(project_name)
  cy.get('#q').type('{enter}')
  cy.get('.highlight').click()
  cy.get('.new-issue').click()
  cy.readFile('cypress/fixtures/example.json').then((objet)=>{
      cy.wrap(objet.tasks).each((index) => {
          cy.get('#issue_subject').type(index.title)
          cy.get('#issue_description').type(index.description)
          cy.get('[name="continue"]').click()
          // acesso o texto e salvo num array (já removendo o #)
          cy.get('#flash_notice > a').invoke('text').then((text) =>{
              id_task.push(text.replace("#",""))
          })
      })
  })

})

Then('validate the 29th task', () => {
    cy.get(':nth-child(3) > .issues').click()
    cy.get('.next').click()
  
    cy.readFile('cypress/fixtures/exampleValidation.json').then((objet)=>{
        cy.wrap(objet.tasks).each((index) => {
            cy.get('#issue-'+id_task[1]+' > .tracker').should('contain',index.type)
            cy.get('#issue-'+id_task[1]+' > .status').should('contain',index.situation)
            cy.get('#issue-'+id_task[1]+' > .priority').should('contain',index.priority)
  
        })
    })
  })