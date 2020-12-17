import React from 'react';
import { wrapper } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

const App = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

App.getInitialProps = async ({ Component, ctx }) => {
	return {
		pageProps: {
			...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
		}
	};
};

export default wrapper.withRedux(App);
