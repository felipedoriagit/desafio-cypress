describe('Listagem de Usuários via API', () => {
    it('Deve retornar uma lista de usuários com status 200', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios'
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('quantidade');
        expect(res.body).to.have.property('usuarios');
        expect(res.body.usuarios).to.be.an('array');
      });
    });
  });