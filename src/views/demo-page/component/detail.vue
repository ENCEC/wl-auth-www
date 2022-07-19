<template>
  <div class="app-container">
    <el-row>
      <el-card class="fcos-card i-panel-content" shadow="none">
        <el-form
          ref="searchForm"
          :model="searchForm"
          label-width="30%"
          class="demo-form-inline"
          :label-position="labelPosition"
          :validate-on-rule-change="false"
          :rules="rules"
          :inline="true"
          size="mini"
        >

          <el-row>
            <el-col :span="4" class="common_label">
              舱位公司代码:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="ctnOwner">
                <el-associate
                  v-model="searchForm.ctnOwner"
                  name="ctnOwner"
                  :columns="officeColumns"
                  clearable
                  value-prop="code"
                  label-prop="code"
                  :query-method="queryResourceMethod"
                  :disabled="searchForm.ctnOwner ? true : false"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              舱位公司名称:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="ctnOwnerName">
                <el-associate
                  v-model="searchForm.ctnOwnerName"
                  name="ctnOwnerName"
                  :columns="officeColumns"
                  clearable
                  value-prop="name"
                  label-prop="name"
                  :query-method="queryResourceMethod"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              乙方代码:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="protocolSignPerson">
                <el-associate
                  v-model="searchForm.protocolSignPerson"
                  name="protocolSignPerson"
                  :columns="officeColumns"
                  clearable
                  value-prop="code"
                  label-prop="code"
                  :query-method="queryResourceMethod"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              乙方名称:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="protocolSignPersonName">
                <el-associate
                  v-model="searchForm.protocolSignPersonName"
                  name="protocolSignPersonName"
                  :columns="officeColumns"
                  clearable
                  value-prop="name"
                  label-prop="name"
                  :query-method="queryResourceMethod"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              甲方代码:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="partyOwner">
                <el-associate
                  v-model="searchForm.partyOwner"
                  name="partyOwner"
                  :columns="officeColumns"
                  clearable
                  value-prop="code"
                  label-prop="code"
                  :query-method="queryResourceMethod"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              甲方名称:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="partyOwnerName">
                <el-associate
                  v-model="searchForm.partyOwnerName"
                  name="partyOwnerName"
                  :columns="officeColumns"
                  clearable
                  value-prop="name"
                  label-prop="name"
                  :query-method="queryResourceMethod"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              生效日期:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="effectiveDate">
                <el-date-picker
                  v-model="searchForm.effectiveDate"
                  name="effectiveDate"
                  style="width: 178px;"
                  type="datetime"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              失效日期:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="expireDate">
                <el-date-picker
                  v-model="searchForm.expireDate"
                  name="expireDate"
                  style="width: 178px;"
                  type="datetime"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              创建人:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="creator">
                <el-input
                  v-model="searchForm.creator"
                  name="creator"
                  style="width: 178px;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              最后修改人:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="lastModifyor">
                <el-input
                  v-model="searchForm.lastModifyor"
                  name="lastModifyor"
                  style="width: 178px;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              订舱装港省份:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="feederLoadPortGroup">
                <el-select
                  v-model="searchForm.feederLoadPortGroup"
                  name="feederLoadPortGroup"
                  placeholder=""
                >
                  <el-option
                    v-for="item in PROVINCE"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              订舱卸港省份:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="feederDiscPortGroup">
                <el-select
                  v-model="searchForm.feederDiscPortGroup"
                  name="feederDiscPortGroup"
                  placeholder=""
                >
                  <el-option
                    v-for="item in PROVINCE"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              协议类型:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="protocolType">
                <el-select
                  v-model="searchForm.protocolType"
                  name="protocolType"
                  placeholder=""
                >
                  <el-option
                    v-for="item in PROTOCOL_TYPE"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              是否过期:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="isDue">
                <el-select v-model="searchForm.isDue" name="isDue" placeholder="">
                  <el-option
                    v-for="item in YES_OR_NO"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              箱尺寸:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="containerSize">
                <el-input
                  v-model.number="searchForm.containerSize"
                  name="containerSize"
                  style="width: 178px;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              冷箱标志:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="reeferInd">
                <el-select
                  v-model="searchForm.reeferInd"
                  name="reeferInd"
                  placeholder=""
                >
                  <el-option
                    v-for="item in YES_OR_NO"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              箱型:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="containerType">
                <el-select
                  v-model="searchForm.containerType"
                  name="containerType"
                  placeholder=""
                >
                  <el-option
                    v-for="item in CONTAINER_TYPE"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              危险箱标志:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="hazardInd">
                <el-select
                  v-model="searchForm.hazardInd"
                  name="hazardInd"
                  placeholder=""
                >
                  <el-option
                    v-for="item in YES_OR_NO"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              箱状态:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="containerStatus">
                <el-select
                  v-model="searchForm.containerStatus"
                  name="containerStatus"
                  placeholder=""
                >
                  <el-option
                    v-for="item in CONTAINER_STATUS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              冷危标志:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="reeferHazardInd">
                <el-select
                  v-model="searchForm.reeferHazardInd"
                  name="reeferHazardInd"
                  placeholder=""
                >
                  <el-option
                    v-for="item in YES_OR_NO"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="common_label">
              中转包干价格:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="transferPrice">
                <el-input
                  v-model.number="searchForm.transferPrice"
                  name="transferPrice"
                  style="width: 178px;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="common_label">
              装卸费价格:
            </el-col>
            <el-col :span="8">
              <el-form-item class="fcos-form-item" prop="handingPrice">
                <el-input
                  v-model.number="searchForm.handingPrice"
                  name="handingPrice"
                  style="width: 178px;"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row style="margin: 0px 0px 7px 0px; height: 24px; text-align: center">
          <el-button
            type="primary"
            @click="submitForm('searchForm')"
          >确定</el-button>
          <el-button
            type="primary"
            @click="resetForm('searchForm')"
          >重置</el-button>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { getDict, getAssociate } from '@/api/demo';

export default {
  name: 'CreateDemo',
  props: {
    formData: {}
  },
  data() {
    return {
      labelPosition: 'left',
      rules: {},
      YES_OR_NO: [],
      CONTAINER_TYPE: [],
      CONTAINER_STATUS: [],
      PROTOCOL_TYPE: [],
      PROVINCE: [],
      officeColumns: [
        {
          title: '客户简称',
          field: 'name',
          width: '200px'
        },
        {
          title: '客户代码',
          field: 'code',
          width: '200px'
        }
      ],
      queryResourceMethod({ keyword, pageSize, currentPage }) {
        const data = {};
        data.currentPage = currentPage;
        data.pageSize = pageSize;
        return new Promise((resolve, reject) => {
          getAssociate(data).then(res => {
            resolve({
              records: res.data.data,
              total: res.data.total,
              recordStart: res.data.recordStart,
              recordEnd: res.data.recordEnd
            });
          });
        });
      },
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
        lastModifyor: '', // 最后修改人
        isDue: '', // 是否过期
        feederLoadPortGroup: '', // 订舱装港省份
        feederDiscPortGroup: '' // 订舱卸港省份
      }
    };
  },
  mounted() {
    window.console.log('校验', this.$validate);
    this.$validate
      .transform(this.searchForm, [
        {
          property: 'ctnOwner',
          ruleName: 'notNull',
          message: '舱位公司不能为空'
        },
        {
          property: 'protocolSignPersonName',
          ruleName: 'notEmpty',
          message: 'error notEmptyValue'
        },
        {
          property: 'partyOwnerName',
          ruleName: 'notEmpty',
          message: 'error notEmptyValue'
        },
        {
          min: 2,
          max: 10,
          property: 'partyOwner',
          ruleName: 'length',
          message: 'error lengthValue'
        },
        {
          min: 2,
          max: 10,
          property: 'protocolSignPerson',
          ruleName: 'length',
          message: 'error lengthValue'
        },
        {
          property: 'effectiveDate',
          ruleName: 'dateMin',
          message: 'error dateMinValue',
          shiftedTime: 0,
          compareTime: '2006-06-26 06:16:26',
          parsePattern: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          property: 'expireDate',
          ruleName: 'dateMax',
          message: 'error dateMaxValue',
          shiftedTime: 0,
          compareTime: '2020-06-24 02:24:00',
          parsePattern: 'yyyy-MM-dd HH:mm:ss'
        },
        {
          min: 10,
          max: 200,
          property: 'transferPrice',
          ruleName: 'numberRange',
          message: '10 <= 数值 <= 200'
        },
        {
          min: 10,
          max: 200,
          property: 'handingPrice',
          ruleName: 'numberRange',
          message: '10 <= 数值 <= 200'
        },
        {
          min: 20,
          max: 45,
          property: 'containerSize',
          ruleName: 'numberRange',
          message: '20 <= 数值 <= 45'
        },
        {
          property: 'creator',
          ruleName: 'allMatch',
          listenProperties: ['creator', 'lastModifyor'],
          message: 'creator must EQ lastModifyor'
        }
      ])
      .then(res => {
        console.log(res);
        this.rules = Object.assign({}, this.rules, res);
      });
  },
  created() {
    if (this.formData) {
      this.searchForm = this.formData;
    }
    this.$dictionary
      .get(
        [
          'YES_OR_NO',
          'CONTAINER_TYPE',
          'CONTAINER_STATUS',
          'PROTOCOL_TYPE',
          'PROVINCE'
        ],
        true
      )
      .then(response => {
        this.YES_OR_NO = response.YES_OR_NO;
        this.CONTAINER_TYPE = response.CONTAINER_TYPE;
        this.CONTAINER_STATUS = response.CONTAINER_STATUS;
        this.PROTOCOL_TYPE = response.PROTOCOL_TYPE;
        this.PROVINCE = response.PROVINCE;
      });
    // let config = {
    //     ignoreCase: true,
    //     indexes: [
    //         {
    //             field: 'ctnOwner',
    //             label: '',
    //             idx:0
    //         },
    //         {
    //             field: 'ctnOwnerName',
    //             label: '',
    //             idx:1
    //         }
    //     ]
    // };  //配置
    // this.$tabIndex.register(this,config) //注册全局焦点切换
  },
  methods: {
    submitForm(formName) {
      // this.$emit('modifyData',this.searchForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('modifyData', this.searchForm);
          console.log('校验完成!');
        } else {
          console.log('校验未通过!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped></style>
