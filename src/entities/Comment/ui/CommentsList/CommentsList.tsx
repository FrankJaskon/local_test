import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import { CommentType } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

export interface CommentsListProps {
	comments?: CommentType[]
	isLoading?: boolean
	error?: string
	'data-testid'?: string
}

export const CommentsList: FC<CommentsListProps> = memo((props: CommentsListProps) => {
	const { comments, isLoading, error, 'data-testid': dataTestId = 'comments-list' } = props

	const { t } = useTranslation('comment')

	const renderComments = useMemo(
		() =>
			comments?.map(c => (
				<CommentCard
					key={c.id}
					isLoading={isLoading}
					comment={c}
					data-testid={`${dataTestId}-item`}
				/>
			)),
		[comments, isLoading, dataTestId]
	)

	if (error) {
		return (
			<VStack justify='center' align='center'>
				<Text content={t('error')} />
			</VStack>
		)
	}

	if (isLoading) {
		return (
			<VStack gap='16'>
				<CommentCard isLoading />
				<CommentCard isLoading />
				<CommentCard isLoading />
			</VStack>
		)
	}

	return (
		<VStack gap='16' data-testid={dataTestId}>
			{comments?.length ? renderComments : <Text content={t('empty-list')} />}
		</VStack>
	)
})
