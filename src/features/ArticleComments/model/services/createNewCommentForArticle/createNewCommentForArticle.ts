import { createAsyncThunk } from '@reduxjs/toolkit'
import { getArticleDetailsData } from '@/entities/Article'
import { CommentType } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { ThunkApiConfigType } from '@/app/providers/StoreProvider'
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const createNewCommentForArticle = createAsyncThunk<CommentType, string, ThunkApiConfigType<string>>(
	'articleDetailsComments/createNewCommentForArticle',
	async (comment, thunkAPI) => {
		const { extra, rejectWithValue, getState } = thunkAPI
		try {
			const userData = getUserAuthData(getState())
			const articleDetails = getArticleDetailsData(getState())

			if (!userData || !comment || !articleDetails) {
				return rejectWithValue('no data')
			}

			const response = await extra.api.post<CommentType>(
				'/comments',
				{
					profileId: userData.id,
					articleId: articleDetails.id,
					text: comment
				})

			thunkAPI.dispatch(fetchCommentsByArticleId(articleDetails.id))

			return response.data
		} catch (error: any) {
			return rejectWithValue('error')
		}
	}
)