import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import DoctorDashboard from '../views/doctor-dashboard.vue'
import DoctorViewInPatient from '../views/doctor-dashboard/inpatient.vue'
import DoctorViewTest from '../views/doctor-dashboard/test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/doctor-dashboard',
    name: 'doctor-dashboard',
    component: DoctorDashboard
  },
  {
    path: '/doctor-dashboard/inpatient',
    name: 'doctor-dashboard-inpatient',
    component: DoctorViewInPatient
  },
  {
    path: '/doctor-dashboard/test',
    name: 'doctor-dashboard-test',
    component: DoctorViewTest
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
