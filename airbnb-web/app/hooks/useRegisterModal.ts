import { create } from "zustand"

interface RegisterModalStore {
 isOpen: boolean
 onOpen: () => void
 onClose: () => void
}

/**
 * Register modal store
 * 회원가입 모달을 위한 전역 상태 관리
 */
const useRegisterModal = create<RegisterModalStore>((set) => ({
 isOpen: false,
 onOpen: () => set({ isOpen: true }),
 onClose: () => set({ isOpen: false }),
}))

export default useRegisterModal
