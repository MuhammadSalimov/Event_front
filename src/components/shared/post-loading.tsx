import { Skeleton } from '../ui/skeleton'

function PostLoading() {
	return (
		<div className='rounded-lg border  relative overflow-hidden h-[500px] min-w-[300px]  w-[30%]'>
			<Skeleton className='w-full h-[250px]' />

			<div className='mt-4 px-2'>
				<Skeleton className='w-1/2 h-8 mt-2' />

				<div className='space-y-2 mt-2'>
					<Skeleton className='h-4 w-[250px]' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='mt-5 flex flex-col gap-2'> 
				<Skeleton className='h-[25px] w-[90px]' />
				</div>
				{/* <div className='grid grid-cols-2 gap-2 mt-6'>
					<Skeleton className='w-full h-10 bg-primary' />
					<Skeleton className='w-full h-10 bg-destructive' />
				</div> */}
			</div>
		</div>
	)
}

export default PostLoading
