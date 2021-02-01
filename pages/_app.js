import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import Error from 'next/error';
import { wrapper } from '../redux/store';
import { fetchCategoryThunk } from '../redux/thunks/categoryThunk';
import { test } from '../redux/thunks/authThunk';
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

const App = ({ Component, pageProps, test }) => {
	if (pageProps.error) {
		return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
	}
	useEffect(() => {
		//test();
		return () => {};
	}, [test]);
	return <Component {...pageProps} />;
};

App.getInitialProps = async ({ Component, ctx }) => {
	await ctx.store.dispatch(fetchCategoryThunk());
	return {
		pageProps: {
			...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
		}
	};
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { test };

export default compose(wrapper.withRedux, connect(mapStateToProps, mapDispatchToProps))(App);
