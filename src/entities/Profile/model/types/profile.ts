import { CountryType } from '@/entities/Country'
import { CurrencyType } from '@/entities/Currency'

export interface ProfileType {
	id?: number
	firstname?: string
	lastname?: string
	age?: string
	currency?: CurrencyType
	country?: CountryType
	city?: string
	username?: string
	avatar?: string
}
