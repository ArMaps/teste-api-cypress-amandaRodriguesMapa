var tokenAdmin = null
var tokenCritico = null
var token = null
var id = null

const reviewFilme = require('../fixtures/reviewFilme.json')
const addFilme = require('../fixtures/addFilme.json')

describe('testes das rotas users', () => {
    context('Teste criar review de filme', () => {
        before(() => {
            cy.criarUsuarioTeste()
            cy.realizaLogin()
                .then((response) => {
                    tokenAdmin = response.body.accessToken
                    cy.promoverAdmin(tokenAdmin)
                    cy.addFilme(tokenAdmin, addFilme[6])
                })
            cy.buscarFilme(addFilme[6].title).then((response) => {
                id = response.body[0].id
            })
        })

        it('Criar review de filme como admin', () => {
            reviewFilme.movieId = id
            cy.reviewFilme(reviewFilme, tokenAdmin)
                .then((response) => {
                    expect(response.status).to.be.eq(201)
                    cy.log(response)
                })
        })
        it('Criar review de filme como crítico', () => {
            cy.criarUsuarioTeste()
            cy.realizaLogin()
                .then((response) => {
                    tokenCritico = response.body.accessToken
                    cy.promoverCritico(tokenCritico)
                    cy.reviewFilme(reviewFilme, tokenCritico)
                        .then((response) => {
                            expect(response.status).to.be.eq(201)
                            cy.log(response)
                        })
                })
        })
        it('Criar review de filme como usuário comum', () => {
            cy.criarUsuarioTeste()
            cy.realizaLogin()
                .then((response) => {
                    token = response.body.accessToken
                    cy.reviewFilme(reviewFilme, token)
                        .then((response) => {
                            expect(response.status).to.be.eq(201)
                            cy.log(response)
                        })
                })
        })
        it('visualizar review criada pelos usuários', () => {
            cy.encontrarFilme(id)
                .then((response) => {
                    expect(response.body.reviews[0]).to.have.property('reviewText')
                    expect(response.body.reviews[0]).to.have.property('score')
                    expect(response.body.reviews[0]).to.have.property('updatedAt')
                    expect(response.body.reviews[1]).to.have.property('reviewText')
                    expect(response.body.reviews[1]).to.have.property('score')
                    expect(response.body.reviews[1]).to.have.property('updatedAt')
                    expect(response.body.reviews[2]).to.have.property('reviewText')
                    expect(response.body.reviews[2]).to.have.property('score')
                    expect(response.body.reviews[2]).to.have.property('updatedAt')
                    cy.log(response)
                })
        })
        after(() => {
            cy.deleteFilme(id, tokenAdmin)
        })
    })
})