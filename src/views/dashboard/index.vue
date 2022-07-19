<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container ">
      <p>作业一：控件练习</p>
      <p>1、将联想控件改为复选方式</p>
      <p>2、联想控件查询支持根据姓名查询也支持性别查询</p>
      <p>3、联想控件支持模糊查询</p>
      <p>作业二：导入导出</p>
      <p>1.分页查询导出</p>
      <p>在新表格上增加一个【导出】按钮，点击【导出】按钮，则导出当前页数据。</p>
      <p>2.导入</p>
      <p>在新表格上增加一个【导入】按钮，将excel中的数据导入至数据库表中，需要增加过滤条件，只能导入age>18 的学生信息，导入后表格内需要能展示导入的数据。</p>
      <p>作业二：图片上传回显</p>
      <el-button v-per="'/test/permit'" size="mini">Test</el-button>
      <el-button v-per="'/hello/world'" size="mini">Hello</el-button>
      <el-button v-per.checkPermits="'/test/permit2'" size="mini">Test2</el-button>
      <el-button v-per.checkPermits="'/hello/world2'" size="mini">Hello2</el-button>

      <el-alert
        :title="title"
        type="info"
        :description="info"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      permissionsLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    noPermits() {
      if (!this.$permissions.noPermits) {
        return '';
      }
      return this.$permissions.noPermits.join(', ');
    },
    permits() {
      if (!this.$permissions.permits) {
        return '';
      }
      return this.$permissions.permits.join(', ');
    },
    title() {
      if (this.permissionsLoading) {
        return '权限加载中';
      }
      return '权限已加载';
    },
    info() {
      if (this.permissionsLoading) {
        return '';
      }
      return JSON.stringify({
        noPermits: this.$permissions.noPermits,
        permits: this.$permissions.permits
      }, null, 4);
    }
  },

  async created() {
    this.permissionsLoading = true;
    await this.$permissions.loadPermissions(this.$route.path);
    this.permissionsLoading = false;
  }
}
</script>
<style scoped>
  .dashboard-editor-container {
    padding: 20px;
  }
</style>
