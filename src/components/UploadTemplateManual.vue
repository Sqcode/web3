<!--  此组件，手动上传图片，并删除旧图片（接口如此） -->
<template>
  <el-upload ref="upload" v-loading="loading" class="avatar-uploader" :action="action" :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
    accept=".png,.jpg,.gif,.svg"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <!-- 触发computed -->
  <el-button @click="handleButtonClick" v-show="0" >{{lazyLoad}}</el-button>
</template>
<script>
import request from '@/utils/request'
import { isEmpty } from '@/utils/util'
import { computed } from 'vue'

export default {
  props: {
    url: {
      type: String,
      required: false
    },
    prefix: {
      type: String,
      required: false
    }
  },
  emits: ['success'],
  watch: {
    // url (newValue, oldValue) {
    //   console.log('watch', newValue, oldValue);
    //   if (newValue.indexOf('http') != -1 || newValue.indexOf('https') != -1) {
    //     this.imageUrl = newValue
    //   } else {
    //     this.imageUrl = process.env.VUE_APP_IMAGE_URL_PREFIX + newValue
    //   }
    // }
  },
  components: {
  },
  created () {
    this.action = process.env.VUE_APP_IMAGE_UPLOAD_PLUS_URL
  },
  data () {
    return {
      // imageUrl: computed(() => this.url ? (this.url.indexOf('http') != -1 || this.url.indexOf('https') != -1) ?
      //   this.url : (process.env.VUE_APP_IMAGE_URL_PREFIX + this.url) : ''),
      imageUrl: '',
      loading: false,
      file: {},
      action: '',
      // 将旧的文件保存下来
      update: 0,
      oldFilePath: ''
    }
  },
  computed: {
    lazyLoad : {
      get ()  {
        // console.log('get');
        return this.imageUrl = this.url ? (this.url.indexOf('http') != -1 || this.url.indexOf('https') != -1) ? this.url : (process.env.VUE_APP_IMAGE_URL_PREFIX + this.url) : ''},
      set (url) {
        // console.log('set', url);
        return this.imageUrl = url
      },
    }
  },
  mounted () {
  },
  methods: {
    handleButtonClick () {
      console.log(this.imageUrl)
    },
    handleChange(f, fileList){
      // console.log('handleChange', fileList);
      if (this.update === 0) {
        var oldFilePath = this.imageUrl.replace(process.env.VUE_APP_IMAGE_URL_PREFIX, '')
        this.oldFilePath = oldFilePath
        this.update++
        // console.log('oldFilePath', oldFilePath);
      }
      /* 本地预览方法 */
      this.$refs.upload.clearFiles();
      // 每次清空文件列表，就可以实现覆盖上传图片，但是只要有这行代码 this.$refs.upload.submit() 就会失效。
      // fileList.splice(0,1)
      // !!! 只要对fileList操作了，this.$refs.upload.submit() 就会失效。
      if (this.beforeUpload(f.raw)) {
        this.file = f.raw
        let URL = window.URL || window.webkitURL
        var localUrl = URL.createObjectURL(f.raw)
        // console.log('localUrl', localUrl)
        this.imageUrl = localUrl
      }
    },
    async beforeUpload(file) {
      // console.log('beforeUpload', file);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        await this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    submit(){
      // console.log('子上传图片submit');
      // this.$refs.upload.submit()
      if (!isEmpty(this.file)) {
        this.loading = true
        request.uploadFile(this.action, this.file, {'prefix': this.prefix, 'oldFilePath': this.oldFilePath}).then((res) => {
          if (res) {
            // console.log('result: ', res);
            this.$emit('success', res)
            this.loading = false
          }
        }).catch(error => {
          this.$message.error('服务接口异常')
          this.loading = false
        })
      } else {
        this.$emit('success', '')
      }
    }
  }
}
</script>
<style lang="scss" >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="scss" scoped>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>
