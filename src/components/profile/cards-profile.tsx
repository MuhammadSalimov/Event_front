import { IDataCount } from "@/interfaces";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Form } from "../ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import $api from "@/http/api";

const CardsProfile = ({ counts }: { counts: IDataCount }) => {
  const formSchema = z.object({
    categoryName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await $api.post("/category/create", values);
      form.reset();
      toast("Category successfuly added")
      return res;
    } catch (error) {
      //@ts-ignore 
      toast(error.response?.data?.message || "An error occurred");
    }
  }

  return (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {/* Card: Total clients */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"></div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Total clients
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {counts.countUser}
            </p>
          </div>
        </div>

        {/* Card: Total Events */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"></div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Events
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {counts.countEvent}
            </p>
          </div>
        </div>

        {/* Card: Total booking */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"></div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Total booking
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {counts.countParts}
            </p>
          </div>
        </div>

        {/* Card: Categories */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"></div>
          <div className="flex justify-between items-center gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Categories
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {counts.countCateg}
              </p>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-slate-400 px-5 py-2 rounded-md">
                  + Add
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] h-[400px] bg-hero py-4 px-4 rounded-md">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="categoryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsProfile;
