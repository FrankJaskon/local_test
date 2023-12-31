import { createContext } from 'react'
import { ValueOf } from '../../types/types'

export const AppThemes = {
	LIGHT: 'light',
	DARK: 'dark',
	PURPLE: 'purple',
} as const

export type Theme = ValueOf<typeof AppThemes>

export interface ThemeContextProps {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)

export default ThemeContext
