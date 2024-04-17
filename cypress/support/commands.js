import { faker } from '@faker-js/faker';

const criarUser = require('../fixtures/criarUsuario.json')
const addFilme = require('../fixtures/addFilme.json')

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
Cypress.Commands.add('addFilme', (auth) => {
    cy.request({
        method: 'POST',
        url: '/api/movies',
        headers: {
            Authorization: 'Bearer ' + auth
        },
        body: addFilme
    })
})
Cypress.Commands.add('buscarFilme', () => {
    cy.request({
        method:'GET',
        url: '/api/movies/search?title='+ addFilme.title
    })
})