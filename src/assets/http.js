import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'

//请求拦截
axios.interceptors.request.use(config=>{

    if(localStorage.accessToken){       //如果有token，设置请求头
        config.headers.Authorization=localStorage.accessToken
    }
    return config
})


axios.interceptors.response.use(
    response=>{
        return response
    },
    error=>{
        console.log(error.response)
       const {status}=error.response    //解构获取错误状态码
       if(status==401){     //如果是401，清除token,并跳转回登录界面
            Message.error('token失效，请重新登录')
            localStorage.removeItem('accessToken')
            router.push('/login')
       }

       return Promise.reject(error)
    }
)
export default axios