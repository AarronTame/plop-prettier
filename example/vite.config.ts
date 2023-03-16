const vitest = require("vitest/config");

// https://vitejs.dev/config/
export default vitest.defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
	},
});
