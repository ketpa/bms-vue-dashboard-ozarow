import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MySidebar from '../components/MySidebar.vue';
import C0 from "../views/C0.vue";
import C1 from "../views/C1.vue";
import RoomNW1 from "@/components/RoomNW1.vue";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import RoomNW1Zadane from "@/components/RoomNW1Zadane.vue";
import RoomNW1Wymuszenia from "@/components/RoomNW1Wymuszenia.vue";



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    sidebar: MySidebar   // Sidebar pozostaje bez zmian
  },
    {
    path: "/login",
    name: "Login",
    component: LoginView
  },
  {
    path: "/users",
    name: "users",
    component: UsersView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ,
  {
    path: '/SubmenuOne',
    name: 'SubmenuOne',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SubmenuOne.vue')
  }, 
  {
    path: "/C1",
    name: "C1",
    component: C1,
  },
  {
    path: "/C0",
    name: "C0",
    component: C0,
  },
        {
    path: '/PomiarCT',
    name: 'PomiarCT',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PomiarCT.vue')
  },
          {
    path: '/SAK1',
    name: 'SAK1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SAK1.vue')
  },
  {
    path: '/C2',
    name: 'C2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C2.vue')
  },
  {
    path: '/C3',
    name: 'C3',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C3.vue')
  },
  {
    path: '/C03',
    name: 'C03',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C03.vue')
  },
  {
    path: '/C04',
    name: 'C04',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C04.vue')
  },
  {
    path: '/C06',
    name: 'C06',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C06.vue')
  },
  {
    path: '/C07',
    name: 'C07',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C07.vue')
  },
  {
    path: '/C1_6',
    name: 'C1_6',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C1_6.vue')
  },
  {
    path: '/C4',
    name: 'C4',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C4.vue')
  },
  {
    path: '/C13',
    name: 'C13',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C13.vue')
  },
  {
    path: '/C15',
    name: 'C15',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C15.vue')
  },
  {
    path: '/C16',
    name: 'C16',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C16.vue')
  },
  {
    path: '/C17',
    name: 'C17',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C17.vue')
  },
  {
    path: '/C18',
    name: 'C18',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C18.vue')
  },
  {
    path: '/C19',
    name: 'C19',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C19.vue')
  },
  {
    path: '/C20',
    name: 'C20',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C20.vue')
  },
  {
    path: '/C21',
    name: 'C21',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C21.vue')
  },
  {
    path: '/C22a',
    name: 'C22a',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C22a.vue')
  },
  {
    path: '/C23',
    name: 'C23',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C23.vue')
  },
  {
    path: '/C24',
    name: 'C24',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/C24.vue')
  },
  {
    path: '/CH1',
    name: 'CH1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CH1.vue')
  },
  {
    path: '/CH2',
    name: 'CH2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CH2.vue')
  },
    {
    path: '/ZadaneNW3W4',
    name: 'ZadaneNW3W4',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ZadaneNW3W4.vue')
  },
      {
    path: '/ZadaneNW2',
    name: 'ZadaneNW2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ZadaneNW2.vue')
  },
        {
    path: '/ZadaneNW1',
    name: 'ZadaneNW1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ZadaneNW1.vue')
  },
  {
    path: '/WymuszeniaNW2',
    name: 'WymuszeniaNW2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WymuszeniaNW2')
  },
    {
    path: '/WymuszeniaNW3W4',
    name: 'WymuszeniaNW3W4',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WymuszeniaNW3W4')
  },
    {
    path: '/WymuszeniaNW1',
    name: 'WymuszeniaNW1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WymuszeniaNW1')
  },
   {
    path: '/WymuszeniaChiller',
    name: 'WymuszeniaChiller',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WymuszeniaChiller')
  },
     {
    path: '/PomiarNW1',
    name: 'PomiarNW1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PomiarNW1')
  },
       {
    path: '/PomiarNW2',
    name: 'PomiarNW2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PomiarNW2')
  },
  {
    path: '/PomiarNW3',
    name: 'PomiarNW3',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PomiarNW3')
  },
  {
    path: '/Wentylatornia',
    name: 'Wentylatornia',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Wentylatornia')
  },
  {
    path: '/WyjsciaNW1',
    name: 'WyjsciaNW1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WyjsciaNW1')
  },
    {
    path: '/WyjsciaNW2',
    name: 'WyjsciaNW2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WyjsciaNW2')
  },
      {
    path: '/Pomieszczenie023_2',
    name: 'Pomieszczenie023_2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pomieszczenie023_2')
  },
  {
    path: '/HistoriaZmian',
    name: 'HistoriaZmian',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HistoriaZmian')
  },
  {
  path: "/NW1/P:room",
  name: "RoomNW1",
  component: RoomNW1
},
{
  path: "/NW1/P:room/zadane",
  name: "RoomNW1Zadane",
  component: RoomNW1Zadane
},
{
  path: "/NW1/P:room/wymuszenia",
  name: "RoomNW1Wymuszenia",
  component: RoomNW1Wymuszenia
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return next("/login");
  }

  const requiredLevel = to.meta.level || 1;

  if (user.level < requiredLevel) {
    alert("Brak uprawnień");
    return next("/");
  }

  next();
});

export default router
