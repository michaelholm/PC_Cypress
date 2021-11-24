// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

context('Header Tests', () => {

    beforeEach('Login to app', () => {
        cy.loginToApplication()
      })

  it('should render layout, verify size toggle buttons', () => {

    cy.get('.image-tiles')
      .should('exist');

    cy.wait(1000)
    cy.get('[data-cy=layout-list-button]').click()

    cy.get('.image-list')
      .should('exist');

    cy.get('[data-cy=layout-grid-button]').click()

    cy.get('.image-tiles')
      .should('exist');
  });

  it.only('button click should toggle image card size', () => {

    // small
    cy.get('[data-cy=layout-small-button]').click();

    cy.get('.image-tiles')
      .should('have.class', 'small-tiles');

    // medium
    cy.get('[data-cy=layout-medium-button]').click();

    cy.get('.image-tiles')
      .should('have.class', 'medium-tiles');

    // large
    cy.get('[data-cy=layout-large-button]').click();

    cy.get('.image-tiles')
      .should('have.class', 'large-tiles');
  });
});