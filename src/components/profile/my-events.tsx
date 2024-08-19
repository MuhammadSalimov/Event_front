import { postStore } from "@/store/post.store"
import { IPost } from "@/interfaces"
import $axios from "@/http"
import { useQuery } from "@tanstack/react-query"
import { authStore } from "@/store/auth.store"
import PostCard from "../cards/post.card"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { AlertCircle } from "lucide-react"
import PostLoading from "../shared/post-loading"

const MyEvents = () => {
  const { user } = authStore()
  const { myPosts, setMyPosts } = postStore()
  const { isLoading, error } = useQuery({
    queryKey: ['get-events-byId'],
    queryFn: async () => {
      const { data } = await $axios.get(`/event/getId/${user.id}`)
      setMyPosts(data)
      return data
    },
  })
  return (
    <>
      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <div className=" mx-auto mt-24 flex flex-wrap gap-8 justify-center pb-8">
        {isLoading && Array.from({ length: myPosts.length }).map((_, idx) => <PostLoading key={idx} />)}
        {myPosts.length > 0 ? myPosts.map((post: IPost) => (
          <PostCard key={post.id} post={post} isAdmin={true} />
        )) : <div className="text-2xl"> <h1>You have no events yet</h1> </div>}
      </div>
    </>
  )
}

export default MyEvents