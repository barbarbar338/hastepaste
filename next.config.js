/* eslint-disable */
const { withPlugins } = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withYAML = require("next-yaml");

module.exports = withPlugins(
	[[optimizedImages, { optimizeImages: false }], [withYAML]],
	{
		cssModules: true,
		i18n: {
			locales: ["en", "tr"],
			defaultLocale: "en",
		},
		redirects: async () => [
			{
				source: "/github",
				destination: "https://github.com/HastePasteApp/",
				permanent: true,
			},
			{
				source: "/crowdin",
				destination: "https://crowdin.com/project/hastepaste",
				permanent: true,
			},
			{
				source: "/status",
				destination: "https://status.hastepaste.xyz",
				permanent: true,
			},
		],
	},
);
