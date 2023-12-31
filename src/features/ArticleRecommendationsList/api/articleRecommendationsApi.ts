import { ArticleType } from '@/entities/Article'
import { rtkApi } from '@/shared/api/rtkApi'
import { getArticlesRoute } from '@/shared/const/RoutPaths'

const recommendationsApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getArticleRecommendationsList: build.query<ArticleType[], number>({
			query: (limit: number) => ({
				url: getArticlesRoute(),
				params: {
					_limit: limit,
					_expand: 'profile',
				},
			}),
		}),
	}),
	overrideExisting: false,
})
export const useArticleRecommendationsList =
	recommendationsApi.useGetArticleRecommendationsListQuery
