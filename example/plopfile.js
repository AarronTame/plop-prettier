module.exports = async function (
	/** @type {import('plop').NodePlopAPI} */
	plop
) {
	await plop.load("../dist/index.js");

	plop.setGenerator("controller", {
		description: "application controller logic",
		prompts: [],
		actions: [
			{
				type: "add",
				path: "index.ts",
				templateFile: "plop-templates/test.hbs",
				force: true,
			},
			{
				type: "prettier",
				path: "index.ts",
			},
		],
	});
};
