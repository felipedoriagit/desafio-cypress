describe('Cadastro de Novo Usuário', () => {
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/')
    cy.get('[data-testid="cadastrar"]').click()
  })

  it('Deve exibir mensagem de erro ao tentar cadastrar com e-mail fora do padrão', () => {
    cy.get('[data-testid="nome"]').type('Felipe Dória')
    cy.get('[data-testid="email"]').type('teste@email')
    cy.get('[data-testid="password"]').type('123456')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Email deve ser um email válido').should('be.visible')
  });

  it('Não deve permitir cadastro sem preencher os campos obrigatórios', () => {
    cy.get('[data-testid="cadastrar"]').click();
    cy.contains('Nome é obrigatório').should('be.visible')
    cy.contains('Email é obrigatório').should('be.visible')
    cy.contains('Password é obrigatório').should('be.visible')
  });

  it('Deve cadastrar usuário com sucesso', () => {
    cy.get('[data-testid="nome"]').type('Felipe Dória')
    cy.get('[data-testid="email"]').type('teste' + Date.now() + '@email.com')// E-mail único e variável
    cy.get('[data-testid="password"]').type('123456')
    // // Selecionar o checkbox caso precisar de login como administrador
    // cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();
    cy.contains('Cadastro realizado com sucesso').should('be.visible');
  });

});