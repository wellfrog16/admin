<template>
    <div class="database">
        <!-- <el-col :span="24" class="toolbar">22</el-col> -->
        <el-table :data="list" stripe border style="width: 100%" ref="table">
            <el-table-column prop="folder" label="数据库" width="180"></el-table-column>
            <el-table-column prop="name" label="表名" width="180"></el-table-column>
            <el-table-column prop="size" label="大小" sortable width="100"></el-table-column>
            <el-table-column prop="path" label="路径" min-width="400"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import dbApi from '../../api/sys/database/database';

export default {
    data() {
        return {
            list: []
        };
    },
    created() {
        this.loadList();
    },
    methods: {
        async loadList() {
            const { list } = await dbApi.list();
            this.list = list;
        }
    }
};
</script>

<style lang="less">

</style>