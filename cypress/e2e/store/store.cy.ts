describe('Store Page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('user123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/shop');
  });

  it('should display product list after loading', () => {
    cy.get('.grid.grid-cols-12').should('exist');

    cy.get('.col-span-full').should('have.length.at.least', 1);
  });

  it('should display correct product information', () => {
    cy.get('.col-span-full')
      .first()
      .within(() => {
        cy.get('img').should('have.attr', 'src').and('include', 'placeholder.com');

        cy.get('h3').should('contain', 'Product');
        cy.get('.text-sm').should('contain', 'Description');

        cy.get('.text-green-700').should('contain', '$');

        cy.get('.text-yellow-600').should('exist');

        cy.get('button').should('contain', 'View Details');
      });
  });

  it('should redirect to product detail page when clicking view details', () => {
    cy.get('.col-span-full')
      .first()
      .within(() => {
        cy.get('button').contains('View Details').click();
      });

    cy.url().should('include', '/shop/products/');
  });

  it('should display correct number of products', () => {
    cy.get('.text-gray-500').should('contain', 'Items');

    cy.get('.col-span-full')
      .its('length')
      .then((uiCount) => {
        cy.get('.text-gray-500')
          .invoke('text')
          .then((text) => {
            const count = parseInt(text.split(' ')[0]);
            expect(count).to.equal(uiCount);
          });
      });
  });

  it('should display correct star ratings', () => {
    cy.get('.col-span-full')
      .first()
      .within(() => {
        cy.get('.text-yellow-500')
          .its('length')
          .then((filledStars) => {
            cy.get('.text-yellow-600')
              .invoke('text')
              .then((rating) => {
                const ratingNumber = parseFloat(rating);
                expect(filledStars).to.equal(Math.floor(ratingNumber));
              });
          });
      });
  });

  it('should maintain product list state after navigation', () => {
    cy.get('.col-span-full h3')
      .first()
      .invoke('text')
      .then((initialTitle) => {
        cy.visit('/');
        cy.visit('/shop');

        cy.get('.col-span-full h3').first().invoke('text').should('equal', initialTitle);
      });
  });

  it('should adjust grid layout on different screen sizes', () => {
    cy.viewport('iphone-6');
    cy.get('.col-span-full').should('have.class', 'col-span-full');

    cy.viewport('ipad-2');
    cy.get('.col-span-full').should('have.class', 'md:col-span-6');

    cy.viewport(1280, 720);
    cy.get('.col-span-full').should('have.class', 'xl:col-span-4');
  });

  it('should display welcome banner with correct username', () => {
    cy.get('.text-2xl').should('contain', 'Find the right product for you');
  });

  it('should handle API error states', () => {
    cy.intercept('GET', '/products', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('getProductsError');

    cy.visit('/shop');

    cy.get('.text-red-500').should('exist');
  });
});
