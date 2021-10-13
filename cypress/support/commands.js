// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
    'loginAndVisit',
    (visitPath, userKey, password, options = { preserve: true }) => {
      const { preserve } = options;
      if (preserve) {
        Cypress.Cookies.defaults({
          preserve: ['Arc-Client-Info', 'Arc-Token']
        });
      }
      cy.getCookies().then((cookies) => {
        const arcTokenCookie = cookies.find((cookie) => cookie.name === 'Arc-Token');
        const clientInfoCookie = cookies.find(
          (cookie) => cookie.name === 'Arc-Client-Info'
        );
        if (!arcTokenCookie || !clientInfoCookie) {
          if (Cypress.config('baseUrl').includes('localhost')) {
            // Local auth
            if (!userKey || !password) {
              throw new Error(
                'if in a local environment, userKey and password arguments are required.'
              );
            }
            cy.request({
              method: 'POST',
              url: '/auth/form/local-users', // baseUrl is prepended to url
              form: true,
              body: {
                u: userKey,
                p: password
              }
            });
            cy.visit(visitPath);
          } else {
            // Okta auth
            cy.task('authenticate', { userKey, password }).then((cookies) => {
              cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value);
              });
            });
            cy.visit(visitPath);
          }
        }
        cy.visit(visitPath);
      });
    }
  );
  

Cypress.Commands.add('loginToApplication', () => {
    cy.loginAndVisit(Cypress.env("devUrl"), Cypress.env("username"), Cypress.env("password"))
        cy.contains('Home')
        cy.contains('h4', 'Photo Center').click()
})