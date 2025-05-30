Cypress.Commands.add('cadastraELoga', () => {
    cy.visit('/login')
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="nome"]').type('Felipe Dória')
    cy.get('[data-testid="email"]').type('teste' + Date.now() + '@email.com')// E-mail único e variável
    cy.get('[data-testid="password"]').type('123456')
    cy.get('[data-testid="cadastrar"]').click();
    cy.contains('Cadastro realizado com sucesso').should('be.visible');
  });