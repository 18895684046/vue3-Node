import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_HTTP_BASE_URL as string,

    // 允许跨域携带cookie
    withCredentials: true,

    // 超时时间60秒
    timeout: 60000,
})

// Add a request interceptor 请求拦截器
service.interceptors.request.use(function (config: any) {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor 响应拦截器
service.interceptors.response.use(function (response) {
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response;

}, function (error) {
    const { status } = error.response
    if (status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return Promise.reject(error);
});


export default service