import { toast } from 'sonner'
import { useEffect } from 'react'
import $axios from './http'
import { authStore } from './store/auth.store'
import { Route, Routes } from 'react-router-dom'
import Profile from "@/pages/profile"
import Home from './pages/home'
import Auth from './pages/auth'
import RecoveryAccount from './pages/recovery-account'
import Navbar from './components/shared/navbar'

function App() {
	const { setIsAuth, setLoading, setUser } = authStore()
	const checkAuth = async () => {
		setLoading(true)
		try {
			const { data } = await $axios.get('/auth/refresh')
			localStorage.setItem('accessToken', data.accessToken)
			setIsAuth(true)
			setUser(data.user)
		} catch (error) {
			// @ts-ignore
			toast(error.response?.data?.message)
			localStorage.removeItem('accessToken')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			checkAuth()
		}
	}, [])

	return (
		<>
			<Navbar />

			<Routes>
				<Route path='/profile' element={<Profile />} />
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/recovery-account/:token' element={<RecoveryAccount />} />
			</Routes>
		</>
	)
}

export default App
