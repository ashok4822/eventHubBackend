import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Ignore compiled output and config files
  {
    ignores: ["dist/**", "**/*.js"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Disable base rule — the TS-aware rule handles this for .ts files
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          // Ignore anything prefixed with underscore (intentionally unused)
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
