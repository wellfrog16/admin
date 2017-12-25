import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Database from '@/views/sys/Database';
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            name: '系统',
            component: Home,
            icon: 'el-icon-setting',
            children: [
                {path: 'database', name: '数据库', icon: 'el-icon-tickets', component: Database},
                {path: 'database88', name: '日志', component: Database},
                {
                    path: 'database9988',
                    name: '日志7',
                    component: Database,
                    children: [
                        {path: 'database22', name: '数据库3', icon: 'el-icon-tickets', component: Database},
                        {path: 'database33', name: '日志4', component: Database}
                    ]
                }
            ]
        },
        {
            path: '',
            name: '系统2',
            component: Home,
            children: [
                {path: 'database2', name: '数据库1', component: Database},
                {path: 'database3', name: '日志2', component: Database}
            ]
        },
        {
            path: '/qq',
            name: '系统4',
            component: Home
        }
    ]
});
