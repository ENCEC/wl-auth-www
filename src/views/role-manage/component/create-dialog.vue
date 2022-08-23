<!--
 * @Author: Hongzf
 * @Date: 2022-07-27 17:05:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-23 19:05:26
 * @Description:系统管理-角色管理-添加/编辑
-->

<template>
  <el-dialog
    :title="dialogTitle"
    class="role-dialog"
    v-bind="$attrs"
    width="850px"
    center
    :close-on-click-modal="false"
    z-index="1000"
    :append-to-body="true"
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
      <div class="form-box-wrap">
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
              v-model="createTime"
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
              <!--  :check-strictly="true" :default-expanded-keys="[2, 3]" -->
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
</template>
<script>
import { queryRoleAndResourceById, saveSysRole, updateSysRole } from '@/api/role-manage';
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
        sysRoleId: '',
        roleName: '',
        remark: '',
        sysResourceIdList: []
      },
      createTime: '',
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
      // this.editData.sysRoleId && this.getDetailInfo();
      return this.editData.sysRoleId
        ? this.type === 'detail'
          ? '角色详细信息'
          : '编辑角色信息'
        : '新增角色';
    }
  },
  watch: {},
  created() {
    this.getAllResource();
  },
  mounted() {},
  methods: {
    // 权限-获取资源列表(所有)
    getAllResource() {
      queryAllValidResource().then(res => {
        this.treeData = res.data;
        this.editData.sysRoleId && this.getDetailInfo();
      });
    },
    // 通过 key 获取
    getCheckedKeys() {
      const checkedKeys = this.$refs.treeRef.getCheckedKeys();
      this.formData.sysResourceIdList = checkedKeys;
    },
    handleCheckChange(data, checked, indeterminate) {
      this.getCheckedKeys();
    },
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 整理成树级结构
    formatToTree(list) {
      // 1. 定义两个中间变量
      const treeList = []; // 最终要产出的树状数据的数组
      const map = {} // 存储映射关系
      // 2. 建立一个映射关系，并给每个元素补充children属性.
      // 映射关系: 目的是让我们能通过id快速找到对应的元素
      list.forEach(item => {
        if (!item.children) {
          item.children = [] // 补充children：让后边的计算更方便
        }
        map[item.sysResourceId] = item
      })
      // 3. 循环处理每个元素
      list.forEach(item => {
        // 对于每一个元素来说，先找它的上级
        const parent = map[item.resourcePid]// 如果能找到，说明它有上级，则要把它添加到上级的children中去,找不到，说明它没有上级，直接添加到 treeList
        // 如果存在则表示item不是最顶层的数据
        if (parent) {
          parent.children.push(item)
        } else {
          treeList.push(item)// 如果不存在 则是顶层数据
        }
      })
      // 返回出去
      return treeList
    },
    // 整理选中的数据
    formatDefaultCheckedKeys(sysResourceIdList, treeDataList) {
      const defaultTreeCheckedKeys = []
      // 1.生成所有菜单一级map
      const allTreeData = treeDataList
      const allTreeMap = new Map() // 存储映射关系
      allTreeData.forEach(item => {
        if (!item.children) {
          item.children = []
        }
        allTreeMap.set(item.sysResourceId.toString(), item)
      })
      // 2.生成权限菜单一级map
      const roleTreeData = this.formatToTree(sysResourceIdList)
      const roleTreeMap = new Map() // 存储映射关系
      roleTreeData.forEach(item => {
        if (!item.children) {
          item.children = []
        }
        roleTreeMap.set(item.sysResourceId.toString(), item)
      })

      // 3.对比
      roleTreeData.forEach(roleTreeItem => {
        const rtId = roleTreeItem.sysResourceId
        const roleTreeMapItem = roleTreeMap.get(rtId)
        // 对比一级菜单下的元素/子元素
        if (!roleTreeItem.resourcePid && allTreeMap.has(rtId)) {
          const allTreeMapItem = allTreeMap.get(rtId)
          // console.log('【 一级菜单-======== 】-269', roleTreeMapItem, roleTreeMapItem.resourceTitle)
          // console.log('【roleTreeItem, allTreeItem ===】-267', roleTreeItem, allTreeItem)
          // 一级菜单有子菜单,两边的children进行对比
          if (roleTreeMapItem.children && roleTreeMapItem.children.length) {
            const tempArr = roleTreeMapItem.children.filter(item1 => {
              return allTreeMapItem.childrenResourceList.some(
                item2 => item1.sysResourceId === item2.sysResourceId
              )
            }).map(item => item.sysResourceId)
            // 若两边的子菜单个数相同，则加入父级菜单
            if (tempArr.length === allTreeMapItem.childrenResourceList.length) {
              tempArr.push(roleTreeMapItem.resourcePid)
            }
            defaultTreeCheckedKeys.push(...tempArr)
          } else {
            // 一级菜单本身
            defaultTreeCheckedKeys.push(roleTreeMapItem.sysResourceId)
          }
        } else {
          // console.log('【独立二级菜单 】-269', roleTreeMapItem, roleTreeMapItem.resourceTitle)
          defaultTreeCheckedKeys.push(roleTreeMapItem.sysResourceId)
        }
      })
      // 去重
      const result = [...new Set(defaultTreeCheckedKeys)]
      return result
    },
    // 根据id获取信息
    getDetailInfo() {
      queryRoleAndResourceById({
        sysRoleId: this.editData.sysRoleId
      }).then(res => {
        const obj = this.editData || {}
        // const sysResourceIdList = res.map(item => item.sysResourceId.toString())
        // this.defaultCheckedKeys = sysResourceIdList
        this.defaultCheckedKeys = this.formatDefaultCheckedKeys(res, this.treeData)
        const sysRoleResourceIdList = res.map(item => item.sysRoleResourceId.toString())
        const { roleName, remark, creatorName, createTime } = obj
        this.formData = {
          ...this.formData, roleName, remark, creatorName,
          sysResourceIdList: this.defaultCheckedKeys,
          sysRoleResourceIdList
        };
        this.createTime = this.$moment(createTime).format('YYYY-MM-DD')
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.sysRoleId ? updateSysRole : saveSysRole;
          this.formData.sysRoleId = this.editData.sysRoleId
          funcName(this.formData).then(res => {
            if (res.success) {
              this.$message.success(res.data);
              this.$emit('getTableData', '');
              this.close();
            } else {
              this.$message.error(res.errorMessages[0] || '操作失败');
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.role-dialog{
  .form-box-wrap {
    height: 340px;
    // $base-height: 340px;
    // height: 340px;
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
      .tree-wrap {
        border: 1px solid #dddddd;
        width: 240px;
        height: 340px;
        overflow:auto;
      }
    }
  }
  // 底部按钮
  .dialog-footer {
    width: 100%;
    // background: #bcf;
    display: flex;
    justify-content: center;
  }
}
</style>
