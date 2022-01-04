// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />


describe('User hits create a Gallery to create a new Gallery', () => {
  before(() => {
    cy.loginToApplication();
    cy.visit('photo/gallery-edit/?id=new')
    .wait(4000);
  });


  it('goes to the gallery edit page with a blank new gallery', () => {
    cy.get('.gallery-edit-form-title')
    .contains('Edit gallery')
  })
  
  it('metadata well should exist', () => {
    cy.get('.rollup-card-container:nth(2)')
      .find('.open-close-icon')
      .click()
      .get('#distributorSelect')
      .select(1)
      .should('have.value', 'custom')
      .get('#distributorCategorySelect')
      .select(1)
      .should('have.value', 'staff')
  })
  
  it('image well should exist', () => {
    cy.get('#gallery-edit-images')
      .should('be.visible')
  })

  it('image well should be expandable', () => {
    cy.get('.toggle_button')
    .click()
    .wait(1000)
    .get('.right-container')
    .should('have.css', 'width', Cypress.config('viewportWidth'));
  });
  
});
