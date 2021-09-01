<!--  此组件，手动上传文件，并删除旧图片（接口如此） -->
<template>
  <el-upload
    ref="upload" v-loading="loading"
    :action="action"
    class="upload-demo"
    :auto-upload="false"
    accept=".pdf,.doc,.docx,.xls,.xlsx"
    :file-list="fileList"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-change="handleChange"
    :update="update"
    >
    <el-button size="small" type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        只能上传 .pdf,.doc,.docx,.xls,.xlsx 文件，且不超过 200M
      </div>
    </template>
  </el-upload>
    <!-- <el-button @click="handleButtonClick">获取文件内容</el-button> -->
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
    name: {
      type: String,
      required: false
    },
    prefix: {// 上传oss的前缀路径
      type: String,
      required: false
    }
  },
  setup(props) {
    var url = props.url
    var name = props.name
    var fileUrl = url ? (url.indexOf('http') != -1 || url.indexOf('https') != -1) ? url : (process.env.VUE_APP_DOMAIN_URL + url) : ''
    // console.log('setup', [{name: name, url: fileUrl}]);
    return {
      fileUrl,
      fileName: name,
      fileList: fileUrl ? [{name: name, url: fileUrl}] : [],
      oldFilePath: fileUrl.replace(process.env.VUE_APP_DOMAIN_URL, '')
    };
  },
  components: {
  },
  created () {
    this.action = process.env.VUE_APP_IMAGE_UPLOAD_PLUS_URL
  },
  data () {
    return {
      loading: false,
      file: {},
      action: '',
      isChange: false,
      isDel: false,
      update: 0
    }
  },
  mounted () {
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList
      this.isDel = true
    },
    handlePreview(file) {
      console.log(file);
    },
    // handleExceed(files, fileList) { :on-exceed="handleExceed"
    //   this.$message.warning(`当前限制选择 1 个文件，请删除后再上传 `);
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleButtonClick () {
      console.log(this.fileUrl, this.oldFilePath, this.fileList)
    },
    handleChange(f, fileList){
      console.log('handleChange', f);
      /* 本地预览方法 */
      this.$refs.upload.clearFiles();
      // 每次清空文件列表，就可以实现覆盖上传图片，但是只要有这行代码 this.$refs.upload.submit() 就会失效。
      // fileList.splice(0,1)
      // !!! 只要对fileList操作了，this.$refs.upload.submit() 就会失效。
      if (this.beforeUpload(f.raw)) {
        this.file = f.raw
        let URL = window.URL || window.webkitURL
        var localUrl = URL.createObjectURL(f.raw)
        console.log('localUrl', localUrl)
        this.fileUrl = localUrl
        this.fileName = f.raw.name
        this.isChange = true
        this.fileList = [{name: f.raw.name , url: localUrl}]
        this.update++
      }
    },
    async beforeUpload(file) {
      // console.log('beforeUpload', file);
      const isLt2M = file.size / 1024 / 1024 < 200;
      if (!isLt2M) {
        await this.$message.error('上传文件大小不能超过 200MB!');
      }
      return isLt2M;
    },
    async upload(file) {
      const response = await new Promise(resolve => {
        // setTimeout(() => {
          this.loading = true
          request.uploadFile(this.action, this.file, {'prefix': this.prefix, 'oldFilePath': this.oldFilePath}).then((res) => {
            if (res) {
              // console.log('result: ', res);
              resolve(res);
              this.loading = false
            }
          }).catch(error => {
            this.$message.error('oss服务接口异常')
            this.loading = false
          })
        // }, 2000);
      });
      return response
    },
    del (file) {
      request.get(process.env.VUE_APP_IMAGE_DEL_URL + "/?filePath=" + this.oldFilePath).then((res) => {
        if (res) {
          console.log(res);
        }
      }).catch(error => {
        this.$message.error('oss服务接口异常')
      })
    },
    submit(){
      if (this.isDel) {
        thsi.del(this.oldFilePath)
      }
      if (this.isChange && !isEmpty(this.file)) {
        // console.log('上传oss');
        return this.upload()
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
