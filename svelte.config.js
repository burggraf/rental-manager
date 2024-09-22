import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		})
	},
	vitePlugin: {
		inspector: true,
		experimental: {
			// This will suppress the warning
			disableLegacyReactivityWarnings: true
		}
	}
};

export default config;
