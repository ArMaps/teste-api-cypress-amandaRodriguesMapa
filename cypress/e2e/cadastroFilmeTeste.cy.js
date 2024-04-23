var token = null
var id = null
const addFilme = require('../fixtures/addFilme.json')

describe('testes das rotas de filmes', () => {
    context('Teste rota de cadastro de filme', () => {
        before(() => {
            cy.criarUsuarioTeste()
            cy.realizaLogin()
                .then((response) => {
                    token = response.body.accessToken
                    cy.promoverAdmin(token)
                })
        })
        it('cadastrar filme', () => {
            cy.addFilme(token, addFilme[0])
                .then((response) => {
                    expect(response.status).to.be.eq(201)
                    cy.log(response)
                })
        })
        it('tentativa de cadastro de filme sem enviar título do filme', () => {
            cy.addFilme(token, addFilme[1])
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    expect(response.body.message[0]).to.include("title must be longer than or equal to 1 characters")
                    expect(response.body.message[1]).to.include('title should not be empty')
                    cy.log(response)
                })
        })
        it('tentativa de cadastro de filme sem enviar gênero do filme', () => {
            cy.addFilme(token, addFilme[2])
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    expect(response.body.message[0]).to.include("genre must be longer than or equal to 1 characters")
                    expect(response.body.message[1]).to.include("genre should not be empty")
                    cy.log(response)
                })
        })
        it('tentativa de cadastro de filme sem enviar tempo de duração do filme', () => {
            cy.addFilme(token, addFilme[4])
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    cy.log(response)
                    expect(response.body.message[0]).to.include("durationInMinutes must be a number conforming to the specified constraints")
                    expect(response.body.message[1]).to.include("durationInMinutes should not be empty")

                })
        })
        it('tentativa de cadastro de filme sem enviar o ano de lançamento do filme', () => {
            cy.addFilme(token, addFilme[5])
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    cy.log(response)
                    expect(response.body.message[0]).to.include("releaseYear must be a number conforming to the specified constraints")
                    expect(response.body.message[1]).to.include("releaseYear should not be empty")

                })
        })

    })
    after(() => {
        cy.buscarFilme(addFilme[0].title).then((response) => {
            id = response.body[0].id
            cy.deleteFilme(id, token)
        })
    })
})