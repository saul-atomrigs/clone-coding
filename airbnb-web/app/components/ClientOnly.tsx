"use client"

import React, { useState, useEffect } from "react"

interface ClientOnlyProps {
 children: React.ReactNode
}

/**
 * Used to ensure that its children is only rendered on the client side.
 * 감싸주는 children이  Client Side에서만 렌더링 되도록 합니다.
 */
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
 const [hasMounted, setHasMounted] = useState(false)

 useEffect(() => {
  setHasMounted(true)
 }, [])

 if (!hasMounted) return null

 return <>{children}</>
}

export default ClientOnly
