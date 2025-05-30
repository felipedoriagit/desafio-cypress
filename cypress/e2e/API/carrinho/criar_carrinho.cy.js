describe('Criação de carrinho simplificada', () => {
    let token;
    let idProduto;
  
    before(() => {
      const usuario = {
        nome: `ClienteCarrinho${Date.now()}`,
        email: `cliente${Date.now()}@qa.com.br`,
        password: 'teste123',
        administrador: 'true'
      };
  
      // Cria usuário e faz login
      cy.request('POST', 'https://serverest.dev/usuarios', usuario)
        .then(() => cy.request('POST', 'https://serverest.dev/login', {
          email: usuario.email,
          password: usuario.password
        }))
        .then((res) => {
          token = res.body.authorization;
  
          // Cadastra produto
          return cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            headers: { Authorization: token },
            body: {
              nome: `ProdutoCarrinho${Date.now()}`,
              preco: 50,
              descricao: 'Produto para carrinho',
              quantidade: 5
            }
          });
        })
        .then((res) => {
          idProduto = res.body._id;
        });
    });
  
    it('Deve criar um carrinho com sucesso', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        headers: { Authorization: token },
        body: { produtos: [{ idProduto, quantidade: 2 }] }
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
      });
    });
  });
  