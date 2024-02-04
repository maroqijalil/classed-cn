import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import sort from "eslint-plugin-sort";
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: ["**/.*.js", "**/node_modules/", "**/dist/"],
    plugins: { "only-warn": onlyWarn },
  },
  {
    files: ["**/*.js?(x)", "**/*.ts?(x)"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.eslint.json",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      ts,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
    },
  },
  prettier,
  sort.configs["flat/recommended"],
  ...compat.extends("eslint-config-turbo"),
];
