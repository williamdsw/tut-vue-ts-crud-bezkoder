
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        alias: '/tutorials',
        name: 'tutorials',
        component: () => import('../components/TutorialsList.vue')
    },
    {
        path: '/tutorials/:id',
        alias: '/tutorial-details',
        component: () => import('../components/Tutorial.vue')
    },
    {
        path: '/add',
        alias: 'add',
        component: () => import('../components/AddTutorial.vue')
    },
    {
        path: '*',
        component: () => import('../components/NotFound.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;