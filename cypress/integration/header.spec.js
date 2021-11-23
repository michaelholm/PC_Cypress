// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

context('Header Tests', () => {

    beforeEach('Login to app', () => {
        cy.loginToApplication()
      })

  it('should render layout, verify size toggle buttons', () => {

    //  cy.visit('/photo/v2/?offset=0&limit=100&sort=-created_date&quality=75&maxHeight=300&operator=or');

      cy.get('.rect-image-container')
        .should('not.exist');

      cy.wait(1000)
      cy.get('[data-cy=layout-list-button]').click()

      cy.get('.rect-image-container')
        .should('exist');

      cy.get('[data-cy=layout-grid-button]').click()

      cy.get('.rect-image-container')
        .should('not.exist');
    });

  it('button click should toggle image card size', () => {

    // small
    cy.get('[data-cy=layout-small-button]').click();

    cy.get('.image-tile').eq(1)
      .should('have.class', 'small-image-tile');

    // medium
    cy.get('[data-cy=layout-medium-button]').click();

    cy.get('.image-tile').eq(10)
      .should('have.class', 'medium-tile');

    // large
    cy.get('[data-cy=layout-large-button]').click();

    cy.get('.image-tile').eq(20)
      .should('have.class', 'large-tile');
  });
});