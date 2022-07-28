<!--
 * @Author: Hongzf
 * @Date: 2022-07-27 17:05:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-28 11:24:05
 * @Description:系统管理-角色管理-添加/编辑
-->

<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="800px"
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
        :disabled="type === 'detail'"
      >
        <div class="form-wrap">
          <!-- 左侧 -->
          <div class="left-part">
            <el-form-item label="角色名称:" prop="account">
              <el-input
                v-model="formData.account"
                placeholder="请输入角色名称"
                clearable
                class="input-width"
              />
            </el-form-item>
            <el-form-item label="角色描述:" prop="name">
              <el-input
                v-model="formData.name"
                type="textarea"
                placeholder="请输入角色描述"
                :rows="3"
                clearable
                class="input-width"
              />
            </el-form-item>
            <el-form-item
              v-if="type === 'detail'"
              label="创建时间:"
            >
              <el-input
                v-model="formData.account"
                placeholder="请输入创建时间"
                clearable
                class="input-width"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="type === 'detail'"
              label="创建人:"
            >
              <el-input
                v-model="formData.account"
                placeholder="请输入创建人"
                clearable
                class="input-width"
                disabled
              />
            </el-form-item>
          </div>
          <!-- 右侧 -->
          <div class="right-part">
            <el-form-item label="角色权限:" prop="checkedIds">
              <div class="tree-wrap">
                <el-tree
                  ref="treeRef"
                  :data="treeData"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps"
                  @check-change="handleCheckChange"
                />
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="dialog-footer">
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="mini"
          @click="handleConfirm"
        >提交</el-button>
        <el-button
          type="primary"
          :plain="true"
          size="mini"
          @click="close"
        >{{ type === 'detail'?'关闭':'取消' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUemUser, saveUemUser, editUemUser } from '@/api/user-manege';
export default {
  components: {},
  // inheritAttrs: false,
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        account: '',
        name: '',
        checkedIds: []
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        checkedIds: [
          {
            required: true,
            message: '请选择角色权限',
            trigger: 'blur'
          }
        ]
      }, // 验证规则
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      console.log('【 type 】-118', this.type);
      this.editData.uemUserId && this.getDetailInfo();
      return this.editData.uemUserId
        ? this.type === 'detail'
          ? '角色详细信息'
          : '编辑角色信息'
        : '新增角色';
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 通过 node 获取
    getCheckedNodes() {
      const CheckedIds = this.$refs.treeRef.getCheckedNodes();
      console.log('【 CheckedIds 】-179', CheckedIds);
    },
    // 通过 key 获取
    getCheckedKeys() {
      const checkedKeys = this.$refs.treeRef.getCheckedKeys();
      this.formData.checkedIds = checkedKeys;
      console.log('【 CheckedIds 】-179', checkedKeys);
    },
    handleNodeClick(data) {
      // console.log('【 data 】-173', data)
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log('【 data, checked, indeterminate 】-176', data, checked, indeterminate)
      this.getCheckedNodes();
      this.getCheckedKeys();
    },
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
        this.formData = {
          ...this.formData,
          ...res.data
        };
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
  $base-height: 350px;
  height: $base-height;
  display: flex;
  justify-content: space-between;
  .left-part {
    width: 50%;
    .input-width {
      width: 220px;
    }
  }
  .right-part {
    width: 50%;
    height: 100%;
    .tree-wrap {
      border: 1px solid #dddddd;
      width: 250px;
      height: 320px;
    }
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
