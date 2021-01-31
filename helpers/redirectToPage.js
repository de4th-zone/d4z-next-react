import Router from 'next/router';

export const redirectToHome = (ctx) => {
	const isAuthenticated = ctx.store.getState().auth.login.isAuthenticated;
	if (isAuthenticated) {
		if (ctx.res) {
			ctx.res.writeHead(302, { Location: '/' });
			ctx.res.end();
			ctx.res.finished = true;
		} else {
			Router.push('/');
		}
	}
};

export const redirectToLogin = (ctx) => {
	const isAuthenticated = ctx.store.getState().auth.login.isAuthenticated;
	if (isAuthenticated) {
		if (ctx.res) {
			ctx.res.writeHead(302, { Location: '/login' });
			ctx.res.end();
			ctx.res.finished = true;
		} else {
			Router.push('/login');
		}
	}
};
