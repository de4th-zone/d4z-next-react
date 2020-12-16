import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	/* static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	} */
	render() {
		return (
			<Html>
				<Head>
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
					<meta name="theme-color" content="#000000" />
					<link rel="apple-touch-icon" href="/logo192.jpg" />
					<meta name="apple-mobile-web-app-status-bar" content="#000000" />
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
