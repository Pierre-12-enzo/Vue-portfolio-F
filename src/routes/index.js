import { createRouter, createWebHistory } from "vue-router";
import Homeview from "@/views/Homeview.vue";
import NotFound from "@/views/NotFound.vue";
import Dashboard from "@/views/Dashboard.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import axios from "axios";
import ViewWorks from "@/views/ViewWorks.vue";
import ViewStacks from "@/views/ViewStacks.vue";
import Blog from "@/views/Blog.vue";
import Settings from "@/views/Settings.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'home',
            component: Homeview
        },
        {
            path: "/dashboard",
            name: 'dashboard',
            component: Dashboard,
            meta: { requiresAuth: true },
        },
        {
            path: "/login",
            name: 'admin-login',
            component: AdminLogin
        },
        {
          path: "/dashboard/works",
          name: 'works',
          component: ViewWorks,
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard/stacks",
          name: 'stacks',
          component: ViewStacks,
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard/blog",
          name: "blog",
          component: Blog,
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard/settings",
          name: "Setting",
          component: Settings,
          meta: { requiresAuth: true },
        },
        {
            path: "/:CatchALL",
            name: 'catchall',
            component: NotFound
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
      try {
        await axios.get('/api/check-auth/', { withCredentials: true });
        next();
      } catch (error) {
        next('/login');
      }
    } else {
      next();
    }
  });

export default router;