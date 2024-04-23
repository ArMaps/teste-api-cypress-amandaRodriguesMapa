import { faker } from '@faker-js/faker';

const criarUser = require('../fixtures/criarUsuario.json')

Cypress.Commands.add('criarUsuarioTeste', () => {
    criarUser.email = faker.internet.email(),
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: criarUser,
        })
})

Cypress.Commands.add('realizaLogin', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: {
            email: criarUser.email, password: criarUser.password
        }
    })
})
Cypress.Commands.add('desativarUsuario', (auth) => {
    cy.request({
        method: 'PATCH',
        url: '/api/users/inactivate',
        headers: {
            Authorization: 'Bearer ' + auth
        }
    })
})
Cypress.Commands.add('promoverAdmin', (auth) => {
    cy.request({
        method: 'PATCH',
        url: '/api/users/admin',
        headers: {
            Authorization: 'Bearer ' + auth
        }
    })
})
Cypress.Commands.add('promoverCritico', (auth) => {
    cy.request({
        method: 'PATCH',
        url: '/api/users/apply',
        headers: {
            Authorization: 'Bearer ' + auth
        }
    })
})
Cypress.Commands.add('addFilme', (auth, body) => {
    cy.request({
        method: 'POST',
        url: '/api/movies',
        failOnStatusCode: false,
        headers: {
            Authorization: 'Bearer ' + auth
        },
        body: body
    })
})
Cypress.Commands.add('buscarFilme', (body) => {
    cy.request({
        method: 'GET',
        url: '/api/movies/search?title=' + body
    })
})
Cypress.Commands.add('encontrarFilme', (id) => {
    cy.request({
        method: 'GET',
        url: '/api/movies/' + id,
    })
})
Cypress.Commands.add('attFilme', (id, body, auth) => {
    cy.request({
        method: 'PUT',
        url: '/api/movies/' + id,
        body: body,
        failOnStatusCode: false,
        headers: {
            Authorization: 'Bearer ' + auth
        }
    })
})
Cypress.Commands.add('reviewFilme', (body, auth) => {
    cy.request({
        method: 'POST',
        url: '/api/users/review',
        body: body,
        headers: {
            Authorization: 'Bearer ' + auth
        }
    })
})
Cypress.Commands.add('deleteFilme', (id, auth) => {
    cy.request({
        method: 'DELETE',
        url: '/api/movies/' + id,
        headers: {
            Authorization: 'Bearer ' + auth
        }
    })
})