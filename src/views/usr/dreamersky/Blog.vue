<template>
    <div class="blog" ref="blog">
		<el-col :span="24" class="toolbar">
			<el-form :inline="true">
                <el-dropdown trigger="click" :show-timeout="0" :hide-timeout="0" @command="create">
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
            <el-table-column label="发布" width="80" align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.publish" @change="changePublish(scope.row.id)" :disabled="scope.row.publish">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <i class="el-icon-document" v-if="scope.row.type === 'normal'"></i>
                    <i class="el-icon-picture" v-if="scope.row.type === 'photo'"></i>
                    <i class="el-icon-share" v-if="scope.row.type === 'link'"></i>
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column label="私人" width="80" align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.private" @change="changePrivate(scope.row.id)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="100"></el-table-column>            
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
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form0.fields.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-tag :key="tag" v-for="tag in form0.fields.tags" closable @close="closeTag(tag, 0)">{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="tagVisible" v-model="tagValue" ref="form0TagInput" size="small" @keyup.enter.native="saveTag(0)" @blur="saveTag(0)"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTag(0)">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="正文" prop="content">
                    <Editor v-model="form0.fields.content"></Editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form0.visible = false">取 消</el-button>
                <el-button type="primary" @click="save(0)">保 存</el-button>
            </div>
        </el-dialog>

        <!-- 图片博客界面 -->
        <el-dialog :title="form1.editId === 0 ? '新建' : '修改'" :visible.sync="form1.visible" :close-on-click-modal="false">
            <el-form :model="form1.fields" ref="form1" :rules="form1.rules" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form1.fields.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-tag :key="tag" v-for="tag in form1.fields.tags" closable @close="closeTag(tag, 1)">{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="tagVisible" v-model="tagValue" ref="form1TagInput" size="small" @keyup.enter.native="saveTag(1)" @blur="saveTag(1)"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTag(1)">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="上传">
                    <el-upload
                        name="avatar"
                        multiple
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="addPhoto">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span class="tips">只能上传jpg/png文件，建议16:9</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="照片">
                    <el-row>
                        <el-col :span="10" style="margin-bottom:24px;" v-for="(item, index) in form1.fields.photos" :key="index" :offset="index % 2 > 0 ? 1 : 0">
                            <el-card :body-style="{ padding: '0px' }">
                            <div class="photo"><img :src="`${imgServer}/${item.path}`"></div>
                            <div class="info">
                                <span><el-input size="mini" @change="changePhotoDes" @focus="photoIndex = index" placeholder="请输入照片描述" :value="item.description"></el-input></span>
                                <div class="bottom right clearfix">
                                <!-- <time class="time">{{ currentDate }}</time> -->
                                    <el-button-group>
                                        <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="movePhoto(index, -1)"></el-button>
                                        <el-button type="primary" size="mini" icon="el-icon-delete" @click="deletePhoto(item)"></el-button>
                                        <el-button type="primary" size="mini" icon="el-icon-arrow-right" @click="movePhoto(index, 1)"></el-button>
                                    </el-button-group>
                                </div>
                            </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form1.visible = false">取 消</el-button>
                <el-button type="primary" @click="save(1)">保 存</el-button>
            </div>
        </el-dialog>

        <!-- 链接博文界面 -->
        <el-dialog :title="form2.editId === 0 ? '新建' : '修改'" :visible.sync="form2.visible" :close-on-click-modal="false">
            <el-form :model="form2.fields" ref="form2" :rules="form2.rules" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form2.fields.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-tag :key="tag" v-for="tag in form2.fields.tags" closable @close="closeTag(tag, 0)">{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="tagVisible" v-model="tagValue" ref="form2TagInput" size="small" @keyup.enter.native="saveTag(2)" @blur="saveTag(2)"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTag(2)">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="链接地址" prop="url">
                    <el-input placeholder="请输入链接地址" v-model="form2.fields.url">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form2.fields.description">
                    </el-input>
                </el-form-item>
                <el-form-item label="图片" prop="poster">
                    <el-upload
                    class="avatar-uploader"
                    name="avatar"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="addPoster">
                    <img v-if="form2.fields.poster" :src="`${imgServer}/${form2.fields.poster}`" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form2.visible = false">取 消</el-button>
                <el-button type="primary" @click="save(2)">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Editor from '@/components/Editor.vue'; // 调用编辑器
import api from '@/api/usr/dreamersky/blog';
import config from '@/config';

const fields = {
    title: '',
    publish: false,
    private: false,
    tags: []
};

const fields0 = Object.assign({}, fields, {
    type: 'normal',
    content: ''
});

const fields1 = Object.assign({}, fields, {
    type: 'photo',
    photos: []
});

const fields2 = Object.assign({}, fields, {
    type: 'link',
    description: '',
    url: '',
    poster: ''         // 封面
});

export default {
    components: {Editor},
    data() {
        return {
            ...config,
            list: [],
            total: 0,
            page: 1,
            tagVisible: false,                  // 标签
            tagValue: '',                       // 标签值
            currentForm: null,                  // 当前form
            photoIndex: 0,                      // 图片微博当前激活的图片index
            form0: {
                visible: false,
                editId: 0,
                fields: fields0,
                rules: {
                    title: [
                        { required: true, message: '请输入微博标题', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ]
                }
            },
            form1: {
                visible: false,
                editId: 0,
                fields: fields1,
                rules: {
                    title: [
                        { required: true, message: '请输入微博标题', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ]
                }
            },
            form2: {
                visible: false,
                editId: 0,
                fields: fields2,
                rules: {
                    title: [
                        { required: true, message: '请输入微博标题', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入链接地址', trigger: 'blur' }
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
        async changePublish(index) {
            await api.changePublish(index);
            this.loadList(this.page, this.pagesize);
        },
        changePrivate(index) { api.changePrivate(index); },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleCurrentChange(page) {
            this.loadList(page, this.pagesize);
        },
        create(value) {
            const handle = [
                () => {
                    this.form0.editId = 0;
                    this.form0.fields = fields0;
                    this.form0.visible = true;
                    this.$nextTick(() => this.$refs['form0'].resetFields());
                    this.currentForm = this.form0;
                },
                () => {
                    this.form1.editId = 0;
                    this.form1.fields = fields1;
                    this.form1.visible = true;
                    this.$nextTick(() => this.$refs['form1'].resetFields());
                    this.currentForm = this.form1;
                },
                () => {
                    this.form2.editId = 0;
                    this.form2.fields = fields2;
                    this.form2.visible = true;
                    this.$nextTick(() => this.$refs['form2'].resetFields());
                    this.currentForm = this.form2;
                }
            ];

            handle[value]();
        },
        async edit(row) {
            const data = await api.detail(row.id);
            if (row.type === 'normal') {
                this.form0.editId = row.id;
                this.form0.fields = data;
                this.form0.visible = true;
                this.$nextTick(() => this.$refs['form0'].clearValidate());
                this.currentForm = this.form0;
            }

            if (row.type === 'photo') {
                this.form1.editId = row.id;
                this.form1.fields = data;
                this.form1.visible = true;
                this.$nextTick(() => this.$refs['form1'].clearValidate());
                this.currentForm = this.form1;
            }

            if (row.type === 'link') {
                this.form2.editId = row.id;
                this.form2.fields = data;
                this.form2.visible = true;
                this.$nextTick(() => this.$refs['form2'].clearValidate());
                this.currentForm = this.form2;
            }
        },
        showTag(index) {
            this.tagVisible = true;
            this.$nextTick(() => this.$refs[`form${index}TagInput`].$refs.input.focus());
        },
        saveTag(index) {
            if (this.tagValue && this.currentForm.fields.tags.indexOf(this.tagValue) === -1) {
                this.currentForm.fields.tags.push(this.tagValue);
            }
            this.tagVisible = false;
            this.tagValue = '';
        },
        closeTag(tag, index) {
            this.currentForm.fields.tags.splice(this.currentForm.fields.tags.indexOf(tag), 1);
        },
        addPhoto(response, file, fileList) {
            const path = response.data.path + '/' + response.data.filename;
            this.form1.fields.photos.push({
                description: '',
                path
            });
        },
        changePhotoDes(value) {
            this.form1.fields.photos[this.photoIndex].description = value;
        },
        deletePhoto(item) {
            this.form1.fields.photos.splice(this.form1.fields.photos.indexOf(item), 1);
        },
        movePhoto(index, x) {
            if ((x === -1 && index > 0) || (x === 1 && index < this.form1.fields.photos.length - 1)) {
                const temp = this.form1.fields.photos[index];
                this.form1.fields.photos[index] = this.form1.fields.photos[index + x];
                this.form1.fields.photos[index + x] = temp;
                this.form1.fields.photos.splice(0, 0);  // 刷新
            }
        },
        addPoster(response) {
            const path = response.data.path + '/' + response.data.filename;
            this.form2.fields.poster = path;
        },
        async save(index) {
            const valid = await this.$refs[`form${index}`].validate().then(valid => valid).catch(() => false);

            if (valid) {
                await (this.currentForm.editId === 0 ? api.insert(this.currentForm.fields) : api.update(this.currentForm.editId, this.currentForm.fields));
                this.loadList(this.page, this.pagesize);
                this.currentForm.visible = false;
            }
            // console.log(document.getElementById('photo'));
            // console.log(document.getElementById('photo').offsetWidth);
            // console.log(this.currentForm.fields);
            // this.loadList(this.page, this.pagesize);
        },
        async del(id) {
            const valid = await this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => true).catch(() => false);

            if (valid) {
                await api.del(id);
                this.loadList(this.page, this.pagesize);
            }
        }
    }
};
</script>

<style lang="less">
.blog {
    .tips {
        font-size: 12px;
        margin-left: 10px;
    }

    .el-card {
        .photo {
            font-size: 0;
            line-height: 0;
            img {
                width: 100%;
            }
        }

        .info {
            padding: 10px;

            .right {
                text-align: right;
            }
        }
    }

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
        top: 1px;

        input {
            font-size: 12px;
        }
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
}

</style>

