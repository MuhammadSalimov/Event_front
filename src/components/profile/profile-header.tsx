import { profileStore } from "@/store/profile.store"
import { MdLogout, MdDarkMode } from "react-icons/md";
import { FaSun, FaX } from "react-icons/fa6";
import { Input } from "../ui/input";
import { HiBars3 } from "react-icons/hi2";
import $axios from "@/http";
import { authStore } from "@/store/auth.store";
import { IUser } from "@/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";



export const ProfileHeader = () => {
  const { setIsAuth, setUser } = authStore()
  const [outBol , setOutBol] = useState(false)
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await $axios.post('/auth/logout')
      localStorage.removeItem('accessToken')
      setIsAuth(false)
      setUser({} as IUser)
      navigate('/auth')
    } catch (error) {
      // @ts-ignore
      toast(error.response?.data?.message)
    }
  }

  const { isMenuOpen, changeMenu, changeDark, isDark } = profileStore()
  return <>
     <Link
        className="ml-6 text-lg hidden md:block font-bold text-gray-800 dark:text-gray-200"
        to="/"
      >
        Event Arena
      </Link>
    <button
      onClick={() => { changeMenu(!isMenuOpen) }}
      className="p-1 text-2xl mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
    >
      {
        isMenuOpen
          ?
          <FaX />
          :
          <HiBars3 />
      }
    </button>

    <div className="flex justify-center flex-1 lg:mr-32">
      <Input
        placeholder="search"
        className="w-full relative max-w-xl mr-6 placeholder:text-black dark:placeholder:text-white outline-none pl-8 pr-2 text-sm bg-slate-200 text-black dark:text-white dark:bg-slate-900"
      />
    </div>

    <div className="flex items-center flex-shrink-0 space-x-6 text-2xl">
      {/* <!-- Theme toggler --> */}
      <button
        onClick={() => { changeDark(!isDark) }}
        className="rounded-md focus:outline-none focus:shadow-outline-purple"
      >
        {isDark
          ?
          <MdDarkMode className="text-black" />
          :
          <FaSun className="text-white" />
        }
      </button>
      <MdLogout className=" cursor-pointer" onClick={()=> setOutBol(true)} />
      <Dialog open={outBol} onOpenChange={()=>{setOutBol(!outBol)}} >
        <DialogContent>
          {/* {false && (
					<Alert variant='destructive'>
						<AlertCircle className='h-4 w-4' />
						<AlertTitle>Error</AlertTitle> */}
          {/* @ts-ignore */}
          {/* <AlertDescription>{error.response.data.message}</AlertDescription>
					</Alert> */}

          {/* )} */}

          {/* {isPending && <FillLoading />} */}
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant={'destructive'} onClick={()=> setOutBol(false)}>
              Cancel
            </Button>
            <Button onClick={logout}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </>
}