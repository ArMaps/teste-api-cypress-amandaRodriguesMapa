var id = null
var token = null
const addFilme = require('../fixtures/addFilme.json')
describe('Testes validar a rota /api/movies', () => {
    context('testes referentes a consulta de filmes', () => {
        before(() => {
            cy.criarUsuarioTeste()
            cy.realizaLogin()
                .then((response) => {
                    token = response.body.accessToken
                    cy.promoverAdmin(token)
                    cy.addFilme(token)
                })
            })
            it('consulta de filmes', () => {
                cy.request({
                    method: 'GET',
                    url: '/api/movies',
                }).then((response) => {
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
                cy.buscarFilme().then((response) => {
                    id = response.body[0].id
                cy.request({
                    method: 'GET',
                    url: '/api/movies/' + id,
                }).then((response) => {
                    expect(response.status).to.be.eq(200)
                    expect(response.body.title).to.be.eq(addFilme.title)
                    expect(response.body.id).to.be.eq(id)
                    expect(response.body.description).to.be.eq(addFilme.description)
                    expect(response.body.durationInMinutes).to.be.eq(addFilme.durationInMinutes)
                    expect(response.body.releaseYear).to.be.eq(addFilme.releaseYear)                    
                    cy.log(response)
                })
            })
        })

        })
 
})