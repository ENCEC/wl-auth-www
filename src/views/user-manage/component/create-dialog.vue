<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 11:44:07
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-25 17:32:42
 * @Description: 系统管理-用户管理-添加/编辑
-->
<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      :title="dialogTitle"
      width="700px"
      center
      :close-on-click-modal="false"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
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
                    v-for="(item, index) in sexOptions"
                    :key="index"
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
              <el-form-item label="在职状态:" prop="status">
                <el-radio-group v-model="formData.status">
                  <el-radio
                    v-for="(item, index) in statusOptions"
                    :key="index"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工作年限:" prop="workyear">
                <el-input
                  v-model="formData.workyear"
                  placeholder="请输入工作年限"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职时间:" prop="startTime">
                <el-date-picker
                  v-model="formData.startTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{ width: '180px' }"
                  placeholder="请选择入职时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffType">
                <el-select
                  v-model="formData.staffType"
                  placeholder="请选择入职岗位"
                  clearable
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
              <el-form-item label="归属项目:" prop="projectType">
                <el-select
                  v-model="formData.projectType"
                  placeholder="请选择归属项目"
                  clearable
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
        <el-button size="mini" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveUemUser } from '@/api/user-manege';

export default {
  components: {},
  inheritAttrs: false,
  props: {
    // 编辑信息
    // editData: {
    //   default: () => {
    //   }
    // }
  },
  data() {
    return {
      editData: {},
      formData: {
        account: '',
        name: '',
        mobile: '',
        sex: 'man',
        email: '',
        status: 2,
        workyear: undefined,
        startTime: null,
        staffType: undefined,
        projectType: undefined
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '性别不能为空',
            trigger: 'change'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入电子邮箱',
            trigger: 'blur'
          },
          {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '电子邮箱格式错误',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '在职状态不能为空',
            trigger: 'change'
          }
        ],
        workyear: [
          {
            required: true,
            message: '请输入工作年限',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择入职时间',
            trigger: 'change'
          }
        ],
        staffType: [
          {
            required: true,
            message: '请选择入职岗位',
            trigger: 'change'
          }
        ],
        projectType: [
          {
            required: true,
            message: '请选择归属项目',
            trigger: 'change'
          }
        ]
      },
      sexOptions: [
        {
          label: '男',
          value: 'man'
        },
        {
          label: '女',
          value: 'women'
        }
      ],
      statusOptions: [
        {
          label: '试用员工',
          value: 1
        },
        {
          label: ' 正式员工',
          value: 2
        }
      ],
      staffTypeOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
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
      return this.editData.id ? '编辑用户信息' : '新增用户';
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields();
    },
    close() {
      this.$emit('update:visible', false);
    },
    // 提交信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          saveUemUser(this.formData).then(res => {
            console.log('【 res 】-337', res);
            // this.close();
          });
        }
        // return;
      });
    }
  }
};
</script>
<style lang="scss">
.form-wrap {
  height: 240px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
