
const routes = [
  {
    path: '/admin/',
    meta: {
      requiredLogin: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboardAdmin', component: () => import('src/pages/admin/Index.vue') },
      { path: 'sekolah', name: 'dataSekolahAdmin', component: () => import('src/pages/admin/sekolah/Index.vue') },
      { path: 'sekolah/insert', name: 'insertDataSekolahAdmin', component: () => import('src/pages/admin/sekolah/Insert.vue') },
      { path: 'sekolah/edit/:id', name: 'editDataSekolahAdmin', component: () => import('src/pages/admin/sekolah/Edit.vue') }
    ]
  },
  {
    path: '/user/login',
    requiredLogin: false,
    name: 'loginPage',
    component: () => import('pages/user/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
