describe('Cadastro de produto', () => {
    let token;
  
    before(() => {
      // Criação de usuário admin e login
      const usuario = {
        nome: 'Admin Produto',
        email: `admin_produto_${Date.now()}@qa.com.br`,
        password: 'teste123',
        administrador: 'true'
      };
  
      cy.request('POST', 'https://serverest.dev/usuarios', usuario).then(() => {
        cy.request('POST', 'https://serverest.dev/login', {
          email: usuario.email,
          password: usuario.password
        }).then((res) => {
          token = res.body.authorization;
        });
      });
    });
  
    it('Deve cadastrar um novo produto com sucesso', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: { Authorization: token },
        body: {
          nome: `Produto ${Date.now()}`,
          preco: 100,
          descricao: 'Produto de teste automatizado',
          quantidade: 10
        }
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
      });
    });
  });
  