/* eslint-disable */
const { withPlugins } = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withYAML = require("next-yaml");

module.exports = withPlugins(
	[[optimizedImages, { optimizeImages: false }], [withYAML]],
	{
		dir: "src",
		distDir: "../dist",
		cssModules: true,
		i18n: {
			locales: ["en", "tr"],
			defaultLocale: "en",
			domains: [
				{
					domain: "localhost:3000",
					defaultLocale: "en"
				},
				{
					domain: "hastepaste.xyz",
					defaultLocale: "en"
				},
				/*
				{
					domain: "localhost:3000",
					defaultLocale: "tr"
				},
				{
					domain: "hastepaste.xyz",
					defaultLocale: "tr"
				}
				*/
			]
		}
	},
);
