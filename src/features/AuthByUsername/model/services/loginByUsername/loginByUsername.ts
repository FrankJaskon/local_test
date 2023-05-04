import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, userActions } from '@/entities/User'
import { LoginErrors } from '@/shared/config/errorResponse/errorResponse'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'
import { ThunkApiConfigType } from '@/app/providers/StoreProvider'

interface LoginProps {
	username: string,
	password: string
}

export const loginByUsername = createAsyncThunk<User, LoginProps, ThunkApiConfigType<string>>(
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		const { dispatch, extra, rejectWithValue } = thunkAPI
		try {
			const response = await extra.api.post('/login', authData)
			if (!response) {
				throw new Error()
			}
			dispatch(userActions.setAuthData(response.data))
			localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(response.data))

			return response.data
		} catch (error: any) {
			if (error?.response?.status === 403) {
				return rejectWithValue(LoginErrors.INCORRECT_DATA)
			}
			return rejectWithValue(LoginErrors.UNEXPECTED)
		}
	}
)