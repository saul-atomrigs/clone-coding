"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

/**
 * Main home logo. Clicking on it will take you to the home page.
 * 메인 홈 로고. 클릭하면 홈 페이지(/)로 이동합니다.
 */
const Logo = () => {
 const router = useRouter()

 return (
  <Image
   onClick={() => router.push("/")}
   className="hidden md:block cursor-pointer"
   src="/images/logo.png"
   height="100"
   width="100"
   alt="Logo"
  />
 )
}

export default Logo
