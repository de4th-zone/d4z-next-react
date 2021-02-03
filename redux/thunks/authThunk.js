import {
	registerRequestedAction,
	registerSucceedAction,
	registerFailedAction,
	registerResetedAction,
	loginRequestedAction,
	loginSucceedAction,
	loginFailedAction,
	loginResetedAction
} from '../actions/authAction';
import axios from 'axios';
import Router from 'next/router';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../helpers/setAuthToken';
import { setCookie, getCookie, removeCookie } from '../../helpers/cookie';

export const registerThunk = (user, router) => async (dispatch) => {
	try {
		dispatch(registerRequestedAction());
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, user);
		if (res.data.success) {
			dispatch(registerSucceedAction(res.data.data));
			router.push('/login');
		} else {
			dispatch(registerFailedAction(res.data.errorMessage));
		}
	} catch (err) {
		dispatch(registerFailedAction(err.message));
	}
};

export const registerResetedThunk = () => (dispatch) => {
	dispatch(registerResetedAction());
};

export const loginThunk = (user, router) => async (dispatch) => {
	try {
		dispatch(loginRequestedAction());
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, user);
		if (res.data.success) {
			const { token } = res.data;
			setAuthToken(token);
			setCookie('token', token);
			const decoded = jwt_decode(token);
			dispatch(loginSucceedAction(true, decoded));
			router.push('/');
		} else {
			dispatch(loginFailedAction(res.data.errorMessage));
		}
	} catch (err) {
		dispatch(loginFailedAction(err.message));
	}
};

export const loginResetedThunk = () => (dispatch) => {
	dispatch(loginResetedAction());
};

export const logoutThunk = (router) => (dispatch) => {
	setAuthToken(false);
	removeCookie('token');
	dispatch(loginResetedAction());
	router.push('/login');
};

/* export const setUserThunk = (router) => async (dispatch) => {
	const token = getCookie('token');
	if (token) {
		setAuthToken(token);
		try {
			const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/me`);
			if (res.data.success) {
				const decoded = jwt_decode(token);
				dispatch(loginSucceedAction(true, decoded));
			} else {
				setAuthToken(false);
				removeCookie('token');
				dispatch(loginResetedAction());
				router.push('/login');
			}
		} catch (err) {
			setAuthToken(false);
			removeCookie('token');
			dispatch(loginResetedAction());
			router.push('/login');
		}
	}
}; */

/* export const setUserThunk = (req, cookie) => async (dispatch) => {
	if (req) {
		if (cookie) {
			const test = {
				token: getCookie('token', req)
			};
			const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, test);
			if (res.status === 200) {
				setAuthToken(getCookie('token', req));
				const decoded = jwt_decode(getCookie('token', req));
				dispatch(loginSucceedAction(true, decoded));
			} else {
				removeCookie('token');
				setAuthToken(false);
				dispatch(loginResetedAction());
			}
			const currentTime = Date.now() / 1000;
			 if (decoded.exp < currentTime) {
				removeCookie('token');
				setAuthToken(false);
				dispatch(loginResetedAction());
				Router.push('/login');
			}
		}
	} else {
		const token = ctx.store.getState().auth.login.isAuthenticated;
		if (token && ctx.pathname === '/register') {
			setTimeout(function () {
				Router.push('/');
			}, 0);
		}
	}
}; */
