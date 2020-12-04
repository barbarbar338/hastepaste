/* eslint-disable */
const { withPlugins } = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withPlugins([
	[optimizedImages, { optimizeImages: false }],
	[withCss],
	[withSass],
], {
	dir: "src",
	distDir: "../dist"
});
