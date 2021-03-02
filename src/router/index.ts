import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import LicenseVerification from '../views/partials/LicenseVerification.vue';
import Result from '../views/partials/Result.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/services',
        name: 'Services',
        component: () => import('@/views/Services.vue')
      },
      {
        path: '/guides',
        name: 'Guides',
        component: () => import('@/views/Guides.vue')
      },
      {
        path: '/departments',
        name: 'Departments',
        component: () => import('@/views/Departments.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/license-verification',
    name: 'LicenseVerification',
    component: LicenseVerification,
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
    meta: {
      data: null
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken || accessToken == null) {
    if (to.name === 'Login') {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    const anonymousRoutes = ['Login'];
    const toRoute: any = to.name || '';
    if (anonymousRoutes.indexOf(toRoute) > -1) {
      next({ name: 'Home' })
    } else {
      next();
    }
  }
})

export default router
