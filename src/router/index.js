import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Database from '@/views/system/Database';
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: '首页',
            component: Home,
            children: [
                {path: 'databse', name: '数据库', component: Database}
            ]
        }
    ]
});
