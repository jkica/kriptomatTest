import Vue from 'vue'
import VueRouter from 'vue-router'
import AllCurrencies from '../views/AllCurrencies.vue'
import SingleCurrency from '../views/SingleCurrency.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'all',
        component: AllCurrencies
    },
    {
        path: '/single/:id',
        name: 'single',
        component: SingleCurrency,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
