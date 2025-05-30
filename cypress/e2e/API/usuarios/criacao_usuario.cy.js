describe('API - Criar usuário e login', () => {
    let user = {
      nome: `Teste API ${Date.now()}`,
      email: `testeapi${Date.now()}@qa.com`,
      password: 'senha123'
    };
  
    it('Deve criar um usuário novo', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: {
          nome: user.nome,
          email: user.email,
          password: user.password,
          administrador: "false"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      });
    });
  
    it('Deve logar com o usuário criado', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
          email: user.email,
          password: user.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('authorization');
      });
    });
  });
  