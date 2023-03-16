import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";
import type { CustomActionFunction, NodePlopAPI } from "plop";

const formatFile = (filepath: string, config: prettier.Options) => {
	const fileContent = fs.readFileSync(filepath, "utf8");
	const result = prettier.format(fileContent, { ...config, filepath: filepath });
	fs.writeFileSync(filepath, result, { encoding: "utf-8" });
};

const prettierAction: CustomActionFunction = async (answers, config, plopInstance) => {
	try {
		if (config && config.path && plopInstance) {
			const pConfig = await prettier.resolveConfig(process.cwd());
			if (!pConfig) throw new Error("prettier config cannot be found");

			const basePath = plopInstance.getDestBasePath();

			const pathStringsToRender = Array.isArray(config.path) ? config.path : [config.path];
			const paths = pathStringsToRender.map((configPath) =>
				path.join(basePath, plopInstance.renderString(configPath, answers))
			);

			for (let pathname of paths) {
				const isDirectory = fs.lstatSync(pathname).isDirectory();

				if (isDirectory) {
					const files = fs.readdirSync(pathname, "utf-8");

					for (let file of files) {
						const filepath = path.join(pathname, file);
						formatFile(filepath, pConfig);
					}
				} else {
					formatFile(pathname, pConfig);
				}
			}

			return "code formatted";
		}
	} catch (error) {
		return "formatting failed";
	}

	return "formatting skipped";
};

export default (plop: NodePlopAPI) => {
	plop.setDefaultInclude({ actionTypes: true });
	plop.setActionType("prettier", prettierAction);
};
