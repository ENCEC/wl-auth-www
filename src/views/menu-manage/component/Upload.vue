<template>
  <el-upload
    v-bind="$attrs"
    :action="uploadUrl"
    :data="uploadData"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    class="avatar-uploader"
    v-on="$listeners"
  >
    <el-image
      v-if="imgUrl"
      style="width:50px; height: 50px;background:#ccc"
      :src="imgUrl"
      fit="contain"
    />
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>
<script>
export default {
  props: {
    uploadData: {
      type: Object, // 传入的值
      require: true,
      default: () => {}
    },
    src: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_SHARE_AUTH_PREFIX + '/uemUserManage/uploadExternalFile',
      fileSize: 2,
      fileList: []
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    };
  },
  watch: {
    fileInfo(val) {
      this.fileList.push({
        name: val,
        fileKey: val
      })
      // console.log('【 val 】-53', val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 上传个数限制
    handleExceed(files, fileList) {
      this.$message.error('最多只能上传1个文件');
    },
    // 上传大小格式限制
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/jpg', 'image/png']
      const isIMG = types.includes(file.type)
      const isLtNM = file.size / 1024 / 1024 < this.fileSize;
      if (!isIMG) {
        this.$message.error('上传图片只支持 JPG、PNG 格式 !')
        return false
      }
      if (!isLtNM) {
        this.$message.error(`文件大小不能超过${this.fileSize}MB!`);
        return false
      }
      if (isIMG && isLtNM) {
        const fileName = file.name
        this.uploadData.fileName = fileName.substring(0, fileName.lastIndexOf('.'))
        this.uploadData.fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
      }
      return isIMG && isLtNM;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      console.log('【handleSuccess- response, file, fileList 】-87', response.data, file, fileList)
      const obj = response.data
      this.fileList = []
      for (const key in obj) {
        this.fileList = [{
          name: obj[key],
          fileKey: key
        }]
      }
      // console.log('【 this.fileList 】-92', this.fileList)
    },
    // 确认删除前执行的操作
    beforeRemove(file, fileList) {
      // 在beforeRemove方法中对文件的状态进行判断，只有当前文件存在并且上传状态为success时才弹框提示。
      if (file && file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
 .avatar-uploader-icon {
    background: rgb(240, 240, 240);
    font-size:16px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
}
</style>
