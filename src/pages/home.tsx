import PostCard from '@/components/cards/post.card'
import Hero from '@/components/hero/Hero'
import SearchHero from '@/components/hero/Search-hero'
import PostLoading from '@/components/shared/post-loading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import $axios from '@/http'
import { IPost } from '@/interfaces'
import { postStore } from '@/store/post.store'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import Footer from './footer'
import BookingModal from '@/components/modals/booking.modal'

function Home() {
	const { setPosts, posts } = postStore()
	const { isLoading, error } = useQuery({
		queryKey: ['get-events'],
		queryFn: async () => {
			const { data } = await $axios.get('/event/get')
			setPosts(data)
			return data
		},
	})

	return (
		<>
			<Hero />
			<SearchHero />
			<div className='container'>
				{error && (
					<Alert variant='destructive'>
						<AlertCircle className='h-4 w-4' />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				)}
				<div className=' mx-auto mt-24 flex flex-wrap gap-8 justify-center'>
					{isLoading && Array.from({ length: 6 }).map((_, idx) => <PostLoading key={idx} />)}
					{posts.map((post: IPost) => (
						<PostCard isAdmin={false} key={post.id} post={post} />
					))}
				</div>
				<BookingModal />
			</div>
			<Footer />
			
		</>
	)
}

export default Home
