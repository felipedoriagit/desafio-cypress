describe('Adicionar Produto', () => {

  beforeEach(() => {
    cy.cadastraELoga()
  });

  it('Pesquisar produto e adiciona produto na lista', () => {
    cy.get('[data-testid="pesquisar"]').click().type('Rustic Marble Sausages'),{timeout: 5000}
    cy.get('[data-testid="botaoPesquisar"]').click()
    //cy.get('[data-testid="adicionarNaLista"]')
    cy.contains('.card-title.negrito', 'Rustic Marble Sausage')
      .should('be.visible')
      .parents('.card') // Substitua '.card' pela classe do container se for diferente
      .within(() => {
        cy.get('[data-testid="adicionarNaLista"]').click();
      })
    cy.visit('/minhaListaDeProdutos');
    cy.contains('Rustic Marble Sausages').should('be.visible')
  });

});