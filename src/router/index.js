import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
    path:'/',component:()=> import ('@/views/Main.vue'),children:[
      {path:'/',component:()=>import ('@/views/Home.vue')},
      {path:'/user',component:()=>import ('@/views/User.vue')},
      {path:'/home',component:()=>import ('@/views/Home.vue')},
      {path:'/customer',component:()=>import ('@/views/Customer.vue')},
      {path:'/callRecords',component:()=>import ('@/views/CallRecords.vue')},
      {path:'/msgRecords',component:()=>import ('@/views/MsgRecords.vue')},
      {path:'/wxRecord',component:()=>import ('@/views/WxRecord.vue')}
    ]
    } ,
    {path:'/login',component:()=> import ('@/views/Login.vue')},
    {path:'/register',component:()=> import ('@/views/Register.vue')}
]
  
const router = new VueRouter({
  routes
})


//路由守卫
router.beforeEach((to,form,next)=>{
  //判断是否登录
  const isLogin=localStorage.accessToken?true:false
  if(to.path=='/login' || to.path=='/register'){  //可以直接访问登录页面
    next()
  }else{
    isLogin?next():next('/login')   //如果已经登录，并且有token，跳转下一个页面；否则返回到login页面
  }   
})

export default router
