import { ReducersMapObject } from '@reduxjs/toolkit'
import { FC, ReactNode, useMemo } from 'react'
import { Provider } from 'react-redux'
import { StateSchema } from '../config/StateSchema'
import { createReduxStore } from '../config/store'

interface StoreProviderProps {
	children?: ReactNode
	initialState?: StateSchema
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = props => {
	const { children, initialState, asyncReducers } = props

	const store = useMemo(
		() =>
			createReduxStore(
				initialState as StateSchema,
				asyncReducers as ReducersMapObject<StateSchema>
			),
		// eslint-disable-next-line
		[]
	)

	return <Provider store={store}>{children}</Provider>
}
