<template>
    <div class="database" ref="database" id="qq">
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" style="padding-bottom: 0px;">
				<el-form-item>
					<el-button type="primary" @click="create()">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <el-table :data="list" stripe border style="width: 100%" ref="table">
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="val" label="值" width="400"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="operation" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
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

        <el-dialog title="新建" :visible.sync="form.helper.visible">
            <el-form :model="form.fields" ref="form" :rules="form.rules" label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.fields.name" placeholder="英文字符串"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="form.fields.description" placeholder="信息"></el-input>
                </el-form-item>
                <el-form-item label="值" prop="val">
                    <el-input v-model="form.fields.val" placeholder="用英文逗号分隔，例：日,四周,月,年"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form.helper.visible = false">取 消</el-button>
                <el-button type="primary" @click="save()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '../../../api/sys/config/dictionary';

export default {
    data() {
        return {
            list: [],
            total: 0,
            pagesize: 10,
            page: 1,
            form: {
                fields: {
                    name: '',
                    description: '',
                    val: ''
                },
                helper: {
                    visible: false,
                    editId: 0,
                    timer: null    // 表单验证延迟用
                },
                rules: {
                    name: [
                        { required: true, message: '请输入字典名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                        { validator: this.checkName, trigger: 'blur' }
                    ],
                    val: [
                        { required: true, message: '请输入字典值', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ]
                }
            }
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
        },
        async save() {
            const valid = await this.$refs['form'].validate().then(valid => valid).catch(() => false);

            if (valid) {
                await (this.form.helper.editId === 0 ? api.insert(this.form.fields) : api.update(this.form.helper.editId, this.form.fields));
                this.loadList(this.page, this.pagesize);
                this.form.helper.visible = false;
            }
        },
        create() {
            this.form.helper.editId = 0;
            this.form.fields = {};
            this.form.helper.visible = true;
            this.$nextTick(() => this.$refs['form'].clearValidate());
        },
        edit(row) {
            this.form.helper.editId = row.id;
            this.form.fields = Object.assign({}, row);
            this.form.helper.visible = true;
            this.$nextTick(() => this.$refs['form'].clearValidate());
        },
        async del(id) {
            const valid = await this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => true).catch(() => false);

            if (valid) {
                await api.del(id);
                this.loadList(this.page, this.pagesize);
            }
        },
        // 表单验证用
        async checkName(rule, value, callback) {
            if (!this.form.helper.timer) {
                var x = false;
                this.form.helper.timer = 'frog';
                this.form.helper.timer = await setTimeout(() => { x = true; }, 1000);
                console.log(this.form.helper.timer);
                if (x && await api.checkName(value)) {
                    callback(new Error('字典名称已经存在'));
                    this.form.helper.timer = null;
                } else {
                    callback();
                    this.form.helper.timer = null;
                }
            } else {
                // callback();
            }
        }
    }
};
</script>

<style lang="less">

</style>