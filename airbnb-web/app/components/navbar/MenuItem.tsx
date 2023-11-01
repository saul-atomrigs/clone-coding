"use client"

interface MenuItemProps {
 onClick: () => void
 label: string
}

/**
 * Main menu item
 * 메인 메뉴 아이템입니다
 */
const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
 return (
  <div
   onClick={onClick}
   className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      ">
   {label}
  </div>
 )
}

export default MenuItem
