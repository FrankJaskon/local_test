export type {
	AddNewCommentScheme
} from './model/types/AddNewCommentScheme'

export {
	getNewCommentText
} from './model/selectors/newCommentSelectors'

export {
	addNewCommentReducer,
	addNewCommentActions
} from './model/slices/addNewCommentSlice'

export {
	LazyAddNewComment as AddNewComment
} from './ui/AddNewComment.lazy'