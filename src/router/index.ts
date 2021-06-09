import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Logout from '../views/partials/Logout.vue';
import LicenseVerification from '../views/partials/LicenseVerification/LicenseVerification.vue';
import ChallanInformation from '../views/partials/ChallanInformation/ChallanInformation.vue';
import TrafficUpdate from '../views/partials/TrafficUpdate/TrafficUpdate.vue';
import TrafficUpdateResult from '../views/partials/TrafficUpdate/Result.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/services',
      },
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
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/license-verification',
    name: 'LicenseVerification',
    component: LicenseVerification,
  },
  {
    path: '/challan-information',
    name: 'ChallanInformation',
    component: ChallanInformation,
  },
  {
    path: '/traffic-information',
    name: 'TrafficUpdate',
    component: TrafficUpdate,
  },
  {
    path: '/traffic-result',
    name: 'TrafficUpdateResult',
    component: TrafficUpdateResult,
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
