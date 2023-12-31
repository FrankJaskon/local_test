import { FC, memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CountryType } from '@/entities/Country'
import { CurrencyType } from '@/entities/Currency'
import { ProfileCard } from '@/entities/Profile'
import { useUserAuthData } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/hooks/useInitialEffect/useInitialEffect'
import { Text, TextVariant } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/VStack'
import { useEditableProfileCardIsLoading } from '../../model/selectors/getEditableProfileCardIsLoading/getEditableProfileCardIsLoading'
import { useEditableProfileCardLoadingError } from '../../model/selectors/getEditableProfileCardLoadingError/getEditableProfileCardLoadingError'
import { useEditableProfileCardProfileData } from '../../model/selectors/getEditableProfileCardProfileData/getEditableProfileCardProfileData'
import { useEditableProfileCardProfileForm } from '../../model/selectors/getEditableProfileCardProfileForm/getEditableProfileCardProfileForm'
import { useEditableProfileCardReadonly } from '../../model/selectors/getEditableProfileCardReadonly/getEditableProfileCardReadonly'
import { useEditableProfileCardValidateError } from '../../model/selectors/getEditableProfileCardValidateError/getEditableProfileCardValidateError'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/profileSlice'
import { ValidateProfileError, ValidateProfileErrorType } from '../../model/types/ProfileScheme'
import { ProfileRating } from '../ProfileRating'
import cls from './EditableProfileCard.module.scss'

export interface EditableProfileCardProps {
	id?: number
}

export const EditableProfileCard: FC<EditableProfileCardProps> = memo(
	(props: EditableProfileCardProps) => {
		const { id } = props

		const dispatch = useAppDispatch()
		const formData = useEditableProfileCardProfileForm()
		const isLoading = useEditableProfileCardIsLoading()
		const validateError = useEditableProfileCardValidateError()
		const loadingError = useEditableProfileCardLoadingError()
		const readonly = useEditableProfileCardReadonly()
		const authData = useUserAuthData()
		const profileData = useEditableProfileCardProfileData()
		const canEdit: boolean = useMemo(
			() => Number(authData?.id) === Number(profileData?.id),
			[authData?.id, profileData?.id]
		)
		const isNotProfileOwner = useMemo(() => !canEdit, [canEdit])
		const { t } = useTranslation('profile')

		const ValidateErrorTranslation = useMemo(
			() => ({
				[ValidateProfileError.INCORRECT_AGE]: t('error.age'),
				[ValidateProfileError.INCORRECT_AVATAR]: t('error.avatar'),
				[ValidateProfileError.INCORRECT_DATA]: t('error.incorrect-data'),
				[ValidateProfileError.INCORRECT_FIRSTNAME]: t('error.firstname'),
				[ValidateProfileError.INCORRECT_LASTNAME]: t('error.lastname'),
				[ValidateProfileError.INCORRECT_USERNAME]: t('error.username'),
				[ValidateProfileError.INCORRECT_CITY]: t('error.city'),
				[ValidateProfileError.NO_DATA]: t('error.empty'),
				[ValidateProfileError.SERVER_ERROR]: t('error.server-error'),
				[ValidateProfileError.NO_PROFILE]: t('error.server-error'),
			}),
			[t]
		)

		useInitialEffect(() => {
			if (id) {
				dispatch(fetchProfileData(Number(id)))
			}
		}, id)

		const onChangeFirstname = useCallback(
			(value?: string) => {
				dispatch(profileActions.updateProfileData({ firstname: value || '' }))
			},
			[dispatch]
		)

		const onChangeLastname = useCallback(
			(value?: string) => {
				dispatch(profileActions.updateProfileData({ lastname: value || '' }))
			},
			[dispatch]
		)

		const onChangeAge = useCallback(
			(value?: string) => {
				dispatch(profileActions.updateProfileData({ age: value ?? '' }))
			},
			[dispatch]
		)

		const onChangeCity = useCallback(
			(value?: string) => {
				dispatch(profileActions.updateProfileData({ city: value || '' }))
			},
			[dispatch]
		)

		const onChangeUsername = useCallback(
			(value?: string) => {
				dispatch(profileActions.updateProfileData({ username: value ?? '' }))
			},
			[dispatch]
		)

		const onChangeAvatar = useCallback(
			(value?: string) => {
				dispatch(profileActions.updateProfileData({ avatar: value || '' }))
			},
			[dispatch]
		)

		const onChangeCurrency = useCallback(
			(value?: CurrencyType) => {
				dispatch(profileActions.updateProfileData({ currency: value }))
			},
			[dispatch]
		)

		const onChangeCountry = useCallback(
			(value?: CountryType) => {
				dispatch(profileActions.updateProfileData({ country: value }))
			},
			[dispatch]
		)

		const onEdit = useCallback(() => {
			dispatch(profileActions.setReadonly(false))
		}, [dispatch])

		const onClose = useCallback(() => {
			dispatch(profileActions.cancelEdit())
		}, [dispatch])

		const onSave = useCallback(() => {
			authData?.id && dispatch(updateProfileData())
		}, [dispatch, authData?.id])

		return (
			<VStack gap='12' className={cls.EditableProfileCard}>
				{validateError &&
					validateError?.map((err: ValidateProfileErrorType) => (
						<Text
							key={err}
							variant={TextVariant.ERROR}
							content={validateError && ValidateErrorTranslation[err]}
						/>
					))}
				<ProfileCard
					data={formData}
					readonly={readonly}
					error={loadingError && ValidateErrorTranslation[loadingError]}
					isLoading={isLoading}
					updateFirstname={onChangeFirstname}
					updateLastname={onChangeLastname}
					updateAge={onChangeAge}
					updateCity={onChangeCity}
					updateUsername={onChangeUsername}
					updateAvatar={onChangeAvatar}
					updateCurrency={onChangeCurrency}
					updateCountry={onChangeCountry}
					editForm={onEdit}
					cancelEdit={onClose}
					saveForm={onSave}
					canEdit={canEdit}
				/>
				{!isLoading && !loadingError && isNotProfileOwner && (
					<ProfileRating profileId={id} />
				)}
			</VStack>
		)
	}
)
