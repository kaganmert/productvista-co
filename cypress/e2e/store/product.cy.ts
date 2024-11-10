describe('Product Detail Page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('user123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/shop');

    cy.get('.col-span-full')
      .first()
      .within(() => {
        cy.get('button').contains('View Details').click();
      });
  });

  it('should show loading state initially', () => {
    cy.get('.flex.h-48 .animate-spin').should('exist');
  });

  it('should display correct breadcrumb navigation', () => {
    cy.get('nav[aria-label="breadcrumb"]').within(() => {
      cy.get('a.hover\\:text-foreground').should('contain', 'Shop');

      cy.get('[aria-current="page"]').should('contain', 'Product 1');

      cy.get('[role="presentation"]').should('exist');
    });

    cy.get('a.hover\\:text-foreground').contains('Shop').click();
    cy.url().should('include', '/shop');
  });

  it('should display first product details correctly', () => {
    cy.get('h1.text-3xl').should('contain', 'Product 1');

    cy.get('.text-2xl.font-bold')
      .should('contain', '$')
      .invoke('text')
      .then((text) => {
        const price = parseFloat(text.replace('$', ''));
        expect(price).to.be.a('number');
      });

    cy.get('.text-gray-600').should('contain', 'Description');

    cy.get('.text-sm.text-gray-500').should('contain', 'Expected Arrival');
  });

  it('should display and function image slider correctly', () => {
    cy.get('.relative.aspect-square').should('exist');

    cy.get('img').first().should('have.attr', 'src').and('include', 'placeholder.com');

    cy.get('img').should('have.length.at.least', 1);
  });

  it('should handle responsive layout correctly', () => {
    cy.viewport('iphone-6');
    cy.get('.grid').should('not.have.class', 'md:grid-cols-2');

    cy.viewport('macbook-13');
    cy.get('.grid').should('have.class', 'md:grid-cols-2');
  });

  it('should maintain product data after navigation', () => {
    let initialName: string;
    cy.get('h1.text-3xl')
      .invoke('text')
      .then((text) => {
        initialName = text;

        cy.visit('/shop');
        cy.get('.col-span-full')
          .first()
          .within(() => {
            cy.get('button').contains('View Details').click();
          });

        cy.get('h1.text-3xl').should('have.text', initialName);
      });
  });

  it('should handle loading states correctly', () => {
    cy.intercept('GET', '/products/*', (req) => {
      req.reply({
        delay: 1000,
        body: {
          id: '1',
          name: 'Product 1',
          description: 'Product 1 Description',
          price: 100,
          rating: 4.5,
          images: ['https://via.placeholder.com/300'],
          arrivalDate: '12.12.2024',
        },
      });
    }).as('getProductWithDelay');

    cy.reload();

    cy.get('.animate-spin').should('be.visible');
  });
});
