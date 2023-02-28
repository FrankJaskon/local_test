import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, userActions } from 'entities/User'
import { LoginErrors } from 'shared/config/errorResponse/errorResponse'
import { LOCAL_STORAGE_TOKEN_KEY } from 'shared/const/localstorage'

interface LoginProps {
	username: string,
	password: string
}

export const loginByUsername = createAsyncThunk<
	User,
	LoginProps,
	{ rejectValue: string }
>(
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		try {
			const response = await axios.post<User>('http://localhost:8000/login', authData)

			if (!response) {
				throw new Error()
			}

			thunkAPI.dispatch(userActions.setAuthData(response.data))
			localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(response.data))

			return response.data
		} catch (error) {
			if (error.status === 403) {
				return thunkAPI.rejectWithValue(LoginErrors.INCORRECT_DATA)
			}
			return thunkAPI.rejectWithValue(LoginErrors.UNEXPECTED)
		}
	}
)