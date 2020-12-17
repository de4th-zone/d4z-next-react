import {
	FETCH_TAG_REQUESTED,
	FETCH_TAG_SUCCEED,
	FETCH_TAG_FAILED,
	FETCH_TAG_RESETED,
	SINGLE_TAG_REQUESTED,
	SINGLE_TAG_SUCCEED,
	SINGLE_TAG_FAILED,
	SINGLE_TAG_RESETED
} from '../constants/tagConstant';

export const fetchTagRequestedAction = () => ({
	type: FETCH_TAG_REQUESTED
});
export const fetchTagSucceedAction = (payload) => ({
	type: FETCH_TAG_SUCCEED,
	payload
});
export const fetchTagFailedAction = (payload) => ({
	type: FETCH_TAG_FAILED,
	payload
});
export const fetchTagResetedAction = () => ({
	type: FETCH_TAG_RESETED
});

export const singleTagRequestedAction = () => ({
	type: SINGLE_TAG_REQUESTED
});
export const singleTagSucceedAction = (payload) => ({
	type: SINGLE_TAG_SUCCEED,
	payload
});
export const singleTagFailedAction = (payload) => ({
	type: SINGLE_TAG_FAILED,
	payload
});
export const singleTagResetedAction = () => ({
	type: SINGLE_TAG_RESETED
});
