// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('PC Login', () => {

    beforeEach('Login to app', () => {
      cy.loginToApplication()
    })

    it('should access PC images tab', () => {
    
        cy.visit('photo/v2/?offset=0&limit=100&sort=-created_date&quality=75&maxHeight=300&operator=or')

    });
})