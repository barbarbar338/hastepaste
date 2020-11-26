module.exports = {
	transform: {
		"^.+\\.(t|j)sx?$": "ts-jest",
	},
	modulePathIgnorePatterns: ["/~~", "~~/"],
	testPathIgnorePatterns: ["/node_modules/", "/~~", "~~/"],
	testRegex: "(/src/__tests__/.*|(/src/.*)(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/src/__mocks__/assets.js",
		"\\.(css|less|scss|html)$": "<rootDir>/src/__mocks__/styles.js",
		"^@/$": "<rootDir>/src",
	},
	setupFiles: ["<rootDir>/jest.setup.ts"],
	globals: {
		"ts-jest": {
			tsConfig: "jest.tsconfig.json",
		},
	},
};
