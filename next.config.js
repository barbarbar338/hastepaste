"use strict";

const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextComposePlugins = require("next-compose-plugins");

const nextAlias = require("@blunck/next-alias");
const nextCss = require("@zeit/next-css");
const nextImages = require("next-images");
const nextLess = require("@zeit/next-less");
const nextProgressBar = require("next-progressbar");
const nextSass = require("@zeit/next-sass");
const nextSize = require("next-size");
const nextSourceMaps = require("@zeit/next-source-maps");
const nextTranspileModules = require("next-transpile-modules");

const nextBundleAnalyzer = ({ enabled = true }) => (nextConfig = {}) => ({
	...nextConfig,
	webpack(config, options) {
		const { isServer } = options;
		const { bundleAnalyzer: bundleAnalyzerOptions = {} } = nextConfig;

		if (enabled) {
			const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

			config.plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: "static",
					reportFilename: isServer
						? "../analyze/server.html"
						: "./analyze/client.html",
					...bundleAnalyzerOptions,
				}),
			);
		}

		if (typeof nextConfig.webpack === "function") {
			return nextConfig.webpack(config, options);
		}

		return config;
	},
});

const nextConfigDebugger = ({ enabled = false }) => (nextConfig = {}) => ({
	...nextConfig,
	webpack(config, options) {
		if (enabled) {
			const util = require("util");

			console.log("NEXT");
			console.log(util.inspect(nextConfig, { showHidden: false, depth: 7 }));
			console.log();
			console.log("WEBPACK");
			console.log(util.inspect(config, { showHidden: false, depth: 7 }));

			process.exit();
		}

		if (typeof nextConfig.webpack === "function") {
			return nextConfig.webpack(config, options);
		}

		return config;
	},
});

const nextMaxify = ({ enabled }) => (nextConfig = {}) => ({
	...nextConfig,
	webpack(config, options) {
		if (enabled) {
			config.optimization.minimize = false;
		}

		if (typeof nextConfig.webpack === "function") {
			return nextConfig.webpack(config, options);
		}

		return config;
	},
});

const nextSvgr = (nextConfig = {}) => ({
	...nextConfig,
	webpack(config, options) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack", "url-loader"],
		});

		if (typeof nextConfig.webpack === "function") {
			return nextConfig.webpack(config, options);
		}

		return config;
	},
});

const patchStylesheetPlugin = (plugin) => (nextConfig = {}) => {
	const STYLESHEET_LOADER_REGEXP = /^(css|less|sass|stylus)-loader.*/;

	const pluginNextConfig = plugin({
		...nextConfig,
		experimental: {
			...nextConfig.experimental,
			css: false,
		},
		cssModules: true, // required for SSR
		webpack: null, // skip chaining
	});

	const pluginWebpackFn = pluginNextConfig.webpack;
	pluginNextConfig.webpack = function (config, options) {
		const { isServer } = options;

		const originalModuleRules = config.module.rules;
		config.module.rules = [];
		pluginWebpackFn.apply(this, [config, options]);
		const stylesheetModuleRules = config.module.rules;
		config.module.rules = originalModuleRules;

		for (const rule of stylesheetModuleRules) {
			const ruleFixedRegexp = new RegExp(
				"(?:prevent monkey patching){0}" + rule.test.source,
			);
			const ruleModuleRegexp = new RegExp("\\.module" + rule.test.source);

			const nonModularRule = {
				...rule,
				test: ruleFixedRegexp,
				exclude: ruleModuleRegexp,
				sideEffects: true,
				// restore plugin's SSR optimization
				use: isServer
					? ["ignore-loader"]
					: rule.use.map((useEntry) => {
							if (STYLESHEET_LOADER_REGEXP.test(useEntry.loader)) {
								useEntry = {
									...useEntry,
									options: {
										...useEntry.options,
										modules: false,
									},
								};
							}

							return useEntry;
					  }),
			};

			const modularRule = {
				...rule,
				test: ruleModuleRegexp,
				use: rule.use.map((useEntry) => {
					if (STYLESHEET_LOADER_REGEXP.test(useEntry.loader)) {
						useEntry = {
							...useEntry,
							options: {
								...useEntry.options,
								importLoaders: 1,
								modules: true,
								localIdentName: "[local]___[hash:base64:5]",
							},
						};
					}

					return useEntry;
				}),
			};

			config.module.rules.push(nonModularRule, modularRule);
		}

		if (typeof nextConfig.webpack === "function") {
			return nextConfig.webpack(config, options);
		}

		return config;
	};

	return pluginNextConfig;
};

const nextModularCss = patchStylesheetPlugin(nextCss);
const nextModularLess = patchStylesheetPlugin(nextLess);
const nextModularSass = patchStylesheetPlugin(nextSass);

module.exports = (phase, { defaultConfig }) => {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;

	const config = {
		dir: "src",
		distDir: "../dist",
	};

	if (isDev) {
		/* ... */
	}

	const plugins = [
		[nextConfigDebugger({ enabled: process.env.DEBUG_CONFIG === "true" })],

		[nextModularCss, {}],
		[
			nextModularLess,
			{
				lessLoaderOptions: { javascriptEnabled: true },
			},
		],
		[nextModularSass, {}],

		[nextImages, { exclude: /\.svg$/ }],
		[nextSvgr],

		[
			nextAlias({
				"@": path.join(__dirname, "src"),
			}),
		],
		[
			nextTranspileModules,
			{
				transpileModules: [],
			},
		],

		[
			nextBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
			{
				bundleAnalyzer: { openAnalyzer: false },
			},
		],
		[nextMaxify({ enabled: process.env.MINIFY === "false" })],
		[
			nextProgressBar,
			{
				progressBar: { profile: false },
			},
		],
		[nextSize],
		[nextSourceMaps({})],
	];

	const pluginsConfig = nextComposePlugins(plugins, config)(phase, {
		defaultConfig,
	});

	return pluginsConfig;
};
