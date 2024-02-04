import hooks from "eslint-plugin-react-hooks";
import baseConfig from "../../eslint.config";

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        React: true,
        JSX: true,
      },
    },
  },
  {
    plugins: {
      "react-hooks": hooks,
    },
    rules: hooks.configs.recommended.rules,
  },
];
