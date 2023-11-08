"use client"

import { Toaster } from "react-hot-toast"

/**
 * <Toaster /> 를 바로 사용하지 않고 ToasterProvider를 만든 이유:
 * react-hot-toast는 nextjs 외부 라이브러리이다.
 * Nextjs app안에서 사용하려면 ‘use client’ 문구가 포함되어야 한다.
 * 따라서 Toaster컴포넌트를 감싸는 클라이언트 컴포넌트를 만들어 줌으로서 nextjs에서도 사용가능하게 된다.
 */
const ToasterProvider = () => {
 return <Toaster />
}

export default ToasterProvider
