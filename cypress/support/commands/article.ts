import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'TESTING ARTICLE',
  subtitle: 'lorem dasdas',
  img: '7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
  views: 1022,
  createdAt: '26.02.2024',
  userId: 1,
  type: [
    'SCIENCE',
  ],
  blocks: [],
};

export const createArticle = (article?: Article) => cy.request({
  method: 'POST',
  url: 'http://localhost:8000/articles',
  headers: { Authorization: 'asasf' },
  body: article ?? defaultArticle,
}).then((resp) => resp.body);

export const removeArticle = (articleId: number) => cy.request({
  method: 'DELETE',
  url: `http://localhost:8000/articles/${articleId}`,
  headers: { Authorization: 'asasf' },
});

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: number): Chainable<void>;
        }
    }
}
