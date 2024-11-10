describe('Comments Section', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('user123');
    cy.get('button[type="submit"]').click();

    cy.get('.col-span-full')
      .first()
      .within(() => {
        cy.get('button').contains('View Details').click();
      });
  });

  describe('Create Comment Form', () => {
    it('should display create comment form', () => {
      cy.get('.mt-6.bg-white').within(() => {
        cy.get('h3').should('contain', 'Add a Review');
        cy.get('textarea').should('exist');
        cy.get('button[type="submit"]').should('be.disabled');
      });
    });

    it('should handle star rating interaction', () => {
      cy.get('.mt-6.bg-white').within(() => {
        cy.get('.text-gray-300').should('have.length', 5);

        cy.get('button').eq(2).click();

        cy.get('.fill-yellow-500').should('have.length', 3);
      });
    });

    it('should validate form submission', () => {
      cy.get('.mt-6.bg-white').within(() => {
        cy.get('textarea').type('Great product!');
        cy.get('button[type="submit"]').should('be.disabled');

        cy.get('button').eq(4).click();
        cy.get('button[type="submit"]').should('not.be.disabled');

        cy.get('button[type="submit"]').click();
      });
    });

    it('should handle complete comment submission flow', () => {
      cy.get('h2')
        .invoke('text')
        .then((text) => {
          const initialCount = parseInt(text.match(/Comments \((\d+)\)/)?.[1] || '0');

          cy.intercept('POST', '**/comments').as('createComment');

          cy.get('.mt-6.bg-white').within(() => {
            cy.get('button').eq(4).click();
            cy.get('textarea').type('New test comment');
            cy.get('button[type="submit"]').click();
          });

          cy.get('h2').should('contain', `Comments (${initialCount + 1})`);

          cy.wait('@createComment');

          cy.reload();
          cy.get('h2').should('contain', `Comments (${initialCount + 1})`);
        });
    });

    it('should handle error states', () => {
      cy.intercept('POST', '/comments', {
        statusCode: 500,
        body: { error: 'Server error' },
      }).as('createCommentError');

      cy.get('.mt-6.bg-white').within(() => {
        cy.get('button').eq(4).click();
        cy.get('textarea').type('Test comment');
        cy.get('button[type="submit"]').click();
      });

      cy.getNotification('Failed to submit review').should('be.visible');
    });
  });
});
