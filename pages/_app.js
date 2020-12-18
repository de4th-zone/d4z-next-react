import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Error from 'next/error';
import { wrapper } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import '../styles/app.css';

NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 800,
	showSpinner: false
});
Router.events.on('routeChangeStart', (url) => {
	console.log(`Loading: ${url}`);
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps }) => {
	if (pageProps.error) {
		return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
	}
	return <Component {...pageProps} />;
};

/* App.getInitialProps = async ({ Component, ctx }) => {
	return {
		pageProps: {
			...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
		}
	};
}; */

export default wrapper.withRedux(App);
