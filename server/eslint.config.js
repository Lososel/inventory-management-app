import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        console: true,
        process: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettier,
];
