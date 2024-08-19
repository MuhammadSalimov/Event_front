import { CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Categorytore } from "@/store/category.store";
import $axios from "@/http";
import { useQuery } from "@tanstack/react-query";



const SearchHero = () => {
  const { category, setcategory } = Categorytore()
  const { isLoading, error } = useQuery({
    queryKey: ['get-category'],
    queryFn: async () => {
      const { data } = await $axios.get('/category/get')
      setcategory(data)
      return data
    },
  })
  return (
    <>
      <div className="container mt-10 my-4">
        <h1 className="text-2xl sm:px-10 hero-h1 font-extrabold sm:text-5xl">Trusted by <br /> <span className="heading_span-2">Tousand of Events</span></h1>
      </div>
      <div className="container gap-4 mt-20 flex flex-col md:flex-row justify-center items-center" >
        <div className="md:max-w-[400px] w-full ">
          <div className="flex w-full items-center max-w-sm mx-auto">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <CiSearch className="text-white font-bold text-xl" />
              </div>
              <input type="text" id="simple-search" className="bg-slate-900 border text-white  text-xl rounded-lg outline-none block w-full ps-10 p-2.5 " placeholder="Search event name..." required />
            </div>
          </div>
        </div>
        <div className="md:max-w-[400px] w-full text-2xl">
          {isLoading && " Loading ..."}
          {error && "Something error "}
          <Select>
            <SelectTrigger className="w-full py-[23px] bg-slate-900 outline-none focus:outline-none">
              <SelectValue className=" text-2xl font-extrabold" placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {category.map(item => {
                  return <SelectItem key={item.id} value={item.id}>{item.categoryName}</SelectItem>
                })}
              </SelectGroup>

            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  )
}

export default SearchHero