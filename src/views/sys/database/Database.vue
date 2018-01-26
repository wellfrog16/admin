<template>
    <div class="database">
        <!-- <el-col :span="24" class="toolbar">22</el-col> -->
        <el-table :data="list" stripe border style="width: 100%" ref="table">            
            <el-table-column prop="name" label="表名" width="180"></el-table-column>
            <el-table-column prop="folder" label="数据库" width="180"></el-table-column>
            <el-table-column prop="size" label="大小" sortable align="right" width="100"></el-table-column>
            <el-table-column prop="path" label="路径" min-width="400"></el-table-column>
        </el-table>

        <el-col :span="24" class="footerbar">
            <el-pagination class="pagination"
                background
                layout="total, prev, pager, next" 
                :total="total" 
                :page-size="pagesize"
                :current-page.sync="page"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-col>
    </div>
</template>

<script>
import api from '@/api/sys/database/database';
import config from '@/config';

export default {
    data() {
        return {
            list: [],
            total: 0,
            pagesize: config.pagesize,
            page: 1
        };
    },
    created() {
        this.loadList(this.page, this.pagesize);
    },
    methods: {
        async loadList(page, pagesize) {
            const { total, list } = await api.list({page, pagesize});
            this.total = total;
            this.list = list;
        },
        handleCurrentChange(page) {
            this.loadList(page, this.pagesize);
        }
    }
};
</script>

<style lang="less">

</style>