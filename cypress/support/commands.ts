declare namespace Cypress {
  interface Chainable {
    getNotification(title: string): Chainable<JQuery<HTMLElement>>;
    checkProductCard(product: any): Chainable<JQuery<HTMLElement>>;
    validateProductSchema(): Chainable<void>;
  }
}

Cypress.Commands.add('getNotification', (title: string) => {
  return cy.get(`[role="alert"][aria-label="${title}"]`);
});

Cypress.Commands.add('checkProductCard', (product) => {
  cy.get('.col-span-full').within(() => {
    cy.get('img').should('have.attr', 'src', product.images[0]);
    cy.get('h3').should('contain', product.name);
    cy.get('.text-sm').should('contain', product.description);
    cy.get('.text-green-700').should('contain', `$${product.price.toFixed(2)}`);
    cy.get('.text-yellow-600').should('contain', product.rating);
  });
});

Cypress.Commands.add('validateProductSchema', () => {
  cy.url().then((url) => {
    const productId = url.split('/').pop();
    cy.request(`/products/${productId}`).then((response) => {
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('description');
      expect(response.body).to.have.property('price').that.is.a('number');
      expect(response.body).to.have.property('rating').that.is.a('number');
      expect(response.body).to.have.property('images').that.is.an('array');
      expect(response.body).to.have.property('arrivalDate').that.is.a('string');
    });
  });
});
