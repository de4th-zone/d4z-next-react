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

export const registerThunk = (user, history) => async (dispatch) => {
	try {
		dispatch(registerRequestedAction());
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, user);
		if (res.data.success) {
			dispatch(registerSucceedAction(res.data.data));
			history.push('/login');
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
			setCookie('token', token);
			setAuthToken(token);
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
	removeCookie('token');
	setAuthToken(false);
	dispatch(loginResetedAction());
	router.push('/login');
};

export const setUserThunk = (ctx) => {
	if (ctx.req) {
		if (ctx.req.headers.cookie) {
			setAuthToken(getCookie('token', ctx.req));
			const decoded = jwt_decode(getCookie('token', ctx.req));
			ctx.store.dispatch(loginSucceedAction(true, decoded));
			const currentTime = Date.now() / 1000;
			/* if (decoded.exp < currentTime) {
				removeCookie('token');
				setAuthToken(false);
				dispatch(loginResetedAction());
				Router.push('/login');
			} */
		}
	} else {
		const token = ctx.store.getState().auth.login.isAuthenticated;
		if (token && ctx.pathname === '/register') {
			setTimeout(function () {
				Router.push('/');
			}, 0);
		}
	}
};

/* export const setUserThunk = (router) => (dispatch) => {
	if (localStorage.getItem('jwtToken')) {
		console.log('nice');
		setAuthToken(localStorage.jwtToken);
		const decoded = jwt_decode(localStorage.jwtToken);
		dispatch(loginSucceedAction(true, decoded));
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.log('none');
			localStorage.removeItem('jwtToken');
			setAuthToken(false);
			dispatch(loginResetedAction());
			router.push('/login');
		}
	}
}; */
