import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// 🔹 Import tambahan untuk halaman AddBatch
import AddBatch from '../views/AddBatch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reportActivityList',
      name: 'reportActivityList',
      component: () => import('../views/ReportActivityList.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reportActivityReview',
      name: 'reportActivityReview',
      component: () => import('../views/ReportActivityReview.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/formReportActivity',
      name: 'formReportActivity',
      component: () => import('../views/formReportActivity.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reportActivityView',
      name: 'reportActivityView',
      component: () => import('../views/ReportActivityView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/batch/:id',
      name: 'BatchDetail',
      component: () => import('../views/batchDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add-batch',
      name: 'AddBatch',
      component: AddBatch,
      meta: { requiresAuth: true },
    },

    // 🔹 Routing Production & Sales
    {
      path: '/reportProductionReview',
      name: 'reportProductionReview',
      component: () => import('../views/reportProductionReview.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reportProductionView',
      name: 'reportProductionView',
      component: () => import('../views/reportProductionView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/report-production',
      name: 'reportProduction',
      component: () => import('../views/reportProduction.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/goodmovement',
      name: 'goodmovement',
      component: () => import('../views/goodmovement.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/addnew',
      name: 'addnew',
      component: () => import('../views/addnew.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/detailmovement',
      name: 'detailmovement',
      component: () => import('../views/detailmovement.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add-location',
      name: 'addlocation',
      component: () => import('../views/addlocation.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('../views/location.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// 🔒 Middleware auth guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.isLoggedIn) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
