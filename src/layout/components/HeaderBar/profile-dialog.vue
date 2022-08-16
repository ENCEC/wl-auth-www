<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-15 14:29:01
 * @Description: 用户资料
-->

<template>
  <div class="user-profile-dialog">
    <el-dialog
      title="用户资料"
      v-bind="$attrs"
      width="720px"
      center
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      z-index="10000"
      v-on="$listeners"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        :inline="true"
        destroy-on-close
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名:" prop="account">
                <el-input
                  v-model="formData.account"
                  placeholder="请输入用户名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入姓名"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="mobile">
                <el-input
                  v-model="formData.mobile"
                  placeholder="请输入联系电话"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱:" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="请输入电子邮箱"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- TODO -->
            <el-col :span="12">
              <el-form-item label="用户类型:" prop="userType">
                <el-input
                  v-model="formData.userType"
                  placeholder="请输入用户类型"
                  clearable
                  disabled
                />
                <!-- <el-select
                  v-model="formData.userType"
                  placeholder="请选择用户类型"
                  clearable
                  disabled
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in userTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 联想控件 -->
              <el-form-item label="所属部门:" prop="deptName">
                <el-input
                  v-model="formData.deptName"
                  placeholder="请输入入职部门"
                  clearable
                  disabled
                />
                <!-- <Department v-model="formData.uemDeptId" placeholder="请选择所属部门" class="input-width" disabled /> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间:">
                <el-date-picker
                  v-model="formData.createTime"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择创建时间"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人:">
                <el-input
                  v-model="formData.creatorName"
                  placeholder="请输入创建人"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="medium"
          @click="handleConfirm"
        >确定</el-button>
        <el-button
          type="primary"
          :plain="true"
          size="medium"
          @click="close"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getLoginUserInfo, updateUemUserInfo } from '@/api/login';
import { formRules } from './rules';
// import Department from '@/components/CurrentSystem/Department.vue'

export default {
  components: { },
  // inheritAttrs: false,
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: formRules, // 验证规则
      formData: {
        account: '',
        name: '',
        mobile: '',
        email: '',
        userType: '',
        deptName: '',
        createTime: '',
        creatorName: ''
      }
      // // TODO
      // userTypeOptions: [
      //   {
      //     label: '选项一',
      //     value: '1'
      //   },
      //   {
      //     label: '选项二',
      //     value: '2'
      //   }
      // ]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getDetailInfo();
  },
  mounted() {},
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取用户信息
    getDetailInfo() {
      getLoginUserInfo().then(res => {
        const _res = res.data
        const roleList = _res.roleList.map(item => item.roleName)
        for (const key in this.formData) {
          if (key === 'userType') {
            this.formData[key] = roleList.join('、') || ''
          } else {
            this.formData[key] = _res[key] || ''
          }
        }
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          updateUemUserInfo(this.formData).then(res => {
            this.$message.success(res.data);
            this.close();
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.user-profile-dialog {
  .form-wrap {
    height: 230px;
    .input-width {
      width: 180px !important;
    }
  }
  // 底部按钮
  .dialog-footer {
    width: 100%;
    // background: #bcf;
    display: flex;
    justify-content: center;
    .el-button--default.el-button--mini {
      min-width: 92px;
    }
  }
}
</style>
