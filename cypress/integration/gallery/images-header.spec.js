// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Gallery Edit v2 Images Tests', () => {
  before(() => {
    cy.loginToApplication();
    cy.visit('photo/gallery-edit/?id=new')
    .wait(4000);
  });

  it('Has header', () => {
    cy.wait(1000)
      .get('#gallery-images-header')
      .should('have.length', 1)
    
  })

  it('Has title item and images count', () => {
    cy.wait(1000)
      .get('#gallery-images-header')
      .find('.gallery-images-title')
      .should('have.length', 1)
      .find('.images-count')
      .should('have.length', 1)   
  });

  it('Has layout grid button', () => {
    cy.get('#gallery-images-header')
      .find('[data-cy="layout-grid-button"]')
      .should('have.length', 1)
      .should('not.have.class', '.toolbar-action-btn-active')
  });

  it('Has layout list button and is active button', () => {
    cy.get('#gallery-images-header')
      .find('[data-cy="layout-list-button"]')
      .should('have.length', 1)
      .should(($btn) => {
        // another way to see if it has/not has the class
        const classList = Array.from($btn[0].classList);
  
        return classList.includes('toolbar-action-btn-active');
      })
  });

  it('changes to grid mode on button click, exposing additional button choices', () => {
      cy.get('button[data-cy="layout-small-button"]')
        .should('not.exist')
        .get('[data-cy="layout-medium-button"]')
        .should('not.exist')
        .get('[data-cy="layout-large-button"]')
        .should('not.exist')
        .get('button[data-cy="layout-grid-button"]')
        .eq(0)
        .click({ force: true })
        .get('button[data-cy="layout-grid-button"]')
        .should(($btn) => {
          const classList = Array.from($btn[0].classList);
  
          return classList.includes('toolbar-action-btn-active');
        })
        .get('[data-cy="layout-small-button"]')
        .should('have.length', 1)
        .get('[data-cy="layout-medium-button"]')
        .should('have.length', 1)
        .get('[data-cy="layout-large-button"]')
        .should('have.length', 1)
  })

  it('toggles state from list mode to grid mode and back', () => {
    /**
     * find grid small images, does not exist, then click grid button and check again. success
     * then, click list button, check for grid small images button, and it does not exist.
     */
    cy.get('button[data-cy="layout-small-button"]')
      .should('have.length', 1)
      .get('button[data-cy="layout-list-button"]').eq(0)
      .click({ force: true })
      .get('button[data-cy="layout-small-button"]')
      .should('have.length', 0)
      .get('button[data-cy="layout-grid-button"]').eq(0)
      .click({ force: true })
      .get('button[data-cy="layout-small-button"]')
      .should('have.length', 1)     
  })

  it('Has upload button', () => {
    cy.get('#gallery-images-header')
      .find('.gallery-controls')
      .should('have.length', 1)
      .find('.upload-btn')
      .should('have.length', 1)
  });

  it('Has add images button', () => {
    cy.get('#gallery-images-header')
      .find('.gallery-controls')
      .should('have.length', 1)
      .find('.add-btn')
      .should('have.length', 1)
  });

});
