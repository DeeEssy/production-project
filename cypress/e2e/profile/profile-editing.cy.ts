let profileId: number | null = null;

describe('A user enters the profile page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    if (profileId) {
      cy.resetProfile(profileId);
    }
  });
  it('the profile successfully downloaded', () => {
    cy.getByTestId('profile-card-firstname').should('have.value', 'test');
  });
  it('the profile is editing', () => {
    const newName = 'new';
    const newLastname = 'lastname';
    cy.updateProfile(newName, newLastname);
    cy.getByTestId('profile-card-firstname').should('have.value', newName);
    cy.getByTestId('profile-card-lastname').should('have.value', newLastname);
  });
});
