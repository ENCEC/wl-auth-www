<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:24px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>示例</el-breadcrumb-item>
      <el-breadcrumb-item>表单页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      :validate-on-rule-change="false"
      :label-position="labelPosition"
      :rules="rules"
      size="small"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="舱位公司代码:" prop="ctnOwnerName">
            <el-associate
              v-model="ruleForm.ctnOwner"
              name="ctnOwner"
              :columns="cwgsColumns"
              clearable
              value-prop="custCode"
              label-prop="custAlias"
              :query-method="queryCwgs"
              :multiple="true"
              :collapse-tags="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="舱位公司名称:" prop="ctnOwnerName">
            <el-associate
              v-model="ruleForm.ctnOwnerName"
              name="ctnOwnerName"
              :columns="cwgsColumns"
              clearable
              value-prop="custCode"
              label-prop="custAlias"
              :query-method="queryCwgs"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="乙方代码:" prop="protocolSignPerson">
            <el-associate
              v-model="ruleForm.protocolSignPerson"
              name="protocolSignPerson"
              :columns="officeColumns"
              clearable
              value-prop="code"
              label-prop="code"
              :query-method="queryResourceMethod"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="乙方名称" prop="protocolSignPersonName">
            <el-associate
              v-model="ruleForm.protocolSignPersonName"
              name="protocolSignPersonName"
              :columns="officeColumns"
              clearable
              value-prop="name"
              label-prop="name"
              :query-method="queryResourceMethod"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="甲方代码:" prop="partyOwner">
            <el-associate
              v-model="ruleForm.partyOwner"
              name="partyOwner"
              :columns="officeColumns"
              clearable
              value-prop="code"
              label-prop="code"
              :query-method="queryResourceMethod"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="甲方名称:" prop="partyOwnerName">
            <el-associate
              v-model="ruleForm.partyOwnerName"
              name="partyOwnerName"
              :columns="officeColumns"
              clearable
              value-prop="name"
              label-prop="name"
              :query-method="queryResourceMethod"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="生效日期:" prop="effectiveDate">
            <el-date-picker
              v-model="ruleForm.effectiveDate"
              name="effectiveDate"
              style="width: 178px;"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="失效日期:" prop="expireDate">
            <el-date-picker
              v-model="ruleForm.expireDate"
              name="expireDate"
              style="width: 178px;"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="创建人:" prop="creator">
            <el-input
              v-model="ruleForm.creator"
              name="creator"
              style="width: 178px;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="最后修改人:" prop="lastModifyor">
            <el-input
              v-model="ruleForm.lastModifyor"
              name="lastModifyor"
              style="width: 178px;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="订舱装港省份:" prop="feederLoadPortGroup">
            <el-select
              v-model="ruleForm.feederLoadPortGroup"
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
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="订舱卸港省份:" prop="feederDiscPortGroup">
            <el-select
              v-model="ruleForm.feederDiscPortGroup"
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
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="协议类型:" prop="protocolType">
            <el-select
              v-model="ruleForm.protocolType"
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
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="是否过期:" prop="isDue">
            <el-radio-group v-model="ruleForm.isDue">
              <el-radio v-for="item in YES_OR_NO" :key="item.value" :label="item.label" :value="item.value" name="isDue" />
            </el-radio-group>
            <!-- <el-select v-model="ruleForm.isDue" name="isDue" placeholder="">
              <el-option
                v-for="item in YES_OR_NO"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="箱尺寸:" prop="containerSize">
            <el-input
              v-model.number="ruleForm.containerSize"
              name="containerSize"
              style="width: 178px;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="冷箱标志:" prop="reeferInd">
            <el-select
              v-model="ruleForm.reeferInd"
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
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="箱型:" prop="containerType">
            <el-select
              v-model="ruleForm.containerType"
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
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="危险箱标志:" prop="hazardInd">
            <el-select
              v-model="ruleForm.hazardInd"
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
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="箱状态:" prop="containerStatus">
            <el-select
              v-model="ruleForm.containerStatus"
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
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="标志:" prop="reeferHazardInd">
            <el-checkbox-group v-model="ruleForm.reeferHazardInd">
              <el-checkbox label="冷危标志" :value="1" name="reeferHazardInd" />
              <el-checkbox label="毒性标志" :value="2" name="reeferHazardInd" />
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="中转包干价格:" class="fcos-form-item" prop="transferPrice">
            <el-input
              v-model.number="ruleForm.transferPrice"
              name="transferPrice"
              style="width: 178px;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="fcos-form-item" label="装卸费价格:" prop="handingPrice">
            <el-input
              v-model.number="ruleForm.handingPrice"
              name="handingPrice"
              style="width: 178px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="margin: 50px 0px 7px 0px; height: 24px; text-align: center">
      <el-button
        type="primary"
        size="small"
        @click="resetForm('ruleForm')"
      >重置</el-button>
      <el-button
        type="primary"
        size="small"
        @click="submitForm('ruleForm')"
      >确定</el-button>
      <el-button
        type="primary"
        size="small"
        @click="backList"
      >返回列表</el-button>
    </el-row>

  </div>
</template>
<script>
import { getAssociate, getCwgs } from '@/api/demo';

export default {
  name: 'CreateDemo',
  data() {
    return {

      labelPosition: 'right',
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
      cwgsColumns: [
        {
          title: '客户简称',
          field: 'custAlias',
          width: '200px'
        },
        {
          title: '客户代码',
          field: 'custCode',
          width: '200px'
        }
      ],
      queryResourceMethod({ keyword, pageSize, currentPage }) {
        const data = {};
        data.currentPage = currentPage;
        data.pageSize = pageSize;
        data.keyword = keyword;
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
      queryCwgs({ keyword, pageSize, currentPage }) {
        const data = {};
        data.currentPage = currentPage;
        data.pageSize = pageSize;
        data.keyword = keyword;
        return new Promise((resolve, reject) => {
          getCwgs(data).then(res => {
            resolve({
              records: res.data.data,
              total: res.data.total,
              recordStart: res.data.recordStart,
              recordEnd: res.data.recordEnd
            });
          });
        });
      },
      ruleForm: {
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
    this.$validate.transform(this.ruleForm, [
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
    ]).then(res => {
      this.rules = Object.assign({}, this.rules, res);
    });
  },
  created() {
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
      })
  },
  methods: {
    submitForm(formName) {
      // this.$emit('modifyData',this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.resetForm('ruleForm')
        } else {
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    backList() {
      this.$store.dispatch('tagsView/delView', this.$route).then(() => {
        this.$nextTick(() => {
          this.$router.replace({
            path: '/demo/list' // 关闭后跳转的路由
          })
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped></style>
