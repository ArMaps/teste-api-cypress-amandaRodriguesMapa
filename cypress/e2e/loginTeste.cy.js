import { faker } from '@faker-js/faker';

const Body = {
    name: "testeapi",
    email: faker.internet.email(),
    password: "123456"
}
describe('Testes da rota api/auth/login', () => {
    context('teste referentes ao login', () => {
        it('login de um usuario cadastrado', () => {
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: Body
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                cy.log(response)
                cy.request({
                    method: 'POST',
                    url: 'api/auth/login',
                    body: {
                        email: response.body.email,
                        password: Body.password,
                    }
                })
            })
        })

        it('tentativa de login com password errado', () => {
            Body.email = faker.internet.email()
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: Body
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                cy.log(response)
                cy.request({
                    method: 'POST',
                    url: 'api/auth/login',
                    failOnStatusCode: false,
                    body: {
                        email: response.body.email,
                        password: '123458',
                    }
                }).then((response) => {
                    expect(response.status).to.be.eq(401)
                    expect(response.body).to.have.property('error')
                    expect(response.body).to.have.property('message')
                    expect(response.body.message).to.include('Invalid username or password.')
                    expect(response.body.error).to.include('Unauthorized')
                })
            })
        })

        it('tentativa de login com email inválido', () => {
            const emailinvalido = 'a'
            cy.request({
                method: 'POST',
                url: 'api/auth/login',
                failOnStatusCode: false,
                body: {
                    email: emailinvalido,
                    password: '123458',
                }
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message).to.include('email must be an email')
                expect(response.body.error).to.include('Bad Request')
                cy.log(response)
            })
        })
    })
})
