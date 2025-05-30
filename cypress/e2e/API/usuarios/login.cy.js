describe('Login de Usuário via API', () => {
    const usuario = {
      nome: `Felipe ${Date.now()}`,
      email: `felipe${Date.now()}@qa.com`,
      password: 'teste123',
      administrador: 'true'
    };
  
    before(() => {
      cy.criarUsuario(),
    })
  
    it('Deve realizar login com sucesso', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
          email: usuario.email,
          password: usuario.password
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Login realizado com sucesso');
        expect(res.body.authorization).to.be.a('string');
      });
    });
  });
  