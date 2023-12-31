import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch'
import classNames from '@/shared/lib/classNames/classNames'
import {
	LazyReducerLoader,
	ReducerList,
} from '@/shared/lib/components/LazyReducerLoader/LazyReducerLoader'
import { AppButton, ButtonVariant } from '@/shared/ui/deprecated/AppButton'
import { AppCard } from '@/shared/ui/deprecated/AppCard'
import { AppTextArea } from '@/shared/ui/deprecated/AppTextArea'
import { VStack } from '@/shared/ui/redesigned/VStack'
import { useNewCommentText } from '../../model/selectors/newCommentSelectors'
import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice'
import cls from './AddNewComment.module.scss'

export interface AddNewCommentProps {
	className?: string
	handleSubmit: (value: string) => void
	'data-testid'?: string
}

const reducers: ReducerList = {
	addNewComment: addNewCommentReducer,
}

export const AddNewComment: FC<AddNewCommentProps> = memo((props: AddNewCommentProps) => {
	const { className, handleSubmit, 'data-testid': dataTestId = 'add-new-comment' } = props
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const text = useNewCommentText()

	const handleChange = useCallback(
		(value: string) => {
			dispatch(addNewCommentActions.setCommentText(value))
		},
		[dispatch]
	)

	const handleCancel = useCallback(() => {
		dispatch(addNewCommentActions.setCommentText(undefined))
	}, [dispatch])

	const handleSubmitNewComment = useCallback(() => {
		handleSubmit(text)
		handleCancel()
	}, [handleSubmit, handleCancel, text])

	return (
		<LazyReducerLoader reducers={reducers}>
			<div className={classNames(cls.AddNewComment, {}, [className])}>
				<VStack className={cls.inputWrapper} gap='8'>
					<AppCard noPaddings>
						<AppTextArea
							placeholder={t('new-comment.label')}
							className={cls.input}
							value={text}
							onChange={handleChange}
							data-testid={dataTestId}
						/>
					</AppCard>
				</VStack>
				{text && (
					<div className={cls.btnGroup}>
						<AppButton
							variant={ButtonVariant.OUTLINE}
							onClick={handleCancel}
							className={cls.btn}
						>
							{t('btn.cancel')}
						</AppButton>
						<AppButton className={cls.btn} onClick={handleSubmitNewComment}>
							{t('btn.submit')}
						</AppButton>
					</div>
				)}
			</div>
		</LazyReducerLoader>
	)
})
