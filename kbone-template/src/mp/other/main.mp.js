import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from '../../App.vue'
import store from '../../store'
import List from '../../list/Index.vue'
import Detail from '../../detail/Index.vue'
import Todo from '../../todo/index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/test/list/:id',
    name: 'List',
    component: List,
  }, {
    path: '/test/detail/:id',
    name: 'Detail',
    component: Detail,
  }, {
    path: '/todo',
    name: 'Todo',
    // eslint-disable-next-line no-undef
    component: Todo,
  }],
})

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  Vue.config.productionTip = false

  sync(store, router)

  return new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
