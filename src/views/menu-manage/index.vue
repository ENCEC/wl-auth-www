<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-18 09:43:14
 * @Description:
-->
<template>
  <div class="app-container menu-manage">
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <el-table
      highlight-current-row
      :data="records"
      height="350px"
      style="width: 100%"
      border
    >
      <el-table-column type="index" label="序号" width="80px" />
      <el-table-column prop="resourceTitle" label="菜单标题" width="120px" />
      <el-table-column prop="parentResourceTitle" label="父级菜单" width="120px" />
      <el-table-column prop="resourceUrl" label="资源地址" min-width="150px" />
      <!-- <el-table-column prop="component" label="组件地址" min-width="150px" />
      <el-table-column prop="resourceLogo" label="菜单Logo" /> -->
      <el-table-column prop="resourceSort" label="菜单序号" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" width="110px">
        <template slot-scope="scope">
          {{ scope.row.createTime ? $moment(scope.row.createTime).format('YYYY-MM-DD') : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="isValid" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isValid"
            active-color="#0050AC"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <el-button type="text" @click="handleOpen(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.sysResourceId)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 End -->
    <!-- 分页 -->
    <el-pagination
      class="pagination-wrap"
      :current-page.sync="params.currentPage"
      :page-size="params.pageSize"
      :page-sizes="[10, 20, 50]"
      prev-text="上一页"
      next-text="下一页"
      style="margin-top: 15px;text-align: center"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 新增/修改 -->
    <CreateDialog v-if="dialogVisible" :visible.sync="dialogVisible" :edit-data="editData" @getTableData="getTableData" />
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel'
import { filterConfig } from './config-data.js';
import CreateDialog from './component/create-dialog';
import { queryResourceByPage, queryParentResource, deleteResourceById, updateResourceStatus } from '@/api/menu-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'MenuManage',
  components: {
    filterPanel, CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      filterConfig: filterConfig(this), // 查询条件配置
      editData: {},
      dialogVisible: false,
      filterForm: {
        resourceTitle: '',
        resourcePid: '',
        isValid: ''
      },
      records: [],
      total: 0
    };
  },
  computed: {},
  created() {
    this.getParentResource()
    this.getTableData();
  },
  methods: {
    // 获取父级菜单下拉
    getParentResource() {
      queryParentResource().then(res => {
        this.filterConfig.filterList[1].options = res// 父级菜单下拉赋值
      })
    },
    // 获取表格数据
    getTableData() {
      queryResourceByPage({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        this.records = res.data.records;
        this.total = res.data.totalRecord;
        this.getParentResource()
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 打开弹框
    handleOpen(item = {}) {
      this.dialogVisible = true;
      this.editData = { sysResourceId: item.sysResourceId || '' }
    },
    // 启用禁用
    changeStatus(item) {
      const sysResourceId = item.sysResourceId
      const isValid = item.isValid
      updateResourceStatus({ sysResourceId, isValid }).then(res => {
        this.$message.success('操作成功');
      });
    },
    // 删除
    handleDelete(sysResourceId) {
      this.$confirm(
        '您确定要删除该菜单信息吗？删除后该菜单信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteResourceById({ sysResourceId }).then(res => {
          this.$message.success(res.data);
          this.getTableData()
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-manage {
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
  }
  // 操作栏
  .operate-wrap {
    span {
      display: inline-block;
      cursor: pointer;
    }
  }
  // 分页
  .pagination-wrap {
    margin: 10px;
    float: right;
  }
}
</style>
