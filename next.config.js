/* eslint-disable */
const { withPlugins } = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withYAML = require("next-yaml");

module.exports = withPlugins(
	[[optimizedImages, { optimizeImages: false }], [withYAML]],
	{
		cssModules: true,
		target: "serverless",
		i18n: {
			locales: [ "en", "tr", "ru" ],
			defaultLocale: "en",
		}
	},
);
