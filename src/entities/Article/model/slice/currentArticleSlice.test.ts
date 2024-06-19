import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { currentArticleReducer } from './currentArticleSlice';
import { Article, ArticleBlockType, ArticleType } from '../types/article';
import { fetchCurrentArticle } from '../services/fetchCurrentArticle/fetchCurrentArticle';

const article: Article = {
  id: 1,
  title: 'Lorem Ipsum',
  subtitle: 'Lorem Ipsum is simply dummy text?',
  img: 'https://masteringnuxt.com/images/rocket.webp',
  views: 1022,
  createdAt: '26.02.2022',
  type: [ArticleType.IT],
  blocks: [
    {
      id: 1,
      type: ArticleBlockType.TEXT,
      title: 'Lorem Ipsum',
      paragraphs: [
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan in quam sit amet convallis. Morbi interdum laoreet ex, id imperdiet neque fermentum et. Vivamus tortor metus, finibus at turpis a, laoreet sodales arcu. Nunc bibendum elit nec ligula suscipit imperdiet. Phasellus sed est at orci tristique pellentesque. Proin vitae ex ac lectus accumsan porta. Proin quis massa vitae arcu mollis vestibulum. Integer quis quam et justo varius maximus et vel dolor. Nunc sollicitudin orci sed augue faucibus gravida. Curabitur a nunc vel sem euismod mollis. Nullam vitae quam tincidunt, convallis nunc eu, sagittis neque. Sed sollicitudin ligula vitae erat maximus tristique. In at consequat nibh, eget molestie dui. Nulla consectetur convallis nisl at sollicitudin. Duis eget tellus faucibus, fermentum mauris vitae, feugiat turpis. Mauris porta erat nec sapien blandit venenatis tristique vitae est. Curabitur pretium sed leo ac bibendum. Donec vitae elit velit. Integer placerat, urna vitae vulputate suscipit, turpis turpis mollis ex, id maximus ligula dui quis nulla. Quisque eu lacinia augue, sit amet rutrum odio. Etiam vitae nisi fringilla, commodo purus nec, placerat felis. Phasellus et libero sit amet erat elementum tempor. Praesent ullamcorper tincidunt purus ornare dictum. Aliquam imperdiet nec erat vestibulum faucibus. Aenean viverra neque vel augue congue, sit amet euismod velit pharetra. Nulla pellentesque diam in neque condimentum iaculis. Sed commodo ligula non lorem porta, nec tempus dolor faucibus. Integer sodales augue elit, posuere porttitor augue fringilla ac. Sed nec risus est. Duis vulputate magna dignissim auctor pulvinar. Sed efficitur odio lectus, at pretium lorem aliquam sit amet. Aenean at tristique lorem. Praesent sit amet consequat ligula. Ut in convallis lorem, at facilisis justo. Nullam tortor ante, porttitor vel libero faucibus, luctus venenatis nisl. Donec quam est, sagittis luctus dignissim at, aliquet id lectus.',
      ],
    },
    {
      id: 4,
      type: ArticleBlockType.CODE,
      // eslint-disable-next-line max-len
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
    },
    {
      id: 2,
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Image 1, the screenshot',
    },
  ],
};

describe('currentArticleSlice', () => {
  test('fetchCurrentArticle.pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: false,
    };
    expect(currentArticleReducer(
        state as ArticleDetailsSchema,
        fetchCurrentArticle.pending,
    )).toEqual({
      isLoading: true,
    });
  });

  test('fetchCurrentArticle.fulfilled', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
    };
    expect(currentArticleReducer(
        state as ArticleDetailsSchema,
        fetchCurrentArticle.fulfilled(article, '', article.id, ''),
    )).toEqual({
      isLoading: false,
      data: article,
    });
  });
});
