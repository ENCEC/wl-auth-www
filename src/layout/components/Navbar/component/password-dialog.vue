<!--
 * @Author: Hongzf
 * @Date: 2022-08-01 15:55:04
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-04 18:02:41
 * @Description: 修改密码
-->

<template>
  <div class="password-dialog">
    <el-dialog
      title="修改密码"
      v-bind="$attrs"
      width="550px"
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
            <el-col :span="24">
              <el-form-item label="新密码:" prop="password">
                <el-input
                  v-model="formData.password"
                  placeholder="只能输入数字或字母，且必须包含数字和字母"
                  type="password"
                  class="input-width"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="确认密码:" prop="rePassword">
                <el-input
                  v-model="formData.rePassword"
                  placeholder="请输入确认密码"
                  type="password"
                  class="input-width"
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
import { updatePassword } from '@/api/login';
import { aesEncrypt } from '@/utils/util'
export default {
  components: {},
  props: {},
  data() {
    const validatePass1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'));
      }
      const regex = /[\W]/g; //  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]$/
      if (regex.test(value)) {
        callback(new Error('只能输入数字或字母，且必须包含数字和字母'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        password: [
          {
            required: true,
            validator: validatePass1,
            trigger: 'blur'
          }
          // {
          //   pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]$/, // {8,16} /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)$/,
          //   message: '只能输入数字或字母，且必须包含数字和字母',
          //   trigger: 'blur'
          // }
        ],
        rePassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }, // 验证规则
      formData: {
        password: '',
        rePassword: ''
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.$refs['elForm'].clearValidate();
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          updatePassword({
            newPassword: aesEncrypt(this.formData.rePassword)
          }).then(res => {
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
.password-dialog {
  .form-wrap {
    height: 140px;
    .input-width {
      width: 300px;
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
