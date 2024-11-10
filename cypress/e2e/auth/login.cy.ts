describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should display login form', () => {
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();

    cy.get(':nth-child(1) > .font-semibold').should('contain', 'Required');

    cy.get(':nth-child(2) > .font-semibold').should('contain', 'Required');
  });

  it('should successfully login with valid credentials and set auth cookie', () => {
    cy.getCookie('app_token').should('not.exist');

    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('user123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/shop');

    cy.getCookie('app_token').should('exist');

    cy.getCookie('app_token').should((cookie) => {
      expect(cookie).to.not.be.null;
      expect(cookie!).to.have.property('httpOnly', true);
      expect(cookie!.value).to.not.be.empty;
    });
  });

  it('should show loading state while logging in', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('testpass');

    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]').within(() => {
      cy.get('.animate-spin').should('exist');

      cy.get('svg.animate-spin').should('be.visible');
    });
  });

  it('should not set auth cookie with invalid credentials', () => {
    cy.getCookie('app_token').should('not.exist');

    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.getCookie('app_token').should('not.exist');
  });

  it('should preserve auth cookie across page navigation', () => {
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('user123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/shop');
    cy.getCookie('app_token').should('exist');

    cy.visit('/shop');
    cy.getCookie('app_token').should('exist');

    cy.visit('/');
    cy.getCookie('app_token').should('exist');
  });
});
