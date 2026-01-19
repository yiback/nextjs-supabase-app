import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js 권장 설정
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Prettier와 충돌하는 ESLint 규칙 비활성화 (반드시 마지막에 위치)
  ...compat.extends('prettier'),

  // 커스텀 규칙
  {
    rules: {
      // TypeScript 관련
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // React 관련
      'react/prop-types': 'off', // TypeScript 사용 시 불필요
      'react/react-in-jsx-scope': 'off', // Next.js에서 불필요

      // 일반 규칙
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // 특정 파일/폴더 무시
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'build/',
      'coverage/',
      '*.config.js',
      '*.config.mjs',
    ],
  },
];

export default eslintConfig;
