const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
	// when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	// when `next build` or `npm run build` is used
	const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
	// when `next build` or `npm run build` is used
	const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

	console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

	const env = {
		API_URL: (() => {
			if (isDev) return 'http://nguyenthucofficial.com/api';
			if (isProd) {
				return 'https://d4z-laravel-api.herokuapp.com/public/api';
			}
			if (isStaging) return 'https://d4z-laravel-api.herokuapp.com/public/api';
			return 'API_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		RESTURL_SESSIONS: (() => {
			if (isDev) return 'http://localhost:4000/sessions';
			if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions';
			if (isStaging) return 'http://localhost:11639';
			return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		PER_PAGE_HOME: 6,
		LIMIT_PAGE_TRENDING_POST: 6
	};

	// next.config.js object
	return {
		env,
		reactStrictMode: true
	};
};
