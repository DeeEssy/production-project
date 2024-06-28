import { ArticleDetailsCommentsSchema } from './articleDetailsCommentsSchema';
import { ArticleRecommendationsSchema } from './articleRecommendationsSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleRecommendationsSchema
}
