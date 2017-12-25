<template>
    <div class="database">
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" style="padding-bottom: 0px;">
				<el-form-item>
					<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <el-table :data="list" stripe border style="width: 100%" ref="table">
            <el-table-column prop="folder" label="数据库" width="180"></el-table-column>
            <el-table-column prop="name" label="表名" width="180"></el-table-column>
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

        <el-dialog title="新建" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" placeholder="英文字符串"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description" auto-complete="off" placeholder="信息"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="form.content" auto-complete="off" placeholder="用英文逗号分隔，例：日,四周,月,年"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import dbApi from '../../../api/sys/config/dictionary';

export default {
    data() {
        return {
            list: [],
            total: 0,
            pagesize: 20,
            page: 1,
            dialogFormVisible: false,
            form: {
                name: '',
                description: '',
                content: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入字典名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入字典内容', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        // this.loadList(this.page, this.pagesize);
    },
    methods: {
        // async loadList(page, pagesize) {
        //     const { total, list } = await dbApi.list({page, pagesize});
        //     this.total = total;
        //     this.list = list;
        // },
        handleCurrentChange(page) {
            this.loadList(page, this.pagesize);
        }
    }
};
</script>

<style lang="less">

</style>