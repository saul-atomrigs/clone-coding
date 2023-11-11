import { create } from "zustand"

interface LoginModalStore {
 isOpen: boolean
 onOpen: () => void
 onClose: () => void
}

/**
 * Login modal store
 * 로그인 모달을 위한 전역 상태 관리
 */
const useLoginModal = create<LoginModalStore>((set) => ({
 isOpen: false,
 onOpen: () => set({ isOpen: true }),
 onClose: () => set({ isOpen: false }),
}))

export default useLoginModal
