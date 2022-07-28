<!--
 * @Author: Hongzf
 * @Date: 2022-07-28 10:47:20
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-28 15:31:09
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
          <el-checkbox-group v-model="roleIds" class="check-list">
            <div v-for="(item, index) in 18" :key="index" class="item">
              <el-checkbox :label="index">{{ "复选框" + index }}</el-checkbox>
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
        </div>
      </div>
      <!-- 功能权限 End -->
    </div>
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import { filterConfig } from './config-data.js';
import { queryUemUser, deleteUemUser } from '@/api/user-manege';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'UserManage',
  components: {
    filterPanel
  },
  mixins: [tableMix],
  data() {
    return {
      filterConfig: filterConfig(this),
      filterForm: {
        account: undefined,
        name: undefined
      },
      uemUserId: '',
      roleIds: [],
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
      },
      tableData: [],
      total: 0
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    // 提交表单信息
    handleSave() {
      if (!this.uemUserId) {
        this.$message.error('请选择用户');
        return false;
      }
      if (!this.roleIds.length) {
        this.$message.error('请选择角色');
        return false;
      }
    },
    // 通过 node 获取
    getCheckedNodes() {
      const CheckedIds = this.$refs.treeRef.getCheckedNodes();
      console.log('【 CheckedIds 】-179', CheckedIds);
    },
    // 通过 key 获取
    getCheckedKeys() {
      const checkedKeys = this.$refs.treeRef.getCheckedKeys();
      this.checkedIds = checkedKeys;
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
    // 获取表格数据
    getTableData() {
      queryUemUser({
        currentPage: this.params.currentPage,
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
        deleteUemUser({ uemUserId }).then(res => {
          this.$message.success('操作成功');
          this.getTableData();
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
