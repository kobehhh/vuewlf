const Login = resolve => require(['@/views/login.vue'],resolve)
const Main = resolve => require(['@/views/main.vue'],resolve)
const Home = resolve => require(['@/views/home.vue'],resolve)
const UserManage = resolve => require(['@/views/system-manage/user-manage/user-manage.vue'],resolve)

export const  RouterMap = [{
    path: '/',
    component: Login,
    display: false
  },
  {
    path: '/login',
    component: Login,
    display: false,
    name:'login'
  },
  {
    path:'/home',
    component:Main,
    label:'首页',
    children:[
      {
        path:'',
        component:Home,
        name:'home',
      },
    ]
  },
  {
    path:'/sys',
    component: Main,
    label: '系统设置',
    redirect:'/sys/user_manage',
    children:[
      {
        path:'user_manage',
        name:'user_manage',
        component:UserManage,
        leble:'用户管理'
      }
    ]
  }
]