// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
 
describe('User can edit any and all metadata fields they are permissed', () => {
    before(() => {
      cy.loginToApplication();
      cy.visit('photo/gallery-edit/?id=new')
      .wait(4000);
    });

    it('Key Metadata fields exist', () => {
      cy.get('input#title')
        .should('be.visible')
        .get('input#slug')
        .should('be.visible')
        .get('#description')
        .should('be.visible')
        .get('.react-datetime-picker:nth(0)') // display_date
        .should('be.visible')
        .get('.react-datetime-picker:nth(1)') // planned_publish_date
        .should('be.visible');
    })
  
    it('User should be able to type an editor note', () => {
      cy.get('#editor_note')
        .should('exist')
        .type('This is a test editor note')
        .should('not.have.value', 'this is an editor note')
        .should('have.value', 'This is a test editor note')
    })

    it('User can access circulations selector application', () => {
      cy.get('.circulations-panel-hdr')
        .find('button')
        .click()
        .then(() => {
          cy.frameLoaded('#section-selector-v2');
          cy.iframe()
            .find('.dropdown-select')
            .should('exist')
            .iframe()
            .find('.publish_bar-cancel-btn')
            .click()
        })
    })

    it('User can set primary website', () => {
      // circulations must be set to set a primary website
      // as that would require tests on circulation selector
      // this is best handled against an existing gallery
      cy.get('#primaryWebsite')
        .should('exist');
    })

    it('Distributor fields exist and user can interact with them', () => {
      cy.get('#distributorSelect')
        .select(1)
        .should('have.value', 'custom')
        .get('#distributorNameSelect')
        .should('not.be.disabled')
        .type('Test distributor name')
        .should('have.value', 'Test distributor name')
        .get('#distributorCategorySelect')
        .select(1)
        .should('have.value', 'staff')
        .get('#distributorSubcategorySelect')
        .type('Test subcategory name')
        .should('have.value', 'Test subcategory name');
    })
  
    it('Source & subtype fields exist and user can interact with them', () => {
      cy.get('input#source-id')
        .invoke('val', 'A Source ID')
        .should('have.value', 'A Source ID')
        .get('input#subtype')
        .type('My very own subtype')
        .should('have.value', 'My very own subtype')
        .get('input#label')
        .type('my label')
        .should('have.value', 'my label');
    })

    it('Owner fields exists and user can interact with it', () => {
      cy.get('#owner')
        .should('exist')
        .type('Ben Franklin')
        .should('not.have.value', 'Benjamin Franklin')
        .should('have.value', 'Ben Franklin')
    })

    it('Creator field exists and user can add existing tag', () => {
      cy.get('.react-tags')
        .should('exist')
        .find('.react-tags__search-input input[placeholder="Enter a creator for this gallery"]')
        .should('exist')
        .type('Benj')
        .get('.react-tags')
        .find('.react-tags__suggestions ul')
        .children()
        .should('exist')
        .first()
        .click()
        .get('.react-tags')
        .find('.react-tags__selected-tag-name')
        .should('have.text', 'Benji Franklin')
    })

    it('Creator field exists and user can add new tag', () => {
      cy.get('.react-tags')
        .should('exist')
        .find('.react-tags__search-input input[placeholder="Enter a creator for this gallery"]')
        .should('exist')
        .type('Benjamin Franklin{enter}')
        .get('.react-tags')
        .find('.react-tags__selected-tag-name')
        .eq(1)
        .should('have.text', 'Benjamin Franklin')
    })

    it('Content restriction field exists and user can interact with it', () => {
      cy.get('#content-restriction')
        .should('exist')
        .type('This content is restricted')
        .should('have.value', 'This content is restricted')
    })

    it('Comments checkbox options exist and user can interact with them', () => {
      cy.get('input[name="comments.allow_comments"]')
        .click()
        .should('not.be.checked')
        .get('input[name="comments.display_comments"]')
        .click()
        .should('not.be.checked')
        .get('input[name="comments.moderation_required"]')
        .click()
        .should('be.checked')
    })

    it('Syndication checkbox options exist and user can interact with them', () => {
      cy.get('input[name="syndication.external_distribution"]')
        .click()
        .should('not.be.checked')
        .get('input[name="syndication.search"]')
        .click()
        .should('be.checked')
    })
    
    it('Sponsored content radio options exist and user can interact with them', () => {
      cy.get('input[name="owner.sponsored"]')
        .eq(0)
        .click()
        .should('be.checked')
        .get('input[name="owner.sponsored"]')
        .eq(1)
        .should('not.be.checked')
    })
});
