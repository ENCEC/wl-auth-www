<!--
 * @Author: Hongzf
 * @Date: 2022-07-27 17:05:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 12:45:36
 * @Description:系统管理-角色管理-添加/编辑
-->

<template>
  <div class="role-dialog">
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="820px"
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
        :disabled="type === 'detail'"
      >
        <div class="form-wrap">
          <!-- 左侧 -->
          <div class="left-part">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input
                v-model="formData.roleName"
                placeholder="请输入角色名称"
                clearable
                class="input-width"
              />
            </el-form-item>
            <el-form-item label="角色描述:" prop="remark">
              <el-input
                v-model="formData.remark"
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
                v-model="formData.createTime"
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
                v-model="formData.creatorName"
                placeholder="请输入创建人"
                clearable
                class="input-width"
                disabled
              />
            </el-form-item>
          </div>
          <!-- 右侧 -->
          <div class="right-part">
            <el-form-item label="角色权限:" prop="sysResourceIdList">
              <div class="tree-wrap">
                <!-- :default-expanded-keys="[2, 3]" -->
                <el-tree
                  ref="treeRef"
                  :data="treeData"
                  :default-checked-keys="defaultCheckedKeys"
                  :props="defaultProps"
                  :expand-on-click-node="false"
                  show-checkbox
                  node-key="sysResourceId"
                  default-expand-all
                  @check-change="handleCheckChange"
                />
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="medium"
          @click="handleConfirm"
        >提交</el-button>
        <el-button
          type="primary"
          :plain="true"
          size="medium"
          @click="close"
        >{{ type === 'detail'?'关闭':'取消' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryRoleAndResource, saveSysRole, updateSysRole } from '@/api/role-manage';
import { queryAllValidResource } from '@/api/right-manage'; export default {
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
        roleName: '',
        remark: '',
        sysResourceIdList: []
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        sysResourceIdList: [
          {
            required: true,
            message: '请选择角色权限',
            trigger: 'blur'
          }
        ]
      },
      treeData: [],
      defaultProps: {
        children: 'childrenResourceList',
        label: 'resourceTitle'
      },
      defaultCheckedKeys: []
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.sysRoleId && this.getDetailInfo();
      return this.editData.sysRoleId
        ? this.type === 'detail'
          ? '角色详细信息'
          : '编辑角色信息'
        : '新增角色';
    }
  },
  watch: {},
  created() {
    this.getDetailInfo()
    this.getAllResource();
  },
  mounted() {},
  methods: {
    // 权限-获取资源列表(所有)
    getAllResource() {
      queryAllValidResource().then(res => {
        this.treeData = res.data;
      });
    },
    // 通过 node 获取
    getCheckedNodes() {
      const sysResourceIdList = this.$refs.treeRef.getCheckedNodes();
      console.log('【 sysResourceIdList 】-179', sysResourceIdList);
    },
    // 通过 key 获取
    getCheckedKeys() {
      const checkedKeys = this.$refs.treeRef.getCheckedKeys();
      this.formData.sysResourceIdList = checkedKeys;
      console.log('【 sysResourceIdList 】-179', checkedKeys);
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
      queryRoleAndResource({
        sysRoleId: this.editData.sysRoleId
      }).then(res => {
        this.formData = {
          ...this.formData,
          ...res.data[0]
        };
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.sysRoleId ? updateSysRole : saveSysRole;
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
.role-dialog{
  .form-wrap {
    $base-height: 320px;
    height: $base-height;
    display: flex;
    justify-content: space-between;
    .left-part {
      width: 49%;
      .input-width {
        width: 220px;
      }
    }
    .right-part {
      width: 50%;
      height: 100%;
      .tree-wrap {
        border: 1px solid #dddddd;
        width: 240px;
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
}
</style>
