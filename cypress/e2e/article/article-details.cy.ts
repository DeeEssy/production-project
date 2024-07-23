let currentArticleId: number | null = null;
describe('A user enters the article details page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    if (currentArticleId) {
      cy.removeArticle(currentArticleId);
    }
  });
  it('see the content of the article', () => {
    cy.getByTestId('article-details-info').should('exist');
  });
  it('see the recommendation list', () => {
    cy.getByTestId('article-details-recommendation-list').should('exist');
  });
});
