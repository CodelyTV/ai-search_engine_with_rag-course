import eslintConfigCodely from "eslint-config-codely";

export default [
	...eslintConfigCodely.course,
	{
		files: ["**/**.ts"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "error",
		},
	},
];
