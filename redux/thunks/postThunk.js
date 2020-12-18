import {
	fetchPostRequestedAction,
	fetchPostSucceedAction,
	fetchMorePostRequestedAction,
	fetchMorePostSucceedAction,
	fetchPostFailedAction,
	fetchPostResetedAction,
	fetchTrendingPostRequestedAction,
	fetchTrendingPostSucceedAction,
	fetchTrendingPostFailedAction,
	fetchTrendingPostResetedAction,
	singlePostRequestedAction,
	singlePostSucceedAction,
	singlePostFailedAction,
	singlePostResetedAction
} from '../actions/postAction';
import axios from 'axios';

export const fetchPostThunk = () => async (dispatch) => {
	try {
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts?per_page=${process.env.PER_PAGE_HOME}`);
		if (res.data.success) {
			await dispatch(fetchPostSucceedAction(res.data.data, res.data.pagination.current_page));
		}
	} catch (err) {
		await dispatch(fetchPostFailedAction(err.message));
	}
};

export const fetchMorePostThunk = (page) => async (dispatch) => {
	try {
		await dispatch(fetchMorePostRequestedAction());
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/posts?per_page=${process.env.PER_PAGE_HOME}&page=${page}`
		);
		if (res.data.success) {
			await dispatch(fetchMorePostSucceedAction(res.data.data, res.data.pagination.current_page));
		}
	} catch (err) {
		await dispatch(fetchPostFailedAction(err.message));
	}
};

export const fetchPostResetedThunk = () => (dispatch) => {
	dispatch(fetchPostResetedAction());
};

export const fetchTrendingPostThunk = () => async (dispatch) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/trending-posts?per_page=${process.env.LIMIT_PAGE_TRENDING_POST}`
		);
		if (res.data.success) {
			await dispatch(fetchTrendingPostSucceedAction(res.data.data));
		}
	} catch (err) {
		await dispatch(fetchTrendingPostFailedAction(err.message));
	}
};

export const fetchTrendingPostResetedThunk = () => (dispatch) => {
	dispatch(fetchTrendingPostResetedAction());
};

export const singlePostThunk = (id) => async (dispatch) => {
	try {
		await dispatch(singlePostRequestedAction());
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
		if (res.data.success) {
			await dispatch(singlePostSucceedAction(res.data.data));
		}
	} catch (err) {
		await dispatch(singlePostFailedAction(err.message));
	}
};

export const singlePostResetedThunk = () => (dispatch) => {
	dispatch(singlePostResetedAction());
};
