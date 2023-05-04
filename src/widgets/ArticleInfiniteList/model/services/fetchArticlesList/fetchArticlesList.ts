import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArticleType } from '@/entities/Article'
import { RoutePaths } from '@/shared/const/RoutPaths'
import { ThunkApiConfigType } from '@/app/providers/StoreProvider'
import { ArticlesTypes } from '../../../ui/ArticleTypeTabs'
import { getFilter, getLimit, getOrder, getPage, getSearch, getSort } from '../../selectors/articlesPageSelector'

export interface FetchArticlesListProps {
	replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
	ArticleType[],
	FetchArticlesListProps,
	ThunkApiConfigType<string>
>(
	'articlesInfiniteList/fetchArticlesList',
	async (_, thunkAPI) => {
		const { extra, rejectWithValue, getState } = thunkAPI

		try {
			const page = getPage(getState())
			const limit = getLimit(getState())
			const sort = getSort(getState())
			const order = getOrder(getState())
			const search = getSearch(getState())
			const filter = getFilter(getState())
			const response = await extra.api.get<ArticleType[]>(
				RoutePaths.articles,
				{
					params: {
						_page: page,
						_limit: limit,
						_sort: sort,
						_order: order,
						q: search,
						type: filter === ArticlesTypes.ALL ? undefined : filter,
						_expand: 'profile',
					}
				})

			if (!response) {
				return rejectWithValue('error')
			}
			return response.data
		} catch (error: any) {
			return rejectWithValue('error')
		}
	}
)