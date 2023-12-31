import { FC, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserRoleType, useUserRoles } from '@/entities/User'
import { getForbiddenRoute } from '@/shared/const/RoutPaths'

export interface RequireRolesProps {
	children: JSX.Element
	roles: UserRoleType[]
}

export const RequireRoles: FC<RequireRolesProps> = props => {
	const { children, roles } = props
	const location = useLocation()
	const userRoles = useUserRoles()

	const isRouteAvailable = useMemo((): boolean => {
		if (!roles) return true
		if (!userRoles) return false

		return roles.some(requiredRole => userRoles.includes(requiredRole))
	}, [roles, userRoles])

	if (!isRouteAvailable) {
		return <Navigate to={getForbiddenRoute()} replace state={{ from: location }} />
	}

	return children
}
