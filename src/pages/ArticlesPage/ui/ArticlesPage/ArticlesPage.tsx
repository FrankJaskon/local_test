import { FC, memo } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'

export interface ArticlesPageProps {
	className ?: string
}

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
	const {
		className
	} = props


	return (
		<div className={classNames(cls.ArticlesPage, {}, [className])}>
			ArticlesPage
		</div>
	)
}

export default memo(ArticlesPage)