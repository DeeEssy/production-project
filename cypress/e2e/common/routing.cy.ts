import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  describe('User is not auth', () => {
    it('Route to the main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('mainPage')).should('exist');
    });
    it('Route to the profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('mainPage')).should('exist');
    });
    it('Route to not existed page', () => {
      cy.visit('/fasfasfasf');
      cy.get(selectByTestId('notFoundPage')).should('exist');
    });
  });
  describe('User is auth', () => {
    beforeEach(() => {
      cy.login();
    });
    it('Route to the profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('profilePage')).should('exist');
    });

    it('Route to the articles page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('articlesPage')).should('exist');
    });
  });
});
