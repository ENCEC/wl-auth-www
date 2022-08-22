<!--
 * @Author: Hongzf
 * @Date: 2022-08-22 09:33:36
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-22 09:41:18
 * @Description:系统管理-标签管理-添加/编辑
-->

<template>
  <div class="user-dialog">
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="720px"
      z-index="1000"
      :append-to-body="true"
      center
      :close-on-click-modal="false"
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
              <el-form-item label="标签名称:" prop="account">
                <el-input
                  v-model="formData.account"
                  placeholder="请输入标签名称"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标签描述:" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入标签描述"
                  clearable
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
        >提交</el-button>
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
import { getUemUser, saveUemUser, editUemUser } from '@/api/user-manage';

export default {
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        account: [
          {
            required: true,
            message: '请输入标签名称',
            trigger: 'blur'
          }
        ]
      }, // 验证规则
      formData: {
        uemUserId: '',
        account: ''
      }
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.uemUserId && this.getDetailInfo();
      return this.editData.uemUserId ? '编辑标签信息' : '新增标签';
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取用户信息
    getDetailInfo() {
      getUemUser({
        uemUserId: this.editData.uemUserId
      }).then(res => {
        const _res = res.data
        for (const key in this.formData) {
          this.formData[key] = _res[key] || ''
        }
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.uemUserId ? editUemUser : saveUemUser;
          funcName(this.formData).then(res => {
            if (res.success) {
              this.$message.success(res.data);
              this.$emit('getTableData', '');
              this.close();
            } else {
              this.$message.error(res.errorMessages[0]);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.user-dialog {
  .form-wrap {
    // height: 280px;
    // .input-width {
    //   width: 180px !important;
    // }
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
