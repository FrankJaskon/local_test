import { FC, ReactNode } from 'react'
import classNames from '@/shared/lib/classNames/classNames'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Text } from '@/shared/ui/Text'
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock'
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock'
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'
import ViewsIcon from '@/shared/assets/icons/views.svg'
import DateIcon from '@/shared/assets/icons/date.svg'
import cls from './ArticleDetails.module.scss'
import { AppIcon } from '@/shared/ui/AppIcon'
import { LazyReducerLoader, ReducerList } from '@/shared/lib/components/LazyReducerLoader/LazyReducerLoader'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
	getArticleDetailsReadonly
} from '../../model/selectors/articleDetailsSelectors'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { ArticleBlockType } from '../../model/types/ArticleDetailsScheme'
import { useInitialEffect } from '@/shared/hooks/useInitialEffect/useInitialEffect'
import { HStack, VStack } from '@/shared/ui/Stack'

export interface ArticleDetailsProps {
	className?: string
	id?: number
}

const reducers: ReducerList = {
	articleDetails: articleDetailsReducer
} as const

const renderBlockContent = (block: ArticleBlockType) => {
	switch (block.type) {
	case 'IMAGE':
		return <ArticleImageBlock
			key={block.id}
			src={block.src}
			title={block.title}
		/>
	case 'CODE':
		return <ArticleCodeBlock
			key={block.id}
			code={block.code}
		/>
	case 'TEXT':
		return <ArticleTextBlock
			key={block.id}
			paragraphs={block.paragraphs}
			title={block.title}
		/>
	default:
		return null
	}
}

export const ArticleDetails: FC<ArticleDetailsProps> = (props) => {
	const {
		className,
		id
	} = props

	const dispatch = useAppDispatch()
	const article = useSelector(getArticleDetailsData)
	const isLoading = useSelector(getArticleDetailsIsLoading)
	const error = useSelector(getArticleDetailsError)
	const readonly = useSelector(getArticleDetailsReadonly)
	let content: ReactNode

	useInitialEffect(() => dispatch(fetchArticleById(Number(id))))

	if (isLoading) {
		content = <div className={classNames('', {}, [className])}>
			<HStack justify='center'>
				<Skeleton width={500} height={200} className={cls.img} />
			</HStack>
			<Skeleton width={700} height={34} className={cls.title} />
			<Skeleton width={400} height={24} className={cls.subtitle} />
			<Skeleton width={100} height={22} className={cls.feature} />
			<Skeleton width={100} height={22} className={classNames(cls.feature, {}, [cls.featureLast])} />
			<Skeleton height={250} className={cls.contentBlock} />
			<Skeleton height={250} className={classNames(cls.contentBlock)} />
		</div>
	} else if (error) {
		content = <div className={classNames('', {}, [className, cls.error])}>
			<Text variant='error' content={error} size='size-l' />
		</div>
	} else {
		content = <VStack
			className={classNames('', {}, [className])}
			gap='24'
		>
			<HStack
				className={cls.imgWrapper}
				justify='center'
			>
				<img
					src={article?.img}
					className={cls.img}
				/>
			</HStack>
			<VStack
				gap='8'
			>
				<Text
					variant='primary'
					title={article?.title}
					content={article?.subtitle}
					size='size-l'
				/>
				<HStack>
					<AppIcon
						Svg={ViewsIcon}
						className={cls.icon}
					/>
					<Text
						content={String(article?.views)}
						size='size-s'
					/>
				</HStack>
				<HStack>
					<AppIcon
						Svg={DateIcon}
						className={cls.icon}
					/>
					<Text
						content={article?.createdAt}
						size='size-s'
					/>
				</HStack>
			</VStack>
			{article?.blocks?.map(renderBlockContent)}
		</VStack>
	}

	return <LazyReducerLoader
		removeAfterUnmount
		reducers={reducers}
	>
		{content}
	</LazyReducerLoader>
}