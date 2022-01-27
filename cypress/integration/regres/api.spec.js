/// <reference types="cypress" />


describe('API tests reqres.in', () => {

    const usersList = '/api/users?page=2';
    const singleUser = '/api/users/2';
    const createUser = '/api/users';
    const invalidUser = '/api/users/23'

    it('[GET] - Get list users', () => {
        cy.request({
            url: `${Cypress.env('baseEndpoint')}${usersList}`,
            method: 'GET'
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.keys("page", "per_page", "total", "total_pages", "data", "support");
            expect(response.body.data[0]).to.have.keys("id", "email", "first_name", "last_name", "avatar").to.not.be.empty;
            expect(response.duration).to.lessThan(300);
        });
    });

    it('[GET] - Get single user', () => {
        cy.request({
            url: `${Cypress.env('baseEndpoint')}${singleUser}`,
            method: 'GET'
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.keys("data", "support");
            expect(response.body.data).to.have.keys("id", "email", "first_name", "last_name", "avatar").to.not.be.empty;
            expect(response.body.data.id).to.equal(2);
            expect(response.body.data.email).to.equal("janet.weaver@reqres.in");
            expect(response.body.data.first_name).to.equal("Janet");
            expect(response.body.data.last_name).to.equal("Weaver");
            expect(response.body.data.avatar).to.equal("https://reqres.in/img/faces/2-image.jpg");
            expect(response.duration).to.lessThan(300);
        });
    });

    it('[POST] - Create users', () => {
        cy.request({
            url: `${Cypress.env('baseEndpoint')}${createUser}`,
            method: 'POST',
            body: {
                "name": "John",
                "job": "Doe"
            }
        }).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.keys("id", "name", "job", "createdAt").to.not.be.empty;
            expect(response.body.name).to.equal("John");
        });
    });

    it('[Get] - Single user not found', () => {
        cy.request({
            url: `${Cypress.env('baseEndpoint')}${invalidUser}`,
            method: 'GET',
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(404);
            expect(response.body).to.be.empty;
        });
    });
})