import type { StateSchema } from 'app/providers/StoreProvider'

export const getValidateError = (state: StateSchema) => state.profile?.validateError || []