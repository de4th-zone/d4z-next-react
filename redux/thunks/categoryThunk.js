import {
	fetchCategoryRequestedAction,
	fetchCategorySucceedAction,
	fetchCategoryFailedAction,
	fetchCategoryResetedAction,
	singleCategoryRequestedAction,
	singleCategorySucceedAction,
	singleCategoryFailedAction,
	singleCategoryResetedAction
} from '../actions/categoryAction';
import axios from 'axios';

export const fetchCategoryThunk = () => async (dispatch) => {
	try {
		dispatch(fetchCategoryRequestedAction());
		const res = await axios.get(`${process.env.API_URL}/categories`);
		if (res.data.success) {
			dispatch(fetchCategorySucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(fetchCategoryFailedAction(err.message));
	}
};

export const fetchCategoryResetedThunk = () => (dispatch) => {
	dispatch(fetchCategoryResetedAction());
};

export const singleCategoryThunk = (id) => async (dispatch) => {
	try {
		dispatch(singleCategoryRequestedAction());
		const res = await axios.get(`${process.env.API_URL}/categories/${id}`);
		if (res.data.success) {
			dispatch(singleCategorySucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(singleCategoryFailedAction(err.message));
	}
};

export const singleCategoryResetedThunk = () => (dispatch) => {
	dispatch(singleCategoryResetedAction());
};
