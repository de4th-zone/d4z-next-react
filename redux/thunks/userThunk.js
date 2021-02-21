import {
	singleUserRequestedAction,
	singleUserSucceedAction,
	singleUserFailedAction,
	singleUserResetedAction
} from '../actions/userAction';
import axios from 'axios';

export const singleUserThunk = (id, user_name) => async (dispatch) => {
	try {
		dispatch(singleUserRequestedAction());
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/${user_name}`);
		if (res.data.success) {
			console.log(res.data.data);
			dispatch(singleUserSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(singleUserFailedAction(err.message));
	}
};

export const singleUserResetedThunk = () => (dispatch) => {
	dispatch(singleUserResetedAction());
};
