import {
	fetchTagRequestedAction,
	fetchTagSucceedAction,
	fetchTagFailedAction,
	fetchTagResetedAction,
	singleTagRequestedAction,
	singleTagSucceedAction,
	singleTagFailedAction,
	singleTagResetedAction
} from '../actions/tagAction';
import axios from 'axios';

export const fetchTagThunk = () => async (dispatch) => {
	try {
		//dispatch(fetchTagRequestedAction());
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
		if (res.data.success) {
			dispatch(fetchTagSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(fetchTagFailedAction(err.message));
	}
};

export const fetchTagResetedThunk = () => (dispatch) => {
	dispatch(fetchTagResetedAction());
};

export const singleTagThunk = (id) => async (dispatch) => {
	try {
		dispatch(singleTagRequestedAction());
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags/${id}`);
		if (res.data.success) {
			dispatch(singleTagSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(singleTagFailedAction(err.message));
	}
};

export const singleTagResetedThunk = () => (dispatch) => {
	dispatch(singleTagResetedAction());
};
