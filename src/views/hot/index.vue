<template>
  <div class="app-container">
    <el-row>
      <el-col id="i-left" :span="6" class="i-left">
        <el-row class="i-panel-head">
          <h3>查询区域</h3>
        </el-row>
        <el-card class="fcos-card i-panel-content" shadow="none">
          <el-form
            ref="searchForm"
            :model="searchForm"
            label-width="30%"
            class="demo-form-inline"
            :label-position="labelPosition"
            :inline="true"
            size="mini"
          >
            <el-row>
              <el-col :span="10" class="common_label">
                舱位公司：
              </el-col>
              <el-col :span="14">
                <el-form-item class="fcos-form-item" data="ctnOwner">
                  <el-associate
                    v-model="searchForm.ctnOwner"
                    name="gla"
                    :columns="officeColumns"
                    clearable
                    value-prop="code"
                    label-prop="name"
                    :query-method="queryResourceMethod"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" class="common_label">
                甲方：
              </el-col>
              <el-col :span="14">
                <el-form-item class="fcos-form-item" data="partyOwner">
                  <el-associate
                    v-model="searchForm.partyOwner"
                    name="glb"
                    :columns="officeColumns"
                    clearable
                    value-prop="code"
                    label-prop="name"
                    :query-method="queryResourceMethod"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" class="common_label">
                乙方：
              </el-col>
              <el-col :span="14">
                <el-form-item class="fcos-form-item" data="protocolSignPerson">
                  <el-associate
                    v-model="searchForm.protocolSignPerson"
                    name="glc"
                    :columns="officeColumns"
                    clearable
                    value-prop="code"
                    label-prop="name"
                    :query-method="queryResourceMethod"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" class="common_label">
                协议类型：
              </el-col>
              <el-col :span="14">
                <el-form-item class="fcos-form-item" data="protocolType">
                  <el-select v-model="searchForm.protocolType" placeholder="" name="gld">
                    <el-option v-for="item in PROTOCOL_TYPE" :key="item.value" :title="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" class="common_label">
                过期：
              </el-col>
              <el-col :span="14">
                <el-form-item class="fcos-form-item" data="isDue">
                  <el-select v-model="searchForm.isDue" placeholder="" name="gle">
                    <el-option v-for="item in YES_OR_NO" :key="item.value" :title="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" class="common_label">
                订舱装港省份：
              </el-col>
              <el-col :span="14">
                <el-form-item class="fcos-form-item" data="feederLoadPortGroup">
                  <el-select v-model="searchForm.feederLoadPortGroup" placeholder="" name="glf">
                    <el-option v-for="item in PROVINCE" :key="item.key" :title="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" class="common_label">
                订舱卸港省份：
              </el-col>
              <el-col :span="14">
                <el-form-item class="fcos-form-item" data="feederDiscPortGroup">
                  <el-select v-model="searchForm.feederDiscPortGroup" placeholder="" name="glg">
                    <el-option v-for="item in PROVINCE" :key="item.key" :title="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-row style="margin: 0px 0px 3px 0px; height: 24px; text-align: center;">
          <el-button type="primary" size="mini" @click="resetForm('searchForm')">重置</el-button>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
        </el-row>
      </el-col>
      <el-col id="i-right" :span="18" class="i-right">
        <el-row style="margin: 0px 0px 7px 0px; height: 24px;">
          <el-button type="primary" size="mini" @click="addRecord">新增</el-button>
          <el-button type="danger" size="mini" @click="removeRecords">批量删除</el-button>
          <el-button type="primary" size="mini" @click="saveDate">保存</el-button>
        </el-row>
        <div class="i-content">
          <hot-table
            ref="myTable"
            :data-source="tableData"
            :height="tableHeight"
            empty-text="无数据"
            :after-change="afterChange"
            :rules="rules"
            :filters="true"
            col-settings-key="test"
          >
            <hot-column data="ctnOwnerName" title="舱位公司名称" width="150" align="center">
              <el-associate-editor
                hot-editor
                clearable
                :display-init="'ctnOwnerName'"
                :columns="officeColumns"
                value-prop="name"
                lable-prop="name"
                :query-method="queryResourceMethod"
              />
            </hot-column>
            <hot-column data="ctnOwner" title="舱位公司代码" align="center" width="150">
              <el-input-editor hot-editor />
            </hot-column>
            <hot-column
              data="isDue"
              title="过期"
              align="center"
              width="80"
              type="checkbox"
              checked-template="Y"
              unchecked-template="N"
            />
            <hot-column data="containerSize" title="箱尺寸" align="center" width="150">
              <el-input-number-editor
                hot-editor
                :step="1"
                :auto-cut="true"
              />
            </hot-column>
            <hot-column data="feederLoadPortGroup" title="订舱装港省份" align="center" width="150">
              <el-select-editor
                hot-editor
                clearable
                :options="PROVINCE"
                filterable
                default-first-option
              >
                <el-option v-for="item in PROVINCE" :key="item.key" :title="item.value" :value="item.key" />
              </el-select-editor>
            </hot-column>
            <hot-column data="effectiveDate" title="生效日期" align="center" width="200">
              <el-date-picker-editor
                hot-editor
                type="datetime"
                placeholder="请选择日期"
                :picker-options="datePickerOptions"
              />

            </hot-column>
            <hot-column data="protocolSignPersonName" title="乙方名称" align="center" width="150" editor="text" />
            <hot-column data="protocolSignPerson" title="乙方代码" width="100" align="center" editor="text" />
            <hot-column data="partyOwner" title="甲方代码" align="center" width="100" editor="text" />
            <hot-column data="partyOwnerName" title="甲方名称" align="center" width="150" editor="text" />
            <hot-column data="containerType" title="箱型" align="center" width="80" editor="text" />
            <hot-column data="containerStatus" title="箱状态" align="center" width="80" editor="text" />
            <hot-column data="reeferInd" title="冷箱标志" align="center" width="100" editor="text" />
            <hot-column data="hazardInd" title="危险箱标志" align="center" width="130" editor="text" />
            <hot-column data="reeferHazardInd" title="冷危标志" align="center" width="100" editor="text" />
            <hot-column data="transferPrice" title="中转包干价格" align="center" width="150" editor="text" />
            <hot-column data="handingPrice" title="装卸费价格" align="center" width="130" editor="text" />
            <hot-column data="protocolType" title="协议类型" :formatter="stateFormat" align="center" width="100" editor="text" />
            <hot-column data="expireDate" title="失效日期" align="center" width="155" editor="text" />
            <hot-column data="creator" title="创建人" align="center" width="100" editor="text" />
            <hot-column data="lastModifyor" title="最后修改人" align="center" width="130" editor="text" />
            <hot-column data="feederDiscPortGroup" title="订舱卸港省份" align="center" width="150" editor="text" />
          </hot-table>
        </div>
        <div class="i-foot">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[20, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { getTableData, getAssociate, getAllTable } from '@/api/demo'

export default {
  name: 'HotDemo',
  data() {
    const _this = this;
    return {
      formData: {},
      operationType: '',
      dialogVisible: false,
      labelPosition: 'right',
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableHeight: window.innerHeight - 200,
      YES_OR_NO: [],
      CONTAINER_TYPE: [],
      CONTAINER_STATUS: [],
      PROTOCOL_TYPE: [],
      PROVINCE: [],
      officeColumns: [{
        title: '客户简称',
        field: 'name',
        width: '200px'
      }, {
        title: '客户代码',
        field: 'code',
        width: '200px'
      }],
      queryResourceMethod({ keyword, pageSize, currentPage }) {
        const data = {}
        data.currentPage = currentPage
        data.pageSize = pageSize
        return new Promise((resolve, reject) => {
          getAssociate(data).then(res => {
            resolve({
              records: res.data.data,
              total: res.data.total,
              recordStart: res.data.recordStart,
              recordEnd: res.data.recordEnd
            })
          })
        })
      },
      permissionsLoading: true,
      searchForm: {
        frameProtocolId: null,
        ctnOwner: '', // 舱位公司代码
        ctnOwnerName: '', // 舱位公司名称
        protocolSignPerson: '', // 协议签署方代码
        protocolSignPersonName: '', // 协议签署方名称
        containerSize: '', // 箱尺寸
        containerType: '', // 箱型
        containerStatus: '', // 箱状态
        reeferInd: '', // 冷箱标志
        hazardInd: '', // 危险箱标志
        reeferHazardInd: '', // 冷危标志
        branchFee: '', // 支线费价格
        transferPrice: '', // 中转包干价格
        handingPrice: '', // 装卸费价格
        protocolType: '', // 协议类型
        effectiveDate: '', // 生效日期
        expireDate: '', // 失效日期
        partyOwner: '', // 甲方代码
        partyOwnerName: '', // 甲方名称
        creator: '', // 创建人
        createOffice: '', // 创建人所属组织
        createTime: '', // 创建时间
        lastModifyTime: '', // 最后修改时间
        lastModifyOffice: '', // 最后修改人所属组织
        lastModifyor: '', // 最后修改人
        isDue: '', // 是否过期
        feederLoadPortGroup: '', // 订舱装港省份
        feederDiscPortGroup: '' // 订舱卸港省份
      },
      multipleSelection: [],
      rules: [
        {
          property: 'ctnOwner',
          ruleName: 'notNull',
          message: '舱位公司不能为空'
        },
        {
          property: 'ctnOwnerName',
          ruleName: 'notNull',
          message: '舱位公司不能为空'
        },
        {
          min: 20,
          max: 45,
          property: 'containerSize',
          ruleName: 'numberRange',
          message: '20 <= 数值 <= 45'
        }
      ],
      tableData: [],
      addedRecords: [],
      modifiedRecords: [],
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      afterChange(changes) {
        const change = changes && changes[0] || [];
        const [row, field, newVal, oldVal] = change;
        if (!change.length || field === '$$checked' || newVal === oldVal) {
          return;
        }
        const record = _this.tableData[row];
        if (
          _this.modifiedRecords.indexOf(record) >= 0 ||
          _this.addedRecords.indexOf(record) >= 0
        ) {
          return;
        }
        console.log('编辑数据', record);
        _this.modifiedRecords.push(record);
      }
    }
  },
  computed: {
  },
  created() {
    // 数据字典获取
    this.$dictionary.get(['YES_OR_NO', 'CONTAINER_TYPE', 'CONTAINER_STATUS', 'PROTOCOL_TYPE', 'PROVINCE'], true).then(response => {
      this.YES_OR_NO = response.YES_OR_NO
      this.CONTAINER_TYPE = response.CONTAINER_TYPE
      this.CONTAINER_STATUS = response.CONTAINER_STATUS
      this.PROTOCOL_TYPE = response.PROTOCOL_TYPE
      this.PROVINCE = response.PROVINCE
    })
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTable()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTable()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    search() {
      const pointData = []
      getAllTable().then(response => {
        response.data.forEach((item, index) => {
          if (((this.searchForm.ctnOwner && item.ctnOwner === this.searchForm.ctnOwner) || (!this.searchForm.ctnOwner)) &&
                   ((this.searchForm.partyOwner && item.partyOwner === this.searchForm.partyOwner) || (!this.searchForm.partyOwner)) &&
                   ((this.searchForm.protocolSignPerson && item.protocolSignPerson === this.searchForm.protocolSignPerson) || (!this.searchForm.protocolSignPerson)) &&
                   ((this.searchForm.protocolType && item.protocolType === this.searchForm.protocolType) || (!this.searchForm.protocolType)) &&
                   ((this.searchForm.isDue && item.isDue === this.searchForm.isDue) || (!this.searchForm.isDue)) &&
                   ((this.searchForm.feederLoadPortGroup && item.feederLoadPortGroup.indexOf(this.searchForm.feederLoadPortGroup) > 0) || (!this.searchForm.feederLoadPortGroup)) &&
                   ((this.searchForm.feederDiscPortGroup && item.feederDiscPortGroup.indexOf(this.searchForm.feederDiscPortGroup) > 0) || (!this.searchForm.feederDiscPortGroup))) {
            pointData.push(response.data[index])
          }
        })
        this.tableData = pointData
        this.total = pointData.length
        this.resetModifiedRecords();
      })
    },
    stateFormat(row) {
      if (row.protocolType === 'MF') {
        return 'EDI导入'
      }
      if (row.protocolType === 'TH') {
        return '手工输入'
      }
      if (row.protocolType === 'SJ') {
        return '亿通导入'
      }
      if (row.protocolType === 'UIO') {
        return '测试数据'
      }
    },
    getTable() {
      const query = { currentPage: this.currentPage, pageSize: this.pageSize }
      return getTableData(query).then(response => {
        this.tableData = response.data.tableData
        this.total = response.data.total
        this.resetModifiedRecords();
      })
    },
    addRecord() {
      const record = {};
      this.tableData.unshift(record);
      this.addedRecords.push(record);
    },
    resetModifiedRecords() {
      this.modifiedRecords = [];
      this.addedRecords = [];
    },
    removeRecords() {
      const removedData = this.tableData.filter(r => r.$$checked);
      if (!removedData.length) {
        this.$message('为勾选记录。');
        return;
      }
      console.log('删除数据：', removedData);
      setTimeout(() => {
        this.$message('已删除。');
        this.tableData = this.tableData.filter(r => removedData.indexOf(r) < 0);
      }, 400);
    },
    saveDate() {
      if (!(this.addedRecords.length || this.modifiedRecords.length)) {
        this.$message('未修改。');
        return;
      }
      const rows = this.addedRecords.concat(this.modifiedRecords).map(r => this.tableData.indexOf(r));
      this.$refs.myTable.validateRows((valid) => {
        if (!valid) {
          this.$message('校验未通过。');
          return;
        }
        setTimeout(() => {
          this.$message('保存成功。');
          this.getTable();
        }, 800);
      }, rows);
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
