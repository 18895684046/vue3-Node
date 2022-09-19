import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// example
const Example = () => import('@/pages/List/index.vue')
const Login = () => import('@/pages/Login/index.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'example',
        component: Example
    },
    {
        path: "/login",
        name: 'login',
        component: Login
    }
]

const router = createRouter({
    // base url 在此定义项目的公共路由前缀 这里我用测试用例举例
    history: createWebHistory('/node/'),
    routes,
})

export default router