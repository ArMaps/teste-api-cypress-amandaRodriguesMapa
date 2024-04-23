import { faker } from '@faker-js/faker';

const Body = {
    name: "testeapi",
    email: faker.internet.email(),
    password: "123456"
}

describe('validar a api RaroMDB', () => {
    context('teste de criação de usuário', () => {
        it('criação de um usuário', () => {
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: Body
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('active')
                expect(response.body).to.have.property('email')
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('type')
                cy.log(response)
            })

        })

        it('tentativa de criação um usuário sem informar o campo name', () => {
            Body.name = ''
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: Body,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.have.property('error')
                expect(response.body.message[0]).to.include('name must be longer than or equal to 1 characters')
                expect(response.body.message[1]).to.include('name should not be empty')
                cy.log(response)
            })

        })
        it('tentativa de criação um usuário sem informar o campo email', () => {
            Body.name = faker.person.fullName(),
                Body.email = ''
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: Body,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.have.property('error')
                expect(response.body.message[0]).to.include('email must be longer than or equal to 1 characters')
                expect(response.body.message[1]).to.include('email must be an email')
                expect(response.body.message[2]).to.include('email should not be empty')
                cy.log(response)
            })

        })
        it('tentativa de criação um usuário sem informar o campo password', () => {
            Body.name = faker.person.fullName(),
                Body.email = faker.internet.email(),
                Body.password = ''
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: Body,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.have.property('error')
                expect(response.body.message[0]).to.include('password must be longer than or equal to 6 characters')
                expect(response.body.message[1]).to.include('password should not be empty')
                cy.log(response)
            })

        })
        it('tentativa de criação um usuário com senha com 13 dígitos', () => {
            Body.name = faker.person.fullName(),
                Body.email = faker.internet.email(),
                Body.password = '1234567890123'
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: Body,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.have.property('error')
                expect(response.body.message[0]).to.include('password must be shorter than or equal to 12 characters')
                cy.log(response)
            })

        })
    })

})

