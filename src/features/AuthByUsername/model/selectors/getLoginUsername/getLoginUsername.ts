import type { StateSchema } from '@/app/providers/StoreProvider'

export const getLoginLogin = (state: StateSchema) => state?.login?.username ?? ''
