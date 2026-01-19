/**
 * Prettier 설정
 * @see https://prettier.io/docs/en/configuration.html
 */

/** @type {import("prettier").Config} */
const config = {
  // 기본 포맷팅 규칙
  semi: true, // 세미콜론 사용
  singleQuote: true, // 작은따옴표 사용
  tabWidth: 2, // 탭 너비 2칸
  trailingComma: 'es5', // ES5 호환 trailing comma
  printWidth: 80, // 줄 최대 길이
  useTabs: false, // 탭 대신 스페이스 사용

  // JSX 관련 설정
  jsxSingleQuote: false, // JSX에서는 큰따옴표 사용
  bracketSameLine: false, // JSX 닫는 괄호 새 줄에 배치

  // 기타 설정
  endOfLine: 'lf', // Unix 스타일 줄바꿈
  arrowParens: 'always', // 화살표 함수 괄호 항상 사용

  // Tailwind CSS 클래스 자동 정렬 (prettier-plugin-tailwindcss)
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'clsx'], // cn, clsx 함수 내 클래스도 정렬
};

export default config;
