import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Database from '@/views/sys/database/Database';
import Dictionary from '@/views/sys/config/Dictionary';
import Blog from '@/views/usr/dreamersky/Blog';

// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

// 一个空模板，方便子节点使用
const Root = Vue.component('root', {
    template: '<router-view></router-view>'
});

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
    // savedPosition is only available for popstate navigations.
        return savedPosition;
    } else {
        const position = {};
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => !m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0;
            position.y = 0;
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};

export default new Router({
    scrollBehavior,
    routes: [
        {
            path: '',
            name: '系统',
            component: Home,
            icon: 'el-icon-setting',
            children: [
                {path: 'database', name: '数据库', icon: 'el-icon-tickets', component: Database},
                {path: 'log', name: '日志', icon: 'el-icon-document', component: Database},
                {path: 'file', name: '文件管理', icon: 'el-icon-document', component: Database},
                {
                    path: 'config',
                    name: '设置',
                    component: Root,
                    icon: 'el-icon-setting',
                    children: [
                        {path: 'dictionary', name: '常规', icon: 'el-icon-document', component: Dictionary},
                        {path: 'dictionary', name: '字典', icon: 'el-icon-document', component: Dictionary}
                    ]
                }
            ]
        },
        {
            path: '',
            name: 'Dreamersky',
            component: Home,
            icon: 'el-icon-mobile-phone',
            children: [
                {path: 'blog', name: '博客', icon: 'el-icon-tickets', component: Blog},
                {path: 'photo', name: '相册', icon: 'el-icon-picture', component: Database}
            ]
        },
        {
            path: '/login',
            name: '登陆',
            hidden: true,
            component: Login
        }
    ]
});
