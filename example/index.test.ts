import fs from "node:fs";
import path from "node:path";

import { it, expect } from "vitest";

it("formatted", () => {
	const filepath = path.join(process.cwd(), "index.ts");
	const fileContent = fs.readFileSync(filepath, "utf-8");

	// Make sure we exclude any whitespace
	const trimmed = fileContent.trim();

	expect(trimmed).toMatch(/const thing = "hello world";/);
	expect(trimmed.charAt(trimmed.length - 1)).toBe(";");
});
