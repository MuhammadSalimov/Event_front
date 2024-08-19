import { IPost } from '@/interfaces'
import { API_URL } from '@/http'
import { Button } from '../ui/button'
import { useConfirm } from '@/hooks/use-confirm'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateEvent } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ChangeEvent, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { useMutation } from '@tanstack/react-query'
import { postStore } from '@/store/post.store'
import { toast } from 'sonner'
import FillLoading from '../shared/fill-loading'
import $api from '@/http/api'
import { FaImages } from 'react-icons/fa'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ConfirmBooking } from '@/hooks/use-booking'

function PostCard({ post, isAdmin }: { post: IPost, isAdmin: boolean }) {
	// copy 

	const { setBooking, onOpenBooking } = ConfirmBooking()

	const [loading, setLoading] = useState(false)
	const [picture, setPicture] = useState<File | null>(null);
	const [priceState, setPriceState] = useState<number>(post.price || 0);
	const [userCount, setUserCount] = useState<number>(post.maxAttendees || 0);



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


	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + 5);
	const minDate = currentDate.toISOString().split('T')[0];
	// copy

	const [open, setOpen] = useState(false)

	const { onOpen, setPost } = useConfirm()
	const { myPosts, setMyPosts } = postStore()


	const onDelete = () => {
		onOpen()
		setPost(post)
	}

	const onBooking = () => {
		onOpenBooking()
		setBooking(post.id)
	}

	function formatDateTime(startDate: string, startTime: string) {
		const date = new Date(`${startDate}T${startTime}:00`);
		const options: object = {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		};

		return date.toLocaleString('en-US', options);
	}

	const form = useForm<z.infer<typeof updateEvent>>({
		resolver: zodResolver(updateEvent),
		defaultValues: {
			title: post.title, description: post.description,
			startTime: post.startTime,
			format: post.format, location: post.location,
			maxAttends: post.maxAttendees, price: post.price,
			category: post.categoryId, startDate: post.startDate,
		},
	})


	const { mutate, isPending } = useMutation({
		mutationKey: ['edit-post'],
		mutationFn: async (formData: FormData) => {
			setLoading(true);
			try {
				const { data } = await $api.put(`/event/edit/${post.id}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				setLoading(false);
				return data;
			} catch (error) {
				setLoading(false);
				throw error;
			}
		},
		onSuccess: data => {
			const newData = myPosts.map(c => (c.id === data.id ? data : c));
			setMyPosts(newData);
			setOpen(false);
		},
		onError: err => {
			// @ts-ignore
			toast(err.response?.data?.message || 'An error occurred');
		},
	});


	function onSubmit(values: z.infer<typeof updateEvent>) {
		const formData = new FormData();
		if (values.title) formData.append('title', values.title);
		if (values.description) formData.append('description', values.description);
		if (priceState >= 0) formData.append('price', priceState.toString());
		if (picture) formData.append('picture', picture);
		if (values.location) formData.append('location', values.location);
		if (values.startTime) formData.append('startTime', values.startTime);
		if (values.startDate) formData.append('startDate', values.startDate);
		if (userCount >= 0) formData.append('maxAttendees', userCount.toString());
		if (values.category) formData.append('categoryId', values.category);
		if (values.format) formData.append('format', values.format);

		mutate(formData);
	}
	return (
		<>
			<div className="rounded-lg relative overflow-hidden h-[570px] min-w-[300px]  w-[30%] dark ">
				<div className="relative overflow-hidden pb-[60%]">
					<img
						className="absolute h-full w-full object-cover object-center"
						src={`${API_URL}/${post.photo}`}
						alt={post.title}
					/>
				</div>
				<div className="relative bg-events h-full event-text">
					<div className="py-10 px-5">
						<div className=' flex gap-3'>
							<button className=' rounded-lg bg-hero font-semibold px-4 text-[16px] py-1' >{post.price ? `$${post.price}` : <span className=' text-green-600'>Free</span>}</button>
							<button className=' rounded-lg bg-hero font-semibold px-4 text-[16px] py-1' >{post.category.categoryName}</button>
						</div>
						<p className=' mt-3 text-[18px] font-sans'> {formatDateTime(post.startDate, post.startTime)} </p>
						<h3 className="text-2xl font-bold mt-3"> {post.title.length > 40 ? `${post.title.substring(0, 40)}...` : post.title} </h3>
						<div className='mt-3'>
							<span>{post.organizer.fullName} </span>  |
							<span className=' cursor-pointer'> {`${post.location}`.length > 14 ? `${`${post.location}`.substring(0, 10)}...` : post.location} &nbsp;</span>
						</div>

						<div className=' my-2 flex gap-3'>
							<button className=' rounded-lg shadow-lg border-slate-800 border-2 font-semibold px-4 text-[16px] py-1' >spaces: {post.maxAttendees == 0 ? <span className='text-green-700'>not limited</span> : `${(post.maxAttendees || 0) - post._count.participants}`}</button>
						</div>
					</div>
				</div>
				{
					isAdmin ? <div className='flex w-full gap-3 pr-2 absolute bottom-2 left-1 justify-center items-center dark'>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button className='w-full bg-transparent hover:bg-transparent'><div className='w-[70px] rounded py-2 mr-auto text-white bg-blue-800'>Edit</div></Button>
							</PopoverTrigger>
							<PopoverContent className='dark skrol-w relative overflow-y-scroll h-[500px] w-[100%] z-100 '>
								{isPending && <FillLoading />}
								<Form {...form}>
									<form className=" w-full h-full" onSubmit={form.handleSubmit(onSubmit)}>
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
																			<SelectItem value="development">Development</SelectItem>
																			<SelectItem value="business">Business</SelectItem>
																			<SelectItem value="technology">Technology</SelectItem>
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
														<Input defaultValue={post.price} disabled={loading} min={0} type="number" onChange={PriceOnChange} />
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
														<Input defaultValue={post.maxAttendees} disabled={loading} onChange={MaxUser} min={0} max={1000} type="number" placeholder="max users" />
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
							</PopoverContent>
						</Popover>
						<Button variant={"destructive"} onClick={onDelete} >delete</Button>
					</div> : <div className=' absolute bottom-3 left-2'>
						<Button onClick={onBooking} className=' bg-[#18752d] text-white hover:bg-[#28A745]'>
							Book now
						</Button>
					</div>
				}
			</div>
		</>
	)
}


export default PostCard
