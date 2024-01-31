import js from "@eslint/js";
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from "eslint-config-prettier";
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    ignores: ['dist'],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': ts,
      ts
    },
    rules: {
      ...ts.configs['eslint-recommended'].rules,
      ...ts.configs['recommended'].rules
    }
  },
  {
    plugins: {
      'react-hooks': hooks
    },
    rules: hooks.configs.recommended.rules
  },
  prettier
]