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

## Directory
```markdown
ㄴ app
  ㄴ (site)
      ㄴ components
          ㄴ AuthForm.tsx // 인증 폼 (이메일, 비밀번호 또는 소셜로그인)
          ㄴ AuthSocialButton.tsx // 소셜 로그인 버튼 ('google' | 'github')
      ㄴ page.tsx // 메신저 로고, AuthForm 
  ㄴ actions // 
      ㄴ getConversationById.ts // ID 별로 채팅방을 불러옵니다 
      ㄴ getConversations.ts // 현재 유저별로 채팅방들을 불러옵니다
      ㄴ getCurrentUser.ts // 세션에 저장된 현재 유저의 이메일에 해당하는 유저 정보를 MongoDB에서 불러옵니다
      ㄴ getMessages.ts // 채팅방 ID 별로 모든 메시지(대화)를 불러옵니다 
      ㄴ getSession.ts // 서버 세션을 불러옵니다
      ㄴ getUsers.ts // 현재 유저(본인)을 제외한 모든 유저들을 불러옵니다
  ㄴ api
      ㄴ auth
          ㄴ [...nextauth]
                  ㄴ route.ts // next-auth에 필요한 인증 설정
      ㄴ conversations
          ㄴ [conversationId]
                  ㄴ seen
                      ㄴ route.ts
                  ㄴ route.ts
          ㄴ route.ts
      ㄴ messages
          ㄴ route.ts // 새로운 메시지를 만들고 채팅 목록을 업데이트합니다 (POST)
      ㄴ register
          ㄴ route.ts // 새 유저를 생성합니다 (POST)
      ㄴ settings
          ㄴ route.ts // 유저의 프로필사진 및 이름을 업데이트합니다
  ㄴ components
      ㄴ inputs
          ㄴ Input.tsx // label + input로 구성된 입력 창 컴포넌트
          ㄴ Select.tsx // label + select로 구성된 셀렉트 컴포넌트
      ㄴ modals
          ㄴ GroupChatModal.tsx // 단체채팅방을 만들기 위한 모달창 컴포넌트
          ㄴ LoadingModal.tsx // 로딩 중일 때 띄우는 모달창 컴포넌트
          ㄴ Modal.tsx // 일반 모달창 컴포넌트
      ㄴ sidebar
          ㄴ DesktopItem.tsx // 데스크탑 화면 전용 아이템 컴포넌트
          ㄴ DesktopSidebar.tsx // 데스크탑 화면 전용 사이드바 컴포넌트 (DesktopItem 목록)
          ㄴ MobileFooter.tsx // 모바일 화면 전용 푸터 컴포넌트 (MobileItem 목록)
          ㄴ MobileItem.tsx // 모바일 화면 전용 아이템 컴포넌트 
          ㄴ SettingsModal.tsx // 유저 정보(프로필사진,이름) 업데이트 위한 모달창 컴포넌트
          ㄴ Sidebar.tsx // DesktopSidebar, MobileFooter, main 
      ㄴ ActiveStatus.tsx // useActiveChannel hook
      ㄴ Avatar.tsx // 유저 프로필사진, 접속중 여부(isActive)
      ㄴ AvatarGroup.tsx // 아바타 3개
      ㄴ Button.tsx // 버튼 컴포넌트
      ㄴ EmptyState.tsx // 아무것도 보여줄 것이 없을 때를 위한 fallback 컴포넌트
  ㄴ context
      ㄴ AuthContext.tsx // 현재 유저 세션을 전역에 유지합니다
      ㄴ ToasterContext.tsx // 토스트 알림 컴포넌트를 위한 전역 컨테이너
  ㄴ conversations
      ㄴ [conversationId] // 
      ㄴ components
      ㄴ layout.tsx
      ㄴ loading.tsx
      ㄴ page.tsx
  ㄴ hooks
      ㄴ useActiveChannel.ts
      ㄴ useActiveList.ts
      ㄴ useConversation.ts
      ㄴ useOtherUser.ts
      ㄴ useRoutes.ts
      ㄴ useSidebar.ts
  ㄴ libs
      ㄴ prismadb.ts
      ㄴ pusher.ts
  ㄴ types
      ㄴ index.ts
  ㄴ users
      ㄴ components
      ㄴ layout.tsx
      ㄴ loading.tsx
      ㄴ page.tsx
  ㄴ globals.css
  ㄴ layout.tsx
ㄴ pages
  ㄴ api
      ㄴ pusher
          ㄴ auth.ts
ㄴ prisma
  ㄴ schema.prisma
ㄴ public
  ㄴ images
  ㄴ icons
```

## Installation
### Prerequisites
Node v14.x

### Install packages
```
npm i // or yarn
```
### .env file
```
DATABASE_URL=
MONGODB_PW=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
### Start the app
```
npm run dev // or yarn dev
```

## Debugging (이슈, 버그, 개선)

### [에러] The `app` directory is experimental. To enable, add `appDir: true` to your `next.config.js` configuration under `experimental`. July 19, 2023 

- [해결] `next.config.js` 에 `appDir: true` 추가

- [출처] https://nextjs.org/docs/messages/experimental-app-dir-config


### [에러] Error: The default export is not a React Component in page: "/”. July 19, 2023 

- [해결] `page.tsx` 함수를 `export default` 해주기

- [출처] [https://itprogramming119.tistory.com/entry/The-default-export-is-not-a-React-Component-in-page-해결-방법](https://itprogramming119.tistory.com/entry/The-default-export-is-not-a-React-Component-in-page-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)


### [에러] `Sidebar` cannot be used as a JSX component. Its return type is not a valid JSX element. August 3, 2023 

- [해결] `// @ts-expect-error Server Component`
