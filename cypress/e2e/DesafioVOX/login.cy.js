describe('Cenários de Login no Sauce Demo', () => {
    const baseUrl = 'https://www.saucedemo.com';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
    it('Deve fazer login em branco', () => {
        cy.get('#login-button').click();
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username is required');
      });
    it('Deve fazer login com sucesso', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
    });
  
    it('Deve exibir erro ao tentar login com credenciais inválidas', () => {
      cy.get('#user-name').type('usuario_invalido');
      cy.get('#password').type('senha_errada');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service');
    });
    it('Deve visualizar a lista de produtos após o login', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_item').should('have.length.greaterThan', 0);
      });
  });
  