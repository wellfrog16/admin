import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Database from '@/views/sys/database/Database';
import Dictionary from '@/views/sys/config/Dictionary';
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

// 一个空模板，方便子节点使用
const Root = Vue.component('root', {
    template: '<router-view></router-view>'
});

export default new Router({
    routes: [
        {
            path: '',
            name: '系统',
            component: Home,
            icon: 'el-icon-setting',
            children: [
                {path: 'database', name: '数据库', icon: 'el-icon-tickets', component: Database},
                {path: 'log', name: '日志', icon: 'el-icon-document', component: Database},
                {
                    path: 'config',
                    name: '设置',
                    component: Root,
                    icon: 'el-icon-setting',
                    children: [
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
                {path: 'blog', name: '博客', icon: 'el-icon-tickets', component: Database},
                {path: 'photo', name: '相册', icon: 'el-icon-picture', component: Database}
            ]
        }
        // {
        //     path: '/qq',
        //     name: '系统4',
        //     component: Home
        // }
    ]
});
