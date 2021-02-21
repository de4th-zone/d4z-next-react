import {
	SINGLE_USER_REQUESTED,
	SINGLE_USER_SUCCEED,
	SINGLE_USER_FAILED,
	SINGLE_USER_RESETED
} from '../constants/userConstant';

export const singleUserRequestedAction = () => ({
	type: SINGLE_USER_REQUESTED
});
export const singleUserSucceedAction = (payload) => ({
	type: SINGLE_USER_SUCCEED,
	payload
});
export const singleUserFailedAction = (payload) => ({
	type: SINGLE_USER_FAILED,
	payload
});
export const singleUserResetedAction = () => ({
	type: SINGLE_USER_RESETED
});
