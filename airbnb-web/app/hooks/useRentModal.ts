import { create } from "zustand"

interface RentModalStore {
 isOpen: boolean
 onOpen: () => void
 onClose: () => void
}

/**
 * Rent modal store
 * Rent 모달을 위한 전역 상태 관리
 */
const useRentModal = create<RentModalStore>((set) => ({
 isOpen: false,
 onOpen: () => set({ isOpen: true }),
 onClose: () => set({ isOpen: false }),
}))

export default useRentModal
