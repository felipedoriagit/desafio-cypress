describe('Login de Usuário', () => {
    const user = {
      nome: `Teste ${Date.now()}`,
      email: `teste${Date.now()}@qa.com.br`,
      password: 'senha123'
    };

    before(() => {
      cy.visit('https://front.serverest.dev/cadastrarusuarios');
      cy.get('[data-testid="nome"]').type(user.nome);
      cy.get('[data-testid="email"]').type(user.email);
      cy.get('[data-testid="password"]').type(user.password)
      cy.get('[data-testid="cadastrar"]').click();
      cy.contains('Cadastro realizado com sucesso').should('be.visible');
    });

    beforeEach(() => {
      cy.visit('https://front.serverest.dev/login');
    });
  
    it('Não deve permitir login com e-mail inválido', () => {
      cy.get('[data-testid="email"]').type('email@teste');
      cy.get('[data-testid="senha"]').type(user.password);
      cy.get('[data-testid="entrar"]').click()
      cy.contains('Email deve ser um email válido').should('be.visible');
      cy.url().should('include', '/login'); 
    });
  
    it('Não deve permitir login com senha incorreta', () => {
      cy.get('[data-testid="email"]').type(user.email);
      cy.get('[data-testid="senha"]').type('senha_incorreta')
      cy.get('[data-testid="entrar"]').click();
      cy.contains('Email e/ou senha inválidos').should('be.visible'); 
      cy.url().should('include', '/login'); 
    });
  
    it('Não deve permitir login com campos vazios', () => {
      cy.get('[data-testid="entrar"]').click(); 
      cy.contains('Email é obrigatório').should('be.visible')
      cy.contains('Password é obrigatório').should('be.visible');
      cy.url().should('include', '/login'); 
    }); 
    
    it('Deve realizar login com sucesso usando credenciais válidas', () => {
      cy.get('[data-testid="email"]').type(user.email);
      cy.get('[data-testid="senha"]').type(user.password)
      cy.get('[data-testid="entrar"]').click();
      cy.url().should('include', '/home'); 
      cy.contains('Produtos').should('be.visible'); 
    });
  })