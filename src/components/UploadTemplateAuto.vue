<!--  此组件，自动上传图片（oss） -->
<template>
  <el-upload v-loading="loading" class="avatar-uploader" :action="action" :show-file-list="false"
    :before-upload="beforeUpload"
    :on-progress="handleProgress"
    :on-success="handleSuccess"
    >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  emits: ['success'],
  watch: {
    url (v) {
      // console.log('watch', v);
      this.imageUrl = process.env.VUE_APP_DOMAIN_URL + v
    }
  },
  components: {
  },
  created () {
    this.action = process.env.VUE_APP_IMAGE_UPLOAD_URL
  },
  data () {
    return {
      imageUrl: '',
      loading: false
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    beforeUpload(file) {
      // console.log('beforeUpload', file);
      const isJPG = file.type === ('image/jpeg' || 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG | PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleProgress(event, file, fileList) {
      this.loading = true
    },
    handleSuccess(res, file) {
      this.loading = false
      let status = file.status
      if ('success' === status) {
        var imageUrl = URL.createObjectURL(file.raw);
        // console.log(imageUrl);
        this.imageUrl = imageUrl
        // console.log('target: ', file.response.data);
        this.$emit('success', file.response.data)
      } else {
        this.$message({
          type: 'error',
          message: '上传失败！'
        })
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
