import config from '../config'
import request from '../index'
const { list, login, image, delById } = config

// 获取所有列表
export const getList = () => {
    return request({
        url: list,
        method: 'get',
    })
}
// 获取图片信息
export const getImage = () => {
    return request({
        url: image,
        method: 'get',
    })
}

export const delImageById = (data:{id:string}) => {
    return request({
        url: delById,
        method: 'delete',
        data
    })
}

//  登录
export const loginFunc = (data: { username: string, password: number | string }) => {
    return request({
        url: login,
        method: 'post',
        data
    })
}