import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { EditableProfileCard, profileReducer } from '@/features/EditableProfileCard'
import { TextColor } from '@/shared/const/consts'
import {
	LazyReducerLoader,
	ReducerList,
} from '@/shared/lib/components/LazyReducerLoader/LazyReducerLoader'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextWeight } from '@/shared/ui/Text'
import { PageLoader } from '@/widgets/PageLoader'
import { PageWrapper } from '@/widgets/PageWrapper'

const reducers: ReducerList = {
	profile: profileReducer,
}
let content = <PageLoader />

const ProfilePage: FC = () => {
	const { id } = useParams()
	const { t } = useTranslation('profile')
	const [isMounted, setIsMounted] = useState<boolean>(false)

	if (isMounted || __PROJECT__ === 'storybook') {
		content = (
			<PageWrapper data-testid='profile-page'>
				<VStack gap='16'>
					<Text
						title={t('card.header.title')}
						titleHue={TextColor.SECONDARY}
						weight={TextWeight.BOLD}
					/>
					<EditableProfileCard id={Number(id)} />
				</VStack>
			</PageWrapper>
		)
	}

	return (
		<LazyReducerLoader reducers={reducers} setIsReducerMounted={setIsMounted}>
			{content}
		</LazyReducerLoader>
	)
}

export default ProfilePage
