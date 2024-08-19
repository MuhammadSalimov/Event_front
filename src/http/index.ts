import axios from 'axios'

export const API_URL = `http://80.90.187.233:8080/`

const $axios = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}/api`,
})

export default $axios
