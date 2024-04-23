var id = null
var token = null
const addFilme = require('../fixtures/addFilme.json')

describe('testes das rotas de filmes', () => {
    context('Teste atualizar cadastro de filme', () => {
        before(() => {
            cy.criarUsuarioTeste()
            cy.realizaLogin()
                .then((response) => {
                    token = response.body.accessToken
                    cy.promoverAdmin(token)
                    cy.addFilme(token, addFilme[0])
                })
            cy.buscarFilme(addFilme[0].title).then((response) => {
                id = response.body[0].id
            })
        })

        it('atualização de filme', () => {
            cy.attFilme(id, addFilme[6], token)
                .then((response) => {
                    expect(response.status).to.be.eq(204)
                    cy.log(response)
                })
        })
        it('tentativa de atualização de filme sem enviar o título do filme', () => {
            cy.attFilme(id, addFilme[7], token)
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    expect(response.body.message[0]).to.include("title must be longer than or equal to 1 characters")
                    cy.log(response)
                })
        })
        it('tentativa de atualização de filme sem enviar o gênero do filme', () => {
            cy.attFilme(id, addFilme[8], token)
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    expect(response.body.message[0]).to.include("genre must be longer than or equal to 1 characters")
                    cy.log(response)
                })
        })
        it('tentativa de atualização de filme sem enviar a descrição do filme', () => {
            cy.attFilme(id, addFilme[9], token)
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    expect(response.body.message[0]).to.include("description must be longer than or equal to 1 characters")
                    cy.log(response)
                })
        })
        it('tentativa de atualização de filme sem enviar a duração do filme do filme', () => {
            cy.attFilme(id, addFilme[10], token)
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    expect(response.body.message[0]).to.include("durationInMinutes must be a number conforming to the specified constraints")
                    cy.log(response)
                })
        })
        it('tentativa de atualização de filme sem enviar o ano de lançamento do filme', () => {
            cy.attFilme(id, addFilme[11], token)
                .then((response) => {
                    expect(response.status).to.be.eq(400)
                    expect(response.body.message[0]).to.include("releaseYear must be a number conforming to the specified constraints")
                    cy.log(response)
                })
        })
        after(() => {
            cy.deleteFilme(id, token)
        })
    })
})