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

        <!-- 图文博客界面 -->
        <el-dialog :title="form0.editId === 0 ? '新建' : '修改'" :visible.sync="form0.visible" :close-on-click-modal="false">
            <el-form :model="form0.fields" ref="form0" :rules="form0.rules" label-width="80px">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="form0.fields.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-tag :key="tag" v-for="tag in form0.fields.tags" closable :disable-transitions="false" @close="handleClose(tag, 0)">{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="form0.tagInputVisible" v-model="form0.tagInputValue" ref="form0TagInput" size="small" @keyup.enter.native="handleInputConfirm(0)" @blur="handleInputConfirm(0)"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTagInput(0)">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="正文" prop="content">
                    <Editor></Editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form0.visible = false">取 消</el-button>
                <el-button type="primary" @click="save()">保 存</el-button>
            </div>
        </el-dialog>

        <!-- 链接博文界面 -->
        <el-dialog :title="form2.editId === 0 ? '新建' : '修改'" :visible.sync="form2.visible">
            <el-form :model="form2.fields" ref="form2" :rules="form2.rules" label-width="80px">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="form2.fields.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-tag :key="tag" v-for="tag in form2.fields.tags" closable :disable-transitions="false" @close="handleClose(tag, 0)">{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="form2.tagInputVisible" v-model="form2.tagInputValue" ref="form2TagInput" size="small" @keyup.enter.native="handleInputConfirm(2)" @blur="handleInputConfirm(2)"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTagInput(2)">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="链接地址" prop="content">
                    <el-input placeholder="请输入链接地址" v-model="form2.fields.url">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="content">
                    <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form2.fields.url">
                    </el-input>
                </el-form-item>
                <el-form-item label="图片" prop="content">
                    <el-upload
                    class="avatar-uploader"
                    name="avatar"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form2.fields.url" :src="form2.fields.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form2.visible = false">取 消</el-button>
                <el-button type="primary" @click="save()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Editor from '../../../components/Editor.vue'; // 调用编辑器

export default {
    components: {Editor},
    data() {
        return {
            list: [],
            total: 0,
            uploadUrl: this.$store.state.uploadUrl,
            pagesize: this.$store.state.pagesize,
            page: 1,
            form0: {
                visible: true,
                editId: 0,
                tagInputVisible: false,
                tagInputValue: '',
                fields: {
                    title: '',
                    visible: false,
                    private: false,
                    content: '',
                    tags: ['11', '22', '333']
                },
                rules: {}
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
                    title: '',
                    visible: false,
                    private: false,
                    description: '',
                    url: '',
                    poster: '',
                    tags: ['11', '22', '333']
                }
            }
        };
    },
    methods: {
        handleCurrentChange(page) {
            // this.loadList(page, this.pagesize);
        },
        choiceType(value) {
            // this.$message('click on item ' + value);
            const handle = [
                () => {
                    this.form0.editId = 0;
                    // this.form0.fields = {};
                    this.form0.visible = true;
                    this.$nextTick(() => this.$refs['form0'].clearValidate());
                },
                () => {},
                () => {
                    this.form2.editId = 0;
                    // this.form0.fields = {};
                    this.form2.visible = true;
                    this.$nextTick(() => this.$refs['form2'].clearValidate());
                }
            ];

            handle[value]();
        },
        create() {
            this.form.editId = 0;
            this.form.fields = {};
            this.form.visible = true;
            this.$nextTick(() => this.$refs['form'].clearValidate());
        },
        showTagInput(index) {
            const handle = [
                () => {
                    this.form0.tagInputVisible = true;
                    this.$nextTick(() => this.$refs['form0TagInput'].$refs.input.focus());
                }
            ];

            handle[index]();
        },
        handleInputConfirm(index) {
            const handle = [
                () => {
                    let inputValue = this.form0.tagInputValue;
                    if (inputValue) {
                        this.form0.fields.tags.push(inputValue);
                    }
                    this.form0.tagInputVisible = false;
                    this.form0.tagInputValue = '';
                }
            ];

            handle[index]();
        },
        handleClose(tag, index) {
            const handle = [
                () => {
                    this.form0.fields.tags.splice(this.form0.fields.tags.indexOf(tag), 1);
                }
            ];

            handle[index]();
        },
        beforeAvatarUpload() {},
        handleAvatarSuccess() {}
    }
};
</script>

<style lang="less">
.el-tag + .el-tag, .el-tag + .button-new-tag, .el-tag + .input-new-tag {
    margin-left: 10px;
}
.button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    vertical-align: bottom;
}

.avatar-uploader {
    height: 80px;

    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }
}

.avatar {
    width: 78px;
    height: 78px;
    display: block;
}
</style>

