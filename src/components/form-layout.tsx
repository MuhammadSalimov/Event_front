import { FaImages } from "react-icons/fa";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { eventSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import $api from "@/http/api";
import { toast } from "sonner";
import { profileStore } from "@/store/profile.store";
import SheetSuccess from "./sheetSuccess";
import { useQuery } from "@tanstack/react-query";
import $axios from "@/http";
import { Categorytore } from "@/store/category.store";



const FormLayout = () => {
  const [loading, setLoading] = useState(false)
  const [picture, setPicture] = useState<File | null>(null);
  const [priceState, setPriceState] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const { successOpen } = profileStore()

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startTime: "",
      startDate: "",
      format: "",
      category: "",
      price: 0,
      maxAttends: 0,
    },
  });

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    setPicture(file as File);
  }

  function PriceOnChange(event: ChangeEvent<HTMLInputElement>) {
    setPriceState(+event.target.value)
  }

  function MaxUser(event: ChangeEvent<HTMLInputElement>) {
    setUserCount(+event.target.value)
  }

  async function submitData(values: z.infer<typeof eventSchema>) {
    if (!picture) return null;

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', priceState.toString());
    formData.append('picture', picture);
    formData.append('location', values.location);
    formData.append('startTime', values.startTime);
    formData.append("startDate", values.startDate)
    formData.append('maxAttendees', userCount.toString());
    formData.append("categoryId", values.category)
    formData.append("format", values.format)
    // To log FormData content
    try {
      const res = await $api.post('/event/create', formData);
      // const newData = [...posts, res.data]
      // setPosts(newData)
      form.reset()
      setPicture(null)
      setPriceState(0)
      setUserCount(0)
      successOpen()
      return res
    } catch (error) {
      // @ts-ignore
      toast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false)
    }
  }

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 5);
  const minDate = currentDate.toISOString().split('T')[0];
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
      <div className=" overflow-x-hidden px-2 pt-4">
        <Form  {...form}>
          <form className=" w-full h-full" onSubmit={form.handleSubmit(submitData)}>
            <div className={`${picture ? "border-green-500" : ""} text-center border border-dashed border-black dark:border-slate-400 rounded-sm py-4`}>
              <FaImages aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
              <FormLabel htmlFor="file-upload" className="text-blue-700 dark:text-blue-400 cursor-pointer font-bold">Upload a file</FormLabel>
              <Input disabled={loading} onChange={onFileChange} id="file-upload" type="file" className="sr-only" placeholder="your event name" />
              <p className="pl-1">or drag and drop</p>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Title */}
              <div className="sm:col-span-3 text-xl text-black dark:text-slate-300">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl className="bg-white placeholder:text-slate-500 dark:bg-slate-400 dark:text-black font-semibold">
                        <Input disabled={loading} placeholder="your event name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Format */}
              <div className="sm:col-span-3 text-xl text-black dark:text-slate-300">
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Format </FormLabel>
                      <FormControl className="bg-black">
                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                          <SelectTrigger className="w-[180px]  bg-white dark:bg-slate-900 ">
                            <SelectValue placeholder="select event format" />
                          </SelectTrigger>
                          <SelectContent className="text-black bg-slate-200 dark:bg-slate-900">
                            <SelectGroup>
                              <SelectItem value="online">Online</SelectItem>
                              <SelectItem value="offline">Offline</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Category */}
              <div className="sm:col-span-1  text-xl text-black dark:text-slate-300">
                {isLoading && " Loading..."}
                {error && "Something error"}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category </FormLabel>
                      <FormControl className="bg-black">
                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-900 " >
                            <SelectValue placeholder="select event category" />
                          </SelectTrigger>
                          <SelectContent className="text-black bg-slate-200 dark:bg-slate-900">
                            <SelectGroup>
                              {category.map(item => {
                                return <SelectItem value={item.id}>{item.categoryName}</SelectItem>
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-4 text-xl text-black dark:text-slate-300">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl className="bg-white placeholder:text-slate-500 dark:bg-slate-400 dark:text-black font-semibold">
                        <Input disabled={loading} placeholder="write about event" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-3 text-xl text-black dark:text-slate-300">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl className="bg-white placeholder:text-slate-500 dark:bg-slate-400 dark:text-black font-semibold">
                        <Input disabled={loading} placeholder="event location" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Price */}
              <div className="sm:col-span-2 text-xl text-black dark:text-slate-300">
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl className="bg-white placeholder:text-slate-500 dark:bg-slate-400 dark:text-black font-semibold">
                    <Input defaultValue={priceState} disabled={loading} min={0} type="number" onChange={PriceOnChange} />
                  </FormControl>
                </FormItem>
              </div>

              {/* Start Date */}
              <div className="sm:col-span-3 grid grid-cols-2 text-xl text-black dark:text-slate-300">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl className="bg-white placeholder:text-slate-500 dark:bg-slate-400 dark:text-black font-semibold">
                        <Input disabled={loading} min={`${minDate}`} type="date" placeholder="event Start Time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start time</FormLabel>
                      <FormControl className="bg-white placeholder:text-slate-500 dark:bg-slate-400 dark:text-black font-semibold">
                        <Input disabled={loading} type="time" placeholder="event Start Time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Max Attends */}
              <div className="sm:col-span-2 text-xl text-black dark:text-slate-300">
                <FormItem>
                  <FormLabel>Max Users</FormLabel>
                  <FormControl className="bg-white placeholder:text-slate-500 dark:bg-slate-400 dark:text-black font-semibold">
                    <Input defaultValue={userCount} disabled={loading} onChange={MaxUser} min={0} max={1000} type="number" placeholder="max users" />
                  </FormControl>
                </FormItem>
              </div>

              {/* Buttons */}
              <div className="w-full my-5 gap-5 flex sm:col-span-6">
                <Button variant={"destructive"}>Cancel</Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-900">Save</Button>
              </div>
            </div>
          </form>
        </Form>

      </div>
      <SheetSuccess />
    </>
  );
};

export default FormLayout;