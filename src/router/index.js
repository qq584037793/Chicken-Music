import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

]

const router = createRouter({
  history: createWebHashHistory(process.env.BABEL_URL),
  routes
})

export default router
