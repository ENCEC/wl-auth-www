<template>
  <div class="project-examine-dialog">
    <el-dialog
      top="10vh"
      z-index="1000"
      :append-to-body="true"
      :title="dialogTitle"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      width="800px"
      @close="handleDialogClose"
    >
      <el-form
        ref="elForm"
        v-loading="dialogLoading"
        :model="temp"
        size="medium"
        label-position="left"
        label-width="100px"
        :inline="true"
        destroy-on-close
        disabled
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目总监">
              <el-input :value="chiefName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理">
              <el-input :value="dutyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开发经理">
              <el-input :value="devDirectorName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求组长">
              <el-input :value="demandName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开发组员">
              <el-input
                :auto-size="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                :value="genDevUsers"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求组员">
              <el-input
                :auto-size="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                :value="genDemandUsers"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button
          type="primary"
          :plain="true"
          size="medium"
          @click="dialogVisible = false"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryViewDetailById } from '@/api/sys-project.js';
export default {
  components: {},
  props: {},
  data() {
    return {
      successNum: 0,
      dialogLoading: false,
      dialogVisible: false,
      dialogTitle: '查看项目组成员',
      temp: {},
      // 项目总监
      chiefName: '',
      // 需求组长
      demandName: '',
      // 开发经理
      devDirectorName: '',
      // 项目经理
      dutyName: '',
      // 需求组员ID
      genDemandUsers: '',
      // 开发组员ID
      genDevUsers: ''
    }
  },

  watch: {},
  created() {},
  mounted() {},
  methods: {
    open(row) {
      this.dialogVisible = true;
      if (row) {
        this.examineRequest();
        this.dialogLoading = true;
        this.temp = Object.assign({}, row);
        this.getChiefName();
        this.getDemandName();
        this.getDevDirectortName();
        this.getDutyName();
        this.getGenDevUsers();
        this.getGenDemandUsers();
      }
    },
    examineRequest() {
      var timer = setInterval(() => {
        if (this.successNum >= 6) {
          this.dialogLoading = false;
          clearInterval(timer);
        }
      });
    },
    getChiefName() {
      if (this.temp.chiefName) {
        const nameArr = [];
        queryViewDetailById(this.temp.chiefName).then((res) => {
          res.data.forEach((item) => {
            nameArr.push(item.name);
          });
          this.chiefName = nameArr.join(',');
          this.successNum += 1;
        });
      } else {
        this.successNum += 1;
      }
    },
    getDemandName() {
      if (this.temp.demandName) {
        const nameArr = [];
        queryViewDetailById(this.temp.demandName).then((res) => {
          res.data.forEach((item) => {
            nameArr.push(item.name);
          });
          this.demandName = nameArr.join(',');
          this.successNum += 1;
        });
      } else {
        this.successNum += 1;
      }
    },
    getDevDirectortName() {
      if (this.temp.devDirectorName) {
        const nameArr = [];
        queryViewDetailById(this.temp.devDirectorName).then((res) => {
          res.data.forEach((item) => {
            nameArr.push(item.name);
          });
          this.devDirectorName = nameArr.join(',');
          this.successNum += 1;
        });
      } else {
        this.successNum += 1;
      }
    },
    getDutyName() {
      const nameArr = [];
      queryViewDetailById(this.temp.dutyName).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.dutyName = nameArr.join(',');
        this.successNum += 1;
      });
    },
    getGenDemandUsers() {
      const nameArr = [];
      queryViewDetailById(this.temp.genDemandUsers.join(',')).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.genDemandUsers = nameArr.join(',');
        this.successNum += 1;
      });
    },
    getGenDevUsers() {
      const nameArr = [];
      queryViewDetailById(this.temp.genDevUsers.join(',')).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.genDevUsers = nameArr.join(',');
        this.successNum += 1;
      });
    },
    handleDialogClose() {
      this.$nextTick(() => {
        this.dialogVisible = false
        this.resetTemp();
      });
    },
    resetTemp() {
      this.chiefName = ''
      this.demandName = ''
      this.devDirectorName = ''
      this.dutyName = ''
      this.genDemandUsers = ''
      this.genDevUsers = ''
      this.successNum = 0
    }
  }
};
</script>
<style lang="scss">
</style>
