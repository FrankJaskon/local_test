import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkApiConfigType } from '@/app/providers/StoreProvider'
import {
	ArticleType,
	ValidateArticleDetailsError,
	ValidateArticleDetailsErrorType,
} from '@/entities/Article'
import { getArticleDetailsRoute } from '@/shared/const/RoutPaths'

export const fetchArticleById = createAsyncThunk<
	ArticleType,
	number,
	ThunkApiConfigType<ValidateArticleDetailsErrorType>
>('articleDetails/fetchArticleById', async (id, thunkAPI) => {
	const { extra, rejectWithValue } = thunkAPI
	try {
		if (!id) {
			return rejectWithValue(ValidateArticleDetailsError.NO_DATA)
		}

		const response = await extra.api.get<ArticleType>(getArticleDetailsRoute(id), {
			params: {
				_expand: 'profile',
			},
		})

		return response.data
	} catch (error: any) {
		return rejectWithValue(ValidateArticleDetailsError.SERVER_ERROR)
	}
})
