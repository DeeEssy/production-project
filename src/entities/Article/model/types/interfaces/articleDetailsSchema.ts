import { Article } from './articles';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}
