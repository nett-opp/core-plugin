import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/DashboardPosts.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("@/views/DashboardProducts.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
