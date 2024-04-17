var id = null
var token = null
var nome = null
var email = null

describe('testes das rotas de consultas de usuarios', () => {
    context('consulta de usuario', () => {
        before(() => {
            cy.criarUsuarioTeste().then((response) => {
                id = response.body.id
                nome = response.body.name
                email = response.body.email
            })
            cy.realizaLogin().then((response) => {
                token = response.body.accessToken
                cy.log(token)
                cy.request({
                    method: 'PATCH',
                    url: '/api/users/admin',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
            })
        })
        it('consulta usuario', () => {
            cy.request({
                method: 'GET',
                url: '/api/users',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body[0]).to.have.property('active')
                expect(response.body[0]).to.have.property('email')
                expect(response.body[0]).to.have.property('id')
                expect(response.body[0]).to.have.property('name')
                expect(response.body[0]).to.have.property('type')
                cy.log(response)
            })
        })
        it('consulta usuario por id', () => {
            cy.request({
                method: 'GET',
                url: '/api/users/' + id,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body).to.have.property('active')
                expect(response.body).to.have.property('email')
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('type')
                expect(response.body.name).to.be.equal(nome)
                expect(response.body.email).to.be.equal(email)

                cy.log(response)
            })
        })
    })
    after(() => {
        cy.desativarUsuario(token)
    })
})