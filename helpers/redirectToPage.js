import Router from 'next/router';

const redirectToPage = (destination, { ctx, status } = {}) => {
	const isAuthenticated = ctx.store.getState().auth.login.isAuthenticated;
	if (isAuthenticated) {
		if (ctx.res) {
			ctx.res.writeHead(status || 302, { Location: destination });
			ctx.res.end();
		} else {
			if (destination[0] === '/' && destination[1] !== '/') {
				Router.push(destination);
			} else {
				window.location = destination;
			}
		}
	}
};

export default redirectToPage;
