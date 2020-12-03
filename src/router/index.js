import Vue from 'vue';
import VueRouter from 'vue-router';
//import Home from '../views/Home.vue';
import Users from '../views/admin/Users.vue';
import Branches from '../views/admin/Branches.vue';
import Lockers from '../views/admin/Lockers.vue';
import Devices from '../views/admin/Devices.vue';
import userCustomers from '../views/user/Customers';
import userLogin from '../views/user/login.vue';
import adminLogin from '../views/admin/login.vue';
import locker from '../views/customer/otp.vue';
import verify from '../views/customer/verify.vue';
import userReports from '../views/user/Reports.vue';
import userDashboard from '../views/user/Dashboard.vue'




import Enroll from '../views/Enroll.vue';
import firebase from 'firebase';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: adminLogin
  },
{
    path: '/admin/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/devices',
    name: 'Devices',
    component: Devices,
    meta: {
      requiresAuth: true,
    },
  },
  
  {
    path: '/admin/branches',
    name: 'Branches',
    component: Branches,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'adminLogin',
    component: adminLogin
  },
  {
    path: '/admin/lockers',
    name: 'Lockers',
    component: Lockers,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/Enroll',
    name: 'Enroll',
    component: Enroll
  },

  {
    path: "/user/login",
    name: "Login",
    component: userLogin,
  },
  {
    path: '/user/customers',
    name: 'userCustomers',
    component: userCustomers,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/reports',
    name: 'userReports',
    component: userReports,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/dashboard',
    name: 'userDashboard',
    component: userDashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/locker",
    name: "locker",
    component: locker,
  },
  {
    path: "/verify",
    name: "verify",
    component: verify,
  },


  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next("login");
  } else {
    next();
  }
});


export default router
