import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "@/assets/css/nprogress.css";
import { isLooseLoggedIn } from "@/utils/auth";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/login/username",
    name: "loginUsername",
    component: () => import("@/views/loginUsername.vue"),
  },
  {
    path: "/login/account",
    name: "loginAccount",
    component: () => import("@/views/loginAccount.vue"),
  },
  {
    path: "/playlist/:id",
    name: "playlist",
    component: () => import("@/views/playlist.vue"),
  },
  {
    path: "/album/:id",
    name: "album",
    component: () => import("@/views/album.vue"),
  },
  {
    path: "/artist/:id",
    name: "artist",
    component: () => import("@/views/artist.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/artist/:id/mv",
    name: "artistMV",
    component: () => import("@/views/artistMV.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/mv/:id",
    name: "mv",
    component: () => import("@/views/mv.vue"),
  },
  {
    path: "/next",
    name: "next",
    component: () => import("@/views/next.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search.vue"),
  },
  {
    path: "/new-album",
    name: "newAlbum",
    component: () => import("@/views/newAlbum.vue"),
  },
  {
    path: "/explore",
    name: "explore",
    component: () => import("@/views/explore.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/library",
    name: "library",
    component: () => import("@/views/library.vue"),
    meta: {
      requireLogin: true,
      keepAlive: true,
    },
  },
  {
    path: "/library/liked-songs",
    name: "likedSongs",
    component: () => import("@/views/playlist.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/settings.vue"),
  },
];
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // 需要登录的逻辑
  if (to.meta.requireLogin) {
    if (isLooseLoggedIn()) {
      next();
    } else {
      if (process.env.IS_ELECTRON === true) {
        next({ path: "/login/account" });
      } else {
        next({ path: "/login" });
      }
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (
    to.matched.some((record) => !record.meta.keepAlive) &&
    !["settings"].includes(to.name)
  ) {
    NProgress.start();
  }
});

export default router;
