<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 11:44:07
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-27 18:24:02
 * @Description: 系统管理-用户管理-添加/编辑
-->
<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="700px"
      center
      :close-on-click-modal="false"
      v-on="$listeners"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="mini"
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
              <el-form-item label="性别:" prop="sex">
                <el-radio-group v-model="formData.sex">
                  <el-radio
                    v-for="item in sexOptions"
                    :key="'sex' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电子邮箱:" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="请输入电子邮箱"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在职状态:" prop="jobStatus">
                <el-radio-group v-model="formData.jobStatus">
                  <el-radio
                    v-for="item in jobStatusOptions"
                    :key="'jobStatus' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工作年限:" prop="seniority">
                <el-input
                  v-model="formData.seniority"
                  placeholder="请输入工作年限"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职时间:" prop="entryDate">
                <el-date-picker
                  v-model="formData.entryDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择入职时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <el-select
                  v-model="formData.staffDutyCode"
                  placeholder="请选择入职岗位"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in staffTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 联想控件 -->
              <el-form-item label="归属项目:" prop="projectId">
                <el-select
                  v-model="formData.projectId"
                  placeholder="请选择归属项目"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in projectTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="handleConfirm"
        >提交</el-button>
        <el-button
          type="primary"
          :plain="true"
          size="mini"
          @click="close"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUemUser, saveUemUser, editUemUser } from '@/api/user-manege';
import { formRules } from './rules';

export default {
  components: {},
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
        account: 'hzf',
        name: 'hzf',
        mobile: '13960081319',
        sex: '',
        email: '1628415507@qq.com',
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        seniority: 1,
        entryDate: '', // 入职时间
        staffDutyCode: 'ssss',
        projectId: 2
      },
      // TODO（0男，1女）
      sexOptions: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ],
      // 在职状态 //TODO
      jobStatusOptions: [
        {
          label: '试用员工',
          value: '0'
        },
        {
          label: ' 正式员工',
          value: '1'
        }
      ],
      // TODO
      staffTypeOptions: [
        {
          label: '选项一',
          value: '1'
        },
        {
          label: '选项二',
          value: '2'
        }
      ],
      // TODO
      projectTypeOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.uemUserId && this.getDetailInfo();
      console.log('【 this.editData 】-246', this.editData);
      return this.editData.uemUserId ? '编辑用户信息' : '新增用户';
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
        this.formData = { ...this.formData, ...res.data, sex: res.data.sex ? 0 : 1 };
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.uemUserId ? editUemUser : saveUemUser;
          funcName(this.formData).then(res => {
            this.$message.success(res.data);
            this.$emit('getTableData', '');
            this.close();
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.form-wrap {
  height: 240px;
  .input-width {
    width: 180px;
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
</style>
