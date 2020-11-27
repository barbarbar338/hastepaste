const { withPlugins } = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const nextProgressBar = require("next-progressbar");

module.exports = withPlugins([
	[optimizedImages, { optimizeImages: false }],
	[withCss],
	[withSass],
	[nextProgressBar, { progressBar: { profile: false } } ],
], {
	dir: "src",
	distDir: "../dist"
});
