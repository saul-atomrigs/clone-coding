'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export type AuthContextProps = {
  children: ReactNode;
};

export default function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
