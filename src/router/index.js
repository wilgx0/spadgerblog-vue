import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Share from '@/components/pages/Share'
import Answer from '@/components/pages/Answer'
import My from '@/components/pages/My'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:{name:'Home'}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect:'/Share',
      children:[
        {path:'/Share',name:'Share',component:Share},
        {path:'/Answer',name:'Answer',component:Answer},
        {path:'/My',name:'My',component:My},
      ]
    },
    
  ]
})