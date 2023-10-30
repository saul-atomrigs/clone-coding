# Facebook(Meta) Messenger Clone

## 📌 Demo (주요 기능)
### Social Login
![sc01](https://github.com/saul-atomrigs/clone-coding-projects/assets/82362278/9ac4ce2e-4c10-454b-9c3c-7aa79391aaba)

### Start Conversation
![sc02](https://github.com/saul-atomrigs/clone-coding-projects/assets/82362278/8377ccf6-c8e9-477e-899a-b8b0acd5aaec)

### Mobile Friendly
![sc03](https://github.com/saul-atomrigs/clone-coding-projects/assets/82362278/bbf35d6c-6da0-40e9-871a-9b113d553050)

## 📌 Tech Stack
- 언어: Typescript
- 프론트엔드: Next.js 13
- 스타일링: Tailwindcss
- 상태관리: zustand 
- 백엔드: node.js (v.16.17.1)
- DB: MongoDB
- 채팅 API: pusher
- 인증: NextAuth (Google, Github 소셜로그인)
- 이미지: Cloudinary CDN

## 📌 Directory
```markdown
 ┣ 📂 app
 ┃ ┣ 📂 (site)
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┣ 📜 AuthForm.tsx // 인증 폼 (이메일, 비밀번호 또는 소셜로그인)
 ┃ ┃ ┃ ┣ 📜 AuthSocialButton.tsx // 소셜 로그인 버튼 ('google' | 'github')
 ┃ ┃ ┣ 📜 page.tsx // 메신저 로고, AuthForm
 ┃ ┣ 📂 actions // 
 ┃ ┃ ┣ 📜 getConversationById.ts // ID 별로 채팅방을 불러옵니다 
 ┃ ┃ ┣ 📜 getConversations.ts // 현재 유저별로 채팅방들을 불러옵니다
 ┃ ┃ ┣ 📜 getCurrentUser.ts // 세션에 저장된 현재 유저의 이메일에 해당하는 유저 정보를 MongoDB에서 불러옵니다
 ┃ ┃ ┣ 📜 getMessages.ts // 채팅방 ID 별로 모든 메시지(대화)를 불러옵니다 
 ┃ ┃ ┣ 📜 getSession.ts // 서버 세션을 불러옵니다
 ┃ ┃ ┣ 📜 getUsers.ts // 현재 유저(본인)을 제외한 모든 유저들을 불러옵니다
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┣ 📂 [...nextauth]
 ┃ ┃ ┃ ┃ ┣ 📂 route.ts // next-auth에 필요한 인증 설정
 ┃ ┃ ┣ 📂 conversations
 ┃ ┃ ┃ ┣ 📂 [conversationId]
 ┃ ┃ ┃ ┃ ┣ 📂 seen
 ┃ ┃ ┃ ┃ ┃ ┣ 📂 route.ts
 ┃ ┃ ┃ ┃ ┣ 📂 route.ts
 ┃ ┃ ┃ ┣ 📜 route.ts
 ┃ ┃ ┣ 📂 messages
 ┃ ┃ ┃ ┣ 📜 route.ts // 새로운 메시지를 만들고 채팅 목록을 업데이트합니다 (POST)
 ┃ ┃ ┣ 📂 register
 ┃ ┃ ┃ ┣ 📜 route.ts // 새 유저를 생성합니다 (POST)
 ┃ ┃ ┣ 📂 settings
 ┃ ┃ ┃ ┣ 📜 route.ts // 유저의 프로필사진 및 이름을 업데이트합니다
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 inputs
 ┃ ┃ ┃ ┣ 📜 Input.tsx // label + input로 구성된 입력 창 컴포넌트
 ┃ ┃ ┃ ┣ 📜 Select.tsx // label + select로 구성된 셀렉트 컴포넌트
 ┃ ┃ ┣ 📂 modals
 ┃ ┃ ┃ ┣ 📜 GroupChatModal.tsx // 단체채팅방을 만들기 위한 모달창 컴포넌트
 ┃ ┃ ┃ ┣ 📜 LoadingModal.tsx // 로딩 중일 때 띄우는 모달창 컴포넌트
 ┃ ┃ ┃ ┣ 📜 Modal.tsx // 일반 모달창 컴포넌트
 ┃ ┃ ┣ 📂 sidebar
 ┃ ┃ ┃ ┣ 📜 DesktopItem.tsx // 데스크탑 화면 전용 아이템 컴포넌트
 ┃ ┃ ┃ ┣ 📜 DesktopSidebar.tsx // 데스크탑 화면 전용 사이드바 컴포넌트 (DesktopItem 목록)
 ┃ ┃ ┃ ┣ 📜 MobileFooter.tsx // 모바일 화면 전용 푸터 컴포넌트 (MobileItem 목록)
 ┃ ┃ ┃ ┣ 📜 MobileItem.tsx // 모바일 화면 전용 아이템 컴포넌트 
 ┃ ┃ ┃ ┣ 📜 SettingsModal.tsx // 유저 정보(프로필사진,이름) 업데이트 위한 모달창 컴포넌트
 ┃ ┃ ┃ ┣ 📜 Sidebar.tsx // DesktopSidebar, MobileFooter, main 
 ┃ ┃ ┣ 📜 ActiveStatus.tsx // useActiveChannel hook
 ┃ ┃ ┣ 📜 Avatar.tsx // 유저 프로필사진, 접속중 여부(isActive)
 ┃ ┃ ┣ 📜 AvatarGroup.tsx // 아바타 3개
 ┃ ┃ ┣ 📜 Button.tsx // 버튼 컴포넌트
 ┃ ┃ ┣ 📜 EmptyState.tsx // 아무것도 보여줄 것이 없을 때를 위한 fallback 컴포넌트
 ┃ ┣ 📂 context
 ┃ ┃ ┣ 📜 AuthContext.tsx // 현재 유저 세션을 전역에 유지합니다
 ┃ ┃ ┣ 📜 ToasterContext.tsx // 토스트 알림 컴포넌트를 위한 전역 컨테이너
 ┃ ┣ 📂 conversations
 ┃ ┃ ┣ 📂 [conversationId] // 각 채팅ID 별 컴포넌트
 ┃ ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┃ ┣ 📜 Body.tsx //  채팅방(MessageBox) 목록을 보여주는 UI. 메시지 업데이트 및 스크롤 기능을 제공합니다.
 ┃ ┃ ┃ ┃ ┣ 📜 ConfirmModal.tsx // 삭제 여부를 묻는 모달 창
 ┃ ┃ ┃ ┃ ┣ 📜 Form.tsx // 채팅 입력창 
 ┃ ┃ ┃ ┃ ┣ 📜 Header.tsx // 대화창 헤더 
 ┃ ┃ ┃ ┃ ┣ 📜 ImageModal.tsx // 이미지를 보여주는 모달 창 
 ┃ ┃ ┃ ┃ ┣ 📜 MessageBox.tsx // 메시지 버블 UI
 ┃ ┃ ┃ ┃ ┣ 📜 MessageInput.tsx // 채팅 입력창 전체 UI (메시지 입력창 + 보내기 버튼) 
 ┃ ┃ ┃ ┃ ┣ 📜 ProfileDrawer.tsx // 유저 프로필을 보여주는 Drawer
 ┃ ┃ ┃ ┣ 📂 seen
 ┃ ┃ ┃ ┃ ┣ 📜 route.ts // 채팅 생성을 위한 POST 요청
 ┃ ┃ ┃ ┣ 📜 page.tsx // 채팅방 UI
 ┃ ┃ ┃ ┣ 📜 route.ts // 채팅방 생성을 위한 POST 요청
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 layout.tsx
 ┃ ┃ ┣ 📜 loading.tsx
 ┃ ┃ ┣ 📜 page.tsx
 ┃ ┣ 📂 hooks
 ┃ ┃ ┣ 📜 useActiveChannel.ts
 ┃ ┃ ┣ 📜 useActiveList.ts
 ┃ ┃ ┣ 📜 useConversation.ts
 ┃ ┃ ┣ 📜 useOtherUser.ts
 ┃ ┃ ┣ 📜 useRoutes.ts
 ┃ ┃ ┣ 📜 useSidebar.ts
 ┃ ┣ 📂 libs
 ┃ ┃ ┣ 📜 prismadb.ts
 ┃ ┃ ┣ 📜 pusher.ts
 ┃ ┣ 📂 types
 ┃ ┃ ┣ 📜 index.ts
 ┃ ┣ 📂 users
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 layout.tsx
 ┃ ┃ ┣ 📜 loading.tsx
 ┃ ┃ ┣ 📜 page.tsx
 ┃ ┣ 📜 globals.css
 ┃ ┣ 📜 layout.tsx
 ┣ 📂 pages
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📂 pusher
 ┃ ┃ ┃ ┣ 📂 auth.ts
 ┣ 📂 prisma
 ┃ ┣ 📂schema.prisma
 ┣ 📂 public
 ┃ ┣ 📂images
 ┃ ┣ 📂icons
```

## 📌 Installation
Node v14 이상이 필요해요

레포지토리를 `clone` 해주세요
```
git clone https://github.com/saul-atomrigs/clone-coding-projects.git
cd messenger-web
```

Dependencies 설치를 해주세요
```
npm i
or
yarn
```

환경변수를 `.env` 파일에 추가해주세요
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
개발 모드를 실행해주세요 (`localhost:3000`)
```
npm run dev
or
yarn dev
```

## 📌 Debugging History (이슈, 버그, 개선)

### [에러] The `app` directory is experimental. To enable, add `appDir: true` to your `next.config.js` configuration under `experimental`. July 19, 2023 

- [해결] `next.config.js` 에 `appDir: true` 추가

- [출처] https://nextjs.org/docs/messages/experimental-app-dir-config


### [에러] Error: The default export is not a React Component in page: "/”. July 19, 2023 

- [해결] `page.tsx` 함수를 `export default` 해주기

- [출처] [https://itprogramming119.tistory.com/entry/The-default-export-is-not-a-React-Component-in-page-해결-방법](https://itprogramming119.tistory.com/entry/The-default-export-is-not-a-React-Component-in-page-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)


### [에러] `Sidebar` cannot be used as a JSX component. Its return type is not a valid JSX element. August 3, 2023 

- [해결] `// @ts-expect-error Server Component`
