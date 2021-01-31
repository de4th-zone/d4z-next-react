import {
	FETCH_POST_REQUESTED,
	FETCH_POST_SUCCEED,
	FETCH_MORE_POST_REQUESTED,
	FETCH_MORE_POST_SUCCEED,
	FETCH_POST_FAILED,
	FETCH_POST_RESETED,
	FETCH_TRENDING_POST_REQUESTED,
	FETCH_TRENDING_POST_SUCCEED,
	FETCH_TRENDING_POST_FAILED,
	FETCH_TRENDING_POST_RESETED,
	SINGLE_POST_REQUESTED,
	SINGLE_POST_SUCCEED,
	SINGLE_POST_FAILED,
	SINGLE_POST_RESETED
} from '../constants/postConstant';
import { concat } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
	fetchPost: {
		post: [],
		pagination: {
			current_page: 1
		},
		isLoadingMore: false,
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	fetchTrendingPost: {
		post: [],
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	singlePost: {
		post: {
			user: {
				role: {}
			},
			category: {},
			tag: {}
		},
		isLoading: true,
		isError: false,
		errorMessage: {}
	}
};
const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POST_REQUESTED:
			return {
				...state,
				fetchPost: {
					...state.fetchPost,
					isLoading: true
				}
			};
		case FETCH_POST_SUCCEED:
			return {
				...state,
				fetchPost: {
					...state.fetchPost,
					post: action.payload.post,
					pagination: {
						...state.fetchPost.pagination,
						current_page: action.payload.current_page
					},
					isLoading: false
				}
			};
		case FETCH_MORE_POST_REQUESTED:
			return {
				...state,
				fetchPost: {
					...state.fetchPost,
					isLoadingMore: true
				}
			};
		case FETCH_MORE_POST_SUCCEED:
			return {
				...state,
				fetchPost: {
					...state.fetchPost,
					post: concat(state.fetchPost.post, action.payload.post),
					pagination: {
						...state.fetchPost.pagination,
						current_page: action.payload.current_page
					},
					isLoadingMore: false
				}
			};
		case FETCH_POST_FAILED:
			return {
				...state,
				fetchPost: {
					...state.fetchPost,
					isError: true,
					errorMessage: action.payload
				}
			};
		case FETCH_POST_RESETED:
			return {
				...state,
				fetchPost: {
					...state.fetchPost,
					post: [],
					pagination: {
						...state.fetchPost.pagination,
						current_page: 1
					},
					isLoadingMore: false,
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		//
		case FETCH_TRENDING_POST_REQUESTED:
			return {
				...state,
				fetchTrendingPost: {
					...state.fetchTrendingPost,
					isLoading: true
				}
			};
		case FETCH_TRENDING_POST_SUCCEED:
			return {
				...state,
				fetchTrendingPost: {
					...state.fetchTrendingPost,
					post: action.payload,
					isLoading: false
				}
			};
		case FETCH_TRENDING_POST_FAILED:
			return {
				...state,
				fetchTrendingPost: {
					...state.fetchTrendingPost,
					isError: true,
					errorMessage: action.payload
				}
			};
		case FETCH_TRENDING_POST_RESETED:
			return {
				...state,
				fetchTrendingPost: {
					...state.fetchTrendingPost,
					post: [],
					isLoading: true,
					isError: false,
					errorMessage: []
				}
			};
		//
		case SINGLE_POST_REQUESTED:
			return {
				...state,
				singlePost: {
					...state.singlePost,
					isLoading: true
				}
			};
		case SINGLE_POST_SUCCEED:
			return {
				...state,
				singlePost: {
					...state.singlePost,
					post: action.payload,
					isLoading: false
				}
			};
		case SINGLE_POST_FAILED:
			return {
				...state,
				singlePost: {
					...state.singlePost,
					isError: true,
					errorMessage: action.payload
				}
			};
		case SINGLE_POST_RESETED:
			return {
				...state,
				singlePost: {
					...state.singlePost,
					post: {},
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		default:
			return state;
	}
};

export default postReducer;
