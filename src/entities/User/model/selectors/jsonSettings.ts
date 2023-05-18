import { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'
import { JsonSettings } from '../types/jsonSettings'

export const [useJsonSettings, getJsonSettings] = buildSelector(
	(state: StateSchema) => state?.user?.authData?.jsonSettings
)

export const [useJsonSettingsByKey, getJsonSettingsByKey] = buildSelector(
	(state: StateSchema, key: keyof JsonSettings) => state?.user?.authData?.jsonSettings?.[key]
)
