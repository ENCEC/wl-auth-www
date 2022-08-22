<template>
  <div>
    <!-- <el-button type="primary" size="mini">123</el-button>
    <el-button type="primary" size="mini" plain>123</el-button>
    <el-button type="primary" size="medium">查询</el-button>
    <el-button type="primary" size="medium" plain>123</el-button>
    <el-button type="primary" size="medium" disabled>123</el-button>

    <el-button type="text">文字按钮</el-button>
    <el-button type="text" class="text-danger">文字按钮</el-button>

    <el-input
      size="medium"
      placeholder="输入关键字进行过滤"
      v-model="filterText"
    >
    </el-input>
    <el-input
      class="auto-input"
      size="medium"
      placeholder="输入关键字进行过滤"
      v-model="filterText"
    >
    </el-input>

    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <el-radio v-model="radio" disabled label="1">备选项</el-radio>
    <el-radio v-model="radio" disabled label="4">备选项</el-radio>

    <el-checkbox v-model="checked">备选项</el-checkbox>
    <el-checkbox disabled v-model="checked1">备选项</el-checkbox>
    <el-checkbox disabled v-model="checked2">备选项</el-checkbox>

    <el-select size="medium" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select> -->

    <el-date-picker
      v-model="value1"
      prefix-icon="el-icon-edit"
      type="date"
      placeholder="选择日期"
    />

    <el-date-picker
      v-model="value2"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />

    <el-tree
      ref="tree"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      lazy
      :load="load"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="menuName" label="菜单名称" />
      <el-table-column prop="icon" label="图标" width="50">
        <i class="fa fa-camera-retro" />
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="50" /><el-table-column prop="permissionId" label="权限标识" /><el-table-column prop="componentPath" label="组件路径" /><el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'NORMAL' ? '' : 'danger'">{{
            getStatus(scope.row.status)
          }}</el-tag>
        </template> </el-table-column><el-table-column prop="createdTime" label="创建时间" width="200px" />
      ><el-table-column label="操作" width="220px">
        <template>
          <el-button
            type="text"
          ><i class="fa fa-pencil" aria-hidden="true" />修改</el-button>
          <el-button
            type="text"
          ><i class="fa fa-plus" aria-hidden="true" />新增</el-button>
          <el-button
            type="text"
          ><i class="fa fa-trash" aria-hidden="true" />删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      radio: '1',
      checked: true,
      checked1: true,
      checked2: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tableData: [
        {
          id: 1,
          menuName: '系统管理',
          icon: '王小虎',
          sort: '1',
          permissionId: 'system.user.list',
          componentPath: 'system/user/index',
          status: 'NORMAL',
          createdTime: '2022-07-19 23:45:23'
        },
        {
          id: 2,
          menuName: '系统管理',
          icon: '王小虎',
          sort: '1',
          permissionId: 'system.user.list',
          componentPath: 'system/user/index',
          status: 'NORMAL',
          createdTime: '2022-07-19 23:45:23'
        },
        {
          id: 3,
          menuName: '系统管理',
          icon: '王小虎',
          sort: '1',
          permissionId: 'system.user.list',
          componentPath: 'system/user/index',
          status: 'NORMAL',
          createdTime: '2022-07-19 23:45:23',
          hasChildren: true
        },
        {
          id: 6,
          menuName: '系统管理',
          icon: '王小虎',
          sort: '1',
          permissionId: 'system.user.list',
          componentPath: 'system/user/index',
          status: 'NORMAL',
          createdTime: '2022-07-19 23:45:23'
        }
      ],
      filterText: '',
      data: [
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
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    handleNodeClick(a, b, c) {},
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getStatus(status) {
      if (status === 'NORMAL') {
        return '正常';
      }
      return '';
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 4,
            menuName: '系统管理',
            icon: '王小虎',
            sort: '1',
            permissionId: 'system.user.list',
            componentPath: 'system/user/index',
            status: 'NORMAL',
            createdTime: '2022-07-19 23:45:23'
          },
          {
            id: 5,
            menuName: '系统管理',
            icon: '王小虎',
            sort: '1',
            permissionId: 'system.user.list',
            componentPath: 'system/user/index',
            status: 'NORMAL',
            createdTime: '2022-07-19 23:45:23'
          }
        ]);
      }, 1000);
    }
  }
};
</script>

<style lang='scss'>
$color-primary: teal;
</style>
