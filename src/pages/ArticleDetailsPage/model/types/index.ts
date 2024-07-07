import { ArticleDetailsCommentsSchema } from '@/widgets/ArticleComments';
import { ArticleRecommendationsSchema } from '@/widgets/ArticleRecommendationsList';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleRecommendationsSchema;
}
