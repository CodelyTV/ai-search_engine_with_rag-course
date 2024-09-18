import eslintConfigNext from "@next/eslint-plugin-next";
import eslintConfigCodely from "eslint-config-codely";
import globals from "globals";

export default [
	...eslintConfigCodely.course,
	{
		files: ["**/**.ts"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "error",
		},
	},
	{
		...eslintConfigNext.configs.recommended,
		plugins: {
			"@next/next": eslintConfigNext,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},
	},
	{
		files: ["**/*.tsx"],
		rules: {
			"import/no-unresolved": "off",
		},
	},
];
