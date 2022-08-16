<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <i class="el-icon-user-solid" size="28px" />
          <span class="name">{{ name || '' }}</span>
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- 用户资料 -->
          <el-dropdown-item divided @click.native="handleProfileOpen">
            {{ $t('navbar.profile') }}
          </el-dropdown-item>
          <!-- 修改密码 -->
          <el-dropdown-item divided @click.native="handlePasswordOpen">
            {{ $t('navbar.dashboard') }}
          </el-dropdown-item>
          <!-- 退出登录 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 用户资料-->
    <ProfileDialog
      v-if="profileDialogVisible"
      :visible.sync="profileDialogVisible"
      :edit-data="editData"
    />
    <!-- 修改密码 -->
    <PasswordDialog
      v-if="passwordDialogVisible"
      :visible.sync="passwordDialogVisible"
      :edit-data="editData"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileDialog from './profile-dialog';
import PasswordDialog from './password-dialog';
export default {
  components: {
    ProfileDialog,
    PasswordDialog
  },
  data() {
    return {
      profileDialogVisible: false,
      passwordDialogVisible: false,
      editData: {}
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name',
      'userId',
      'userInfo'
    ])
  },
  created() {
    console.log('【 userId 】-94', this.userId)
    console.log('【 userInfo 】-95', this.userInfo)
  },
  methods: {
    // 打开用户资料弹框
    handleProfileOpen() {
      this.profileDialogVisible = true;
    },
    // 打开修改密码弹框
    handlePasswordOpen() {
      this.passwordDialogVisible = true;
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出系统
    logout() {
      this.$confirm('您要退出员工管理系统吗？', '消息提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      // background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .el-icon-user-solid{
          color:#000099;
          font-size: 20px;
        }
        .name{
          margin-left: 3px;
          margin-right: 5px;
          font-size: 14px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          color:#000099;
          font-size: 20px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

      }
    }
  }
}
</style>
