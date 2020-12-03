module.exports = {
	purge: [ "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}" ],
	darkMode: "media",
	theme: {
		extend: {
			colors: {
				"lapis": {
					"100": "#dae8fd",
					"200": "#b6d1fa",
					"300": "#91bbf8",
					"400": "#6da4f5",
					"500": "#488df3",
					"600": "#3a71c2",
					"700": "#2b5592",
					"800": "#1d3861",
					"900": "#0e1c31"
				},
			},
		},
	},
	variants: {
	extend: {},
	},
	plugins: [],
}
  