import axios  from 'axios'

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const customAxios = axios.create({
    baseURL: NEXT_PUBLIC_BASE_URL,
    // headers:{Authorization:`Bearer ${SessionStorage.getItem('token')}`}
})

export default customAxios