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

export const fetchPostRequestedAction = () => ({
	type: FETCH_POST_REQUESTED
});
export const fetchPostSucceedAction = (post, current_page) => ({
	type: FETCH_POST_SUCCEED,
	payload: {
		post: post,
		current_page: current_page
	}
});
export const fetchMorePostRequestedAction = () => ({
	type: FETCH_MORE_POST_REQUESTED
});
export const fetchMorePostSucceedAction = (post, current_page) => ({
	type: FETCH_MORE_POST_SUCCEED,
	payload: {
		post: post,
		current_page: current_page
	}
});
export const fetchPostFailedAction = (payload) => ({
	type: FETCH_POST_FAILED,
	payload
});
export const fetchPostResetedAction = () => ({
	type: FETCH_POST_RESETED
});

export const fetchTrendingPostRequestedAction = () => ({
	type: FETCH_TRENDING_POST_REQUESTED
});
export const fetchTrendingPostSucceedAction = (payload) => ({
	type: FETCH_TRENDING_POST_SUCCEED,
	payload
});
export const fetchTrendingPostFailedAction = (payload) => ({
	type: FETCH_TRENDING_POST_FAILED,
	payload
});
export const fetchTrendingPostResetedAction = () => ({
	type: FETCH_TRENDING_POST_RESETED
});

export const singlePostRequestedAction = () => ({
	type: SINGLE_POST_REQUESTED
});
export const singlePostSucceedAction = (payload) => ({
	type: SINGLE_POST_SUCCEED,
	payload
});
export const singlePostFailedAction = (payload) => ({
	type: SINGLE_POST_FAILED,
	payload
});
export const singlePostResetedAction = () => ({
	type: SINGLE_POST_RESETED
});
