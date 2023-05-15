import { ValueOf } from '@/shared/types/types'

export const UserRole = {
	ADMIN: 'ADMIN',
	USER: 'USER',
	MANAGER: 'MANAGER',
} as const

export type UserRoleType = ValueOf<typeof UserRole>

export interface User {
	id: number
	username: string
	avatar?: string
	roles: UserRoleType[]
}

export interface UserScheme {
	authData?: User

	_initialized: boolean
}
