<!--
 * @Author: Hongzf
 * @Date: 2022-08-22 09:33:37
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-22 09:42:50
 * @Description: 系统管理-标签管理
-->

<template>
  <div class="app-container user-manage">
    <!-- 查询组件 -->
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
    <!-- 新增/修改标签 -->
    <CreateDialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :edit-data="editData"
      @getTableData="getTableData"
    />
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import tableComponent from '@/components/TableComponent';
import { filterConfig, tableConfig, columns, operates } from './config-data.js';
import CreateDialog from './component/create-dialog';
import {
  querySysTag,
  sysTagStartStop,
  deleteSysTag
} from '@/api/tags-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'UserManage',
  components: {
    filterPanel,
    tableComponent,
    CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      // 查询
      filterConfig: filterConfig(this),
      filterForm: {
        tagName: '',
        tagDescription: '',
        status: ''
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
    this.getTableData();
  },
  mounted() {},
  methods: {
    // 获取表格数据
    getTableData() {
      this.listLoading = true;
      querySysTag({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then((res) => {
        this.records = res.data.records;
        this.params.totalRecord = res.data.totalRecord;
        this.listLoading = false;
      });
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    // 打开弹框
    handleOpen(item = {}) {
      this.dialogVisible = true;
      this.editData = { sysTagId: item.sysTagId || '' };
    },
    // 启用/禁用
    changeStatus(item) {
      const params = {
        sysTagId: item.sysTagId,
        status: item.status
      };
      sysTagStartStop(params).then(() => {
        this.$message.success('操作成功');
      });
    },
    // 删除
    handleDelete(sysTagId) {
      this.$confirm(
        '您确定要删除该标签信息吗？删除后该标签信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteSysTag(sysTagId).then(() => {
          this.$message.success('操作成功');
          this.getTableData();
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// .user-manage {}
</style>
