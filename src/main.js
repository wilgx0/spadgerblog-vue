// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'font-awesome.css'   //vue-html5-editor 依赖文件
import { Field, Icon, Cell, CellGroup,Loading,Popup,Row,Col,PullRefresh,List,Search,Tabbar,TabbarItem,NavBar,Button} from 'vant'
Vue.use(Field).use(Icon).use(Cell).use(CellGroup).use(Loading).use(Popup).use(Row).use(Col).use(PullRefresh).use(List).use(Search).use(Tabbar).use(TabbarItem).use(NavBar).use(Button)

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
