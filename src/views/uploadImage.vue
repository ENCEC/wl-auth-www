<template>
  <div>

    <el-uploader
      class="avatar-uploader"
      strategyKey='1'
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      style="margin: 20px"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-uploader>
    <label>FileKey:</label>
    <br><br>
    <el-input v-model="fileKey" style="width: 300px;" size="small"></el-input>
    <br><br>
    <el-link type="primary" :href="downloadUrl">点击下载文件</el-link>
  </div>
</template>
<script>
import ElementUi from 'ec-light-vue'

export default {
  name: "uploadImage",
  data() {
    return {
      fileList: [],
      imageUrl: '',
      fileKey: ''
    }
  },
  computed: {
    downloadUrl() {
      return ElementUi.UploaderStrategy.getDownLoadUrl(this.fileKey);
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
      document.cookie = "imageUrl=" + res.split("\"")[7];
    },
    getFileList(key) {
      this.imageUrl ="http://localhost:8081"+ElementUi.UploaderStrategy.getDownLoadUrl(key);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }, getCookie: function (name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    }
  },
  mounted: function () {
    this.getFileList([this.getCookie("imageUrl")]);
  }

}
</script>
<style scoped>
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

