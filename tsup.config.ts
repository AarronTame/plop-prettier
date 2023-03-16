import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: true,
	format: ["esm"],
	minify: true,
	skipNodeModulesBundle: true,
	entryPoints: ["./src/index.ts"],
	target: "es2016",
	outDir: "dist",
	sourcemap: false,
	entry: ["./src/index.ts"],
	minifyWhitespace: true,
});
