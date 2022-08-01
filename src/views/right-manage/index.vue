<!--
 * @Author: Hongzf
 * @Date: 2022-07-28 10:47:20
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-29 17:51:21
 * @Description: 系统管理-权限管理
-->

<template>
  <div class="app-container ">
    <div class="right-manage">
      <div class="left-part">
        <div class="title-box">
          用户
          <!-- 查询组件  -->
          <filter-panel
            class="filter-wrap"
            :filter-config="filterConfig"
            :value="filterForm"
          />
        </div>
        <div class="content">
          <!-- 表格 Start -->
          <el-table
            highlight-current-row
            :data="tableData"
            height="420px"
            style="width: 100%"
            size="small"
          >
            <el-table-column prop="uemUserId" label=" " width="30px">
              <template slot-scope="scope">
                <el-radio
                  v-model="uemUserId"
                  :label="scope.row.uemUserId"
                  @change="handleRadioChange"
                >-
                </el-radio></template>
            </el-table-column>
            <el-table-column type="index" label="序号" />
            <el-table-column prop="account" label="用户名" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="operate-wrap">
                  <el-button
                    type="text"
                    @click="handleDelete(scope.row.uemUserId)"
                  >删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格 End -->
        </div>
        <div class="footer">
          <!-- 分页 -->
          <el-pagination
            class="pagination-wrap"
            :current-page.sync="params.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- 角色 Start -->
      <div class="middle-part">
        <div class="title-box">角色</div>
        <div class="content">
          <el-checkbox-group
            v-model="checkedRoleIds"
            class="check-list"
            @change="handleCheckBoxChange"
          >
            <div v-for="item in roleList" :key="item.sysRoleId" class="item">
              <el-checkbox :label="item.sysRoleId">{{
                item.roleName
              }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <div class="footer">
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </div>
      <!-- 角色 End -->
      <!-- 功能权限 Start -->
      <div class="right-part">
        <div class="title-box">
          功能权限
        </div>
        <div class="content">
          <div class="tree-wrap">
            <!-- :default-expanded-keys="[2, 3]" -->
            <el-tree
              ref="treeRef"
              :data="treeData"
              :default-checked-keys="defaultCheckedKeys"
              :props="defaultProps"
              :expand-on-click-node="false"
              node-key="sysResourceId"
              default-expand-all
              show-checkbox
            />
          </div>
        </div>
      </div>
      <!-- 功能权限 End -->
    </div>
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import { filterConfig } from './config-data.js';
import { queryUemUser } from '@/api/user-manage';
import {
  bindUserAndRole,
  unbindAllRoleOfUser,
  queryAllValidRole,
  queryRoleListByUser,
  queryAllValidResource,
  queryResourceByRole
} from '@/api/right-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'RightManage',
  components: {
    filterPanel
  },
  mixins: [tableMix],
  data() {
    return {
      filterConfig: filterConfig(this),
      filterForm: {
        account: undefined
      },
      tableData: [],
      uemUserId: '',
      checkedRoleIds: [], // 选中的角色
      roleList: [],
      treeData: [],
      defaultProps: {
        children: 'childrenResourceList',
        label: 'resourceTitle'
      },
      defaultCheckedKeys: [], // 树的勾选值
      total: 0
    };
  },
  computed: {},
  created() {
    this.getTableData();
    this.getAllRoleList();
    this.getAllResource();
  },
  mounted() {},
  methods: {
    // 用户-选择用户ID
    handleRadioChange() {
      this.getRoleListByUser();
    },
    // 角色-获取角色列表（所有）
    getAllRoleList() {
      queryAllValidRole().then(res => {
        this.roleList = res.data;
      });
    },
    // 角色-获取角色列表（根据用户ID）
    getRoleListByUser() {
      const uemUserId = this.uemUserId;
      queryRoleListByUser({ uemUserId }).then(res => {
        this.checkedRoleIds = res.data.map(item => item.sysRoleId);
        this.checkedRoleIds.length ? this.getResourceByRole() : this.$refs.treeRef.setCheckedKeys([]); // 清空勾选值
      });
    },
    // 角色-选择角色ID
    handleCheckBoxChange() {
      this.checkedRoleIds.length ? this.getResourceByRole() : this.$refs.treeRef.setCheckedKeys([]); // 清空勾选值
    },
    // 设置树的禁用状态
    loopModuleTreeDisabled(arr) {
      arr.forEach(item => {
        this.$set(item, 'disabled', false);
        this.$refs.treeRef.setCheckedKeys(this.defaultCheckedKeys);
        this.$set(item, 'disabled', true);
        if (item.childrenResourceList && item.childrenResourceList.length > 0) {
          this.loopModuleTreeDisabled(item.childrenResourceList);
        }
      });
    },
    // 权限-获取资源列表(所有)
    getAllResource() {
      queryAllValidResource().then(res => {
        this.treeData = res.data;
        this.loopModuleTreeDisabled(this.treeData);
      });
    },
    // 权限-获取资源列表(根据角色ID)
    getResourceByRole() {
      const sysRoleId = this.checkedRoleIds;
      queryResourceByRole(sysRoleId).then(res => {
        this.defaultCheckedKeys = res.data.map(item => item.sysResourceId);
        this.loopModuleTreeDisabled(this.treeData);
      });
    },
    // 提交表单信息
    handleSave() {
      if (!this.uemUserId) {
        this.$message.error('请选择用户');
        return false;
      }
      if (!this.checkedRoleIds.length) {
        this.$message.error('请选择角色');
        return false;
      }
      const param = this.checkedRoleIds.map(item => {
        return {
          uemUserId: this.uemUserId,
          sysRoleId: item
        };
      });
      bindUserAndRole(param).then(res => {
        this.$message.success(res.data);
      });
    },
    // 获取表格数据
    getTableData() {
      queryUemUser({
        pageNo: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.totalRecord;
      });
    },
    // 删除用户信息
    handleDelete(uemUserId) {
      this.$confirm('您确定要进行删除操作吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        unbindAllRoleOfUser({ uemUserId }).then(res => {
          this.$message.success('操作成功');
          // 重置
          this.checkedRoleIds = []
          this.$refs.treeRef.setCheckedKeys([]); // 清空勾选值
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.right-manage {
  display: flex;
  justify-content: space-between;
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding: 0 15px;
    line-height: 50px;
    background: #f6f6f6;
    .filter-wrap {
      margin-top: 35px;
    }
  }
  .content {
    border: 1px solid #dddddd;
    height: 420px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    background: #f6f6f6;
    padding: 10px;
  }
  .left-part {
    width: 39%;
    // 分页
    .pagination-wrap {
      margin: 10px;
    }
  }
  .middle-part {
    width: 29%;
    .content {
      padding: 10px;
      .check-list {
        overflow: auto;
        height: 100%;
        .item {
          margin-bottom: 8px;
        }
      }
    }
  }
  .right-part {
    width: 29%;
    .content {
      height: 470px;
    }
  }
}
</style>
