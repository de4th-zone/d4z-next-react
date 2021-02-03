import React from 'react';
import Router from 'next/router';
import { getCookie, removeCookie } from './cookie';
import setAuthToken from './setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSucceedAction, loginResetedAction } from '../redux/actions/authAction';

const home = '/';
const login = '/login';

const redirect = (res, location) => {
	if (res) {
		res.writeHead(302, {
			Location: location
		});
		res.end();
	} else {
		Router.replace(location);
	}
};

const Authentication = (WrappedComponent, type) => {
	const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;
	hocComponent.getInitialProps = async (ctx) => {
		const data = {};
		const token = getCookie('token', ctx.req);
		setAuthToken(token);
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/me`);

		if (type === 'profile' && !res.data.success) {
			redirect(ctx.res, login);
		} else if ((type === 'login' || type === 'register') && token && res.data.success) {
			redirect(ctx.res, home);
		} else if (WrappedComponent.getInitialProps) {
			const wrappedProps = await WrappedComponent.getInitialProps({ ...ctx, auth: data });
			if (token) {
				if (res.data.success) {
					const decoded = jwt_decode(token);
					await ctx.store.dispatch(loginSucceedAction(true, decoded));
				} else {
					setAuthToken(false);
					removeCookie('token');
					await ctx.store.dispatch(loginResetedAction());
					if (ctx.pathname !== '/login') {
						redirect(ctx.res, login);
					}
				}
			}
			return { ...wrappedProps, data };
		}
		return { data };
	};
	return hocComponent;
};

export default Authentication;
