describe('Página Inicial - Serverest', () => {
    it('Deve carregar a página inicial com sucesso', () => {
      cy.visit('https://front.serverest.dev/')
      cy.contains('Login').should('be.visible')
    })
  })
  