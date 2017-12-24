<template>
    <el-container class="app-container">
        <el-header>header</el-header>
        <el-container>
            <el-aside>
                <el-menu>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i><span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1 | 内容2</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-setting"></i><span>系统</span></template>
                        <el-menu-item index="2-1" @click="$router.push({ name: '数据库'})"><i class="el-icon-tickets"></i>数据库</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航3</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-col :span="24" class="breadcrumb">
                    <strong class="title">{{$route.name}}</strong>
                    <el-breadcrumb separator="/" class="breadcrumb-inner">
                        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default { };
</script>

<style lang="less">
@import '../assets/style/config.less';

.app-container {
    flex-direction: column;
    height: 100vh;

    >header {
        flex: 0 0 60px;
        line-height: 60px;
        background-color: @color-primary;
        color:#fff;
    }

    >section {

        >aside {
            flex: 0 0 200px;

            >ul {
                height: 100%;
            }
        }
    }
}

.breadcrumb {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>