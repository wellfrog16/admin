<template>
    <div class="vue-quill-editor">
        <!--富文本编辑器组件-->
        <quill-editor
            v-model="detailContent"
            ref="myQuillEditor"
            :options="editorOption"
        >
        </quill-editor>
    </div>
</template>
<script>
import {quillEditor} from 'vue-quill-editor'; // 调用编辑器

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    components: {quillEditor},
    data() {
        return {
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            serverUrl: '',  // 这里写你要上传的图片服务器地址
            header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
            detailContent: '', // 富文本内容
            editorOption: { // 富文本编辑器配置
                theme: 'bubble'
            }
        };
    },
    methods: {
        // 上传图片前
        beforeUpload(res, file) {},
        // 上传图片成功
        uploadSuccess(res, file) {},
        // 上传图片失败
        uploadError(res, file) {}
    }
};
</script>

<style lang="less">
@import '../assets/style/config.less';

.vue-quill-editor {
    border:1px solid @color-border1;
    border-radius: 4px;
}

.quill-editor {
    height: 30vh;
}
</style>
