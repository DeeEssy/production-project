export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('profile-card-edit-btn').click();
  cy.getByTestId('profile-card-firstname').clear().type(firstname);
  cy.getByTestId('profile-card-lastname').clear().type(lastname);
  cy.getByTestId('profile-card-save-btn').click();
};

export const resetProfile = (profileId: number) => cy.request({
  method: 'PUT',
  url: `http://localhost:8000/profile/${profileId}`,
  headers: { Authorization: 'asasf' },
  body: {
    id: 4,
    firstname: 'test',
    lastname: 'user',
    age: 45,
    currency: 'EUR',
    country: 'Ukraine',
    city: 'Lviv',
    username: 'username test',
    avatar: 'testsrsadasdas.comdsadas',
  },
});

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: number): Chainable<void>;
        }
    }
}
