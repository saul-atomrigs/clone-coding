# Facebook(Meta) Messenger Clone

## Tech Stack
- 언어: Typescript
- 프론트엔드: Next.js 13
- 스타일링: Tailwindcss
- 상태관리: zustand 
- 백엔드: node.js (v.16.17.1)
- DB: MongoDB
- 채팅 API: pusher
- 인증: NextAuth (Google, Github 소셜로그인)
- 이미지: Cloudinary CDN

## Debugging (이슈, 버그, 개선)

### [에러] The `app` directory is experimental. To enable, add `appDir: true` to your `next.config.js` configuration under `experimental`. July 19, 2023 

- [해결] `next.config.js` 에 `appDir: true` 추가

- [출처] https://nextjs.org/docs/messages/experimental-app-dir-config


### [에러] Error: The default export is not a React Component in page: "/”. July 19, 2023 

- [해결] `page.tsx` 함수를 `export default` 해주기

- [출처] [https://itprogramming119.tistory.com/entry/The-default-export-is-not-a-React-Component-in-page-해결-방법](https://itprogramming119.tistory.com/entry/The-default-export-is-not-a-React-Component-in-page-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)


### [에러] `Sidebar` cannot be used as a JSX component. Its return type is not a valid JSX element. August 3, 2023 

- [해결] `// @ts-expect-error Server Component`
