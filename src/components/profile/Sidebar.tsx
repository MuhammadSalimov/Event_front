import { profileStore } from "@/store/profile.store"
import { CiHome } from "react-icons/ci";
import { MdEvent, MdOutlineLocationCity, MdOutlinePostAdd } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authStore } from "@/store/auth.store";
import { useCreatePost } from "@/hooks/use-create-post";

const UL_Menu = () => {
  const { changeMenu } = profileStore()
  const { SetMainSection } = useCreatePost()
  const { user } = authStore()
  return <>
    {user.role == "admin" && <ul className="mt-6">
      <li className="relative px-6 py-3">
        <button
          onClick={() => {
            SetMainSection("dashboard")
            changeMenu(false)
          }}
          className="inline-flex gap-3 items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
        >
          <CiHome className="w-5 h-5" />
          Dashboard
        </button>
      </li>
    </ul>}
    <ul>
      <li className="relative px-6 py-3">
        <button
          onClick={() => {
            SetMainSection("events")
            changeMenu(false)
          }}
          className="inline-flex gap-3 items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
        >
          <MdEvent className="w-5 h-5" />
          My Events
        </button>
      </li>
      <li className="relative px-6 py-3">
        <button
          onClick={() => {
            SetMainSection("tiket")
            changeMenu(false)
          }}
          className="inline-flex gap-3 items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
        >
          <MdOutlineLocationCity className="w-5 h-5" />
          My Tickets
        </button>
      </li>
      <li className="relative px-6 py-3">
        <button
          onClick={() => {
            changeMenu(false)
            SetMainSection("create_event")
          }}
          className="inline-flex gap-3 items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
        >
          <MdOutlinePostAdd className="w-5 h-5" />
          Create Event
        </button>
      </li>

    </ul>
  </>
}

const AvataR = () => {
  const { user } = authStore()
  return <div className=" w-full h-full flex flex-col gap-3 items-center my-5" >
    <Avatar className="w-20 h-20"  >
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <h1 className=" text-black dark:text-white" >{user.fullName}</h1>
  </div>
}

export const DesktopSidebar = () => {
  return <aside className="z-20 hidden pt-16 h-screen w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0" >
    <div className="py-4 pt-8 text-gray-500 dark:text-gray-400">
      <AvataR />
      <UL_Menu />
    </div>
  </aside>
}

export const MobileSidebar = () => {
  const { isMenuOpen } = profileStore()
  return <>
    <aside style={{ transform: `${isMenuOpen ? "translateX(0%)" : "translateX(-100%)"}` }} className="fixed z-200 duration-300 inset-y-0 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden pt-8" >
      <div className="py-4 text-gray-500 dark:text-gray-400">

        <AvataR />
        <UL_Menu />
      </div>
    </aside>
  </>
}