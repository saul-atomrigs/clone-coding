import { SafeUser } from "@/app/types"

import Categories from "./Categories"
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

interface NavbarProps {
 currentUser?: SafeUser | null
}

/**
 * Main navbar on top of the page.
 * 화면 상단에 있는 메인 navbar 입니다.
 */
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
 return (
  <div className="fixed w-full bg-white z-10 shadow-sm">
   <div
    className="
          py-4 
          border-b-[1px]
        ">
    <Container>
     <div
      className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          ">
      <Logo />
      <Search />
      <UserMenu currentUser={currentUser} />
     </div>
    </Container>
   </div>
   <Categories />
  </div>
 )
}

export default Navbar
