import Vue from 'vue'
import Router from 'vue-router'
import NotesPanel from '@/components/NotesPanel'
import Login from '@/components/Login'
import Navbar from '@/components/navbar'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/notes',
      name: 'NotesPanel',
      component: NotesPanel,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/login' // this can also be 404 component
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('notes')
  else next()
})

export default router
