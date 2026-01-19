# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- 기본 응답 언어: 한국어
- 코드 주석: 한국어로 작성
- 커밋 메시지: 한국어로 작성
- 문서화: 한국어로 작성
- 변수명/함수명: 영어 (코드 표준 준수)

## 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 환경변수

`.env.local` 파일에 필수:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase publishable/anon 키

## 아키텍처

Next.js App Router 기반 프로젝트로, Supabase 인증을 쿠키 기반 세션으로 처리합니다.

### Supabase 클라이언트 설정 (lib/supabase/)

세 가지 컨텍스트별 Supabase 클라이언트:

- `client.ts` - 클라이언트 컴포넌트용 브라우저 클라이언트 (`createBrowserClient` 사용)
- `server.ts` - Server Components, Route Handlers, Server Actions용 서버 클라이언트 (`createServerClient` + 쿠키 처리)
- `proxy.ts` - 미들웨어용 클라이언트, `updateSession()`으로 세션 갱신 및 미인증 사용자를 `/auth/login`으로 리다이렉트

**중요**: 요청마다 새로운 Supabase 클라이언트 인스턴스를 생성해야 합니다 (특히 Fluid compute 환경). 절대 전역 변수에 저장하지 마세요.

### 라우트 구조

- `/` - 공개 홈페이지
- `/auth/*` - 인증 관련 (login, sign-up, forgot-password, update-password, confirm, error)
- `/protected/*` - 인증 필요 라우트

### 인증 플로우

`@supabase/ssr`을 사용한 쿠키 기반 인증. proxy(`lib/supabase/proxy.ts`)가 세션을 갱신하고 미인증 사용자를 리다이렉트합니다. 인증 폼은 클라이언트 컴포넌트에서 Supabase auth 메서드를 직접 호출합니다.

### UI 컴포넌트

shadcn/ui (new-york 스타일) + Tailwind CSS 사용. 컴포넌트는 `components/ui/`에 위치. 클래스 병합 시 `lib/utils.ts`의 `cn()` 유틸리티 사용.

shadcn 컴포넌트 추가:

```bash
npx shadcn@latest add <component-name>
```

### Path Aliases

`@/*`는 프로젝트 루트를 가리킵니다 (tsconfig.json에서 설정).
