// cypress/e2e/api_auth.cy.js
import { faker } from '@faker-js/faker';
describe('Demoblaze API Auth Tests', () => {

  const baseUrl = 'https://api.demoblaze.com';
  const username =  faker.internet.userName().toLowerCase()
  const password = faker.internet.password(3)

  it('Crear un nuevo usuario', () => {
    cy.request('POST', `${baseUrl}/signup`, {
      username: username ,
      password: password
    }).then((response) => {
      expect(response.status).to.eq(200);
       const expectedResponse = response.body
      cy.log(username, password);
      expect(expectedResponse).to.include('');
    });
  });

  it('Intentar crear un usuario ya existente', () => {
    cy.request('POST', `${baseUrl}/signup`, {
      username: username ,
      password: password
    }).then((response) => {
      expect(response.status).to.eq(200);
      const expectedResponse = response.body
      expect(expectedResponse.errorMessage).to.include('This user already exist.');
    });
  });

  it('Login con usuario y contraseña correctos', () => {
    cy.log(username, password);
    cy.request('POST', `${baseUrl}/login`, {
      username: username ,
      password: password
    }).then((response) => {
      expect(response.status).to.eq(200);
      const expectedResponse = response.body
      const tokenObj = (() => {
        const [key, value] = expectedResponse.split(':');
        return { [key.trim()]: value.trim() };
      })();
      expect(tokenObj).to.have.property('Auth_token');
    });
  });

  it('Login con contraseña incorrecta', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        username: username,
        password: password + 'wrong' // Contraseña incorrecta
      }
    }).then((response) => {
      expect(response.status).to.eq(200);// La API retorna 200 pero con mensaje de error
      const expectedResponse = response.body
      expect(expectedResponse.errorMessage).to.include('Wrong password.');
    });
  });

});
