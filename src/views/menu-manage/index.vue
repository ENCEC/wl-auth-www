<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-18 17:49:46
 * @Description:
-->
<template>
  <div class="app-container menu-manage">
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <table-component
      :data="records"
      :options="tableConfig"
      :pagination="params"
      :columns="columns"
      :operates="operates"
      :list-loading="listLoading"
      @handleIndexChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
    <!-- 表格 End -->
    <!-- 新增/修改 -->
    <CreateDialog v-if="dialogVisible" :visible.sync="dialogVisible" :edit-data="editData" @getTableData="getTableData" />
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel'
import tableComponent from '@/components/TableComponent';
import { filterConfig, tableConfig, columns, operates } from './config-data.js';
import CreateDialog from './component/create-dialog';
import { queryResourceByPage, queryParentResource, deleteResourceById, updateResourceStatus } from '@/api/menu-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'MenuManage',
  components: {
    filterPanel, tableComponent, CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      // 查询
      filterConfig: filterConfig(this), // 查询条件配置
      filterForm: {
        resourceTitle: '',
        resourcePid: '',
        isValid: ''
      },
      // 表格
      records: [],
      listLoading: false,
      tableConfig,
      columns: columns(this),
      operates: operates(this),
      // 弹框
      editData: {},
      dialogVisible: false
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
        this.params.totalRecord = res.data.totalRecord;
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
