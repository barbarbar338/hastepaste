/* eslint-disable */
const { withPlugins } = require("next-compose-plugins");
const withYAML = require("next-yaml");

module.exports = withPlugins([[withYAML]], {
	cssModules: true,
	i18n: {
		locales: ["en", "tr", "ru"],
		defaultLocale: "en",
	},
	images: {
		domains: ["cdn.discordapp.com", "avatars.githubusercontent.com"],
	},
	async redirects() {
		return [
			{
				source: "/github",
				destination: "https://github.com/barbarbar338/hastepaste",
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
		];
	},
});
