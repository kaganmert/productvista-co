describe('Logout', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('user123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/shop');
  });

  it('should successfully logout when clicking sign out', () => {
    cy.get('button:has(.sr-only)').click();

    cy.get('div[role="menuitem"]').contains('Sign Out').click();

    cy.url().should('include', '/auth/login');

    cy.visit('/shop');
    cy.url().should('include', '/auth/login');
  });

  it('should close dropdown menu when pressing ESC', () => {
    cy.get('div[role="menuitem"]').should('not.exist');

    cy.get('button:has(.sr-only)').click();

    cy.get('div[role="menuitem"]').should('be.visible');

    cy.get('body').type('{esc}');

    cy.get('div[role="menuitem"]').should('not.exist');
  });

  it('should clear auth state after logout', () => {
    cy.get('button:has(.sr-only)').click();

    cy.get('div[role="menuitem"]').contains('Sign Out').click();

    cy.wait(3000);

    cy.getCookie('app_token').should('not.exist');

    cy.visit('/shop');
    cy.url().should('include', '/auth/login');

    cy.visit('/shop');

    cy.url().should('include', '/auth/login');

    cy.getCookie('app_token').should('not.exist');
  });
});
