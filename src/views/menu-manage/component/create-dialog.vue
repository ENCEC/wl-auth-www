<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 16:05:47
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-27 15:50:05
 * @Description: 系统管理-菜单管理-添加/编辑
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
              <el-form-item label="菜单标题:" prop="resourceTitle">
                <el-input
                  v-model="formData.resourceTitle"
                  placeholder="请输入菜单标题"
                  show-word-limit
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="父级菜单:" prop="resourcePid">
                <el-select
                  v-model="formData.resourcePid"
                  placeholder="请选择父级菜单"
                  clearable
                  style="width:180px"
                >
                  <el-option
                    v-for="item in parentResourceList"
                    :key="item.resourcePid"
                    :label="item.resourceTitle"
                    :value="item.resourcePid"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="资源地址:" prop="resourceUrl">
                <el-input
                  v-model="formData.resourceUrl"
                  placeholder="请输入资源地址"
                  show-word-limit
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单序号:" prop="resourceSort">
                <el-input
                  v-model="formData.resourceSort"
                  placeholder="请输入菜单序号"
                  clearable
                />
                <!-- <el-input-number
                  v-model="formData.resourceSort"
                  :controls="false"
                  :min="1"
                  :max="10"
                  clearable
                  :precision="0"
                ></el-input-number> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="菜单说明:" prop="resourceRemark">
                <el-input
                  v-model="formData.resourceRemark"
                  type="textarea"
                  placeholder="请输入菜单说明"
                  :rows="3"
                  clearable
                  style="width:505px"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="handelConfirm"
        >提交</el-button>
        <el-button size="mini" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveResource,
  updateResource,
  queryResourceById,
  queryParentResource
} from '@/api/menu-manege';
export default {
  components: {},
  // inheritAttrs: false,
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        resourceTitle: '一级菜单',
        resourcePid: '',
        resourceUrl: 'baidu',
        resourceSort: '1',
        resourceRemark: ''
      },
      rules: {
        resourceTitle: [
          {
            required: true,
            message: '请输入菜单标题',
            trigger: 'blur'
          }
        ],
        resourceUrl: [
          {
            required: true,
            message: '请输入资源地址',
            trigger: 'blur'
          }
        ],
        resourceSort: [
          {
            required: true,
            message: '请输入菜单序号',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]*$/,
            message: '请输入数字',
            trigger: 'blur'
          }
        ]
      },
      parentResourceList: []
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.sysResourceId && this.getDetailInfo();
      return this.editData.sysResourceId ? '编辑菜单信息' : '新增菜单';
    }
  },
  watch: {},
  created() {
    this.getParentResource();
  },
  mounted() {},
  methods: {
    // 获取父级菜单下拉
    getParentResource() {
      queryParentResource().then(res => {
        this.parentResourceList = res;
      });
    },
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取用户信息
    getDetailInfo() {
      queryResourceById({
        sysResourceId: this.editData.sysResourceId
      }).then(res => {
        this.formData = { ...this.formData, ...res };
      });
    },
    // 提交表单
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.sysResourceId
            ? updateResource
            : saveResource;
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
  height: 180px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
