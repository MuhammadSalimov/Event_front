
import { Sheet, SheetContent, SheetClose } from "./ui/sheet";
import { profileStore } from "@/store/profile.store";
import { FaCalendarCheck } from "react-icons/fa";
const SheetSuccess = () => {
  const { isSuccess, successClose } = profileStore()
  return (
    <Sheet open={isSuccess} onOpenChange={successClose} >
      <SheetContent className="w-full text-xl h-full flex items-center justify-center flex-col">
        <FaCalendarCheck className=" text-3xl text-white" />
        <h1>Event successfuly added</h1>
        <SheetClose >
          <button>Ok</button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default SheetSuccess