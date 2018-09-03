import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Share from '@/components/pages/Share'
import Answer from '@/components/pages/Answer'
import My from '@/components/pages/My'
import SharePage from '@/components/pages/SharePage'
import AnswerPage from '@/components/pages/AnswerPage'
import Login from '@/components/pages/Login'
import AnswerDetails from '@/components/pages/AnswerDetails'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {name: 'Home'}
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home,
            redirect: '/Share',
            children: [
                {path: '/Share', name: 'Share', component: Share},
                {path: '/Answer', name: 'Answer', component: Answer},
                {path: '/My', name: 'My', component: My},
            ]
        },
        {
            path:'/SharePage',      //添加文章页面
            name:'SharePage',
            component:SharePage,
        },
        {
            path:'/Login',          //登录
            name:'Login',
            component:Login,
        },
        {
            path:'/AnswerPage',       //提交提问页面
            name:'AnswerPage',
            component:AnswerPage,
        },
        {
            path:'/AnswerDetails',
            name:'AnswerDetails',
            component:AnswerDetails,
        }

    ]
})
