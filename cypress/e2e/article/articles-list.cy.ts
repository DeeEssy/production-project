describe('A user enters the articles page', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });
  it('articles successfully downloaded', () => {
    cy.getByTestId('article-list').should('exist');
    cy.getByTestId('article-list-item').should('have.length.greaterThan', 3);
  });
});
