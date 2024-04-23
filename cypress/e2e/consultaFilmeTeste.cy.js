var id = null
var token = null
const addFilme = require('../fixtures/addFilme.json')
const reviewFilme = require('../fixtures/reviewFilme.json')

describe('Testes validar a rota /api/movies', () => {
    context('testes referentes a consulta de filmes', () => {
        before(() => {
            cy.criarUsuarioTeste()
            cy.realizaLogin()
                .then((response) => {
                    token = response.body.accessToken
                    cy.promoverAdmin(token)
                    cy.addFilme(token, addFilme[0]).then((response) => {
                        id = response.body.id
                        reviewFilme[1].movieId = id
                    })
                    cy.reviewFilme(reviewFilme[1], token)
                })
        })
        it('consulta de filmes', () => {
            cy.buscarFilme(addFilme[0].title)
                .then((response) => {
                    expect(response.status).to.be.eq(200)
                    expect(response.body[0]).to.have.property('description')
                    expect(response.body[0]).to.have.property('durationInMinutes')
                    expect(response.body[0]).to.have.property('genre')
                    expect(response.body[0]).to.have.property('id')
                    expect(response.body[0]).to.have.property('releaseYear')
                    expect(response.body[0]).to.have.property('title')
                    expect(response.body[0]).to.have.property('totalRating')
                    cy.log(response)
                })
        })
        it('consulta de filme por id', () => {
            cy.encontrarFilme(id).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.title).to.be.eq(addFilme[0].title)
                expect(response.body.id).to.be.eq(id)
                expect(response.body.description).to.be.eq(addFilme[0].description)
                expect(response.body.durationInMinutes).to.be.eq(addFilme[0].durationInMinutes)
                expect(response.body.releaseYear).to.be.eq(addFilme[0].releaseYear)
                cy.log(response)
            })
        })
    })

})

