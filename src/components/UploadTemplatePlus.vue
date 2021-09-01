<template>
  <el-upload v-loading="loading" class="avatar-uploader" :action="action" :show-file-list="false"
    :before-upload="beforeUpload"
    :on-progress="handleProgress"
    :on-success="handleSuccess"
    :auto-upload="false"
    >
    <template #default>
      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
      <div v-if="imageUrl">
        <img class="el-upload-list__item-thumbnail" :src="imageUrl" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </template>
    <template #file="{file}">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="visible">
    <img width="100%" :src="imageUrl" alt="">
  </el-dialog>
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
      loading: false,
      visible: false,
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    beforeUpload(file) {
      console.log('beforeUpload', file);
      const isJPG = file.type === 'image/jpeg' || 'image/png';
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
        console.log(imageUrl);
        this.imageUrl = imageUrl
        console.log('target: ', file.response.data);
        this.$emit('success', file.response.data)
      } else {
        this.$message({
          type: 'error',
          message: '上传失败！'
        })
      }
    },
    handleRemove(file) {
      console.log('handleRemove', file);
    },
    handlePreview(file) {
      console.log('handlePreview', file);
      this.imageUrl = file.url;
      this.visible = true;
    },
    handleDownload(file) {
      console.log('handleDownload', file);
    }
  }
}
</script>
<style lang="scss" >

.el-upload-list--picture-card .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity var(--el-transition-duration);
}
  .el-upload-list__item {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    font-size: 14px;
    color: var(--el-color-text-regular);
    line-height: 1.8;
    margin-top: 5px;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
}
  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  // }
  // .avatar-uploader .el-upload:hover {
  //   border-color: #409EFF;
  // }
  // .avatar {
  //   width: 178px;
  //   height: 178px;
  //   display: block;
  // }
</style>
<style lang="scss" scoped>
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  //   text-align: center;
  // }
</style>
