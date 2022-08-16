<!--
 * @Author: Hongzf
 * @Date: 2022-08-15 15:58:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-16 09:39:25
 * @Description:
-->
<template>
  <div class="header-warp">
    <div class="left-part">
      <el-image
        style="width: 132px; height: 39px"
        :src="require('@/assets/images/Gillion_logo.png')"
        fit="adpcit"
      />
      <span class="title">部门管理系统</span>
    </div>
    <div class="right-part">
      <dropdown-menu />
    </div>

  </div>
  <!-- </el-header> -->
</template>

<script>
import { mapGetters } from 'vuex'
import DropdownMenu from './dropdown-menu';

export default {
  components: {
    DropdownMenu
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.header-warp {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: $headerHeight;
  background: $headerBg;
  // background: pink;
  display: flex;
  justify-content: space-between;
  .left-part{
    display: flex;
    // justify-content:space-around;
    align-items: center;
    padding:0 15px;
    width:70%;
   .title{
      margin-left: 15px;
      font-size:27px;
      font-weight: 550;
      flood-color: #797979;
    }
  }
  .right-part{
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width:30%
  }
}
</style>
