import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserAuthData } from '@/entities/User'
import { LoginButton } from '@/features/AuthByUsername'
import { LatestArticlesList } from '@/features/LatestArticlesList'
import BannerImg from '@/shared/assets/banner.png'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { AppCard } from '@/shared/ui/redesigned/AppCard'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { AppText } from '@/shared/ui/redesigned/AppText'

import { VStack } from '@/shared/ui/redesigned/VStack'
import { ArticleTypeCategories } from '@/widgets/ArticleTypeCategories'
import { PageWrapper } from '@/widgets/PageWrapper'
import cls from './MainPage.module.scss'

export const MainPage: FC = memo(() => {
	const { t } = useTranslation('main')
	const isAuthorized = Boolean(useUserAuthData())

	return (
		<PageWrapper data-testid='main-page'>
			<StickyContentLayout
				content={
					<VStack gap='24'>
						<AppImage src={BannerImg} height={250} className={cls.banner} />
						<AppCard padding='24'>
							<VStack gap='40'>
								<VStack gap='24'>
									<AppText title={t('main-title')} size='xl' weight='bold' />
									<AppText text={t('introduction.paragraphs.first')} />
									<AppText title={t('introduction.subtitles.first')} size='l' />
									<AppText text={t('introduction.paragraphs.second')} />
									{!isAuthorized && (
										<>
											<AppText
												title={t('introduction.subtitles.second')}
												size='l'
											/>
											<AppText
												text={
													<>
														{t('introduction.paragraphs.third')}
														<LoginButton
															type='registration'
															content={
																t('buttons.registration') + ':)'
															}
															as='span'
															variant='custom'
															className={cls.loginButton}
														/>
													</>
												}
											/>
										</>
									)}
								</VStack>
								<ArticleTypeCategories />
								<LatestArticlesList />
							</VStack>
						</AppCard>
					</VStack>
				}
			/>
		</PageWrapper>
	)
})

export default MainPage
