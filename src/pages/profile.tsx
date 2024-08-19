// import CreatePost from "@/components/create-post"
import FormLayout from "@/components/form-layout"
import ConfirmModal from "@/components/modals/confirm.modal"
import Dashboard from "@/components/profile/dashboard"
import MyEvents from "@/components/profile/my-events"
import MyTickets from "@/components/profile/my-tickets"
import { ProfileHeader } from "@/components/profile/profile-header"
import { DesktopSidebar, MobileSidebar } from "@/components/profile/Sidebar"
import { useCreatePost } from "@/hooks/use-create-post"
import { authStore } from "@/store/auth.store"
import { profileStore } from "@/store/profile.store"

const Profile = () => {
  const { mainSection } = useCreatePost()
  const { isDark, changeMenu } = profileStore()
  const { user } = authStore()

  return (
    <>
      <div className={`${isDark ? "" : "dark z-50"} w-full h-screen`} >
        <header className=" z-200 py-8 fixed left-0 right-0 bg-white dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-black dark:text-white" >
            <ProfileHeader />
          </div>
        </header>
        <div className=" h-screen fixed z-100">
          <DesktopSidebar />
          <MobileSidebar />
        </div>
        <div className="flex w-ful z-100 bg-white dark:bg-slate-900 md:w-[calc(100%-256px)] ml-auto pt-[100px] flex-col flex-1 overflow-hidden">
          {
            mainSection == "create_event" && <div className=" h-full px-5 z-50">
              <FormLayout />
            </div>}
          {user.role == "admin" ? mainSection == "dashboard" && <main onClick={() => { changeMenu(false) }} className="h-full z-50 px-5  ">
            <Dashboard />
          </main> : mainSection == "dashboard" && <div><MyEvents /></div>}
          {
            mainSection == "events" && <div>
              <MyEvents />
            </div>
          }
          {
            mainSection == "tiket" && <MyTickets />
          }
        </div>
      </div>
      <ConfirmModal />
    </>
  )
}

export default Profile