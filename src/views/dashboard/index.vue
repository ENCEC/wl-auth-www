<template>
  <div class="dashboard-container">
    <div class="home-wrap">
      <el-card v-for="(item,index) in 3 " :key="index" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-monitor" />
          <span>功能开发中</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <!-- <div v-for="o in 4" :key="o" class="text item">
          {{ '敬请期待 ' + o }}
        </div> -->
        <div class="text item">
          敬请期待...
        </div>
      </el-card>
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
<style lang="scss" scoped>
.home-wrap{
  display: flex;
  justify-content: space-between;
  padding: 24px;
  .box-card{
    width: 32.5%;
    .item{
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size:18px;
      color: #ccc;
    }
  }
}
</style>
