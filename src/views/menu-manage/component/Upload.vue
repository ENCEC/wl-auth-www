<!--
 * @Author: Hongzf
 * @Date: 2022-08-18 10:05:34
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-25 17:53:41
 * @Description:
-->
<template>
  <el-upload
    v-bind="$attrs"
    :action="uploadUrl"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    class="avatar-uploader"
    v-on="$listeners"
  >
    <el-image v-if="imgUrl" class="img-box" :src="imgUrl" fit="scale-down" />
    <i v-else class="el-icon-plus img-uploader-icon" />
  </el-upload>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_SHARE_AUTH_PREFIX + '/uploadResourceLogo',
      imgUrl: '',
      fileSize: 2
    };
  },
  watch: {
    src(val) {
      // console.log('【 val 】-40', val);
      this.imgUrl = val;
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 上传大小格式限制
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/jpg', 'image/png'];
      const isIMG = types.includes(file.type);
      const isLtNM = file.size / 1024 / 1024 < this.fileSize;
      if (!isIMG) {
        this.$message.error('上传图片只支持 JPG、PNG 格式 !');
        return false;
      }
      if (!isLtNM) {
        this.$message.error(`文件大小不能超过${this.fileSize}MB!`);
        return false;
      }
      return isIMG && isLtNM;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.imgUrl = response;
      this.$emit('update:src', this.imgUrl)
    }
  }
};
</script>
<style lang="scss" scoped>
$baseW:50px;
$baseH:50px;
.img-box {
  width:$baseW;
  height: $baseH;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 6px;
  border: 1px solid #dddddd;
}
.img-uploader-icon {
  width: $baseW;
  height: $baseH;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  padding: 2px;
  line-height:45px;
  border-radius: 6px;
  font-size: 16px;
  color: #8c939d;
 text-align: center;
}
</style>
