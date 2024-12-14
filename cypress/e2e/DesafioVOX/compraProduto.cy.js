describe('Testes automatizados no Sauce Demo', () => {
    const baseUrl = 'https://www.saucedemo.com';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
    it('Deve fazer login com sucesso', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
      });
    it('Deve visualizar a lista de produtos após o login', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('.inventory_item').should('have.length.greaterThan', 0);
      });
    
      it('Deve adicionar um produto ao carrinho', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('.inventory_item').first().find('button').click();
        cy.get('.shopping_cart_badge').should('contain', '1');
      });
    
      it('Deve remover um produto do carrinho', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('.inventory_item').first().find('button').click();
        cy.get('.shopping_cart_badge').should('contain', '1');
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').first().find('button').click();
        cy.get('.shopping_cart_badge').should('not.exist');
      });
    
      it('Deve finalizar a compra com sucesso', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('.inventory_item').first().find('button').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('Débora');
        cy.get('[data-test="lastName"]').type('Gimenez');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.get('.complete-header').should('contain', 'Thank you for your order!');
      });
      it('Deve finalizar a compra sem sucesso', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('.inventory_item').first().find('button').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').should('contain', 'Error: First Name is required');
      });

      it('Deve finalizar a compra sem itens', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('Débora');
        cy.get('[data-test="lastName"]').type('Gimenez');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.get('.complete-header').should('contain', 'Thank you for your order!');
      });
      
    });