<template>
    <div class="blog" ref="blog">
		<el-col :span="24" class="toolbar">
			<el-form :inline="true">
                <el-dropdown trigger="click" @command="choiceType">
                    <el-button type="primary">
                        新建<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">图文微博</el-dropdown-item>
                        <el-dropdown-item command="1">图片微博</el-dropdown-item>
                        <el-dropdown-item command="2">链接微博</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
			</el-form>
		</el-col>

        <el-table :data="list" stripe border style="width: 100%" ref="table">
            <el-table-column prop="name" label="状态" width="50"></el-table-column>
            <el-table-column prop="name" label="类型" width="50"></el-table-column>
            <el-table-column prop="name" label="标题"></el-table-column>
            <el-table-column prop="val" label="日期" width="100"></el-table-column>
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

        <el-dialog :title="form.editId === 0 ? '新建' : '修改'" :visible.sync="form.visible">
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
                <el-button @click="form.visible = false">取 消</el-button>
                <el-button type="primary" @click="save()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            total: 0,
            pagesize: this.$store.state.pagesize,
            page: 1,
            form0: {
                visible: false,
                editId: 0,
                fields: {
                    title: '',
                    visible: false,
                    content: '',
                    tags: []
                }
            },
            form1: {
                visible: false,
                editId: 0,
                fields: {
                    name: '',
                    description: '',
                    val: ''
                }
            },
            form2: {
                visible: false,
                editId: 0,
                fields: {
                    name: '',
                    description: '',
                    val: ''
                }
            }
        };
    },
    methods: {
        handleCurrentChange(page) {
            // this.loadList(page, this.pagesize);
        },
        choiceType(value) {
            this.$message('click on item ' + value);
        },
        create() {
            this.form.editId = 0;
            this.form.fields = {};
            this.form.visible = true;
            this.$nextTick(() => this.$refs['form'].clearValidate());
        }
    }
};
</script>

