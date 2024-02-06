import hooks from 'eslint-plugin-react-hooks';

export default [
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
      'react-hooks': hooks,
    },
    rules: hooks.configs.recommended.rules,
  },
];
