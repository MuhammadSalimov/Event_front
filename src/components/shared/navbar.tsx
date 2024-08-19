import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { authStore } from '@/store/auth.store'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Loader2 } from 'lucide-react'

function Navbar() {
	const { isAuth, user, isLoading } = authStore()



	return (
		<>
			<div className='w-full bg-hero py-4 bg-gray-900 fixed z-20 l-0 r-0 top-0'>
				<div className='w-full h-full flex justify-between items-center container'>
					<Link className='flex items-center justify-center gap-2 ml-2' to={'/'}>
						<p className='font-bold text-4xl'>Event</p>
					</Link>
					<div className='flex gap-2 items-center'>
						{isLoading ? (
							<Loader2 className='animate-spin' />
						) : isAuth ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className='cursor-pointer'>
										<AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent className=''>
									<p className='text-sm my-2 text-red-400 text-center'>
										{user.isActivated ? '' : "User is not activated"}
									</p>
									<DropdownMenuLabel className='line-clamp-1'>{user.fullName}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{user.isActivated
										?
										<>
											<Link to="/profile">
												<DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
											</Link>
										</>
										:
										<div className=' my-2 text-red-600'>
											Your email address has not been verified
										</div>
									}
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link to={'/auth'}>
								<Button size={'lg'} className='rounded-full font-bold'>
									Login
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
